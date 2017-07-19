/**
 * Created by luxiaolong on 2017/7/18.
 */
class Dictionary {

    // 构造
    constructor() {
        this.keys = [];
        this.values = [];
    }

    getValue(key) {
        var index = this.keys.indexOf(key);
        if(index == -1) {
            return null;
        }else {
            return this.values[index];
        }
    }

    put(key, value) {
        var index = this.keys.indexOf(key);
        if(index == -1) {
            this.keys.push(key);
            this.values.push(value);
        }else {
            this.values[index] = value;
        }
    }

    remove(key) {
        var index = this.keys.indexOf(key);
        if(index != -1) {
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
        }
    }
}

export default Dictionary;