
const now = new Date();

// Define an array of month names
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const childDivs = document.querySelectorAll('.indices > div');

// Add a class with the index to each child div
childDivs.forEach((div, index) => {
    div.classList.add(`indices-content-${index}`);
    div.classList.add(`indices-content`);
});

// Select the block element
const block = document.querySelector('.indices.block');

const articleApiUrl = "/indices-data.json";
const jsonDataUrl = window.origin + articleApiUrl;

// Fetch JSON data
fetch(jsonDataUrl)
    .then(response => response.json())
    .then(data => {

        // Create cards
        data.data.forEach((item, i) => {
            const clone = block.cloneNode(true);

            // Add a unique class to the cloned block
            clone.classList.add(`indices-clone`);
            clone.classList.remove('indices');
            clone.classList.remove('block');
            const h2 = clone.querySelector('h2');
            if (h2) {
                h2.innerHTML = item.Title; // Assuming 'title' is a property of 'item'
                h2.id = "indices-title-" + i;
            }
            
            const content = clone.getElementsByClassName("indices-content-0")[0];
            const DateP = content.querySelector('p');
            DateP.innerHTML = formatDateTime(now);
            
            const content2 = clone.getElementsByClassName("indices-content-2")[0];
            content2.innerHTML = content2.innerHTML.replace("{mainValues}",item.mainValues);
            content2.innerHTML = content2.innerHTML.replace("{subValues}",item.subValues);
            // Append the cloned block to the parent element
            block.parentNode.appendChild(clone);

        });
    })
    .catch(error => console.error('Error fetching JSON data:', error));



// Define a function to format the date and time
function formatDateTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${hours}:${minutes} ${ampm}`;
    return strTime;
}