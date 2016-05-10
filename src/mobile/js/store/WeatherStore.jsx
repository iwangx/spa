/**
 * Created by iwangx on 16/5/10.
 */
import action from "../action/WeatherAction"

export default Reflux.createStore({
    listenables: [action],
    weather:[],
    init:function(){
        console.log("WeatherAction");
    },
    onGetWeather:function(){
        var url="api.com";
        if("production" !== process.env.NODE_ENV){
            Mock.mock(url,
                {
                    'list|1-10': [{
                        'id|+1': 1,
                        'email': '@EMAIL'
                    }]
                }
            );
        }

        reqwest({
            url: url,
            type: 'json',
            success: function (resp) {
                this.weather=resp;
                this.trigger(this.weather);
            }.bind(this)
        })
    }
});