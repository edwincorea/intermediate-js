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
// var person = {
//     name: "<not set>",
//     sayHi: function() {
//         console.log("Hello, I am " + this.name);        
//     },
//     raiseWage: function() {
//         console.log("I can't do that");
//         return false;
//     }  
// };

//create another person but we do not want to repeat all the properties and functionality of the original eprson object...
// var manager = {};
//just for example purposes, do not manipulate special variable __proto__. It doesn't work on IE Edge.
// manager.__proto__ = person; //__proto__ is an object. It is used for property resolution. 
// manager.name = "Bossman";

// var ceo = {};
// ceo.__proto__ = manager;
// ceo.name = "CEO";
// ceo.raiseWage = function() {
//     console.log("Raise for everyone");
//     return true;    
// };

//manager.sayHi()
//1. manager.hasOwnProperty("sayHi") -> false
//2. manager.__proto__.hasOwnProperty("sayHi") -> true
//3. manager.__proto__.sayHi.call(manager)

// ---------------------
// Example 3: 
// var dummy = "";
// dummy.__proto__.sayHi = function() {
//     console.log(this + ", Hello!");    
// };

// ---------------------
// Example 4: 
// var person = {
//     sayHi: function(){
//         console.log("Say hi");
//     }
// }

// //a function is look up in the prototype chain until object.
// var manager = {};
// manager.__proto__ = person;
// manager.sayHi(); //Say hi

// manager.sayHi = undefined; //this is a value
// manager.sayHi(); //Uncaught TypeError: manager.sayHi is not a function

// ---------------------
// Example 5: Function prototypes. Constructor function.

//this cannot be used as a costructor function
// function add(left, right){
//     console.log(left + " + " + right + " = " + (left + right));
// }

//add(1, 2); 
 
//what makes a function really a constructor function? The "new" keyword. It's not how is defined, but how it is used.

//var test = new add(1, 2);

//constructors are capitalized
// function Person(name) {
//     this.name = name; //polluting global context
//     //polluting global context
//     //here we are attaching a new closure for every new Person call...
//     /*
//     this.sayHi = function() {
//         console.log("Hey, " + name);
//     }
//     */
// } 

//this creates only one instance of the function
// Person.prototype.sayHi = function() {
//     console.log("Hey, " + this.name);
// }

// var person = Person("Edwin");
// console.log(person); //undefined
// person.sayHi(); //Uncaught TypeError: Cannot read property 'sayHi' of undefined
 
// var person = new Person("Edwin"); //now we are using this function as a constructor function
// console.log(person); //Person {name: "Edwin"}
// person.sayHi(); //Hey, Edwin

//simulate the new keyword
// var personObject = {};
// personObject.__proto__ = Person.prototype;
// Person.call(personObject, "Jon Doe") //constructor call
// personObject.sayHi()

//Every object has an object prototype ("__proto__"), even functions. But functions also have a function prototype ("prototype").
//It changes behaviour of how the new keyword works.  
// person.hasOwnProperty("sayHi"); //false
// person.__proto__.hasOwnProperty("sayHi"); //true 


// //so... this is what happens on JS internals when we call "new"" keyword on a function
// function Person(name) {
//     // JS internals
//     //1. Javascript creates a new object  
//     var _this = {};
//     //2. Javascript sets the prototype of the new created object to the prototype property of the constructor function.
//     _this.___proto__ = Person.prototype;
    
//     // Our function
//     //3. It invokes the constructor code
//     _this.name = name;
    
//     // JS internals
//     //4. It returns the newly created object
//     return _this;
// }

// ---------------------
// Example 6
// function Person(name) {    
// }

// Person.prototype.firstName = "test";

// var person = new Person("test2"); 

// ---------------------
// Example 7
// function add(left, right){
//     return left + right;
// }

// add.prototype.myProp = "hey";

// var test = new add(1, 2); //test => add {} 
//when the function returns a value, it overrides the value that it's created with the "new" keyword

// function Person(name) {
//     this.name = name;
//     console.log(this); //Person {name: "Edwin"}
//     return {
//         firstName: name,
//         otherProp: "prop1"
//     };
// }

// var person = new Person("Edwin"); 
//person => Object {firstName: "Edwin", otherProp: "prop1"}
//person.__proto__ => Object {}
//when the function returns an object, the value returned by "new" keyword is the object that it's used...
 

//Object design and Object.create

// ---------------------
// Example 8 object design: a way of merge objects
// var person1 = {
//     name: "Edwin",
//     age: 37
// }

//Object.assign doesn't affect prototype. It only copies properties which belong to the object. It won't merge eyeColor. 
// person1.__proto__ = {
//     eyeColor: "green"    
// };

// var person2 = {
//     name: "Jon",
//     hairColor: "brown"
// }

// var person3 = Object.assign({}, person1, person2);
// console.log(person3); //merge of person1 and person2

// ---------------------
// Example 9 object create
// function Person(name) {
//     this.name = name;
// }

// Person.prototype.sayHi = function() {
//     console.log("I am " + this.name + " and I say hi" );
// };

// var person1 = new Person("Person1");
//sayHi is available on person1 object
// person1.sayHi();//I am Person1 and I say hi 


//Object.create is a way of setting __proto__ property on an object when we create it
//so.. if we want to create an object with a prototype
// var person2 = Object.create(Person.prototype);
// person2.sayHi();//I am undefined and I say hi
//in this case, the constructor was never called...
// Person.call(person2, "Jon Doe")
// person2.sayHi();//I am Jon Doe and I say hi

// ---------------------
// Example 10 Object inheritance
// var person = {
//     name: "<not set>",
//     sayHi: function() {
//         console.log("I am " + this.name);
//     }
// };

//Object.create implementation...
// function myCreate(proto){
//     var obj = {};
//     obj.__proto__ = proto;
//     return obj;
// }

//var manager = Object.create(person);
// var manager =myCreate(person);
// manager.name = "Bossman";
// manager.sayHi();//I am Bossman 
 
// ---------------------
// Example 11 Prototypal inheritance

// -------
// Person
// function Person(name, rank){
//     this.name = name;
//     this.rank = rank;
// }

// Person.prototype = {
//     sayName: function() {
//         console.log("Hello, I am " + this.name);
//     },
    
//     firePerson: function(person) {
//         return false;
//     },
    
//     giveRaises: function() {
//         return false;
//     } 
// }

// var jon = new Person("Jon", 1);
// var joan = new Person("Joan", 2);

// jon.sayName();
// console.log(jon.firePerson(joan)); //false: jon cannot fire joan due to rank

//so we want to create a manager person capable of firing on anybody underneath its rank
//create a new constructor function that inherits all the behaviour from the Person constructor function 
//BUT has different behaviour for the firePerson function

// -------
// Manager
// function Manager(name, rank){
//     Person.call(this, name, rank);
// }

//Manager.prototype = Person.prototype; //don't EVER do this. It changes Person prototype, too.
//we need to make a copy of the Person prototype
//Manager.prototype = {__proto__: Person.prototype};
//the proper way to do this copy...
// Manager.prototype = Object.create(Person.prototype);
 
// Manager.prototype.firePerson = function(person) {
//     return this.rank > person.rank;
// };

// var steve = new Manager("Steve", 10);
// steve.sayName();
// console.log(steve.firePerson(joan)); //true: steve can fire joan

// -------
// CEO
// function Ceo(name, rank){
//     Manager.call(this, name, rank); //invoke Manager constructor function
// }

// Ceo.prototype = Object.create(Manager.prototype);
// Ceo.prototype.giveRaises = function() {
//     return true;    
// };

// var mark = new Ceo("Mark", 9000);
// console.log(mark.giveRaises()); //true

//mark.__proto__ == Ceo.prototype //true
//mark.__proto__.__proto__ == Manager.prototype //true
//mark.__proto__.__proto__.__proto__ == Person.prototype //true
//mark.__proto__.__proto__.__proto__.hasOwnProperty("sayName") => true
//mark.__proto__.__proto__.__proto__.sayName.call(mark) => "Hello, I am Mark"

// ---------------------
// Example 12 ES2015 classes
class Person {
    //like ES5 constructor function
    constructor(name, rank){
        this.name = name;
        this.rank = rank;
    }
    
    //all of these functions are added to prototype
    sayName() {
        console.log("Hello I am " + this.name);        
    }
    
    firePerson(person) {
        return false;
    }
    
    giveRaises() {
        return false;
    }
}

var jon = new Person("Jon", 10);
var joan = new Person("Joan", 5);

class Manager extends Person {
    constructor(name, rank){
        //equivalent to ES5  Person.call(this, name, rank); 
        super(name, rank);
    }
    
    firePerson(person) {
        return this.rank > person.rank;
    }
    
}

var steve = new Manager("Steve", 90);

class Ceo extends Manager {
    constructor(name, rank){
        super(name, rank);
    }
    
    giveRaises() {
        return true;
    }
    
}

var mark = new Ceo("Mark", 9000);
