import { globals } from "./app.js";
import { sort } from "./sorting.js";
import { sliceUsers } from "./pagination.js";

const tbody = document.querySelector('tbody');

function createRow(row) {
    var tr = document.createElement('tr');

    var tdImg = document.createElement('td');
    var tdFirstName = document.createElement('td');
    var tdLastName = document.createElement('td');
    var tdBirthDate = document.createElement('td');

    var img = document.createElement('img');
    img.src = row.image;
    img.style.height = '50px';
    img.style.width = '50px'
    tdImg.appendChild(img);

    tdFirstName.innerText = row.firstName;
    tdLastName.innerText = row.lastName;
    tdBirthDate.innerText = row.birthDate;

    tr.appendChild(tdImg);
    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdBirthDate);

    return tr;
}


export function createTable(slicedUsers) {
    tbody.innerHTML = "";

    slicedUsers.forEach(row => {
        tbody.appendChild(createRow(row));
    });
}



export function sortSliceAndShow(users, order, sortField, pageSize, currentPage) {
    // sorting based on the whole table also overriding the current content so the pagination works correctly
    globals.mappedUsers = sort(users, order, sortField);

    // slicing the users based on the pagination
    let slicedUsers = sliceUsers(users, pageSize, currentPage);

    // showing the sliced table
    createTable(slicedUsers);
}
