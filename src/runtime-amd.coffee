require = (deps, code) -> 
  define::modulefactory null, code, deps

define = (name, deps, code) ->
  define.modules.exports = {}
  define.modules[name] = define::modulefactory(
    define.modules[name],
    code,
    deps
  )

define::modulefactory = (scope, code, deps) ->
  factory = if 'exports' in deps then define::fromExport else define::fromReturn
  indexed = deps.indexOf 'exports'
  factory(
    scope,
    code,
    (define::selectDeps deps),
    indexed
  )
define::getModule = (name) -> define.modules[name]
define::selectDeps = (deps) -> deps.map define::getModule
define::fromExport = (scope, code, deps, indexed) ->
  code.apply scope, deps
  return deps[indexed]
define::fromReturn = (scope, code, deps) -> code.apply scope, deps
define.modules = {}
define.modules.require = define::getModule
