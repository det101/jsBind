/**
 * Created by luxiaolong on 2017/7/10.
 */
import Watcher from './watcher';
class BindingUtils {
    /**
     * 用什么方式绑定
     * @param mode = 0 默认模式，enterframe遍历数据方式，支持dom间绑定，支持ie8
     * mode = 1 Object.defineProperty绑定，只支持dom绑定data 不支持ie8
     */
    static initMode(mode = 0) {
        Watcher.switchMode(mode);
    }

    static bindProperty(site, prop, host, chain) {
        const w = Watcher.watch(host, chain, null);
        if(w) {
            var f = (value) => {
                site[prop] = w.getValue();
            };
            w.setCallBack(f);
            f(null);
        }
        return w;
    }

    static bindSetter(setter, host, chain) {
        const w = Watcher.watch(host, chain, null);
        if(w) {
            var f2 = (value) => {
                setter(w.getValue());
            };
            w.setCallBack(f2);
            f2(null);
        }
        return w;
    }
}

export default BindingUtils;