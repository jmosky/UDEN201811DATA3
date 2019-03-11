
// attach a listener to the input field
let myButton = document.getElementById("filter-btn")

// Commented out during debugging.
// myButton.addEventListener("click", function(e) {
//     x = document.getElementById('datetime').value
//     return renderUfoTable(x)
// })

// Identify the input field which is what will be 
// used to filter the data.
let myInput = document.getElementById("datetime");

// Add a listener to the button and set it to pull 
// in the value from the input field myInput.
// Take the date from myInput and render the table.
myButton.addEventListener("click", function(e) {
    console.log(myInput.value)
    return renderUfoTable(myInput.value)
})

// Commented out during debugging.
// d3.select("#filter-btn").on("click",function(){
//     myInput = d3.select("#datetime").event.target.value
//     console.log(myInput)
//     debugger
// })

function renderUfoTable(inputDate) {
    // from data.js
    var tableData = data;

    // identify the table in the HTML
    let myTableBody = document.getElementById('ufo-table-body');

    // filter the data for only the date provided in the input field
    let filteredTableData = tableData.filter(row => {
        return row.datetime = inputDate;
        }
    )
    
    // using the filtered dataset, render the table rows
    filteredTableData.forEach(items => {
        console.log(items)
        let tr = document.createElement('tr');
        myTableBody.appendChild(tr)
        Object.values(items).forEach(x => {
            let td = document.createElement('td')
            td.innerHTML = x;
            tr.appendChild(td)
            }
        )
    }
    )
}