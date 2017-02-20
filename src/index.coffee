through = require 'through2'
Vinyl = require 'vinyl'

module.exports = (options) -> 
    lastest = undefined
    modules = new Object
    main = new Object

    options = options or {}
    options.exports = options.exports or 'main'
    options.outputs = options.outputs or 'main.js'

    requireFactory = (module) ->
        code = module.code
        deps = []
        for dep in module.deps
            deps.push """modules['#{dep}']"""
        return """var #{options.exports} = (#{code}).apply(
            #{options.exports},
            [#{deps.toString()}]
        );
        """

    defineFactory = (name, module) ->
        code = module.code
        deps = []
        for dep in module.deps
            deps.push """modules['#{dep}']"""
        return """
            modules['#{name}'] = (#{code}).apply(
                modules['#{name}'],
                [#{deps.toString()}]
            );\n
        """

    unify = (transversed) ->
        for i of transversed
            name = transversed[i]
            if not modules[name].found
                modules[name].found = true 
            else
                transversed.splice i, 1
        return transversed

    transverse = (deps, modules) ->
        future = []
        if deps.length isnt 0
            for dep in deps
                future =  future.concat transverse modules[dep].deps, modules
        future =  future.concat deps
        return future              

    require = (deps, fn) ->
        main.code = fn.toString()
        main.deps = deps
        
    define = (name, deps, fn) ->
        modules[name] =
            'code' : fn.toString()
            'deps' : deps
            'found' : false

    deamdfy = (file, enc, cb) ->
        eval file.contents.toString()
        lastest = file
        cb()

    reduceModules = (s, name) -> s.concat defineFactory name, modules[name]

    return through objectMode: true, deamdfy, () ->
        order = unify transverse main.deps, modules
        content = order
            .reduce reduceModules, 'var modules = {};'
            .concat requireFactory main
        stream = new Vinyl(
            cwd : lastest.cwd
            base : lastest.base
            path : lastest.path
            contents : new Buffer(content)
        )
        this.push stream