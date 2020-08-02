// The UI for sharing the simulation parameters:
// button clicks, showing/hiding text area with shared urls, messages etc.

import { hideAllControls } from './buttons.js';
import { getShareURL } from './share.js';
import { copyToClipboard } from './copy_to_clipboard.js';


/**
 * Remove text selection on page, if present.
 */
function clearSelection() {
  if (window.getSelection) {window.getSelection().removeAllRanges();}
  else if (document.selection) {document.selection.empty();}
}


function didClickShare(initialParams, currentParams) {
  return (e) => {
    hideAllControls();
    clearSelection();

    var outcomeElement = document.querySelector('.TwoGalaxies-copyOutcome');
    outcomeElement.innerHTML = "&nbsp;";

    var container = document.querySelector(".TwoGalaxies-shareContainer");
    container.classList.remove("TwoGalaxies--isHidden");

    let url = getShareURL(initialParams, currentParams);

    let textArea = document.querySelector(".TwoGalaxies-shareText");
    textArea.value = url;

    // Show the area and the copy button
    textArea.classList.remove("TwoGalaxies--isHidden");

    var button = document.querySelector(".TwoGalaxies-copyToClipboardButton");
    button.classList.remove("TwoGalaxies--isHidden");

    return false; // Prevent default
  };
}


function didClickCopyToClipboard() {
    var copyTextarea = document.querySelector('.TwoGalaxies-shareText');
    var outcomeElement = document.querySelector('.TwoGalaxies-copyOutcome');

    copyToClipboard(copyTextarea).then(
      () => {
        outcomeElement.innerHTML = "Copied";
        let button = document.querySelector(".TwoGalaxies-copyToClipboardButton");
        copyTextarea.classList.add("TwoGalaxies--isHidden");
        button.classList.add("TwoGalaxies--isHidden");
      },
      (err) => outcomeElement.innerHTML = "Error: " + err);
}


export function initShareUI(initialParams, currentParams) {
  // Share button
  // --------

  var button = document.querySelector(".TwoGalaxies-shareButton");
  button.onclick = didClickShare(initialParams, currentParams);

  // Copy to clipboard button
  // --------

  button = document.querySelector(".TwoGalaxies-copyToClipboardButton");
  button.onclick = didClickCopyToClipboard;

}
