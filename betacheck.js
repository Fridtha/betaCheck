//=============================================================================
// betacheck.js v0.01
//=============================================================================
/*
 * Reads the border color from storage.
*/
//=============================================================================
// console.log();
document.addEventListener("DOMContentLoaded", function() {
    console.log("START");



});

function onGotTabs(tabs) {
    let tab_num, tab_url, tab_tit;

    for (let tab of tabs) {
        tab_id = tab.id;
        tab_num = tab.index;
        tab_url = tab.url;
        tab_tit = tab.title;
        // console.log(`Tab #: ${tab_num + 1} || Title: ${tab_tit} || URL: ${tab_url}`);
        // console.log(``);
    }
    console.log(tabs);


}

function onGotColor(item) {
    let color = "blue";
    if (item.color) {
        color = item.color;
    }

    console.log(`Got color as ${color}`);
    document.body.style.border = `10px solid ${color}`;
}

function onError(error) {
    console.log(`Error: ${error}`);
}

// Saves to the local comuter instance
const getting = browser.storage.local.get("color");
getting.then(onGotColor, onError);

let gettingTabs = browser.tabs.query({ currentWindow: true });
gettingTabs.then(onGotTabs, onError);


