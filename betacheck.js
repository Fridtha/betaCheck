/*
 * Copyright (c) 2023.
 * betaCheck.me
 * GNU General Public License v3.0 or later [GPL-3.0-or-later]
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. See <https://www.gnu.org/licenses/> <https://spdx.org/licenses/GPL-3.0-or-later.html>
 *
 */

//=============================================================================
// betacheck.js v0.01
//=============================================================================
/*
 * Affects the content of a page.
 * let myAddonId = browser.runtime.id;
*/
//=============================================================================
// console.log();
// TODO: Send images to BC_Server at http://localhost:2382
// TODO: Get images back and placed in original location
// TODO: Settings to allow user to choose image style

let myAddonId = browser.runtime.id;
console.log(`runtime.uuid: ${myAddonId}`);
const curURL = document.location.href; // Set current url of the page
let imageList = []; // Init an array to hold the image list.

function extractStorageData() {
    const gettingLocalData = browser.storage.local.get();  // Gets the local storage data
    gettingLocalData.then(onGotData, onError);  // Once it has the data, it runs onGotData
}

// Once the local storage has been grabbed...
function onGotData(item) {
    // betaCheckStatus Values - status_enabled - status_on_demand - status_disabled
    let betaCheckStatus = item.betaCheckStatus;
    console.log(betaCheckStatus);
    let allowedList = [];
    let forcedList = [];
    let color = "darkslateblue"; // Sets darkslateblue as the default
    if (item.color) { // however, if color exists in the local storage data, then...
        color = item.color; // set color to what's in the data.
    }
    let colorAllowed = "mediumseagreen";
    let colorCensored = "firebrick";
    // --------------------------------------------------------------------------------------------------------
    // Create the arrays and populate the lists on the page.
    let parsedAllow = JSON.parse(item.allowedList); // parse through the allowedList string from local storage.
    for (let i = 0; i < parsedAllow.length; i++) {
        const domain = parsedAllow[i];
        allowedList.push(domain);  // Push each element into the allowedList array
    }
    let parsedForced = JSON.parse(item.forcedList); // parse through the forcedList string from local storage.
    for (let i = 0; i < parsedForced.length; i++) {
        const domain = parsedForced[i];
        forcedList.push(domain);  // Push each element into the forcedList array
    }
    // console.log(allowedList); // test
    // console.log(forcedList); // test
    // End domain array parsing
    // --------------------------------------------------------------------------------------------------------
    // betaCheck status block. Do stuff based on the status of the extension app.
    if (betaCheckStatus === `status_enabled`) { // If betaCheck is enabled...
        // console.log(allowedList);
        if (allowedList.some(v => curURL.includes(v))) { // check if any in the allowedList is in the url.
            console.log(`Images are set as allowed on this page: "${curURL}". You better not be cheating beta!`);
            defineBorderColor(colorAllowed); // If they are, set border color to green to show this page is allowed.
        } else {
            console.log(`This page, "${curURL}", is not on the allowed list, and so will be made betaSafe!`);
            imageHandler(); // Send images to betaCheck server here
            defineBorderColor(colorCensored); // Set border color to red to show this page is being betaSafed!
        }
    } else if (betaCheckStatus === `status_on_demand`) { // If betaCheck is set to on-Demand...
        // console.log(forcedList);
        if (forcedList.some(v => curURL.includes(v))) { // check if any in the forcedList is in the url.
            console.log(`This site "${curURL}" is demanded to be censored to you beta!`);
            imageHandler(); // Send images to betaCheck server here
            defineBorderColor(colorCensored); // if they are, set border color to red to show this page is being betaSafed!
        } else {
            console.log(`No Forced match using "${curURL}" so this page is not being censored.`);
        }
    } else if (betaCheckStatus === `status_disabled`) {
        console.log(`betaCheck is Disabled, not censoring, you naughty boi!`);
    } else {
        console.log(`betaCheck is not registering, and so is not censoring!`);
    }
    // END betaCheck status block
    // --------------------------------------------------------------------------------------------------------
}

function defineBorderColor(color) {
    document.body.style.border = `10px solid ${color}`;  // Create the border
}

// document.getElementById('imgID').src = "newImage.png";
function imageHandler() {
    Array.prototype.map.call(document.images, function (i) {
        imageList.push(i.src);
        i.src = `moz-extension://120197ba-3819-4324-9307-8badc941510e/imgs/pizza_love.jpg`;
        console.log(i.src);
    });
    // console.log(imageList);
}

function onError(error) {
    console.log(`Error: ${error}`);
}

extractStorageData();
