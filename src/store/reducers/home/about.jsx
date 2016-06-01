/**
 * Created by iwangx on 16/5/31.
 */
var combineReducers=require("redux").combineReducers;
var types=require("../../const/home/aboutTypes");

var initState={
    name:123
};

var todo=function (state=initState,action) {
    var copyState=Object.assign({},state);
    switch (action.type) {
        case types.TEST:
            
            copyState.name+=1;
            return copyState;
            break;

        default:
            return state;
    }
};

module.exports=combineReducers({todo:todo});
