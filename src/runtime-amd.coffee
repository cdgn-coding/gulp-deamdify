require = (deps, code) -> 
  define::executeFactory null, code, deps

define = (name, deps, code) ->
  define.modules[name] = define::executeFactory null, code, deps


define::executeFactory = (scope, code, deps) ->
  define.modules.exports = {}
  indexed = deps.indexOf 'exports'
  define::modulefactory(
    scope,
    code,
    (define::selectDeps deps),
    indexed
  )()

define::modulefactory = (scope, code, deps) ->
  if 'exports' in deps then define::fromExport else define::fromReturn
define::getModule = (name) -> define.modules[name]
define::selectDeps = (deps) -> deps.map define::getModule
define::fromExport = (scope, code, deps, indexed) ->
  code.apply scope, deps
  return deps[indexed]
define::fromReturn = (scope, code, deps) -> code.apply scope, deps
define.modules = {}
define.modules.require = define::getModule