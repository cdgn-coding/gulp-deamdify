main = {}

require = (deps, code) -> 
  main = define::factory main, code, deps

define = (name, deps, code) ->
  define.modules.exports = {}
  define.modules[name] = define::factory(
    define.modules[name],
    code,
    deps
  )

define::factory = (scope, code, deps) ->
  generator = if 'exports' in deps then define::fromExport else define::fromReturn
  indexed = deps.indexOf 'exports'
  generator(
    scope,
    code,
    (define::selectDeps deps),
    indexed
  )
define::getModule  = (name) -> define.modules[name]
define::selectDeps = (deps) -> deps.map define::getModule
define::fromExport = (scope, code, deps, indexed) ->
  code.apply scope, deps
  deps[indexed]
define::fromReturn = (scope, code, deps) -> code.apply scope, deps
define.modules = {}
define.modules.require = define::getModule
