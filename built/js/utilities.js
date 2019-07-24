"use strict";
//selectors: will save from typing longs words over and over again
var Q = document.querySelector.bind(document);
var QAll = document.querySelectorAll.bind(document);
//for elements CSS styling. 'S' stands for Style
function S(element, index) {
    return !index ? Q(element).style : QAll(element)[index].style;
}
