/**
 * Created by luxiaolong on 2017/7/11.
 */
var watcherHandlers = {};
class Watcher {
    // 构造
    constructor(access, callBackFun, $next) {
        var host;
        var name = typeof access === 'string' ? access : access.name;
        var getter = typeof access === 'string' ? null : access.getter;
        var callBack = callBackFun;
        var next = $next;


        this.reset = (newHost) => {
            if(host) {
                Watcher.remove(host, name, wrapHandler);
            }
            host = newHost;
            if(host) {
                Watcher.add(host, name, wrapHandler);
            }
            if(next) {
                next.reset(getHostPropertyValue());
            }
        };

        this.getValue = () => {
            return (!host) ? null : (!next) ? getHostPropertyValue() : next.getValue();
        };

        var getHostPropertyValue = () => {
            return (!host) ? null : getter ? getter(host) : host[name];
        };

        this.unwatch = () => {
            this.reset(null);
        };

        this.setCallBack = (call) => {
            callBack = call;
            if(next) {
                next.setCallBack(call);
            }
        };

        var wrapHandler = (value) => {
            try {
                if(next) {
                    next.reset(getHostPropertyValue());
                }
                callBack(value);
            }catch(e) {
                console.log(e);
            }
            finally {
                console.log('');
            }
        };
        
    }

    static watch(host, chain, callBackFun) {
        if(!(chain instanceof Array)) {
            chain = [ chain ];
        }

        if(chain.length > 0) {
            let w = new Watcher(chain[0], callBackFun,
                Watcher.watch(null, chain.slice(1), callBackFun));
            w.reset(host);
            return w;
        }else {
            return null;
        }
    }

    static remove(obj, name, callBack) {
        let objWatch = watcherHandlers[obj];
        if(objWatch) {
            let arr = objWatch[name];
            const index = arr.indexOf(callBack);
            if(index != -1) {
                arr.splice(index, 1);
            }
        }
    }

    static add(obj, name, callBack) {
        if(!watcherHandlers[obj]) {
            watcherHandlers[obj] = {};
        }
        let objWatch = watcherHandlers[obj];
        if(!objWatch[name]) {

            objWatch[name] = [callBack];
        }else {
            if(objWatch[name].indexOf(callBack) == -1) {
                objWatch[name].push(callBack);
            }
        }

        Watcher.bind(obj, name);
    }

    static update(obj, name) {
        if(!watcherHandlers[obj]) {
            return;
        }
        let objWatch = watcherHandlers[obj];
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
                        Watcher.update(obj, name);
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

export default Watcher;