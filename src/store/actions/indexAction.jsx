/**
 * Created by iwangx on 16/3/22.
 * 定义action 在view上直接调用action
 */


var types =require("../const/IndexTypes");

module.exports={
    addTodo:function(text){
        return { type: types.ADD_TODO, text }
    },
    deleteTodo:function(id){
        return { type: types.DELETE_TODO, id }
    },
    editTodo:function(id, text){
        return { type: types.EDIT_TODO, id, text }
    },
    completeTodo:function(id){
        return { type: types.COMPLETE_TODO, id }
    },
    completeAll:function(text){
        return { type: types.COMPLETE_ALL }
    },
    clearCompleted:function(text){
        return { type: types.CLEAR_COMPLETED }
    },
    getAll:function(){
        return {type:types.GET_ALL}
    }
    //getAll:function(){
    //    return function (dispatch) {
    //        reqwest({
    //            url: 'http://api.k780.com:88/?app=weather.future&weaid=1&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json'
    //            , type: 'jsonp',
    //            jsonpCallback:"jsoncallback"
    //            , success: function (resp) {
    //                dispatch({
    //                    type:types.GET_ALL,
    //                    data:resp
    //                })
    //            }
    //        })
    //    }
    //}
};