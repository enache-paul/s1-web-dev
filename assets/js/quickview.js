"use strict";

function fillQuickview(e) {
    e.preventDefault();

    document.querySelector('aside .ects-total').innerText = totalECTS(toCompleteCourses);
    document.querySelector('aside .ects-left').innerText = (getTotalECTS() - totalECTS(toCompleteCourses));
    document.querySelector('aside .ects-allocated-percentage').innerText = calcPercentage(totalECTS(toCompleteCourses), getTotalECTS());

    renderQuickViewSemesters();
    renderProgressBar(getTotalECTS() - ectsLeft(), getTotalECTS());
}

function renderProgressBar(recordedECTS, totalECTS){
    const $progress = document.querySelector('.progress');
    const fraction = recordedECTS / totalECTS;
    $progress.style.width = `${fraction * 100}%`;
    barFractions(fraction);
}

function renderQuickViewSemesters() {
    let html = '';
    const $asideCoursesDiv = document.querySelector('.course-in-semesters');
    $asideCoursesDiv.innerHTML = '';

    activeSemesters.forEach(semester => {
        let counter = 0;
        toCompleteCourses.forEach(course =>{
            if (course.semester === semester)
                counter++;
        });
        if (counter !== 0)
            html += `<p><span class="number-of-courses-in-semester">${counter}</span> courses in <span class="number-of-semester">${semester}</span></p>`;
    });

    $asideCoursesDiv.insertAdjacentHTML('beforeend', html);
}

function barFractions(fraction) {
    const $progress = document.querySelector('.progress');
    if (fraction <= 0.25)
        $progress.style.backgroundImage = `repeating-linear-gradient(
            to left,
            rgb(255,250,225)`;
    else if (fraction <= 0.5)
        $progress.style.backgroundImage = `repeating-linear-gradient(
            to left,
            rgb(252,255,164),
            rgb(255,250,250)`;
    else if (fraction <= 0.75)
        $progress.style.backgroundImage = `repeating-linear-gradient(
            to left,
            rgb(252,255,164),
            rgb(255,250,205),
            rgb(255,250,250)`;
    else if (fraction <= 0.99)
        $progress.style.backgroundImage = `repeating-linear-gradient(
            to left,
            rgb(255,255,0),
            rgb(252,255,164),
            rgb(255,250,250)`;
    else if (fraction === 1)
        $progress.style.backgroundImage = `repeating-linear-gradient(
            to left,
            rgb(197, 239, 247),
            rgb(248,248,255)`;
}