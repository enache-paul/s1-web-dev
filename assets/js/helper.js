"use strict";

function findByName(name) {
    return modules.find(course => course.module === name);
}

function shorten(name) {
    let courseShortname = '';
    const wordsSplitAsArray = name.split(' ');

    wordsSplitAsArray.forEach(word => {
        courseShortname += word[0].toUpperCase()
    });

    return courseShortname;
}

function calcPercentage(amountCompleted, totalAmount) {
    return Math.ceil(amountCompleted * 100 / totalAmount);
}

function getAllSelectors(selector) {
    return document.querySelectorAll(selector);
}

function totalECTS(list) {
    let total = 0;
    list.forEach(el => {
        total += el.ects;
    });
    return total;
}

function ectsLeft() {
    return parseInt(document.querySelector('.ects-left').innerText);
}

function allEctsAllocated() {
    const ects = parseInt(document.querySelector('.ects-left').innerText);
    return (ects === 0);
}

function displayError(message) {
    const $divError = document.querySelector('.overview-courses-to-complete nav .error');
    $divError.classList.remove('hidden');
    $divError.innerHTML = '';
    const html = `<h3>${message}</h3>`
    $divError.insertAdjacentHTML('beforeend', html);
}

function randomizeColours() {
    const colours = ['green', 'yellow', 'pink', 'orange', 'blue', 'purple', 'white'];
    const randomIndex = Math.floor(Math.random() * (colours.length));

    return colours[randomIndex];
}

function decideAndClearCoursesArr() {
    if (currentStage === 2)
        completedCourses = [];
    else
        toCompleteCourses = [];
}

function sortSemestersAscending(arrObj) {
    return arrObj.sort(compareSemestersAscending);
}

function compareSemestersAscending(a, b) {
    if ( a.semester < b.semester ){
        return -1;
    }
    if ( a.semester > b.semester ){
        return 1;
    }
    return 0;
}