//=============================================================================
// betacheck.js v0.01
//=============================================================================
/*
 * Affects the content of a page.
*/
//=============================================================================
// console.log();
const curURL = document.location.href;


function extractStorageData() {
    const gettingLocalData = browser.storage.local.get();  // Gets the local storage data
    gettingLocalData.then(onGotData, onError);  // Once it has the data, it runs onGotData
}

// Once the local storage has been grabbed...
function onGotData(item) {
    let allowedList = [];
    let forcedList = [];
    let color = "darkslateblue"; // Sets darkslateblue as the default
    if (item.color) { // however, if color exists in the local storage data, then...
        color = item.color; // set color to what's in the data.
    }
    // console.log(`Current URL: ${curURL}`);

    // Create the arrays and populate the lists on the page.
    let parsedAllow = JSON.parse(item.allowedList);
    for (let i = 0; i < parsedAllow.length; i++) {
        const domain = parsedAllow[i];
        allowedList.push(domain);
    }
    let parsedForced = JSON.parse(item.forcedList);
    for (let i = 0; i < parsedForced.length; i++) {
        const domain = parsedForced[i];
        forcedList.push(domain);
    }

    // const substrings = ["one", "two", "three"];
    // let str;

    // ------------------------
    // Setup
    // console.log(`Substrings: ${allowedList}`);

    // Try it where we expect a match
    // str = "this has one";
    // console.log(curURL);
    console.log(allowedList);
    if (allowedList.some(v => curURL.includes(v))) {
        console.log(`Allowed Match using "${curURL}"`);
        // if url string includes allowed elements, do this
        color = "mediumseagreen";
    } else {
        console.log(`No Allowed match using "${curURL}"`);
    }

    // Try it where we DON'T expect a match
    // str = "this doesn't have any";
    // console.log(curURL);
    console.log(forcedList);
    if (forcedList.some(v => curURL.includes(v))) {
        console.log(`Forced Match using "${curURL}"`);
        // else if domains include forced elements, do this
        color = "crimson";
    } else {
        console.log(`No Forced match using "${curURL}"`);
    }
    // ------------------------





    defineBorderColor(color);
}
function replace_in_element(element, word_obj) {
    for (key in word_obj) {
        console.log(key);
        let rgx = new RegExp(key, "ig");
        console.log(rgx);
        element.nodeValue = element.nodeValue.replace(rgx, word_obj[key]);
        // console.log("end");
    }
}

function defineBorderColor(color) {
    document.body.style.border = `10px solid ${color}`;  // Create the border
}

function myInitCode(message) {
    console.log(message);
}

function onError(error) {
    console.log(`Error: ${error}`);
}

extractStorageData();
