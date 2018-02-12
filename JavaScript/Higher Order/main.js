const companies = [
    { name: "Company One", category: "Finance", start: 1980, end: 2003 },
    { name: "Company Two", category: "Medical", start: 1981, end: 2001 },
    { name: "Company Three", category: "Biotech", start: 1988, end: 1999 },
    { name: "Company Four", category: "Web", start: 1999, end: 2018 },
    { name: "Company Five", category: "Technology", start: 2001, end: 2018 },
    { name: "Company Six", category: "Retail", start: 1986, end: 1998 },
    { name: "Company Seven", category: "Auto", start: 1820, end: 2015 },
    { name: "Company Eight", category: "Technology", start: 1967, end: 2007 },
    { name: "Company Nine", category: "Energy", start: 2010, end: 2010 },
    { name: "Company Ten", category: "Retail", start: 1995, end: 2018 },
];

const ages = [10, 30, 56, 24, 90, 9, 67, 35, 89, 12, 34, 29, 26, 65, 12];


/////////////////////////////// ForEach ////////////////////////////////
// A simple for loop
// for (let i = 0; i < companies.length; i++) {
//     console.log(companies[i]);

// }

// Fo rach
// companies.forEach(function(company) {
//     console.log(company);
// })

companies.forEach(company => console.log(company.name));

//Filter : Consider a list of all ages that can drink usinga  for loop.
// let canDrink = [];

// for (let i = 0; i < ages.length; i++) {

//     if (ages[1] >= 21) {
//         canDrink.push(ages[i]);
//     }
// }

/////////////////////////////// filter ////////////////////////////////

// Now do the same using a filter
// const canDrink = ages.filter(function(age) {
//     if (age >= 21) {
//         return true;
//     }
// })

// Or a one liner:

const canDrink = ages.filter(age => age >= 21);
console.log(canDrink);


// Let's go ahead and filter retail companies:
const retailCompanies = companies.filter(company => company.category == 'Retail');
console.log(retailCompanies);

// All the companies that started in 80s

const eightiesCompanies = companies.filter(company => (company.start >= 1980 && company.end < 2010));
console.log(eightiesCompanies);

// All the companies that latested at least for 10 years
const lastedTenYears = companies.filter(company => (company.end - company.start >= 10));
console.log(lastedTenYears);


/////////////////////////////// map ////////////////////////////////

// Create an array of all company names

// const companyNames = companies.map(function(company) {
//     return company.name;
// })

//OR
//const companyNames = companies.map(company => company.name);

const companyNames = companies.map(company => `${company.name} [${company.start} - ${company.end}]`);

console.log(companyNames);

// Will take each age and square it

const agesSquare = ages.map(age => Math.sqrt(age));
const agesTimesTwo = ages.map(age => age * 2);

const ageMap = ages
    .map(age => Math.sqrt(age))
    .map(age => age * 2);

console.log(agesSquare);
console.log(agesTimesTwo);
console.log(ageMap);


/////////////////////////////// sort ////////////////////////////////
// Let's sort the companies by start year

// const sortedCompanies = companies.sort(function(c1, c2) {
//     if (c1.start > c2.start) {
//         return 1;
//     }
//     return -1;
// });

// OR in ES6
const sortedCompanies = companies.sort((c1, c2) => (c1.start > c2.start ? 1 : -1));

console.log(sortedCompanies);

/// Let's sort ages

const sortedAges = ages.sort((a, b) => b - a);

console.log(sortedAges);

/////////////////////////////// reduce ////////////////////////////////

//Let's add al ages together (First let's use a for loop)

let agesSum = 0;
for (let i = 0; i < ages.length; i++) {
    agesSum += ages[i];
}

/// Now use reduce function
// const ageRSum = ages.reduce(function(total, age) {
//     return total + age;
// }, 0);

// Or in ES6

const ageRSum = ages.reduce((total, age) => (total + age), 0);

console.log(agesSum);

// Let's get the total years for each company
const totalYears = companies.reduce((total, company) => (total + (company.end - company.start)), 0);

console.log(totalYears);


///////////////// Example of combining methods ///////////////
const combined = ages
    .map((age) => age * 2)
    .filter((age) => (age > 40))
    .sort((a, b) => a - b)
    .reduce((a, b) => (a + b), 0);

console.log(combined);