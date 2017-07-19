/**
 * Created by luxiaolong on 2017/7/11.
 * 用defineProperty方式绑定
 */

import WatchEvent from './watchEvent';
import WatchEnter from './watchEnter';

var WatchEventProxy = Object.defineProperty ? WatchEvent : WatchEnter;
WatchEventProxy = WatchEnter;
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
                WatchEventProxy.remove(host, name, wrapHandler);
            }
            host = newHost;
            if(host) {
                WatchEventProxy.add(host, name, wrapHandler);
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
                //
            }
        };
        
    }

    static switchMode(mode) {
        switch(mode) {
            case 1:
                WatchEventProxy = Object.defineProperty ? WatchEvent : WatchEnter;
                break;

            default:
                WatchEventProxy = WatchEnter;
        }
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


}

export default Watcher;