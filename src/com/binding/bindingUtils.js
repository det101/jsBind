/**
 * Created by luxiaolong on 2017/7/10.
 */
import Watcher from './watcher';
class BindingUtils {
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

var namex = {a: 123};
export { namex };

export default BindingUtils;