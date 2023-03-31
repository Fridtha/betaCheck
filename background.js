/*
 * Copyright (c) 2023. kinkycraft.com
 * GNU General Public License v3.0 or later [GPL-3.0-or-later]
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. See <https://www.gnu.org/licenses/> <https://spdx.org/licenses/GPL-3.0-or-later.html>
 */

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
