// render all data upon loading window (used in function below to skip filtering data)
window.onload = function(e){ 
    renderUfoTable('ignoreFiltering')
}

// attach a listener to the input field
let myButton = document.getElementById("filter-btn")

// Add a listener to the button and set it to pull 
// in the value from the input field myInput.
// Take the date from myInput and render the table.
myButton.addEventListener("click", function(e) {
    // since the form is attempting to submit to the page itself, 
    // use e.preventDefault() immediately in the callback function
    e.preventDefault()

    // Pulled within the listener since we want a fresh value every time.
    let myInput = document.getElementById("datetime");

    // Added to check that it is working.
    console.log(myInput.value)

    return renderUfoTable(myInput.value)
})

function renderUfoTable(inputDate) {

    var tableData = data;

    // clear any data in the table
    document.getElementById("ufo-table-body").innerHTML = "";

    // identify the table in the HTML
    let myTableBody = document.getElementById('ufo-table-body');

    if (inputDate == 'ignoreFiltering') {
        filteredTableData = data;// th whole thing
    }   else {
        // filter bsaed on ur form
        filteredTableData = tableData.filter(x => x.datetime == inputDate)
    }
    // filter the data for only the date provided in the input field
    
    
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