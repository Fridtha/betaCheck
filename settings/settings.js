//=============================================================================
// settings.js v0.01
//=============================================================================
/*
 * Handles the settings for BetaCheck
*/
//=============================================================================
// Initialize the domain list arrays
let allowedDomains = [];
let forcedDomains = [];
// let allowedDomains = ["pennstate", "learnpracticeplay", "overapi", "testallow"];
// let forcedDomains = ["grydnet", "unsplash", "pinterest", "testforced"];
// console.log(`Orig Array Allowed: ${allowedDomains}`);
// console.log(`Orig Array Forced: ${forcedDomains}`);
// saveDomains();
// var allowedDString;



// When the data is gotten
function onGot(item) {
    // console.log(item);

    // DOMAIN LISTS
    // Extract the two domain lists
    let allowedDomainData = item.allowedList;
    let forcedDomainData = item.forcedList;
    //Send them to the domain box handler
    handleDomainLists(allowedDomainData, forcedDomainData);

}

// Promisory error
function onError(error) {
    console.log(`Error: ${error}`);
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

function handleDomainLists(allowedList, forcedList) {

    let parsedAllow = JSON.parse(allowedList);
    for (let i = 0; i < parsedAllow.length; i++) {
        const domain = parsedAllow[i];
        // console.log(`Allowed: ${parsedAllow[i]}`);
        allowedDomains.push(domain);
        addListItem("allowedlist", domain);
    }

    let parsedForced = JSON.parse(forcedList);
    for (let i = 0; i < parsedForced.length; i++) {
        const domain = parsedForced[i];
        console.log(`Forced: ${domain}`);
        forcedDomains.push(domain);
        addListItem("forcedlist", domain);
    }

    // console.log(`Appended Array Allowed: ${allowedDomains}`);
    // console.log(`Appended Array Forced: ${forcedDomains}`);
}

function addListItem(listId, item) {
    //
    const ul = document.getElementById(listId);
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    ul.appendChild(li);
}

// Get the local storage data
let gettingStoredData = browser.storage.local.get();
gettingStoredData.then(onGot, onError);
