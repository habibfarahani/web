// Create a class
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Here is a method
    register() {
        console.log(this.username + ' is now registered');
    }

    // Here is a static method that can only be used with the explicit object rather than it instantiations.
    static countUsers() {
        console.log('there are 50 users');
    }
}

// Instantiate a classclass
let bob = new User('bob', 'bob@mail.com', '1234');

// Run it
bob.register();

User.countUsers();

// How to inhertit a class
class Member extends User {
    constructor(username, email, password, memberPackage) {
        super(username, email, password); // Used to call constructor above
        this.package = memberPackage;
    }

    getPackage() {
        console.log(this.username + ' is subscribed to ' + this.pacakage);
    }
}


let Mike = new Member('Mike', 'Mike@stan.com', '123456', 'standard');

Mike.getPackage();
Mike.register();


/////////////////////// Template literals or strings
let name = 'John'

function makeUppercase(word) {
    return word.toUpperCase();
}

let template = `<h1> ${makeUppercase('Hello')} ${name} </h1>
                <p> This is a simnple template in javascript by ${name}</p>'`

document.getElementById('template').innerHTML = template;

///////////////////////////////// STRING Methods available in ES6

let theString = 'Hello, my name is habib and I love Javascript';

// startsWith()
// endsWith()
//includes()

console.log(theString.startsWith('Hello'));
console.log(theString.endsWith('Javascript'));
console.log(theString.includes('loves'));


////////////////////////////// some number methods

//Hex
console.log(0xff);
//binary
console.log(0b010100001);
//Octal
console.log(0o543);

console.log(Number.isFinite(3));
console.log(Number.isNaN(NaN));
console.log(Number.isInteger(67.8));

////////////////////// Default parameters

function greet($greeting = 'Hello World default') {
    console.log($greeting)
}

greet();

/////////////// Spread operator
let args = [1, 2, 3];
let args2 = [4, 5, 8];

function test() {
    console.log(args + ',' + args2);
}

test.apply(null, args);
test(...args);
test(...args, ...args2);

///////////////////////////////////// set and maps


let myArray = [1, 4, 9, 5, 67, 32, 6, 89];
let mySet = new Set(myArray);

console.log(mySet);

mySet.add('100');
console.log(mySet);

mySet.add({ a: 1, b: 2 });
console.log(mySet);

mySet.delete(67);
console.log(mySet);

//mySet.clear();
console.log(mySet);
console.log(mySet.size);

mySet.forEach(num => console.log(num));

//////////////MAP

let myMap = new Map([
    ['a1', 'Hello'],
    ['b2', 'Goodbye']
]);

console.log(myMap);

myMap.set('c3', 'fooo');
console.log(myMap);

myMap.delete('a1');
console.log(myMap);

let carWeakSet = new WeakSet();

let car1 = {
    make: 'Honda',
    model: 'Civic'
}

let car2 = {
    make: 'Toyota',
    model: 'Camry'
}


carWeakSet.add(car1);
carWeakSet.add(car2);

console.log(carWeakSet)

carWeakSet.delete(car1);
console.log(carWeakSet)


//// WEAKMAP

let carWeakMap = new WeakMap();

let keym1 = {
    id: 1
}

let carm1 = {
    make: 'Honda',
    model: 'Civic'
}

carWeakMap.set(keym1, carm1);
console.log(carWeakMap)


////////////////////////////// Arrow fy0ubnctions


function Prefixer(prefix) {
    this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function(arr) {
    // let that = this;
    // return arr.map(function(x) {
    //     console.log(that.prefix + x);
    // })

    return arr.map(x => console.log(this.prefix + x + ' ' + x.toUpperCase()));
}

let pre = new Prefixer('Hello ');

pre.prefixArray(['habaib', 'Nahid', 'Arman']);
///////////////////////// Example of the sytax /////////


// let add = function(a, b) {
//     let sum = a + b;
//     console.log(sum);

//     return sum;
// }

//OR
let add = (a, b) => {
    let sum = a + b;
    console.log(sum);
    return sum;
}

add(2, 2)



////////////////// Promises for deferred or async computation

// Immediatey resolved promise

var myPromise = Promise.resolve('foo')
myPromise.then((res) => console.log(res));


var myPromise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(4), 2000);
});

myPromise.then((res) => {
    res += 3;
    console.log(res);
})


// Fetch data from api
function getData(method, url) {
    // create a new promise
    return new Promise(function(resolve, reject) {
        // Create an request object
        var xhr = new XMLHttpRequest();

        // OPen it and pass the method and URL
        xhr.open(method, url);
        // Check the status being retyrned
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                // all good resolve it
                resolve(xhr.response);
            } else {
                // It is nt good. reject it
                reject({
                    status: this.status,
                    satusText: xhr.statusText
                });
            }
        };

        // If an error is reported
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };


        xhr.send();
    })
}

getData('GET', 'http://jsonplaceholder.typicode.com/todos')
    .then(data => {
        let todos = JSON.parse(data);
        let output = '';

        for (let todo of todos) {
            output += `
                <li>
                    <h3> ${todo.title} ${todo.userId}</h3>
                    <p>Completed: ${todo.completed}</p>

                </li>
                `
        }

        document.getElementById('template').innerHTML = output
    })
    .catch((err) => console.log(err));

///////////////////////// Generators : functions that can pause or resume
function* g1() {
    console.log('Hello');
    yield 'Yield 1 Ran ..';
    console.log('World');
    yield 'Yield 2 Ran ...';
    return 'Returned..';
}

var g = g1();

// console.log(g.next().value);
// console.log(g.next().value);
// console.log(g.next());


for (let val of g) {
    console.log(val);
}