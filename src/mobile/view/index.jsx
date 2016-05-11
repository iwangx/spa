/**
 * Created by iwangx on 16/4/28.
 */
import store from "../store/IndexStore";
import action from "../action/IndexAction";

import weatherStore from "../store/WeatherStore";
import weatherAction from "../action/WeatherAction";

import Alert from "../components/Alert";

var Index = React.createClass({
    mixins: [
        Reflux.connect(store,"list"),
        Reflux.connect(weatherStore, 'weather')
    ],
    getInitialState: function () {
        return {list: [],weather:{}};
    },
    componentDidMount: function () {
        action.getAll();
        setTimeout(function(){
            weatherAction.getWeather();
        }.bind(this),1000);
    },
    render:function(){
        return (
            <div>
                {this.state.list}
                {'weather:'+JSON.stringify(this.state.weather)}
                <Alert show={true}>123123</Alert>
            </div>
        )
    }
});

ReactDOM.render(<Index/>,document.getElementById("app"));