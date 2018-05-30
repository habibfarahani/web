//CHALLENGE 1 Logest word
// returns longest word in a sentense

function longestWord(str) {
    // Using Match method
    const wordArray = str.toLowerCase().match(/[a-z0-9]+/g);

    // Sort by length
    const sorted = wordArray.sort((a, b) => {
            return b.length - a.length;
        })
        // If multiple words, put into the array

    const longestWordArray = sorted.filter((word) => {
        return word.length === sorted[0].length;
    });

    // Check if there are more than 1 array val

    if (longestWordArray.length === 1) {
        return longestWordArray[0];
    } else {
        return longestWordArray;
    }

}

// CHALLENNGE 2 : ARRAY Chunking
// split an array into chunks oif requested values.

function chunkArray(arr, len) {

    //  Init chunked array
    const chunkedArr = [];

    // Method 1

    // let i = 0;
    // while (i < arr.length) {
    //     // slice the array from i to i+len and push into chunked array
    //     chunkedArr.push(arr.slice(i, i + len));

    //     i += len;
    // }

    // Method 2 usinga  forEach hiugh order

    arr.forEach((val) => {
        const last = chunkedArr[chunkedArr.length - 1];

        if (!last || last.length === len) {
            chunkedArr.push([val]);
        } else {
            last.push(val);
        }
        //        console.log(chunkedArr);
    })
    return chunkedArr;
}

// CHALLENGE 2 reduce array
// [ 1, 2, 5, 8, 4 ], [ 67, 9, 0, 3, 5 ], [ 34, 5, 9 ] = 

function flattenArray(arrays) {
    // Method 1
    // return arrays.reduce((a, b) => {
    //     return a.concat(b);
    // })

    // Method 2 using apply method
    //    return [].concat.apply([], arrays);

    // Method 3 using spread operator ...
    return [].concat(...arrays);

}


// Helper
function formatStr(str) {
    return str
        .replace(/[^\w]/g, '')
        .toLowerCase()
        .split('')
        .sort()
        .join();
}

// CHALLENGE 5 : Anagram  (Checkes to see if str1 is anagram of str2)
function isAnagram(str1, str2) {

    //Lower case, get rid of special chars, sort it and compare
    return formatStr(str1) === formatStr(str2);

}


//CHALLENGE 6 Letter Changes
function letterChanges(str) {

    let newStr = str.replace(/[a-z]/gi, (char) => {
        if ((char === 'z') || (char === 'Z')) {
            return 'a'
        } else {
            return String.fromCharCode(char.charCodeAt() + 1);
        }
    });

    newStr = newStr.replace(/a|e|i|o|u/gi, (vowel) => vowel.toUpperCase());

    return newStr;
}

//const output = longestWord('This is a sentence to thereare00 test the solidarity');
//const output = chunkArray([1, 2, 5, 8, 4, 67, 9, 0, 3, 5, 34, 5, 9], 5);
// const output = flattenArray([
//     [1, 2, 5, 8, 4],
//     [67, 9, 0, 3, 5],
//     [34, 5, 9]
// ]);

// const output = flattenArray([
//     ['this', 'is', 'a', 'test', 'of'],
//     [67, 9, 0, 3, 'flatenning'],
//     [34, 5, 9]
// ]);
//const output = isAnagram('nebula', 'unable');
//const output = isAnagram('DorMitory', 'dirty room##@');
const output = letterChanges('Hello Arman Jan');

console.log(output)