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
// var person = {};
// person.firstName = "Edwin";
// person.printName = function() {
//     console.log(this.firstName); //undefined property because "this" is the button element    
//     console.log(this);
// };

// button.addEventListener("click", person.printName); //"this" is part of the execution context. 

// // var doThing = person.printName;
// // doThing(); //undefined property because "this" is the global Window object
// person.printName();//Edwin, because "this" is the person object

// //**this keyword is determined on who invokes the function and how the function is invoked 
// var person2 = {
//     firstName: "Jon",
//     lastName: "Doe"
// }

// person2.doAnotherThing = person.printName;
// person2.doAnotherThing(); //Jon "this" is the person2 object

// ---------------------
// Example 4
// var array = [1, 2, 3, 4, 5, 6];
// array.forEach(function(item) {
//     console.log(item);
//     //console.log(this); //global context Window
// }); 

//array.forEach(console.log); //Uncaught TypeError: Illegal invocation
// var log = console.log; //we lose the console object context, now the context is the Window object
// log("hello, world"); //Uncaught TypeError: Illegal invocation

// var createElement = document.createElement; //expected to be run in the document object, not the Window object...
// createElement("li"); //Uncaught TypeError: Illegal invocation

// ---------------------
// Example 5
// var personDatabase = {
//     title: "Employees",
//     people: ["Edwin", "Jon", "Joan", "Harry"],
//     print: function(){
//         this.people.forEach(function(person) { //"this" means personDatabase object, here
//             console.log(this.title + ": " + person); //"this" means Window, here...
//         });
//     }
// };

//personDatabase.print();
// undefined: Edwin
// undefined: Jon
// undefined: Joan
// undefined: Harry

// solution, use an alias for this
// var personDatabase = {
//     title: "Employees",
//     people: ["Edwin", "Jon", "Joan", "Harry"],
//     print: function(){
//         var that = this;
//         this.people.forEach(function(person) { //"this" means personDatabase object, here
//             console.log(that.title + ": " + person); //"this" means Window, here...
//         });
//     }
// };

// personDatabase.print();
// Employees: Edwin
// Employees: Jon
// Employees: Joan
// Employees: Harry

// var array = [1, 2, 3, 4, 5, 6];
// array.forEach(console.log, console);

// call / apply / bind: they change the behaviour of "this" context

// ---------------------
// Example 6: call 

// var person = {
//     firstName: "Edwin",
//     printName: function() {
//         console.log(this.firstName);
//     }    
// };

// var test = person.printName;

// var person2 = {
//     firstName: "Joan"    
// };

//call test function on person2 object: call or apply
// test.call(person2); //Joan
// person.printName.call(person2); //Joan

// ---------------------
// Example 7: apply
// var max = Math.max; //max doesn't need "this" context
// console.log(max(23, 432, 256, 23426, 324, 2343)); //23426
 
// console.log(max.call(null, 23, 432, 256, 23426, 324, 2343)); //23426
// console.log(max.apply(null, [23, 432, 256, 23426, 324, 2343])); //23426 apply only accepts two parameters: "this" context and array of arguments

// var person = {
//     name: "Edwin",
//     printName: function(prefix, department) {
//         console.log(prefix + "," + department + ":" + this.name);        
//     }    
// };

// person.printName("Mr.", "IT");

// var person2 = {
//     name: "Lucy"    
// };

// var localPrintName = person.printName; //extracting method from person object
// localPrintName.call(person2, "Mrs.", "Accounting");
// localPrintName.apply(person2, ["Mrs.", "Accounting"]);

// var anySizeArray = [43, 432, 32, 532, 326332632, 434];
// console.log(Math.max.apply(null, anySizeArray));

// ---------------------
// Example 8: bind
// var log = console.log;
// log("Hei!!!"); //Uncaught TypeError: Illegal invocation

// var log = console.log.bind(console); //bind a context
// log("Hei!!!"); //Hei!!!

// var person = {
//     firstName: "Edwin",
//     printName: function() {
//         console.log(this.firstName);
//     }
// };

//button.addEventListener("click", person.printName); //undefined
// button.addEventListener("click", person.printName.bind(person)); //Edwin

// function callTheCallback(callback) {
//     callback();
// }

//callTheCallback(person.printName); //undefined
// callTheCallback(person.printName.bind(person)); //Edwin

// ---------------------
// Example 9: 
// function myFunction(one, two) {
//     console.log(arguments);//list of arguments passed to the function
// }

//myFunction("one", "two", 1, true);

// function myBind(func, thisContext) {
//     return function() {
//         func.apply(thisContext, arguments); //console.log.apply(console, arguments);
//         //call: console.log(arguments);
//         //apply: console.log(arguments[0], arguments[1], arguments[2],...);        
//     };    
// }

// var log = myBind(console.log, console);
// log("Hello, World!");

// ---------------------
// Example 10: 
// function add(left, right) {
//     return left + right;
// }

// var array = [1, 2, 3, 4, 5, 6, 7];
// console.log(array.map(function(item) {
//     return item + 5;
// }));

// console.log(array.map(add.bind(null, 5)));

// var add5 = add.bind(undefined, 5); //partial function application: a new functiuon with the first parameter already applied
// console.log(add5(10));//15 

// function concat(left, middle, right) {
//     console.log(left + middle + right);
// }

// var concatHelloWorld = concat.bind(undefined, "Hello", "World");
// concatHelloWorld("test"); //HelloWorldtest

// ---------------------
// Example 11: ES2015 arrow function
// var person = {
//     firstName: "Edwin",
//     printNameDelayed: function() {
//         window.setTimeout(function(){
//             console.log(this.firstName);
//         }, 1000);
//     } 
// }
 
//person.printNameDelayed(); //undefined

//sol1
// var person = {
//     firstName: "Edwin",
//     printNameDelayed: function() {
//         window.setTimeout((function(){
//             console.log(this.firstName);
//         }).bind(this), 1000);
//     } 
// }

// person.printNameDelayed(); //Edwin

//sol2
// var person = {
//     firstName: "Edwin",
//     printNameDelayed: function() {
//         var that = this;
//         window.setTimeout(function(){
//             console.log(that.firstName);
//         }, 1000);
//     } 
// }

// person.printNameDelayed(); //Edwin

//sol3: ES2015 fat arrow function: 
// "=>"" is equivalent to binding the setTimeout callback function to lexically scoped "this" in the function above it. 
var person = {
    firstName: "Edwin",
    printNameDelayed: function() {
        window.setTimeout(() => {
            console.log(this.firstName);
            
            window.setTimeout(() => console.log(this.firstName), 500);
        }, 1000);
    } 
}

person.printNameDelayed(); //Edwin

//fat arrow syntax
var myFunction = () => console.log("Hello, World");
myFunction();

var myFunction2 = () => {
    console.log("Hi");
    console.log("Bye");    
};

var myFunction3 = arg => console.log("myFunction3: " + arg);
myFunction3(10);

var add = (left, right) => console.log(left + " + " + right + " = " + (left + right));
add(10, 10);

var addReturnResult = (left, right) => left + right;
console.log(addReturnResult(5, 5));

var multilineReturnResult = (left, right) => {
    return left + right; 
};
console.log(multilineReturnResult(5, 5));

var array = [1, 2, 3, 4, 5, 6];
console.log(array.map(function(item) {
    return item * 2;
}));

//becomes...
console.log(array.map(item => item * 2));


