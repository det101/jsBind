ndingUtils
主要参考flex绑定方式实现的dom和数据绑定一种方式

###使用
npm install --save js-bind-utils

```
import BindingUtils from 'js-bind-utils';
		
		let watcher = BindingUtils.bindProperty(myDiv1, 'innerHTML', data, ['val','d']);	 //数据绑定
		
		let watcher = BindingUtils.bindProperty(myDiv1, 'innerHTML', myDiv2, 'innerHTML'); //dom之间也能绑定
		                
		BindingUtils.bindSetter(function(vaule) {
            if(vaule.length > 10) {
                console.log('绑定的数据长度大于10');
                myDiv2.innerHTML = value;
            }

        }, data, ['val','d']);	//setter 处理
        
        watcher.unwatch();  //移除绑定
        
        
        
```

