// ==UserScript==
// @name         Steam Profile Archiver Button
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  Adds a button to archive Steam profiles from backpack.tf user and profile pages
// @author       STEVE
// @match        https://backpack.tf/u/*
// @match        https://backpack.tf/profiles/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Extract the Steam ID from the URL
    const urlPath = window.location.pathname;
    const steamID = urlPath.split('/').pop();
    const steamProfileURL = `http://steamcommunity.com/profiles/${steamID}`;
    const archiveURL = `https://archive.ph/?run=1&url=${encodeURIComponent(steamProfileURL)}`;

    // Create the button
    const archiveButton = document.createElement('button');
    archiveButton.innerText = 'Archive Steam Profile';
    archiveButton.style.padding = '10px 20px';
    archiveButton.style.backgroundColor = '#007bff';
    archiveButton.style.color = '#fff';
    archiveButton.style.border = 'none';
    archiveButton.style.borderRadius = '5px';
    archiveButton.style.cursor = 'pointer';
    archiveButton.onclick = () => {
        window.open(archiveURL, '_blank');
    };

    // Create a container div for the button
    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '10px';  // Adds space above the button
    buttonContainer.style.textAlign = 'right'; // Aligns the button to the right
    buttonContainer.appendChild(archiveButton);

    // Function to insert button container after the specified element
    function addButton() {
        const targetElement = document.querySelector('#page-content > div.row > div.col-md-7 > div:nth-child(1) > div.panel-body.padded > div > div:nth-child(3)');
        if (targetElement) {
            // Insert the button container after the target element
            targetElement.parentNode.insertBefore(buttonContainer, targetElement.nextSibling);

            // Adjust button container position
            buttonContainer.style.position = 'relative'; // Relative to its parent
            buttonContainer.style.right = '15px';  // Adjust the left position
        } else {
            // Fallback to fixed position if the target element is not found
            buttonContainer.style.position = 'fixed';
            buttonContainer.style.bottom = '10px';
            buttonContainer.style.right = '25px';  // Adjust as needed
            buttonContainer.style.zIndex = '1000';
            document.body.appendChild(buttonContainer);
        }
    }

    // Retry adding the button if it's not visible
    function retryAddButton() {
        let attempts = 0;
        const maxAttempts = 10;
        const interval = setInterval(() => {
            if (document.querySelector('#page-content')) {
                addButton();
                clearInterval(interval);
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
            }
            attempts++;
        }, 2000); // Retry every 2 seconds
    }

    // Start the retry process
    retryAddButton();
})();