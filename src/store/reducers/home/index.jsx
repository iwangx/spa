var combineReducers=require("redux").combineReducers;
var types=require("../../const/home/IndexTypes");

//初试的redux状态
var initState=[
    {
        text: 'Use Redux',
        completed: false,
        id: 0
    }
];

var todo= function(state=initState,action){
    var newState=Object.assign({},state);
    switch (action.type) {
        case types.ADD_TODO:
            return [
                {
                    id: state.reduce(function (maxId, todo) {
                        return Math.max(todo.id, maxId);
                    }, -1) + 1,
                    completed: false,
                    text: action.text
                }
            ].concat(state) ;
        break;

        case types.DELETE_TODO:
            return state.filter(function(todo){
                return todo.id !== action.id
            });
            break;

        case types.EDIT_TODO:
            return state.map(function(todo){
                return todo.id === action.id ? Object.assign({}, todo, { text: action.text }) :
                    todo
            });
            break;

        case types.COMPLETE_TODO:
            return state.map(function(todo){
               return  todo.id === action.id ?
                   Object.assign({}, todo, { completed: !todo.completed }) :
                   todo
            });
            break;

        case types.COMPLETE_ALL:
            var  areAllMarked = state.every(function(todo){
               return todo.completed
            });
            return state.map(function(todo){
                return Object.assign({}, todo, {
                    completed: !areAllMarked});
            });
            break;

        case types.CLEAR_COMPLETED:
            return state.filter(function(todo){
                return todo.completed === false
            });
            break;

        case types.GET_ALL:
            return state.concat([]);
            break;

        default:
            return state
    }
};

module.exports=combineReducers({todo:todo});