"use strict";

function handleCourseAction(e, className) {
    e.preventDefault();

    changeState(e, className);
    if (e.target.parentElement.parentElement.parentElement.classList.contains('overview-completed-courses'))
        addOrRemoveFromList(e, completedCourses);
    else {
        addOrRemoveFromList(e, toCompleteCourses);
    }
}

function changeState(e, className) {
    if (e.target.classList.contains(className))
        e.target.classList.remove(className);
    else {
        if (!checkError(e))
            e.target.classList.add(className);
    }
}

function checkError(e) {
    const courseName = e.target.parentElement.firstElementChild.innerText;

    if ((courseName !== 'S1' && toCompleteCourses.length > 0) && (ectsLeft() - findByName(courseName).ects < 0)){
        displayError('Not enough ECTS available to select');
        addOrRemoveFromList(e, toCompleteCourses);
        self.location.href = '#top';
        setTimeout(removeErrors, 2000)
        return true;
    }
    return false;
}

function removeErrors() {
    document.querySelector('.error').classList.add('hidden');
}

function addOrRemoveFromList(e, courseArr) {
    const courseName = e.target.parentElement.firstElementChild.innerText;
    const ECTS = parseInt(e.target.previousElementSibling.attributes.item(1).value);
    const semester = e.target.nextElementSibling.innerText;
    const target =
        {
            "module": courseName,
            "ects": ECTS,
            "semester": semester
        };

    const searchIndex = courseArr.findIndex((course) => course.module === target.module);
    if (searchIndex === -1)
        courseArr.push(target);
    else
        courseArr.splice(searchIndex, 1);
}

function renderCourses(courses, selector) {  //buttonText argument removed
    const $element = document.querySelector(selector);
    let html = '';
    $element.innerHTML = '';

    courses.forEach(function(course){

        html += `<div class="course-container">
                        <h3>${course.module}</h3>
                        <h4 class="course-picture ${randomizeColours()}">${shorten(course.module)}</h4>
                        <p class="lecturer">${course.lecturer}</p>
                        <p class="ects" datatype="${course.ects}">${course.ects}ECTS</p>
                        <a href="#" class="completed-take-course">Completed</a>
                        <p class="hidden">${course.semester}</p>
                 </div>`;

    });
    $element.insertAdjacentHTML('beforeend', html);
    applyToggleCoursesEvents();
}