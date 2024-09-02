// ==UserScript==
// @name         Steam Profile Archiver Button for Reports
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds a button to archive Steam profiles from backpack.tf issue reports
// @author       STEVE
// @match        https://backpack.tf/issue/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. Extract the Steam ID from the report title using the provided XPath
    const reportElement = document.evaluate(
        '/html/body/main/div/div[1]/div/div/div[2]/div[1]/h4',
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;

    if (!reportElement) return; // Exit if the report element is not found

    const reportTitle = reportElement.textContent;
    const steamIDMatch = reportTitle.match(/User Report: (\d+) \(/);
    if (!steamIDMatch) return; // Exit if no Steam ID found
    const steamID = steamIDMatch[1];
    const steamProfileURL = `http://steamcommunity.com/profiles/${steamID}`;

    // 2. Create the archive URL
    const archiveURL = `https://archive.ph/?run=1&url=${encodeURIComponent(steamProfileURL)}`;

    // 3. Create the button
    const archiveButton = document.createElement('button');
    archiveButton.innerText = 'Archive Steam Profile';
    archiveButton.style.marginLeft = '10px';
    archiveButton.style.padding = '5px 10px';
    archiveButton.style.backgroundColor = '#007bff';
    archiveButton.style.color = '#fff';
    archiveButton.style.border = 'none';
    archiveButton.style.borderRadius = '5px';
    archiveButton.style.cursor = 'pointer';
    archiveButton.onclick = () => {
        window.open(archiveURL, '_blank');
    };

    // 4. Insert the button below the report title
    reportElement.appendChild(archiveButton);

})();