'use strict';

const stylesheets = ['style'];

// adds stylesheet to HTML for button, overlay, and modal.
const addSheet = (sheet) => {
  document.head.innerHTML += `<link rel="stylesheet" href="./stylesheets/${sheet}.css">`;
};

// in case more sheets are to-be added
const addSheets = (sheets) => {
  for (let sheet of sheets) {
    addSheet(sheet);
  }
};

const addModal = (url) => {
  // initialize the html elements
  const overlayContainer = document.createElement('div');
  const samroadModal = document.createElement('div');
  const samroadIFrame = document.createElement('iframe');
  const samroadToast = document.createElement('div');

  // insert regex for URL validation

  if (validURL) {
    // add iframe to modal, add src and ID, append to modal
    samroadIFrame.id = 'samroad-iframe';
    samroadIFrame.src = url;
    samroadModal.appendChild(samroadIFrame);

    // add modal to overlay, add classes and ID
    samroadModal.classList.add('samroad-modal');
    samroadModal.id = 'samroad-modal';
    overlayContainer.appendChild(samroadModal);

    // add overlay to document last, add classes and ID
    overlayContainer.id = 'samroad-overlay';
    overlayContainer.classList.add('samroad-overlay');
    document.body.appendChild(overlayContainer);

    addClickAwayListener('samroad-overlay', overlayContainer);
  } else {
    // make an error message
  }
};

const addClickAwayListener = (idForRemoval, overlayContainer) => {
  const clickawayTarget = document.getElementById(idForRemoval);
  clickawayTarget.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    clickawayTarget.remove();
  });
};

const addListeners = (tag) => {
  tag.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const url = tag.href;
    addModal(url);
  });
};

(() => {
  addSheets(stylesheets);
  const tags = document.getElementsByClassName('samroad-button');

  for (let tag of tags) {
    const showTag = tag.getAttribute('data-show');
    if (showTag === 'false') {
      tag.remove();
    }
    addListeners(tag);
  }
})();
