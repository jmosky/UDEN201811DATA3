
let myInput = document.getElementById("datetime")
    myInput.addEventListener("input", function(e) {
        return renderUfoTable(this.value)
    })

function renderUfoTable(inputDate) {

    // from data.js
    var tableData = data;

    let myTable = document.getElementById('ufo-table');

    let dateFiltered = tableData.filter(mount_row => {
        return mount_row.datetime = inputDate;
        }
    )

    tableData.forEach(mount_object => {
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