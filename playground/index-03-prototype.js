// ---------------------
// Example 1
//"Traditional" way of creating an object 
// var person = {
//     name: "Edwin",
//     sayHi: function() {
//         console.log("Hi, my name is " + this.name);
//     }
// } 

// person.sayHi();

//Abstract the whole idea of creating objects through a function name(params)
//First approach 
// function dragdropList(parentElement) {
//     var handle = document.createElement("li");
//     handle.innerText = "Handle";
//     parentElement.appendChild(handle);
    
//     return {               
//         beginDrag: function() {
//             handle.innerText = "Starting to drag...";
//         }
//     };    
// }

// var list1 = dragdropList(document.getElementById("list-1"));
// var list2 = dragdropList(document.getElementById("list-2"));
// var list3 = dragdropList(document.getElementById("list-3"));

// list1.beginDrag();

//We want a resusable component that has initialization logic 
//and that has a public API that we can manipulate the object that we create.

// ---------------------
// Example 2: object prototypes
//simple prototypal inheritance
var person = {
    name: "<not set>",
    sayHi: function() {
        console.log("Hello, I am " + this.name);        
    },
    raiseWage: function() {
        console.log("I can't do that");
        return false;
    }  
};

//create another person but we do not want to repeat all the properties and functionality of the original eprson object...
var manager = {};
//just for example purposes, do not manipulate special variable __proto__. It doesn't work on IE Edge.
manager.__proto__ = person; //__proto__ is an object. It is used for property resolution. 
manager.name = "Bossman";

//manager.sayHi()
//1. manager.hasOwnProperty("sayHi") -> false
//2. manager.__proto__.hasOwnProperty("sayHi") -> true
//3. manager.__proto__.sayHi.call(manager)



































