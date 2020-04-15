# 一文彻底搞懂js的类型判断

### (1)js的基本类型

在说类型判断之前,首先看一下js的基本类型，有一下八种

- Number
- String
- Boolen
- Null
- Undefined
- Symbol
- Bigint
- Object

Symbol类型ES6新加的类型，是通过Symbol()函数创建唯一的实例,BigInt是ES10添加的新类型，通过BigInt()函数创建实例。

### (2)使用typeof判断类型

```js
//Number
console.log(typeof 100)//输出:number
//String
console.log(typeof "hello")//输出:string
//Boolen
console.log(typeof true)//输出:boolen
//Null
let messge = null;
console.log(typeof messge)//输出:object
//Undefined
console.log(typeof undefined)//输出:undefined
//Symbol
console.log(typeof Symbol())//输出:symbol
//Bigint
console.log(typeof BigInt(10))//输出:bigint
//Object
console.log(typeof {})//输出:object
//Function
console.log(typeof function(){})//输出:function
```

在这里重点说一下undefined和null的区别

(1)undefined 指的是变量的未初始化或者没有定义,我们如果没有初始化这个变量会自动初始化为undefined,这里有个比较重要的点我们在判断一个变量是否是undefined的时候一般会这样写

```js
let value;
if(value == undefined){
  console.log("变量未定义")
}
else{
  console.log("变量定义")
}
//输出：变量未定义
//但是在有些情况下undefined会被覆盖，导致undefined会是一个别的值,比如下面这种情况就会输出:变量定义
{
  let value;
  let undefined = 2;
  if(value === undefined){
    console.log("变量未定义")
  }
  else{
    console.log("变量定义")
  }
}
//所有我们换一种方法判断undefined，void 0 会返回undefined 也排除了undefined也覆盖的问题
{
  let value;
  if(value === void 0){
    console.log("变量未定义")
  }
  else{
    console.log("变量定义")
  }
}

```

(2)null指的是应用类型指向堆内存是空地址，所以typeof的类型还是object，这个空地址在堆内存中是固定的。

#### typeof总结

typeof能判断出object,string,number,booleanl,undfined,function,symbol,bigint,但是也有一定的局限性，在判断数组，正则这些类型的时候，结果都是object，就是不能区分这些类型。

### (3)使用instanceof判断类型

首先手动实现一个instanceof来理解其中的原理

```js
let myInstanceof = (left,right) => {
  let leftvalue = left.__proto__;
  let rightvalue = right.prototype;
  while(true){
    if(leftvalue === null) {
      return false;
    }
    if(leftvalue === rightvalue){
      return true;
    }
    leftvalue = leftvalue.__proto__;
  }
}
//在上面代码中我们可以传入left,right,可以理解为left为对象实例，right为对象类型，通过left.__proto__
//沿着原型链一直向下找，直到和right.prototype相等返回true，否则返回false
```

所以我们可以使用instanceof来判断

```
let arr = [];
console.log(arr instanceof Array);//true
let fn = () => {};
console.log(fn instanceof Function);//true
```

### (4)使用toString判断类型

```js
console.log(Object.prototype.toString.call(1));  //'[object Number]'
console.log(Object.prototype.toString.call('1'));//'[object String]'
console.log(Object.prototype.toString.call(function(){}));  //'[object Function]'
console.log(Object.prototype.toString.call([1,2,3])); //'[object Array]'
console.log(Object.prototype.toString.call(undefined)); //'[object Undefined]'
console.log(Object.prototype.toString.call(null)); //'[object Null]'
console.log(Object.prototype.toString.call(true)); //'[object Boolean]'
console.log(Object.prototype.toString.call(Symbol())); //'[object Symbol]'
console.log(Object.prototype.toString.call(BigInt(10))); //'[object BigInt]'
function fn(){
  	console.log(Object.prototype.toString.call(arguments)); //[object Arguments]
}
fn();
```

toString 获取当前call传入值的 [[Class]] 属性值, 然后拼接成 '[object ' + [[Class]] + ']'  这样的字符串并返回. 这个基本上可以判断所有的类型，所以我们可以学习underscore的写法。

```js
let utils = {}
let sr = ['Function', 'String', 'Number', 'Symbol','BigInt','Boolean','Array'];
sr.forEach(name => {
	utils["is"+name] = function(obj){
		return Object.prototype.toString.call(obj) === "[object "+name+"]";
	}
})
//通过遍历数组里面的类型，插入到utils里面，以后我们可以通过utils.isFunction()来判断
console.log(utils.isNumber("1"));//false
console.log(utils.isString('1'));//true
console.log(utils.isFunction(function(){}));  //true
```

### (5)判断类数组

类数组是对象类型，但是里面包含数组的值和数组对应的属性length，函数参数arguments就是一个类数组，我们下面来判断这个类数组。

```js
var isArrayLike = function(arrObj) {
    var length = arrObj == null ? void 0 : arrObj["length"];
    return  typeof length == 'number' && length >= 0 && ( length - 1 ) in arrObj;
};
//在上面代码中我们首先判断是否有length属性，并且length属性大于0，然后判断数组的最后一项下标是否存在
```

### (6)判断NaN

NaN不是一个数字且数据类型为Number，有下面两种判断方式

```
//1.根据NaN不与任何值相等的属性包含自身来判断
function isMyNaN(n) {
    if(n !== n) {
    	return true;
    } else {
    	return false;
    }
}
//2.判断是否是Number，然后通过isNaN原生函数判断
function isNaN(n) {
	if(typeof(n) === "number" && isNaN(n)) 
	{
		return true;
	} 
	else {
		return false;
	}
}
```

### (8)面试题

```
1.typeof typeof 10 输出什么?

 string 因为typeof返回的是字符串，所有typeof类型是string
 
2. 
var a = {};
console.log(a instanceof Array) //false 因为a的原型链上没有Array
console.log(a instanceof Object) //true
var b = []
console.log(b instanceof Array) //true 
console.log(b instanceof Object) //true 这个是因为a的原型链上最底层是Object 所以也是返回true

```

