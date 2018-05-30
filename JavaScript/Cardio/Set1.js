// CHALLENGE 1: Reverse String
function reverseString(str) {
    // Method 1:
    //    return str.split('').reverse().join('');

    // Method 2
    let revString = '';

    //    for (let i = (str.length - 1); i >= 0; i--) {
    //        revString = revString + str[i];
    //    }
    //  console.log(revString);
    //    return revString;

    //Method 3
    // revString = '';
    // for (let i = 0; i < str.length; i++) {
    //     revString = str[i] + revString;
    // }
    //  console.log(revString);
    // return revString;

    //Method 4 (using ES6)
    // revString = '';
    // for (char of str) {
    //     revString = char + revString;
    // }
    //  console.log(revString);
    // return revString;

    // Method 5  High order array function
    // revString = '';
    // str.split('').forEach((char) => {
    //     revString = char + revString;
    // });
    //  console.log(revString);
    // return revString;

    // Method 6 Reduced high order array
    revString = '';
    return str.split('').reduce((revString, char) => {
        return char + revString;
    });
}



/// CHALLENGE 2: VAlidate a Palindrom
// return true if it is a Palidrom

function isPalindrom(str) {

    const revString = str.split('').reverse().join('');

    return revString === str;

}


//CHALENGE 3: Reverse an integer

//521 === 125 

function reverseInt(int) {
    //    const revString = int.toString().split('').reverse().join('')
    // Math.sign is used to preseve the sign of the number
    return parseInt(int.toString().split('').reverse().join('')) * Math.sign(int);
}

// CHALLENGE 4: Capitalize letters
// i love javascripts === I Love Javascript

function capitalizeLetters(str) {

    //  Method 1 Brute Forcish
    // const strArr = str.toLowerCase().split(' ');
    // for (let i = 0; i < strArr.length; i++) {
    //     strArr[i] = strArr[i].substring(0, 1).toUpperCase() + strArr[i].substring(1);
    // }

    // return strArr.join(' ');

    // Method 2: Using map
    // return str
    //     .toLowerCase()
    //     .split(' ')
    //     .map((word) => {
    //         //            return word.substring(0, 1).toUpperCase() + word.substring(1);
    //         return word[0].toUpperCase() + word.substring(1);
    //     })
    //     .join(' ');

    // Method 3: regular expr
    return str.replace(/\b[a-z]/gi, (char) => {
        return char.toUpperCase();
    });


}


// CHALLENGE 5: Max charactors
// Return number if charactors that is most common in a string
// 'javascript'   == 'a'

function maxCharacter(str) {
    charMap = {};
    var maxNum = 0;
    var maxChar = '';

    str.split('').forEach((char) => {
        if (charMap[char]) {
            charMap[char]++;
        } else {
            charMap[char] = 1;
        }
    });

    for (let char in charMap) {
        if (maxNum < charMap[char]) {
            maxNum = charMap[char];
            maxChar = char;
        }
    }

    return maxChar;
    //    console.log(charMap);
}

// CHALLENGE 6: FIZZBUZZ
// for number 1-100 print fizz for mult 3 buzz for mult 5 and fizzbuzz for both.

function fizzbuzz() {
    // Method 1
    for (let i = 1; i <= 100; i++) {

        if ((i % 3 === 0) && (i % 5 === 0)) {
            console.log('fizzbuzz');
        } else if (i % 3 === 0) {
            console.log('fizz');
        } else if (i % 5 === 0) {
            console.log('buzz');
        } else {
            console.log(i);
        }
    }

    // Method 2

    for (let i = 1; i <= 100; i++) {
        var str = '';

        if (i % 3 === 0) {
            str += 'fizz';
        }

        if (i % 5 === 0) {
            str += 'buzz';
        }

        if (!str) {
            str = i.toString();
        }
        console.log(str);

    }

}


//const output = reverseString('hello');
//const output = isPalindrom('madam');
//const output = reverseInt(-12345);
//const output = capitalizeLetters('i love javascript');
//const output = maxCharacter('i lovea javasggggcript');
const output = fizzbuzz();

console.log(output);