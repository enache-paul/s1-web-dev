"use strict";

function renderSummary(e) {
    e.preventDefault();

    completedCourses = sortSemestersAscending(completedCourses);
    toCompleteCourses = sortSemestersAscending(toCompleteCourses);
    renderBody('#table1 tbody', completedCourses);
    renderBody('#table2 tbody', toCompleteCourses);
    renderFooter('#table1 tbody', completedCourses);
    renderFooter('#table2 tbody', toCompleteCourses);
    renderTotalEctsTopTable();
}


function renderBody(parent, list) {
    let html = '';
    const $element = document.querySelector(parent);
    $element.innerHTML = '<tr><td>semester</td><td>course</td><td># ECTS</td></tr>';

    list.forEach(el =>{
        html +=
            `<tr>
                <td>${el.semester}</td>
                <td>${el.module}</td>
                <td>${el.ects}</td>
             </tr>`
    });
    for (let i = 0; i < extraColumns(list); i++)
        html += `<tr><td></td><td></td><td></td></tr>`;

    $element.insertAdjacentHTML('beforeend', html);
}

function renderFooter(parent, list) {
    const $element = document.querySelector(parent);
    let html = `<tr>
                    <td colspan="2">Total</td>
                    <td>${totalECTS(list)}ECTS</td>
                </tr>`
    $element.insertAdjacentHTML('beforeend', html);
}

function extraColumns(list) {
    const x = (list.length - toCompleteCourses.length);
    const y = (list.length - completedCourses.length);
    if (x < 0) {
        return -x;
    }
    if (y < 0)
        return -y;
    else
        return 0;
}

function renderTotalEctsTopTable() {
    document.querySelector('.completed-ects .ects-completed').innerText = totalECTS(completedCourses);
    document.querySelector('.desired-ects .ects-to-complete').innerText = totalECTS(toCompleteCourses);
}