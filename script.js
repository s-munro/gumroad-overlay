'use strict';

const stylesheets = ['style'];

// adds stylesheet to HTML for button, overlay, and modal.
const addSheet = (sheet) => {
  const styleSheet = document.createElement('link');
  styleSheet.rel = 'stylesheet';
  styleSheet.href = `https://unpkg.com/samroad-overlay@1.1.8/stylesheets/${sheet}.css`;
  document.head.appendChild(styleSheet);
};

// in case more sheets are to-be added
const addSheets = (sheets) => {
  for (let sheet of sheets) {
    addSheet(sheet);
  }
};

/**
 * shows error with animations
 * animations: toast fade in, fade out (after 2s), then removal (after 2.5s)
 * animations were done with setTimeout due to unusual DOM interactions, would ideally look into this.
 */
const showError = (toast) => {
  toast.classList.add('samroad-toast');
  toast.textContent = 'Error! Looks like the url is invalid :(';
  document.body.appendChild(toast);
  requestAnimationFrame(() =>
    setTimeout(() => {
      toast.style.opacity = 1;
    })
  );
  setTimeout(() => {
    toast.style.opacity = 0;
  }, 2000);
  setTimeout(() => {
    toast.remove();
  }, 2500);
};

const addModal = (tag, url) => {
  // initialize the html elements
  const overlayContainer = document.createElement('div');
  const samroadModal = document.createElement('div');
  const samroadIFrame = document.createElement('iframe');
  const samroadToast = document.createElement('div');

  // for validating URLS - supports several domains -- I'm not entirely familiar with the Gumroad URL system, so I would ideally learn more about this.
  const validURLRegex = /(https:\/\/([a-zA-Z]+\.)?gumroad\.com\/l\/)|(https:\/\/gum\.co\/l\/)|(https:\/\/gum\.co\/)/g;
  const validURL = validURLRegex.test(url);

  // if gumroad link, create modal and add click listener for reveal
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

    // fades in the modal and adds clickaway listener
    tag.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      tag.removeEventListener('mouseout', removeOverlay, false);
      requestAnimationFrame(() =>
        setTimeout(() => {
          overlayContainer.style.opacity = 1;
          overlayContainer.style.zIndex = 1;
        })
      );
      // removes elem on clickaway
      addClickAwayListener('samroad-overlay', overlayContainer);
    });

    // show error toast if product link not from gumroad
  } else {
    tag.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      showError(samroadToast);
    });
  }
};

const addClickAwayListener = (idForRemoval, overlayContainer) => {
  const clickawayTarget = document.getElementById(idForRemoval);
  clickawayTarget.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    overlayContainer.style.opacity = 0;
    setTimeout(() => {
      clickawayTarget.remove();
    }, 200);
  });
};

// cleanup function for mouseout, prevents multiple overlays from being appended/rendered to DOM
const removeOverlay = () => {
  const overlay = document.getElementById('samroad-overlay');
  if (overlay) {
    overlay.remove();
  }
};

const addListeners = (tag) => {
  // initializes/preloads the modal and error toast, adds mouseout listener for cleanup
  tag.addEventListener('mouseover', function (e) {
    const url = tag.href;
    addModal(tag, url);
    tag.addEventListener('mouseout', removeOverlay, false);
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
