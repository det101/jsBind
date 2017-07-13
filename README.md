##BindingUtils
主要参考flex绑定方式实现的dom和数据绑定一种方式

###使用
npm install --save js-bind-utils

```
import BindingUtils from 'js-bind-utils';
		
		let watcher = BindingUtils.bindProperty(myDiv, 'innerHTML', data, ['val','d']);
		                
		BindingUtils.bindSetter(function(vaule) {
            if(vaule.length > 10) {
                console.log('绑定的数据长度大于10');
            }

        }, data, ['val','d']);
        
        watcher.unwatch();  //移除绑定
```
