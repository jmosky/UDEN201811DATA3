// python list, js array
// python set, js has nothing like that, underscore.js library
// python dict, js has an object
// dataframe, js has multidim array without any methods
// string for all
// integers for all
// floats for all
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

var myname = "jeff";
let myname  "mutatable variable" // you can mutate the value
const myname =  "constant name" // you cannot change it throug

// <!DOCTYPE html>
/* <html lang="en">

<head>
  <title></title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>

  <h1>Open the Chrome Inspector Console!</h1>
  <!-- src contains the path to the file -->
  <script type="text/javascript" src="app.js"></script>
</body>

</html> */

//////////////////////////////////////////////

// Create a variable called "name" that holds a string
var name = 'this is string';

// Create a variable called "country" that holds a string
var country = "Portugal";

// Create a variable called "age" that holds an integer
var age = 35;

// Create a variable called "hourlyWage" that holds an integer
var hourlyWage = 80;

// Calculate the "dailyWage" for the user
var dailyWage = hourlyWage * 8.5;

// Create a variable that holds a number as a string
var otherNum = "111111";

// Create a variable called 'weeklyWage' that converts a string into an integer
var weeklyWage = parseInt("239823982");

// Create a variable called "satisfied" that holds a boolean
var satisfied = true; // true false, in python: True, False

// Print out "Hello <name>!"
console.log(`Hello ${name}`);

// Print out what country the user entered
console.log(`Hello ${name} is from ${country}`);

// Print out the user's age
console.log(`Dude is making this much per day: ${dailyWage}`);

// Print out the daily wage that was calculated

// Print out the weekly wage that was calculated

// Using an IF statement to print out whether the users were satisfied

if(satisfied) {
    console.log("They are satisfied.")
} else {
    console.log("They are not satisfied.")
}

// Negation. Not true.
if(!satisfied) {
    console.log("They are satisfied.")
} else {
    console.log("They are not satisfied.")
}


///////////////////////////////////////////////////////////////////

var name = "Jenita";
var age = 33;
var pets = ["Darcy","Darcy Buttersworth","Skippy"];

// if i have more than 2 pets and older
// than 30 print: animal collector otherwise
// you are living the dream

if(age > 30 && pets.length > 2) {
  console.log("You're an animal collector!")
} else {
  console.log("You're living the dream!")
};

var today = new Date().getDay();

if(today == 1) {
  console.log('Chipotle')
} else {
  console.log('Eat More Chicken.')
}

let days_for_restaurant = {
0: "chickfila",
1: "chipotle",
2: "tacobell",
3: "costco hotdogs",
4: "home cooked",
5: "voodoo doughnuts"
}

var today = 4;

console.log(days_for_restaurant[today]);

console.log(Object.keys(days_for_restaurant));
console.log(Object.values(days_for_restaurant));
console.log(Object.entries(days_for_restaurant));

let data = [1,2,3,45,100,10000,32,57];
let times10 = data.map(x => x * 10);
console.log(times10);

let times10 = [];

// Create loop variable, set initial variable
// (arrays are indexed at 0) and go up to the length
// that I am iterating over. i++ means increment one
// each time. Into my empty array, push (append)
// the value to the array (adds to back of array which
// is typical).

for (i = 0; i < data.length; i++) {
  if(data[i] > 50 ){
    times10.push(data[i] * 10)
  }
  // else not required.
}
console.log(times10)


///////////////////////////////////////////////////////////////////////////////////////

// A JavaScript array is much like a Python list
// Here, start with a blank array
var lettersArray = ["a", "b", "c", "d"];

// Display the array in console
console.log("An array of letters:");
console.log(lettersArray);

// Use indexing to access an array item
console.log("Use indexing to access an array item:");
var firstLetter = lettersArray[0];
var secondLetter = lettersArray[1];
console.log(firstLetter);
console.log(secondLetter);


// Use push() to append an item to an array
lettersArray.push("e");
lettersArray.push("f");
console.log("Use push() to append an item to an array:");
console.log(lettersArray);
console.log("==========");

// Use slice() to return selected items of an array
console.log("Use slice() to return selected items of an array");
var slicedArray1 = lettersArray.slice(1);
// Return the first three items of an array
var slicedArray2 = lettersArray.slice(0, 3);
// Return the second and third items of an array
var slicedArray3 = lettersArray.slice(1, 3);

console.log(slicedArray1);
console.log(slicedArray2);
console.log(slicedArray3);

console.log("==========");

// Use join() to return items of an array into a single string

// Join things together.

var letters = ['j','e','f','f']
console.log(letters.join('')) // equiv in Python: "".join(letters)

letters.map(function(x) {
    mystring = mystring + x
})

letters.forEach(x => {
    mystring = mystring + x
})

// Splits on space.
console.log("jeffery".split(""))

var joinedArray = lettersArray.join(", ");
console.log("Use join() to return items of an array into a single string:");
console.log(joinedArray);

// anotherJoinedArray = lettersArray.join("***");
// console.log(anotherJoinedArray);
console.log("==========");

// A JavaScript string
var soundOfMusic = "The hills are alive with the sound of music";

console.log("This is a string:");
console.log(soundOfMusic);

// Use indexing to access a string character
console.log("Use indexing to access a string character:");
console.log(soundOfMusic[0]);
console.log(soundOfMusic[5]);

// Split a string into an array of substrings
// Here, split the string where spaces are found
var soundArray = soundOfMusic.split(" ");

console.log("Use split() to split a string into an array of substrings:");
console.log(soundArray);



/////////////////////////////////////////////////

const MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
  {name: "Everest", height: 8848, place: "Nepal"},
  {name: "Mount Fuji", height: 3776, place: "Japan"},
  {name: "Vaalserberg", height: 323, place: "Netherlands"},
  {name: "Denali", height: 6168, place: "United States"},
  {name: "Popocatepetl", height: 5465, place: "Mexico"},
  {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];

// Method is a function attached to an object.
let TallPeaks = MOUNTAINS.filter(mount_row => {
  return mount_row.height > 5000;
}
)

console.log(TallPeaks)


/////////////////////////////////////////////////////////////////////////////////////

<!doctype html>
<html lang="en">
  <head>
    <title>Title</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  </head>
  <body>
      
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  
    <input type="text" name="" id="MtnHeight" onchange="removeTable(mountain);">
    <div id="mountain">
    </div>

    <!--  <table class="table">
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td scope="row"></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td scope="row"></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table> -->

  </body>

  <script>

    let myInput = document.getElementById("MtnHeight")
    myInput.addEventListener("input", function(e) {
        // console.log(this.value) // this is the object that is bound to the eventListenere
        return renderMountainsTable(this.value)
    })


    function renderMountainsTable(minMtnHeight) {

        // document.querySelectorAll("table")[0].innerHTML = "";

        const MOUNTAINS = [
            {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
            {name: "Everest", height: 8848, place: "Nepal"},
            {name: "Mount Fuji", height: 3776, place: "Japan"},
            {name: "Vaalserberg", height: 323, place: "Netherlands"},
            {name: "Denali", height: 6168, place: "United States"},
            {name: "Popocatepetl", height: 5465, place: "Mexico"},
            {name: "Mont Blanc", height: 4808, place: "Italy/France"}
            ];

        let myTable = document.createElement('table');
        let mtnDiv = document.getElementById('mountain');
        mtnDiv.appendChild(myTable);
        
        let myCols = Object.keys(MOUNTAINS[0]);
        let tr  = document.createElement('tr');
        myTable.appendChild(tr);

        myCols.forEach( x => {
            let th = document.createElement('th')
            th.innerHTML = x;
            tr.appendChild(th)
        });

        let TallPeaks = MOUNTAINS.filter(mount_row => {
            return mount_row.height > minMtnHeight;
            }
        )

        // if unfiltered, MOUNTAINS.forEach...
        TallPeaks.forEach(mount_object => {
            let tr = document.createElement('tr');
            myTable.appendChild(tr)
            Object.values(mount_object).forEach(x => {
                let td = document.createElement('td')
                td.innerHTML = x;
                tr.appendChild(td)
                }
            )
        }
        )
    }

    function removeTable(id)
    {
        var tbl = document.getElementById(id);
        if(tbl) tbl.parentNode.removeChild(tbl);
    }
  </script>
</html>