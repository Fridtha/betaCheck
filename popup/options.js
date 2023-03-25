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

