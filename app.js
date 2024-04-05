import { users } from "./users.js";
import { getTotalPages, sliceUsers, showPages } from "./pagination.js";
import { createTable } from "./display.js";

// Global Variables
var order = 'asc';
var currentPage = 1;
const pageSize = 10;
var totalPages = 1;
var mappedUsers = users.map((row) => {
    return {
        "image": row.image,
        "firstName": row.firstName,
        "lastName": row.lastName,
        "birthDate": row.birthDate
    }
}, users)



// main app on load
totalPages = getTotalPages(mappedUsers, pageSize);
showPages(totalPages);
createTable(sliceUsers(mappedUsers, pageSize, currentPage));


export const globals = {
    'order': order,
    'currentPage': currentPage,
    'pageSize': pageSize,
    'totalPages': totalPages,
    'mappedUsers': mappedUsers
}