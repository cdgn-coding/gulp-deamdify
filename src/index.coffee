through = require 'through2'
Vinyl = require 'vinyl'
path = require 'path'
lodash = require 'lodash'

module.exports = (options) ->
  lastest = false
  hasMain = false
  modules = new Object
  main = new Object

  options = options or {}
  options.exports = options.exports or 'main'
  options.outputs = options.outputs or 'main.js'

  formatDependencies = (dependencies) ->
    lodash.map(
        dependencies,
        (dependency) -> """modules['#{dependency}']"""
      ).toString()

  requireFactory = (module) ->
    """var #{options.exports} = (#{module.code}).apply(
      #{options.exports},
      [#{formatDependencies module.deps}]
    );
    """

  defineFactory = (name, module) ->
    """
      modules['#{name}'] = (#{module.code}).apply(
        modules['#{name}'],
        [#{formatDependencies module.deps}]
      );\n
    """

  unify = (transversed) ->
    transversed.reduce(
      (tree, current) -> unless lodash.some(tree, (dependency) -> dependency is current) then tree.concat current else tree,
      new Array()
    )

  transverse = (deps, modules) ->
    deps.reduce(
      (acumulated, current) -> acumulated.concat transverse modules[current].deps, modules,
      new Array()
    ).concat deps

  mapParams = (args, allowed) ->
    toAllowed = (map, argument, i) -> 
      param = allowed[i]
      map[param] = argument
      return map
    return lodash.chain args
      .reverse()
      .reduce toAllowed, {}
      .value()

  require = () ->
    args = mapParams arguments, ['code', 'deps', 'name']
    deps = args.deps or []
    func = args.code.toString()
    main.deps = deps
    main.code = func
    hasMain = true
    
  define = () ->
    removeExtensionOf = (path) -> path.replace '.js', ''
    generateRelative = (path, base) -> path.replace base, ''
    args = mapParams arguments, ['code', 'deps', 'name']
    deps = args.deps or []
    name = args.name or removeExtensionOf generateRelative lastest.path, lastest.base
    func = args.code.toString()
    modules[name] =
      'code' : func
      'deps' : deps

  formatModules = (acumulated, name) -> acumulated.concat defineFactory name, modules[name]

  parseModule = (file, enc, cb) ->
    lastest = file
    eval file.contents.toString()
    cb()

  continueStream = (cb) ->
    if hasMain and lastest
      content = (unify transverse main.deps, modules)
        .reduce formatModules, 'var modules = {};\n'
        .concat requireFactory main
      built = lastest.clone()
      built.contents = new Buffer(content)
      built.path = path.join(lastest.base, options.outputs)
      this.push built
    cb()

  return through(
    objectMode: true,
    parseModule, 
    continueStream
  )
