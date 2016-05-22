// ---------------------
// Example 1
// var people = ["Edwin", "Jon", "Joan", "James"];
// var list = document.getElementById("people-list");

// for(var i = 0; i < people.length; i++){
//     var person = people[i];
//     var element = document.createElement("li");
//     element.innerText = person;    
    
//     //scoping issue: all items show the last: "James"
//     element.addEventListener("click", function() {
//         alert("You clicked on " + person + ", at index " + i);        
//     });
    
//     list.appendChild(element);
// }

// ---------------------
// Example 2
// var a = 42;
// var b = 57;

// function example2() {
//     var a = b = 10; //a is local scoped. That's why the global value remains
//     console.log("local scope... a = " + a, "b = " + b); 
// }

// console.log("a = " + a, "b = " + b);
// console.log("-----");
// example2();
// console.log("a = " + a, "b = " + b);

// a = 42 b = 57
// local scope... a = 10 b = 10
// -----
// a = 42 b = 10

//Rewrite function to make it work... global scopes are bad!
// function example2_clear() {
//     var a = 10;
//     b = 10;
// }

// ---------------------
// Example 3
// function example3_otherfunction() {
//     for(i=0; i < 5; i++){
//         console.log(i + " * 30 = " + (i * 30));
//     }
// }

// function example3() {
//     i = 1;
//     j = 1;
//     console.log("1 + 1 = " + (i + j));
//     example3_otherfunction();
//     console.log("1 + 1 = " + (i + j));
// }

// example3();

// console.log(i); // 5
// console.log(window.i); // 5
// console.log(window);

//By no declaring var, the variables are attached to global scope (window). Use var keyword!!!
// 1 + 1 = 2
// 0 * 30 = 0
// 1 * 30 = 30
// 2 * 30 = 60
// 3 * 30 = 90
// 4 * 30 = 120
// 1 + 1 = 6

// ---------------------
// Example 4: creating scopes
//global scope variables attached to window.
// var a = 42;
// var b = 57;

// function example4() {
//     //local scope variables.
//     // var a = 10, b = 10; //it's equivalent
//     var a = 10;
//     var b = 10;
    
//     console.log("a = " + a, "b = " + b);
// }

// example4();
// console.log("a = " + a, "b = " + b);

// a = 10 b = 10
// a = 42 b = 57

// ---------------------
// Example 5: nested scopes...
// var a = 10;

// function example5(){
//     var a = 20;
    
//     function inner() {
//         var a = 30;
//         console.log("Inner: " + a);
//     }
    
//     inner();
//     console.log("Outer: " + a);
// }

// example5();
// console.log("Global: " + a);

// Inner: 30
// Outer: 20
// Global: 10

// ---------------------
// Example 6: parameters are local variables
// var a = 30;

// function example6(a){
//     a = 20; //"a" here is the param, not the global scope variable. It has 30 but then it's changed to 20 locally.
//     console.log("example6: " + a);
// }

// example6(a);
// console.log("Global: " + a);

// example6: 20
// Global: 30

// ---------------------
// Example 7: block statements { } DO NOT create scope. Variable names gets attached to the closest function, not block. They are all accesible at function level.
// function example7(){
//     for(var i = 0; i < 10; i++) {
//         if(i > 5) {
//             var test = i * 10;             
//         }        
//     }
    
//     console.log("i: " + i, "test: " + test);    
// }

// example7();

// ---------------------
// Example 8: three ways of making a function in JS
//1. function decoration
// function example8a() {
//     console.log("8a");
// }

//2. function expression 
// var example8b = function() {
//     console.log("8b");
// };

//3. named function expression.
// The function name is only accesible in the same function body. Only useful for recursion.
// var example8c = function example8c() {
//     console.log("8c");    
// };

// example8a();
// example8b();
// example8c();

// ---------------------
// Example 9: private functions (not working)
// function myPrivateFunction() {
//     console.log("You shouldn't be able to call me outside of this function");
// }

// ---------------------
// Example 10: private functions (working)
// function example10() {
//      function myPrivateFunction() {
//          console.log("I am private");
//      }    
     
//      myPrivateFunction();
// }

//use function decoration for making public functions that can access private functions...
//problem is: everytime we call example10(), a new block of memory is allocated and we lose our previous state (i = 17) 
// function example10() {
//     var i = 10;
//      function myPrivateFunction() {
//          console.log("I am private");
//      }    
     
//      window.public1 = function() {
//          console.log("public 1, and i is " + i++);  
//          myPrivateFunction();      
//      };
     
//      window.public2 = function() {
//          console.log("public 2");         
//      };
     
// }

// example10();

// ---------------------
// Example 11: private functions with function expression...
// trick the compiler that it is not a decoration function, but a function expression. 
// We do it wrapping the function expression between parenthesis
// expression context (the second part of an IIFE expression var x = function(){...})
// (function() {
    //a context    
// }); 

// how do we get the first part of the IIFE expression (self invoking)? with parentesis ()
//This is a true IIFE
// (function() {
//     //a self executing context. We just created an scope...
//     console.log("This is in an IIFE");
//     function privateFunction() {
//         console.log("I am private");
//     }        
    
//     //we can seletively expose functions, make them public.
//     window.public1 = function() {
//         privateFunction();
//         console.log("In public1");
//     }
// })(); 

//we can pass arguments to the scope
// (function(arg1) {
//     console.log(arg1);
//     //a self executing context. We just created an scope...
//     console.log("This is in an IIFE");
//     function privateFunction() {
//         console.log("I am private");
//     }        
    
//     //we can seletively expose functions, make them public.
//     window.public1 = function() {
//         privateFunction();
//         console.log("In public1");
//     }
// })("this is an argument"); 

//real life examples of arguments to scope...
//1.jquery
// (function($) {
// })(jQuery); 

//1.window
// (function(global) {
//     global.public1 = function() {
//         privateFunction();
//         console.log("In public1");
//     }
// })(window); 

// ---------------------
// Example 12: Hoisting
// function example12a() {
//     console.log(a);
//     console.log("End of function");
// }

// example12a();

//undeclared variable: no memory allocated for "a"
//Uncaught ReferenceError: a is not defined

// function example12b() {
//     console.log(a);
//     console.log("End of function");
//     var a;    
// }

// example12b();

//undefined variable: no value assigned for variable
//undefined
//End of function

//hoisting: every single var keyword means the variable is attached to the function before execution of the body
//Even if the variable is declared after its usage BUT the asignement is executed sequentally
//That's why it doesn't throw Uncaught ReferenceError on console.log(a) but returns undefined.
//The assignement is executed after console.log(a)
//variables get hoisted up to the top of the function body for every single "var"" keyword found by the compiler. 
// function example12c() {
//      console.log(a);
//      console.log("End of function");
//      var a = 10; //this is equal to var a; a = 10; 
//      console.log(a);
// }

// example12c();

//undefined
//End of function

// ---------------------
// Example 13: Function declarations get hoisted, too. Functions "inner"" and "example13a"" are declared after call. No error.
// example13a();

// function example13a() {
//     console.log("I am function");
//     inner();
//     return;
    
//     console.log("'Dead' code");
    
//     function inner() {
//         console.log("I am inner");
//     }
// }

//I am function
//I am inner

// function example13b() {
//     console.log("I am function");
//     inner(); //undefined
    
    //this is equal to var inner; inner = function() {};
    //inner is hoisted up, but is not a function. undefined is not a function.
    // var inner = function() {
    //     console.log("I am inner");
    // };
    
    //inner(); //it works!
// }

// example13b();

//I am function
//Uncaught TypeError: inner is not a function

// ---------------------
// Example 14: Static/lexical vs dynamic scope. Javascript is statically scoped and dynamically typed.
// scope is where a variable lives.
// function example14b() {
//     console.log(a); //"a" is bound at compile time to its proper scope. That is lexical scoping.
// } 

// function example14a() {
//     var a = 20;
//     example14b();
// }

// var a = 30;
// example14a(); //30
// example14b(); //30
  
//But now...

// function example14a() {
//     var a = 20;
//     example14b();
    
//     function example14b() {
//         console.log(a); //"a" is bound at compile time to its proper scope, which is the body of example14a function.
//     }
// }

// example14a(); //20

// ---------------------
// Example 15: NEVER do this!!! A way around JS being statically scoped... 
//Highly discouraged due to performance impacts for compiler.
// function example15(obj) {
//     var a = 100;
    
//     with(obj) { //deprecated. with opens a dynamic scope. Whatever obj is passed in, becomes the new scope and it overrides anything outside of it. 
//         console.log(a)
//     }
    
//     console.log(a)
// }

// example15({a: 42});
// example15({a: 26});
// example15({});

// ---------------------
// Example 16: Closure is a function which refers to variables in their parent scopes.
// functions as parameters, high order functions.
// function example16(callback) {
//     callback(1);
//     callback(2);
//     callback(3);
// }

// example16(function(arg) {
//     console.log(arg);
// });
 
// ---------------------
// Example 17: high order function  
// function filterArray(array, predicate) {
//     var result = [];
//     for (var i = 0; i < array.length; i++) {
//         var item = array[i];

//         if (!predicate(item))
//             continue;            

//         result.push(item);                
//     }    
    
//     return result;
// }

// var array = [1, 2, 3, 4, 5, 6, 7];
// var result = filterArray(array, function(item) {
//     return item < 4;
// });

// console.log(result);

//return a function: function factory
// function lessThanFilter(lessThan) {
//     return function(item) {
//         return item < lessThan;        
//     };
// }

// var lessThanFive = lessThanFilter(5);
// console.log(lessThanFive(3), lessThanFive(10));
// console.log(filterArray(array, lessThanFilter(2)));

// ---------------------
// Example 18: 
// function validatePassword(password) {
//     var calledCount = 0;
//     return function(attempt) {
//         calledCount++;
//         console.log("Validator of " + password + " called: " + calledCount + " times");
//         return attempt === password;        
//     };
// }

// var validateA = validatePassword("passworda"); //new instance of validatePassword scope
// var validateB = validatePassword("passwordb"); //new instance of validatePassword scope

// ---------------------
// Example 19:
// function example19() {
//     var a = 20;
//     return inner1();
    
//     function inner1() {
//         var b = 30;
//         return inner2();
        
//         function inner2() {
//             var c = 40;
//             return function() {
//                 console.log(a, b, c);
//             }
//         }
//     }
// }
  
// var closure = example19();
// closure();

// Solutions to example 1 problem
var people = ["Edwin", "Jon", "Joan", "James"];
var list = document.getElementById("people-list");

// ---------------------
// Example 20: Solution 1
// for(var i = 0; i < people.length; i++){
//     var person = people[i];
//     var element = document.createElement("li");
//     prepareElementForPerson(person, element); //everytime we call this function, we create a new scope.
//     list.appendChild(element);
// }

// function prepareElementForPerson(p, e) {
//     e.innerText = p;
//     e.addEventListener("click", function() {
//         alert("You clicked on " + p);        
//     });    
// }

// ---------------------
// Example 21: Solution 2. Use an IIFE
// for(var i = 0; i < people.length; i++){
//     var person = people[i];
//     var element = document.createElement("li");
    //an IIFE doesn't create a new scope per se, we need to copy variables...
    // (function(){
    //     element.innerText = person;
    //     element.addEventListener("click", function() {
    //         alert("You clicked on " + person);
    //     });                    
    // })();    

    // (function(){
    //     var p = person;
        
    //     element.innerText = p;
    //     element.addEventListener("click", function() {
    //         alert("You clicked on " + p);
    //     });                    
    // })();    

    //IIFE with parameters
//     (function(person){
//         var person = person;
        
//         element.innerText = person;
//         element.addEventListener("click", function() {
//             alert("You clicked on " + person);
//         });                    
//     })(person);    
        
//     list.appendChild(element);
// }

// ---------------------
// Example 22: Solution 3. High order functions.
function forEach(array, callback){
    for(var i = 0; i < array.length; i++) {
        callback(array[i]);         
    }
} 

forEach(people, function(person){
    var element = document.createElement("li");
    element.innerText = person;
    element.addEventListener("click", function() {
        alert("You clicked on " + person);
    });
    
    list.appendChild(element); 
});









