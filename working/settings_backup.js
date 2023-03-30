/*
 * Copyright (c) 2023.
 * betaCheck.me
 * GNU General Public License v3.0 or later [GPL-3.0-or-later]
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. See <https://www.gnu.org/licenses/> <https://spdx.org/licenses/GPL-3.0-or-later.html>
 *
 */

//=============================================================================
// options.js v0.01
//=============================================================================
/*
 * Does two things:
 * 1. When the document has loaded, it fetches the value of "color" from storage using storage.sync.get().
 *      If the value isn't set, it uses the default "blue". This retrieves the values from the sync storage area.
 * 2. When the user submits the form by clicking Save, it stores the value of the textbox using storage.sync.set().
 *      This saves the value to the sync storage area.
*/
//=============================================================================

function addField(plusElement){
    console.log(`Clicked the PLUS button`);
    // removeListeners();
    // target the submit button and store it in the element displayButton
    // We need the submit button to act as a reference point, so we can create the new input element above it.
    let displayButton = document.querySelector("form button");
    // console.log(displayButton);

    // Stopping the function if the last input field has no value entered in by the user.
    // We check the input element, and if the field is empty, we will return false and stop the function here.
    let content = plusElement.previousElementSibling.value;
    if(content.trim() === ""){
        // console.log(`Field is empty. Put something in first.`)
        return false;
    }
    // else {
    //     console.log(`Field Contents: ${content}`);
    // }

    // creating the div container.
    let div = document.createElement("div");
    div.setAttribute("class", "field");

    // Creating the input element.
    let field = document.createElement("input");
    field.setAttribute("type", "text");
    field.setAttribute("name", "domainli[]");

    // Creating the plus span element.
    // <span class="plus">+</span>
    let plus = document.createElement("span");
    plus.setAttribute("class", "plus");
    let plusText = document.createTextNode("+");
    plus.appendChild(plusText);

    // Creating the minus span element.
    // <span class="minus">-</span>
    let minus = document.createElement("span");
    minus.setAttribute("class", "minus");
    let minusText = document.createTextNode("-");
    minus.appendChild(minusText);

    // Adding the elements to the DOM.
    form.insertBefore(div, displayButton);
    div.appendChild(field);
    div.appendChild(plus);
    div.appendChild(minus);

    // Un hiding the minus sign.
    plusElement.nextElementSibling.style.display = "block"; // the minus sign
    // Hiding the plus sign.
    plusElement.style.display = "none"; // the plus sign

    setListeners();
}

// Remove the element when minus is clicked.
function removeField(minusElement){
    // removeListeners();
    minusElement.parentElement.remove();
    console.log(`Removed a field`);
    setListeners();
}

// Store the form element as the variable: form
let form = document.forms[0];
form.addEventListener("submit", fetchTextNotes);

function fetchTextNotes(event) {
    // prevent the form from submitting its data to the server
    event.preventDefault();


    // Pull the data from the form into the variable: data
    let data = new FormData(form);
    // Create the array that will hold the list of domains(the data)
    let domains = [];
    // For each element in data, if it's not empty, add it to the domains array
    data.forEach( function(value){
        if(value !== ""){
            domains.push(value);
        }
    });

    // Display the domains array values in the domains html element
    let output = "";
    // Loop through each item in the array of domains
    for(let domain of domains) {
        output += `<p>${domain} <span class="markAsDone">Mark as done</span></p>`;
    }
    // insert output inside the domains div
    document.querySelector(".domains").innerHTML = output;

    // now delete all the created input elements and leave only an empty one
    let inputFields = document.querySelectorAll(".field");
    inputFields.forEach(function(element, index){
        if(index === inputFields.length - 1){
            element.children[0].value = "";
        }else{
            element.remove();
        }
    });
    // removeListeners();
    setListeners();
}

// The markAsDone() function takes as an argument the clicked span element, and replaces the text with the checkmark.
function markAsDone(element) {
    element.classList.add("mark");
    element.innerHTML = "✓";
}

function addMyEventListeners(className) {
    const elements = document.getElementsByClassName(className);
    console.log(`There are ${elements.length} ${className} elements.`);
    if (elements.length > 0) {
        for (const element of elements) {
            element.addEventListener(`click`, function handleClick() {
                if (className === 'plus') {
                    addField(element);
                } else if (className === 'minus') {
                    removeField(element);
                } else if (className === 'markAsDone') {
                    markAsDone(element);
                }
            });
            console.log(`Added all ${className} listeners.`);
        }
    } else {
        console.log(`No ${className} elements to listen to.`);
    }
}
function removeMyEventListeners(className) {
    const elements = document.getElementsByClassName(className);
    console.log(`There are ${elements.length} ${className} elements.`);
    if (elements.length > 0) {
        for (const element of elements) {
            element.removeEventListener(`click`, function handleClick() {
                if (className === 'plus') {
                    addField(element);
                } else if (className === 'minus') {
                    removeField(element);
                } else if (className === 'markAsDone') {
                    markAsDone(element);
                }
            });
            console.log(`Removed all ${className} listeners.`);
        }
    } else {
        console.log(`No ${className} elements to remove.`);
    }
}

function setListeners() {
    removeListeners();
    addMyEventListeners(`plus`);
    addMyEventListeners(`minus`);
    addMyEventListeners(`markAsDone`);
}
function removeListeners() {
    removeMyEventListeners('plus');
    removeMyEventListeners('minus');
    removeMyEventListeners('markAsDone')
}

setListeners();

