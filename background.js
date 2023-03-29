//=============================================================================
// background.js v0.01
//=============================================================================
/*
 * Runs in the backgroud of the Extension itself.
*/
//=============================================================================
// console.log();

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Loaded in background.js");
});

function onGotLocalStorageBack(tabs) {
    let tab_num, tab_url, tab_tit;

    for (let tab of tabs) {
        tab_num = tab.index;
        tab_url = tab.url;
        tab_tit = tab.title;
        console.log(`Tab #: ${tab_num + 1} || Title: ${tab_tit} || URL: ${tab_url}`);
    }
    console.log(tabs);
}

function onError(error) {
    console.log(`Error: ${error}`);
}

let gettingCurrent = browser.tabs.query({ currentWindow: true });
gettingCurrent.then(onGotLocalStorageBack, onError);
