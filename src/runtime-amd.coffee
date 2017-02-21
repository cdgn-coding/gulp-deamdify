__utils =
    currentAllowed : []
    getProperty : (object, key) -> object[key]
    setProperty : (object, key, value) -> object[key] = value
    getPosition : (array, position) -> array[position]
    generateArrayFrom : (args) -> Array::slice.call args
    selectDependencies : (all, required) -> required.map (name) -> @getPosition all, name
    toTuples : (argument, i) -> 
        'key': @getProperty @currentAllowed, i
        'value' : argument
    toAsociative : (map, param) ->  
        @setProperty map, (@getProperty param, 'key'), (@getProperty param, 'value')
        return map

require = () -> 
    define.allowed = @allowed = ['code', 'deps']

define = () ->
    __utils.currentAllowed = define.allowed = ['code', 'deps', 'name']
    define.modules = {} or define.modules
    define.modules.exports = {}
    define.modules.require = require
    module = __utils.generateArrayFrom arguments
        .reverse()
        .map __utils.toTuples.bind __utils
        #.reduce __utils.toAsociative.bind __utils