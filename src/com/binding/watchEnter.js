/**
 * Created by luxiaolong on 2017/7/18.
 * 可以兼容ie8以下，并且支持dom之间相互绑定
 */
import EnterFrame from './enterframe';
import Dictionary from './dictionary';

var watcherHandlers = new Dictionary();
class WatchEnter {
    static remove(obj, name, callBack) {
        let objWatch = watcherHandlers.getValue(obj);
        if(objWatch) {
            let arr = objWatch[name];
            const index = arr.indexOf(callBack);
            if(index != -1) {
                arr.splice(index, 1);
            }
            if(arr.length == 0) {
                watcherHandlers.remove(obj);
            }
        }
    }

    static add(obj, name, callBack) {
        if(!watcherHandlers.getValue(obj)) {
            watcherHandlers.put(obj, {});
        }
        let objWatch = watcherHandlers.getValue(obj);
        if(!objWatch[name]) {
            objWatch[name] = [callBack];
            objWatch['key_name'] = name;
        }else {
            if(objWatch[name].indexOf(callBack) == -1) {
                objWatch[name].push(callBack);
            }
        }
        EnterFrame.addAnimation(WatchEnter);
    }



    static update() {
        var keys = watcherHandlers.keys;
        for(var j = 0, len = keys.length; j < len; j++) {
            let key = keys[j];
            let objWatch = watcherHandlers.getValue(key);
            if(key[objWatch.key_name] != objWatch.key_value) {
                let funArr = objWatch[objWatch.key_name];
                for(let i = 0, len = funArr.length; i < len; i++) {
                    funArr[i](objWatch.key_value);
                }
            }
            objWatch.key_value = key[objWatch.key_name];
        }
    }
}

export default WatchEnter;