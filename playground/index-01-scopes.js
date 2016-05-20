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
function example7(){
    for(var i = 0; i < 10; i++) {
        if(i > 5) {
            var test = i * 10;             
        }        
    }
    
    console.log("i: " + i, "test: " + test);    
}

example7();
