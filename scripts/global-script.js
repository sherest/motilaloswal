const childDivs = document.querySelectorAll('.columns-type-a > div');

// Add a class with the index to each child div
childDivs.forEach((div, index) => {
    div.classList.add(`type-a-${index}`);
});