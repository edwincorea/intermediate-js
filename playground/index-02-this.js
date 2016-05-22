// ---------------------
// Example 1: "this" on a function
// function example1() {
//     console.log(this); //Window object
// }

// console.log(this); //Window object
// example1();

//"this" attached to an object
// var person = {
//     name: "Edwin",
//     printThis: function() {
//         console.log(this); //Object {name: "Edwin"} "this" points to Person object
//         console.log(this.name);
//     }
// };

// person.printThis();

var button = document.getElementById("button-1");

// ---------------------
// Example 2 "this" on a callback function
// button.addEventListener("click", function() {
//     console.log(this); //<button id="button-1">Press Me</button> "this" point to DOM element
//     this.innerText = "I was clicked!";  
// });

// ---------------------
// Example 3 
var person = {};
person.firstName = "Edwin";
person.printName = function() {
    console.log(this.firstName); //undefined property because "this" is the button element    
    console.log(this);
};

button.addEventListener("click", person.printName); //"this" is part of the execution context. 

// var doThing = person.printName;
// doThing(); //undefined property because "this" is the global Window object
person.printName();//Edwin, because "this" is the person object

//**this keyword is determined on who invokes the function and how the function is invoked 
var person2 = {
    firstName: "Jon",
    lastName: "Doe"
}

person2.doAnotherThing = person.printName;
person2.doAnotherThing(); //Jon "this" is the person2 object