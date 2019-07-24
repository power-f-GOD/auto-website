//selectors: will save from typing longs words over and over again
const Q: any = document.querySelector.bind(document);
const QAll: any = document.querySelectorAll.bind(document);

//for elements CSS styling. 'S' stands for Style
function S(element: any, index: number)
{ 
  return !index ? Q(element).style : QAll(element)[index].style;
}