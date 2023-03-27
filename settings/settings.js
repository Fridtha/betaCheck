//=============================================================================
// settings.js v0.01
//=============================================================================
/*
 * Handles the settings for BetaCheck
 * console.log();
*/
//=============================================================================
// Initialize the domain list arrays
let allowedDomainsArray = [];
let forcedDomainsArray = [];

// let allowedDomains = ["pennstate", "learnpracticeplay", "overapi", "testallow"];
// let forcedDomains = ["grydnet", "unsplash", "pinterest", "testforced"];

// When the data is gotten
function onGotLocalStorage(item) {
    // console.log(item);

    // DOMAIN LISTS
    // Extract the two domain lists
    let allowedDomainData = item.allowedList;
    let forcedDomainData = item.forcedList;
    //Send them to the domain box handler
    handleDomainLists(allowedDomainData, forcedDomainData);

}

function handleDomainLists(allowedDomainData, forcedDomainData) {
    console.log(`allowedList String: ${allowedDomainData}`);
    console.log(`forcedList String: ${forcedDomainData}`);

    // Create the arrays and populate the lists on the page.
    let parsedAllow = JSON.parse(allowedDomainData);
    for (let i = 0; i < parsedAllow.length; i++) {
        const domain = parsedAllow[i];
        // console.log(`Allowed: ${parsedAllow[i]}`);
        allowedDomainsArray.push(domain);
        addListItemDomain("allowedlist", domain);
    }
    let parsedForced = JSON.parse(forcedDomainData);
    for (let i = 0; i < parsedForced.length; i++) {
        const domain = parsedForced[i];
        // console.log(`Forced: ${domain}`);
        forcedDomainsArray.push(domain);
        addListItemDomain("forcedlist", domain);
    }

    console.log(`allowedDomainsArray: ${allowedDomainsArray}`);
    console.log(`forcedDomainsArray: ${forcedDomainsArray}`);

    document.addEventListener("click", (e) => {
        let targetID = e.target.id;
        let targetClass = e.target.className;
        // console.log(`ID: ${targetID} || Class: ${targetClass}`);
        // If clicked on...
        // console.log();
        // console.log(`Click! ${target}`);

        // Reload button
        if (e.target.id === `btn_reload`) {
            window.location.reload();
        }

        // Test button
        else if (e.target.id === `btn_test`) {
            console.log();
        }

        // Add Allowed button
        else if (e.target.id === `btn_addallowed`) {
            // console.log(targetID);
            // Get allowed input field value
            let inputValue = document.getElementById(`input_addallow`).value;

            // Check to see if the field is empty
            const checkedValue = isEmptyOrSpaces(inputValue);
            if (checkedValue) {
                // If it's empty only show the alert.
                showElement(`allowedAlert`);
            } else {
                // If it's not empty add it to the list and add the LI element
                hideElement(`allowedAlert`);
                addListItemDomain("allowedlist", inputValue);
            }
        }

        // Add Forced button
        else if (e.target.id === `btn_addforced`) {
            // console.log(targetID);
            // Get allowed input field value
            let inputValue = document.getElementById(`input_addforced`).value;

            // Check to see if the field is empty
            const checkedValue = isEmptyOrSpaces(inputValue);
            if (checkedValue) {
                // If it's empty only show the alert.
                showElement(`forcedAlert`);
            } else {
                // If it's not empty add it to the list and add the LI element
                hideElement(`forcedAlert`);
                addListItemDomain("forcedlist", inputValue);
            }
        }

        // Remove button
        else if (targetClass === `btn_remove`) {
            const listItemDomain = e.target.previousElementSibling.innerText;
            // console.log(`LiDomain: ${listItemDomain}`);
            const lielement = e.target.parentElement;

            removeListItemDomain(listItemDomain);
            removeLiElement(lielement);

        }
    });
}

function saveDomains() {
    let allowedDString = JSON.stringify(allowedDomains);
    let forcedDString = JSON.stringify(forcedDomains);
    browser.storage.local.set({
        allowedList: allowedDString
    }).then(r => console.log(`Allowed domains saved`));
    browser.storage.local.set({
        forcedList: forcedDString
    }).then(r => console.log(`Forced domains saved`));
}

function addListItemDomain(listId, item) {
    const licontent = `<div class=\"domainname\">${item}</div>\n<button class=\"btn_remove\">Remove</button>`;
    const ul = document.getElementById(listId);
    const li = document.createElement("li");
    li.innerHTML = licontent;
    ul.appendChild(li);

    // TODO Add item to array
}

function removeListItemDomain(listItemDomain) {
    console.log(`Removing: ${listItemDomain}`);

    // TODO Remove item from ARRAY
}

function removeLiElement(lielement) {
    lielement.remove();
    // fulfill(result); //if the action succeeded
    // reject(error); //if the action did not succeed
}

function isEmptyOrSpaces(str){
    // return str === null || str.match(/^ *$/) !== null;
    // return str === null || str.match(/^\s*$/) !== null;
    return str === null || (/^\s*$/).test(str);
}

function showStuff(id, text, btn) {
    document.getElementById(id).style.display = `block`;
    // hide the lorem ipsum text
    document.getElementById(text).style.display = `none`;
    // hide the link
    btn.style.display = 'none';
}

function showElement(id) {
    console.log(`Show Alert ${id}`);
    let element = document.getElementById(id);
    element.style.display = `block`;
}
function hideElement(id) {
    console.log(`Hide Alert ${id}`);
    let element = document.getElementById(id);
    element.style.display = `none`;
}

// Promisory error
function onError(error) {
    console.log(`Error: ${error}`);
}

// Get the local storage data
let gettingStoredData = browser.storage.local.get();
gettingStoredData.then(onGotLocalStorage, onError);


