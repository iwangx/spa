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
        case types.GET_ALL:
            return state.concat([]);
            break;

        default:
            return state
    }
};

module.exports=combineReducers({todo:todo});