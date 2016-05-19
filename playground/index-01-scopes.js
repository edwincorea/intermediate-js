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
function example3_otherfunction() {
    for(i=0; i < 5; i++){
        console.log(i + " * 30 = " + (i * 30));
    }
}

function example3() {
    i = 1;
    j = 1;
    console.log("1 + 1 = " + (i + j));
    example3_otherfunction();
    console.log("1 + 1 = " + (i + j));
}

example3();

console.log(i); // 5
console.log(window.i); // 5
console.log(window);

//By no declaring var, the variables are attached to global scope (window). Use var keyword!!!
// 1 + 1 = 2
// 0 * 30 = 0
// 1 * 30 = 30
// 2 * 30 = 60
// 3 * 30 = 90
// 4 * 30 = 120
// 1 + 1 = 6