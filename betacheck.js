//=============================================================================
// betacheck.js v0.01
//=============================================================================
/*
 * Reads the border color from storage.
*/
//=============================================================================
// const paranum = document.getElementById("imageblock").getElementsByClassName("imagepara").length;
// let currwin = browser.windows.getCurrent();
// console.log(currwin);
function onError(error) {
    console.log(`Error: ${error}`);
}

function onGot(item) {
    let color = "blue";
    if (item.color) {
        color = item.color;
    }

    console.log(`Got color as ${color}`);
    document.body.style.border = `10px solid ${color}`;
}

// Saves to browser sync area
// const getting = browser.storage.sync.get("color");

// Saves to the local comuter instance
const getting = browser.storage.local.get("color");
getting.then(onGot, onError);


