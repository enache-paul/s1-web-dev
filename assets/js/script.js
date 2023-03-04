"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    applyAllEventListeners();
    autocompletePersonalForm();
}

function applyAllEventListeners() {
    getAllSelectors('.continue').forEach(el => el.addEventListener('click', handleNavigation));
    getAllSelectors('.return').forEach(el => el.addEventListener('click', handleNavigation));
    document.querySelector('#form-data').addEventListener('submit', savePersonalData);

    applyAllFilterEvents();
    applySummaryEvents();
}

function handleNavigation(e) {
    e.preventDefault();

    if (currentStage === 3 && !allEctsAllocated() && e.target.classList.item(0) === 'continue') {
        displayError('Not all ECTS allocated');
        setTimeout(removeErrors, 2000);
    }

    else if (e.target.classList.item(0) === 'return') {
        switchPage(_stages[currentStage], _stages[currentStage - 1]);
        currentStage -= 1;
        decideAndClearCoursesArr();
        handleSortEventsOnCoursePages(e);
    }
    else {
        switchPage(_stages[currentStage], _stages[currentStage + 1]);
        currentStage += 1;
        handleSortEventsOnCoursePages(e);
    }

    self.location.href = '#top';
}

function switchPage(previousPage,nextPage){
    document.querySelector(nextPage).classList.remove('hidden');
    document.querySelector(previousPage).classList.add('hidden');
}

function handleSortEventsOnCoursePages(e) {
    if (currentStage === 2) {
        sortID = '#filter1';
        refreshActiveSemesters('.overview-completed-courses nav a');
        applyFilter(e, '.overview-completed-courses .courses-container');
        applySortEvents('.overview-completed-courses .courses-container');
    }
    else if (currentStage === 3){
        sortID = '#filter2';
        refreshActiveSemesters('.overview-courses-to-complete nav a');
        applyFilter(e,'.overview-courses-to-complete .courses-container');
        applySortEvents('.overview-courses-to-complete .courses-container');
    }
    fillQuickview(e);
}

function applyAllFilterEvents() {
    applyFilterEventsTo('.overview-completed-courses nav a', '.overview-completed-courses .courses-container');
    applyFilterEventsTo('.overview-courses-to-complete nav a', '.overview-courses-to-complete .courses-container');
}

function applyFilterEventsTo(selectorEvent, selectorFilter) {

    applySortEvents(selectorFilter);

    getAllSelectors(selectorEvent).forEach(el => el.addEventListener('click', function (e){
        changeState(e, 'enabled');
        refreshActiveSemesters(selectorEvent);
        applyFilter(e, selectorFilter, sortID);
        decideAndClearCoursesArr();
        fillQuickview(e);
    }));
}

function applySortEvents(selectorFilter) {
    document.querySelector(sortID).addEventListener('change', function (e){
        e.preventDefault();
        applyFilter(e, selectorFilter);
        decideAndClearCoursesArr();
        fillQuickview(e);
    });
}


function applySummaryEvents() {
    document.querySelector('.overview-courses-to-complete .continue-wrapper .continue').addEventListener('click', renderSummary);
}

function applyToggleCoursesEvents() {
    const $elements = document.querySelectorAll('.completed-take-course');
    $elements.forEach($element => $element.addEventListener('click', function (e) {
        handleCourseAction(e, 'selected');
        fillQuickview(e);
    }));
}
