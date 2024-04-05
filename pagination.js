import { globals } from "./app.js";
import { createTable } from "./display.js";

export function getTotalPages(users, pageSize) {
    return Math.ceil(users.length / pageSize);
}




export function sliceUsers(users, pageSize, currentPage) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize - 1;

    return users.slice(startIndex, endIndex + 1)
}


function showOnePage(index, onClickEvent, paginationList, disabled = false, addClass = null) {
    var li = document.createElement('li');

    if (addClass) {
        li.classList.add(addClass);
    }

    if (disabled) {
        li.classList.add('page-item');
        li.classList.add('disabled');
    }
    else {
        li.classList.add('page-item');
    }

    li.addEventListener('click', onClickEvent);

    var a = document.createElement('a');
    a.classList.add('page-link');
    a.innerHTML = index;
    paginationList.appendChild(li);
    li.appendChild(a);
}



export function showPages(totalPages) {
    var paginationList = document.querySelector('.pagination');


    showOnePage('&laquo;', () => {
        var navigateLeft = document.querySelector('.navigateLeft');

        if (!navigateLeft.classList.contains('disabled')) {
            document.querySelectorAll('.page-item')[globals.currentPage].classList.remove('active');
            globals.currentPage -= 1;
            document.querySelectorAll('.page-item')[globals.currentPage].classList.add('active');
            console.log(globals.currentPage);
            createTable(sliceUsers(globals.mappedUsers, globals.pageSize, globals.currentPage));
        }
        else {
            console.log('>> disabled')
        }
        paginationButtonsDisablerAndEnabler();

    }, paginationList, true, 'navigateLeft');


    for (let index = 1; index <= totalPages; index++) {
        showOnePage(index, (event) => {
            document.querySelectorAll('.page-item')[globals.currentPage].classList.remove('active');
            globals.currentPage = parseInt(event.target.innerText);
            document.querySelectorAll('.page-item')[globals.currentPage].classList.add('active');
            console.log(globals.currentPage);
            createTable(sliceUsers(globals.mappedUsers, globals.pageSize, globals.currentPage));
            paginationButtonsDisablerAndEnabler();
        }, paginationList);
    }

    document.querySelectorAll('.page-item')[1].classList.add('active');

    showOnePage('&raquo;', () => {

        var navigateRight = document.querySelector('.navigateRight');

        if (!navigateRight.classList.contains('disabled')) {
            document.querySelectorAll('.page-item')[globals.currentPage].classList.remove('active');
            globals.currentPage += 1;
            document.querySelectorAll('.page-item')[globals.currentPage].classList.add('active');
            console.log(globals.currentPage);
            createTable(sliceUsers(globals.mappedUsers, globals.pageSize, globals.currentPage));
            paginationButtonsDisablerAndEnabler();
        }
        else {
            console.log('>> disabled')
        }

    }, paginationList, false, 'navigateRight');

}


function paginationButtonsDisablerAndEnabler() {
    var navigateRight = document.querySelector('.navigateRight');
    var navigateLeft = document.querySelector('.navigateLeft');

    if (globals.currentPage === globals.totalPages) {
        navigateRight.classList.add('disabled');
    } else {
        navigateRight.classList.remove('disabled');
    }

    if (globals.currentPage === 1) {
        navigateLeft.classList.add('disabled');
    } else {
        navigateLeft.classList.remove('disabled');
    }

}