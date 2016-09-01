/**
 * Created by iwangx on 16/3/22.
 * 定义action 在view上直接调用action
 */

var fetch = require("fetch-jsonp");
var types =require("../../const/home/IndexTypes");

module.exports={
    // getAll:function(){
    //     return {type:types.GET_ALL}
    // }
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
    getAll:function () {
        return function (dispatch) {
            fetch("http://api.k780.com:88/?app=weather.future&weaid=1&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json",
                {
                    jsonpCallback: 'jsoncallback'
                }
            )
                .then(function (res) {
                    dispatch({type:types.GET_ALL})
                })
                .then(function () {
                    dispatch({type:types.GET_ALL})
                })
                .catch(function () {
                    dispatch({type:types.GET_ALL})
                });
        }
    }
};