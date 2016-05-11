/**
 * Created by iwangx on 16/5/10.
 */

import action from "../action/IndexAction"

export default Reflux.createStore({
    listenables: [action],
    item:[1,2,34,5],
    init:function(){
        console.log("IndexStore");
        this.trigger(this.item);
    },
    onGetAll:function(){
      this.trigger(this.item);
    }
});
