"use strict";

function savePersonalData(e) {
    e.preventDefault();
    localStorage.setItem('name', document.querySelector('#name').value);
    localStorage.setItem('email', document.querySelector('#email').value);
    localStorage.setItem('ECTS', document.querySelector('#ECTS').value);

    handleNavigation(e);
}

function autocompletePersonalForm() {
    tryAutocomplete('name');
    tryAutocomplete('email');
    tryAutocomplete('ECTS');
}

function tryAutocomplete(key) {
    if (localStorage.getItem(key))
        document.querySelector(`#${key}`).value = localStorage.getItem(key);
}

function getTotalECTS() {
    if (localStorage.getItem('ECTS'))
        return parseInt(localStorage.getItem('ECTS'));
}