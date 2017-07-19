[![Build Status](https://travis-ci.org/det101/jsBind.svg?branch=master)](https://travis-ci.org/det101/jsBind)

## BindingUtils

Implements the binding between objects and object attributes, including DOM

### Installation

npm install --save js-bind-utils

### Getting Started

```
import BindingUtils from 'js-bind-utils';
	
var data = {first: {value:12}};
var data2 = {value: 1};
var data3 = {value: 200};
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
let myDiv = document.getElementById('myDiv');
	
let watcher = BindingUtils.bindProperty(myDiv, 'innerHTML', data3, ['a']);	//binding between dom and data
myDiv.addEventListener('click', function() {
    watcher.unwatch();		//remove watch
});

BindingUtils.bindProperty(myDiv, 'innerHTML', input, 'value');		//binding between dom
	
BindingUtils.bindSetter(function(vaule) {
    if(vaule > 500) {
        input1.value = vaule;
    }
	
}, data, ['first','value']);  //binding setting callback
        
        
setInterval(function() {
    data.first = {value : Math.floor(Math.random()*1000)};
    data2.value += 1;
    data3.value += 1;
} ,1000);        
        
```

### Build

```
npm install	 
npm run dev   //run demo
Browser opens http://localhost:8080/webpack-dev-server/demo/demo.html

```
