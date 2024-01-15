var selectedRow = null

function onFormSubmit(e) {
    event.preventDefault();
    var formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    }
    else {
        updateRecord(formData);
    }
    resetForm();
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["itemName"] = document.getElementById("itemName").value;
    formData["singleCost"] = document.getElementById("singleCost").value;
    formData["qty"] = document.getElementById("qty").value;
    formData["discount"] = document.getElementById("discount").value;
    formData["totalCost"] = document.getElementById("totalCost").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.itemName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.singleCost;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.qty;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.discount;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.totalCost;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
    total();
}

//Edit the data
function onEdit(td) {

    selectedRow = td.parentElement.parentElement;
    document.getElementById("itemName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("singleCost").value = selectedRow.cells[1].innerHTML;
    document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
    document.getElementById("discount").value = selectedRow.cells[3]
    document.getElementById("totalCost").value = selectedRow.cells[4].innerHTML;
    //document.getElementById("fcost").value -= selectedRow.cells[4].innerHTML;
    total();

}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.itemName;
    selectedRow.cells[1].innerHTML = formData.singleCost;
    selectedRow.cells[2].innerHTML = formData.qty;
    selectedRow.cells[3].innerHTML = formData.discount;
    selectedRow.cells[4].innerHTML = formData.totalCost;

}

//Delete the data
function onDelete(td) {
    var tablevalue = document.getElementById('customer_detail');

    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
        var a = row.cells[4].innerHTML;
        var b = document.getElementById("fcost").value;
        document.getElementById("fcost").value = b - a;
    }
    total();
}

//Reset the data
function resetForm() {
    document.getElementById("itemName").value = '';
    document.getElementById("singleCost").value = '';
    document.getElementById("qty").value = '';
    document.getElementById("discount").value = '';
    document.getElementById("totalCost").value = '';
    selectedRow = null;
    total();
}

function Calc() {
    var singlecost = document.getElementById('singleCost').value;
    var quantity = document.getElementById('qty').value;
    var discount = document.getElementById('discount').value;
    var total = singlecost * quantity - discount;
    document.getElementById("totalCost").value = total;
    var fcost = document.getElementById("fcost").value;
    var c = fcost + total;
    //document.getElementById("fcost").value = c;
}

// function Discount() {
//     var c = document.getElementById('customer_detail');
//     var d = row.cells[3].innewrHTML;
//     var e = document.getElementById("discount").value;
//     document.getElementById("totalCost").value = e - d;
// }

// var discount = document.getElementById("discount").value;
// var c = document.getElementById("totalCost").value = total;
// document.getElementById("totalcost").value = c - discount;

// var discount = document.getElementById("discount").value;
// if (discount != '') {
// var dtotal = +total - +discount;
// document.getElementById("totalCost").value = dtotal;
// }

function total() {
    // var totalbill = document.getElementById("totalCost").value;
    // if (totalbill != '') {
    //     var bill = +document.getElementById("fcost").value + +totalbill;
    //     document.getElementById("fcost").value = bill;
    // }
    var table = document.getElementById("storeList"), sumVal = 0;

    for (var i = 1; i < table.rows.length; i++) {
        sumVal = sumVal + parseInt(table.rows[i].cells[4].innerHTML);
    }

    document.getElementById("fcost").value = sumVal;
}

// function printTable(table, filename) {
//     // Create a new FileWriter object for the text file.
//     var writer = new FileWriter(filename);

//     // Write the table to the text file.
//     for (var row of table) {
//         writer.write("<tr>");
//         for (var cell of row) {
//             writer.write("<td>");
//             writer.write(cell);
//             writer.write("</td>");
//         }
//         writer.write("</tr>");
//     }

//     // Close the FileWriter object.
//     writer.close();
// }

// // Create an HTML table.
// var table = [[1, ""], [2, ""], [3, ""], [4, ""]];

// // Print the table to a text file.
// printTable(table, "CBsellproductdata.txt");