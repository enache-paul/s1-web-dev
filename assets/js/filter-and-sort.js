"use strict";

function applyFilter(e, selector) {
    e.preventDefault();

    filterCourses(selector);
}

function filterCourses(selector) {
    let filteredCourses = [];

    modules.forEach(module => {
        activeSemesters.forEach(semester => {
            if (module.semester.indexOf(semester) !== -1)
                filteredCourses.push(module)
        });
    });
    sortCourses(filteredCourses, selector);
}

function sortCourses(filteredCourse, parentSelector) {
    let arrayOfNames = [];
    const sortedArray = [];

    filteredCourse.forEach(course => arrayOfNames.push(course.module));

    if (document.querySelector(sortID).value === 'none')
        return renderCourses(filteredCourse, parentSelector);

    arrayOfNames.sort()
    if (document.querySelector(sortID).value === 'descending')
        arrayOfNames.reverse();

    arrayOfNames.forEach(name =>{
        filteredCourse.forEach(course => {
            if (name === course.module)
                sortedArray.push(course);
        });
    });
    renderCourses(sortedArray, parentSelector);
}

function refreshActiveSemesters(selector) {
    activeSemesters = [];
    document.querySelectorAll(selector).forEach(function (child) {
        if (child.classList.contains('enabled'))
            activeSemesters.push(child.innerText);
    });
}