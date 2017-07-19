/**
 * Created by luxiaolong on 2017/7/18.
 */
import Dictionary from './dictionary';

var watcherHandlers = new Dictionary();
class WatchEvent {
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
        }else {
            if(objWatch[name].indexOf(callBack) == -1) {
                objWatch[name].push(callBack);
            }
        }

        WatchEvent.bind(obj, name);
    }

    static update(obj, name) {
        let objWatch = watcherHandlers.getValue(obj);
        if(!objWatch) {
            return;
        }

        if(!objWatch[name]) {
            return;
        }else {
            if(objWatch[name].length > 0) {
                objWatch[name].forEach((call) => {
                    call(obj[name]);
                });
            }
        }
    }

    static bind(obj, name) {
        var value = obj[name];
        try {
            Object.defineProperty(obj, name, {

                get: function() {
                    return value;
                },
                set: function(newValue) {
                    if(value != newValue) {
                        value = newValue;
                        WatchEvent.update(obj, name);
                    }
                },

                enumerable: true,
                configurable: true
            });
        } catch (error) {
            console.log('browser not supported.');
        }
    }
}

export default WatchEvent;