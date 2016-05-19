// ---------------------
// Example 1
var people = ["Edwin", "Jon", "Joan", "James"];
var list = document.getElementById("people-list");

for(var i = 0; i < people.length; i++){
    var person = people[i];
    var element = document.createElement("li");
    element.innerText = person;    
    
    //scoping issue: all items show the last: "James"
    element.addEventListener("click", function() {
        alert("You clicked on " + person + ", at index " + i);        
    });
    
    list.appendChild(element);
}