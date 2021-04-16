'use strict';

const stylesheets = ['style'];

// adds stylesheet to HTML for button, overlay, and modal.
const addSheet = (sheet) => {
  const styleSheet = document.createElement('link');
  styleSheet.rel = 'stylesheet';
  styleSheet.href = `https://unpkg.com/samroad-overlay@1.0.9/stylesheets/${sheet}.css`;
  document.head.appendChild(styleSheet);
};

// in case more sheets are to-be added
const addSheets = (sheets) => {
  for (let sheet of sheets) {
    addSheet(sheet);
  }
};

const showError = (toast) => {
  toast.classList.add('samroad-toast');
  toast.textContent = 'Error! Looks like the url is invalid :(';
  document.body.appendChild(toast);
  // initialize opacity 1 for fade-in
  requestAnimationFrame(() =>
    setTimeout(() => {
      toast.style.opacity = 1;
    })
  );
  // Fade-in
  setTimeout(() => {
    toast.style.opacity = 0;
  }, 2000);
  // Toast disappears after timeout
  setTimeout(() => {
    toast.remove();
  }, 2500);
};

const addModal = (url) => {
  // initialize the html elements
  const overlayContainer = document.createElement('div');
  const samroadModal = document.createElement('div');
  const samroadIFrame = document.createElement('iframe');
  const samroadToast = document.createElement('div');

  // regex for URL validation -- check if gumroad link
  const validURLRegex = /(https:\/\/gumroad\.com\/)|(https:\/\/gumroad\.com\/l\/)|(https:\/\/gum\.co\/l\/)|(https:\/\/gum\.co\/)/g;
  const validURL = validURLRegex.test(url);

  // if gumroad link, create modal
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

    // overlay starts with opacity 0, this makes it fade in
    requestAnimationFrame(() =>
      setTimeout(() => {
        overlayContainer.style.opacity = 1;
      })
    );

    // removes elem in arg on clickaway, overlay fade-out
    addClickAwayListener('samroad-overlay', overlayContainer);
  } else {
    console.log(url);
    console.log(validURL);
    // show error toast if product link not from gumroad
    showError(samroadToast);
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
