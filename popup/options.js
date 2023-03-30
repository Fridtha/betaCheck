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
 * Does these things
 *
*/
//=============================================================================

// Save the value of 'color' from submit form.
function saveOptions(event) {
    console.log(`Clicked Save`);
    event.preventDefault();
    // browser.storage.sync.set({
    browser.storage.local.set({
        color: document.querySelector("#color").value
    });
}

// Fetch the value of 'color' from storage
function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#color").value = result.color || "blue";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    // let getting = browser.storage.sync.get("color");
    let getting = browser.storage.local.get("color");
    getting.then(setCurrentChoice, onError);
}

// When the page loads, run restoreOptions()
document.addEventListener("DOMContentLoaded", restoreOptions);

// Start listening for clicks in the popup
document.addEventListener("click", (e) => {

    // if the click is on a + button...
    if (e.target.id === "window-create-panel") {
        let createData = {
            // type: "normal",
            url: "/settings/settings.html",
        };
        let creating = browser.tabs.create(createData);
        creating.then(() => {
            console.log("The panel has been created");
        });
    }
    // if the click is on the submit button run the saveOptions function.
    else if (e.target.type === "submit") {
        saveOptions(e);
    }

    e.preventDefault();
});

