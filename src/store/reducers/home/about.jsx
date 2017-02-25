/**
 * Created by iwangx on 16/5/31.
 */
var types=require("../../const/home/aboutTypes");

var initState={
    name:123
};

module.exports=function (state=initState,action) {
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
