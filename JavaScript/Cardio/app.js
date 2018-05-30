let x = function() {

    ///[1]////////////////////////////////////////////////////////////////
    if (true) {
        console.log(v);
        //        console.log(l);
        var v = 2;
        let l = 1;
    }

    console.log(v);
    //    console.log(l);


    ///[2]////////////////////////////////////////////////////////////////
    // === vs ==
    // == compares values (Because it will converts both sides to string before compare)
    // === compares values and type

    if ('1' == 1) {
        console.log("double equal works!");
    }

    if ('1' === "1") {
        console.log("Tripple equal works!");
    } else {
        console.log("Tripple equal fails!");
    }

    ///[3]////////////////////////////////////////////////////////////////
    // Where are difference between const and let
    // const the value cannot be reassigned.
    let l = 1;
    l = 4;
    console.log(l);

    const c = 1;
    //    c = 5;        // Cannot assign to a const
    console.log(c);


    const g = [1, 2];
    g[2] = 6;
    //    g = [6, 8]; Cannot do this unless g is no longer a constant
    console.log(g);

}

x();

///[4]////////////////////////////////////////////////////////////////
const profile = {

    firstName: '',
    lastName: '',
    // setName: function(name) {
    //     let nameArray = name.split(' ');
    //     this.firstName = nameArray[0];
    //     this.lastName = nameArray[1];
    // }

    // setName: function(name) {
    //     let splitName = function(n) {
    //         let nameArray = name.split(' ');
    //         this.firstName = nameArray[0];
    //         this.lastName = nameArray[1];
    //     }

    //     splitName(name);
    // }

    setName: (name) => {
        let nameArray = name.split(' ');
        this.firstName = nameArray[0];
        this.lastName = nameArray[1];
    },

    printName: () => {
        console.log(this.firstName + " - " + this.lastName);
    }

}

profile.setName('Habib Farahani');
console.log(profile.firstName);
profile.printName();


console.log({} + {});

function a() {
    return 'hello';
}

const sentense = a `hi`; // Tagged template hi is considered to be the argument into function a

console.log(sentense);

//////////////////////////////////////////////////////////////////////////////////
function y() {
    console.log(this.length);
}

var x1 = {
    length: 5,
    method: function(y) {
        arguments[0]();
    }
};

x1.method(y, 1, 5, 8);

//////////////////////////////////////////////////////////////////////////////////


const x2 = 'constructor';
console.log(x2[x2](06));
// This is like x2.constructor(01)  result is 1

//////////////////////////////////////////////////////////////////////////////////

console.log(('hi').__proto__);
console.log(('hi').__proto__.__proto__);
console.log(('hi').__proto__.__proto__.__proto__);

//////////////////////////////////////////////////////////////////////////////////
// A function that returns the number of arguments it is passed to

let x4 = function() {
    return [].slice.call(arguments).length;
}

console.log(x4(1, 3, 4, 'MuName', 87.90));

///////////////////////////////////////////////////////////////////////////////////

var A = {
    x1: function() {
        console.log('x');
        return A;
    },

    y1: function() {
        console.log('y');
        return A;
    },
    z1: function() {
        console.log('z');
        return A;
    }
}

A.x1().y1().z1();

///////////////////////////////////////////////
console.log(2 + 2);

console.log(2 + '2');

console.log('2' - 2);

/////////////////////////////////////////////////////
// Remove duplicate from the array
// No for loop, no map, no reduce only a single line

let nums = [1, 2, 2, 3];

// Let's use Set and spread operator(...)
// set does not allow duplicates

console.log([...new Set(nums)]);

// What are immediatey invoked functions