/* 
js中对象的属性名可以是包括空字符串在内的任意字符串，属性值可以是除了undefined之外的任意值
*/

/* 
使用对象字面量创建对象是最常见的创建对象的方式，在这种方式中，如果属性名是合法的js标识符并且不属于保留字，
那么这个属性名就不需要用引号包裹，否则需要使用引号进行包裹，在获取属性值时，同样遵循这个规定
*/
const obj1 = {
    // name是合法的标识符，无需引号
    name: 'anqi',
    // self-name不是合法的标识符，因此需要使用引号包裹
    'self-name': 'anqi'
}

/* 
使用delete能删除对象的属性，同时delete操作符不会影响到原型上的属性，
但是请注意，使用delete可能会导致原型链上的属性透现出来
*/
const obj2 = {
    name: 'anqi'
}
delete obj2.name
// 如果原型链上有name属性，那么还是能获取到name属性的，此时会获取到原型链上的属性
console.log(obj2.name)