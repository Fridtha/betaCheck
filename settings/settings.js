/*
 * Copyright (c) 2023. kinkycraft.com
 * GNU General Public License v3.0 or later [GPL-3.0-or-later]
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. See <https://www.gnu.org/licenses/> <https://spdx.org/licenses/GPL-3.0-or-later.html>
 */
// TODO: Select and save betaCheckStatus
// Initialize the domain list arrays
const appURL = document.location.href; // Set current url of the page
console.log(`App URL: ${appURL}`);


let allowedDomainsArray = [];
let forcedDomainsArray = [];
let status;

// let allowedDomains = ["pennstate", "learnpracticeplay", "overapi", "testallow"];
// let forcedDomains = ["grydnet", "unsplash", "pinterest", "testforced"];

// When the data is gotten
function onGotLocalStorage(item) {
    // console.log(item);

    handleStatus(item.betaCheckStatus);
    let statusBtns = document.getElementsByName(`betaCheckStatus`);
    for(let btn of statusBtns) {
        btn.addEventListener('click', () => {
            statusValue = btn.value;
            saveRadioValue(statusValue);
            checkRadioBtn(statusValue);
        });
    }

    // DOMAIN LISTS
    // Extract the two domain list strings from the local storage data.
    let allowedDomainData = item.allowedList;
    let forcedDomainData = item.forcedList;
    //Send them to the domain box handler
    handleDomainLists(allowedDomainData, forcedDomainData);
}

// Values - status_enabled - status_on_demand - status_disabled
function handleStatus(statusValue) {
    let statusCheckButtons = `betaCheckStatus`;
    if (statusValue) { // if the value exists in local storage...
        // console.log(statusValue);
        checkRadioBtn(statusValue);
    } else {  // If the
        // console.log(statusValue);
        statusValue = `status_disabled`; // Set default value
        saveRadioValue(statusValue);
        checkRadioBtn(statusValue);
    }
}
function getValueFromRadioButton(name) {
    //Get all elements with the name
    let buttons = document.getElementsByName(name);
    for(let i = 0; i < buttons.length; i++) {
        //Check if button is checked
        let button = buttons[i];
        if(button.checked) {
            //Return value
            console.log(button.value);
            return button.value;
        }
    }
    //No radio button is selected.
    console.log(`No radio button is selected`);
    return null;
}
function saveRadioValue(statusValue) {
    browser.storage.local.set({  // Save default to local storage
        betaCheckStatus: statusValue
        // }).then(r => console.log(`Allowed domains saved`));
    }).then();
}

function checkRadioBtn(statusValue) {
    document.getElementById(statusValue).checked = true; // set relevent radio button to checked.
}

function handleDomainLists(allowedDomainData, forcedDomainData) {
    // console.log(`allowedList String: ${allowedDomainData}`);
    // console.log(`forcedList String: ${forcedDomainData}`);

    // Create the arrays and populate the lists on the page.
    let parsedAllow = JSON.parse(allowedDomainData);
    for (let i = 0; i < parsedAllow.length; i++) {
        const domain = parsedAllow[i];
        // console.log(`Allowed: ${parsedAllow[i]}`);
        allowedDomainsArray.push(domain);
        addListItemDomain(`allowedlist`, domain, `onLoad`);
    }
    let parsedForced = JSON.parse(forcedDomainData);
    for (let i = 0; i < parsedForced.length; i++) {
        const domain = parsedForced[i];
        // console.log(`Forced: ${domain}`);
        forcedDomainsArray.push(domain);
        addListItemDomain(`forcedlist`, domain, `onLoad`);
    }

    // console.log(`allowedDomainsArray: ${allowedDomainsArray}`);
    // console.log(`forcedDomainsArray: ${forcedDomainsArray}`);

    // FUNCTIONS ------------------

    function itemCheck(checkAllowedItemExists, alertElement, checkForcededItemExists, checkedValue) {
        if (checkAllowedItemExists) {
            alertElement.innerHTML = `Item already in the 'allowed' list.`;
        } else if (checkForcededItemExists) {
            alertElement.innerHTML = `Item already in the 'forced' list.`;
        } else if (checkedValue) {
            alertElement.innerHTML = `Entry cannot be empty.`;
        }
    }

    function addListItemDomain(listId, item, onLoad) {
        // Add Item to the relevant domain array
        if(listId === `allowedlist` && onLoad !== `onLoad`) {
            allowedDomainsArray.push(item);
            // console.log(`Push ${item} to Allowed: ${listId}`);
        } else if(listId === `forcedlist` && onLoad !== `onLoad`) {
            // console.log(`Push ${item} to Forced: ${listId}`);
            forcedDomainsArray.push(item);
        }

        // Add li element to the domain UL
        const licontent = `<div class=\"domainname\">${item}</div>\n<button class=\"btn_remove\">Remove</button>`;
        const ul = document.getElementById(listId);
        const li = document.createElement("li");
        li.innerHTML = licontent;
        ul.appendChild(li);

        // Update the local storage data with the new lists
        saveDomains();


    }

    function saveDomains() {
        // Save the arrays as strings
        let allowedDString = JSON.stringify(allowedDomainsArray);
        let forcedDString = JSON.stringify(forcedDomainsArray);

        // Then save the strings to local storage
        browser.storage.local.set({
            allowedList: allowedDString
        // }).then(r => console.log(`Allowed domains saved`));
        }).then();
        browser.storage.local.set({
            forcedList: forcedDString
        // }).then(r => console.log(`Forced domains saved`));
        }).then();
    }

    function removeLiElement(listId, lielement, listItemDomain) {
        // Remove the li element attached to the remove button
        lielement.remove();

        // Choose the array from the remove button to splice remove the domain.
        let listArray;
        if(listId === `allowedlist`) {
            listArray = allowedDomainsArray;
        } else if(listId === `forcedlist`) {
            listArray = forcedDomainsArray;
        }

        // Splice the selected element out of the array.
        for( let i = 0; i < listArray.length; i++){
            if ( listArray[i] === listItemDomain) {
                listArray.splice(i, 1);
            }
        }

        // Update the local storage data with the new lists
        saveDomains();
    }

    function isEmptyOrSpaces(str){
        // (/^ *$/) <- doesn't check for tabs
        return str === null || (/^\s*$/).test(str);
    }

    // FUNCTIONS END ------------------

    document.addEventListener("click", (e) => {
        let targetID = e.target.id;
        let targetClass = e.target.className;

        // Reload button
        if (e.target.id === `btn_reload`) {  // TODO: Swap out all e.target.id with targetID variable
            window.location.reload();
        }

        // Test button
        else if (e.target.id === `btn_test`) {
            console.log(allowedDomainsArray);
        }

        // Add Allowed button
        else if (e.target.id === `btn_addallowed`) {
            // console.log(targetID);
            // Get allowed input field value
            let inputValue = document.getElementById(`input_addallow`).value;
            let alertElement = document.getElementById(`allowedAlert`);

            // Check to see if the field is empty or in either list already.
            let checkedValue = isEmptyOrSpaces(inputValue);
            let checkAllowedItemExists = allowedDomainsArray.includes(inputValue);
            let checkForcededItemExists = forcedDomainsArray.includes(inputValue);
            if(checkedValue || checkAllowedItemExists || checkForcededItemExists) {
                itemCheck(checkAllowedItemExists, alertElement, checkForcededItemExists, checkedValue);
            } else {
                // If it's not empty or already exists, then add it to the list and add the LI element
                alertElement.innerHTML = ``;
                addListItemDomain(`allowedlist`, inputValue, `NotOnLoad`);
            }
        }

        // Add Forced button
        else if (e.target.id === `btn_addforced`) {
            // console.log(targetID);
            // Get allowed input field value
            let inputValue = document.getElementById(`input_addforced`).value;
            let alertElement = document.getElementById(`forcedAlert`);

            // Check to see if the field is empty or in either list already.
            let checkedValue = isEmptyOrSpaces(inputValue);
            let checkAllowedItemExists = allowedDomainsArray.includes(inputValue);
            let checkForcededItemExists = forcedDomainsArray.includes(inputValue);
            if(checkedValue || checkAllowedItemExists || checkForcededItemExists) {
                itemCheck(checkAllowedItemExists, alertElement, checkForcededItemExists, checkedValue);
            } else {
                // If it's not empty or already exists, then add it to the list and add the LI element
                alertElement.innerHTML = ``;
                addListItemDomain(`forcedlist`, inputValue, `NotOnLoad`);
            }
        }

        // Remove button
        else if (targetClass === `btn_remove`) {
            const listItemDomain = e.target.previousElementSibling.innerText;
            // console.log(`LiDomain: ${listItemDomain}`);
            const lielement = e.target.parentElement;
            const listId = lielement.parentElement.id;
            // console.log(`lielement: ${lielement}`);
            // console.log(`lielement: ${listId}`);

            // removeListItemDomain(listItemDomain);
            removeLiElement(listId, lielement, listItemDomain);

        }
    });
}



// Promisory error
function onError(error) {
    console.log(`Error: ${error}`);
}

// Get the local storage data
let gettingStoredData = browser.storage.local.get();
gettingStoredData.then(onGotLocalStorage, onError);


