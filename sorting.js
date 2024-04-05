import { globals } from "./app.js";
import { sortSliceAndShow } from "./display.js";

export function sort(users, order, sortField) {
    users = users.sort(function (row1, row2) {

        if (order === 'asc') {
            return row1[sortField].localeCompare(row2[sortField]);
        }

        if (order === 'desc') {
            return - row1[sortField].localeCompare(row2[sortField]);
        }

    })

    return users;
}

export function toggleOrdre() {

    if (globals.order === 'asc') {
        globals.order = 'desc';
    }
    else {
        globals.order = 'asc';
    }
    return globals.order;
}

// event listeners for sorting

const dataHeaders = document.querySelectorAll('.sort');

dataHeaders.forEach(field => {
    field.addEventListener('click', () => {
        let sortField = field.getAttribute('data-header');
        toggleOrdre();
        sortSliceAndShow(globals.mappedUsers, globals.order, sortField, globals.pageSize, globals.currentPage)
    })
})