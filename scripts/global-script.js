const childDivs = document.querySelectorAll('.columns-type-a > div');

// Add a class with the index to each child div
childDivs.forEach((div, index) => {
    div.classList.add(`type-a-${index}`);
});


const childDivs3 = document.querySelectorAll('.columns-type-b > div');

// Select the parent div with the class 'columns-type-b'
var parentDiv = document.querySelector('.columns-type-b');

// Create an anchor element
var anchor = document.createElement('div');
anchor.className = 'content-type-a';

// Append each child div to the anchor element
childDivs3.forEach(function(div,index) {
    if(index<4){
        anchor.appendChild(div);
    }
    if(index==4){
        div.classList.add("content-type-b");
    }
});

// Append the anchor element to the parent div
parentDiv.appendChild(anchor);