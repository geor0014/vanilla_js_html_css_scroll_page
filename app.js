// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById(`date`);
date.innerHTML = new Date().getFullYear();
// ********** close links ************
const linksContainer = document.querySelector(`.links-container`);
const toggleBtn = document.querySelector(`.nav-toggle`);
const links = document.querySelector(`.links`);

toggleBtn.addEventListener(`click`, function () {
  //   linksContainer.classList.toggle(`show-links`);
  const containerHeight = linksContainer.getBoundingClientRect().height; //look at top what this method does
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`; //sets the height of the container to the height of the links in pixels
  } else {
    linksContainer.style.height = 0; //if it's already open, it hides them
  }
});

const navBar = document.getElementById(`nav`);
const topLink = document.querySelector(`.top-link`);
// ********** fixed navbar ************
window.addEventListener(`scroll`, function () {
  const scrollHeight = window.pageYOffset; //how much you've scrolled
  const navBarHeight = navBar.getBoundingClientRect().height;

  if (scrollHeight > navBarHeight) {
    //if you've scrolled more than navBard it adds the fixed-nav
    navBar.classList.add(`fixed-nav`);
  } else {
    navBar.classList.remove(`fixed-nav`);
  }

  if (scrollHeight > 500) {
    topLink.classList.add(`show-link`);
  } else {
    topLink.classList.remove(`show-link`);
  }
});
// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(`.scroll-link`);

scrollLinks.forEach(function (para) {
  para.addEventListener(`click`, function (whenClicked) {
    whenClicked.preventDefault(); //prevents default acction for each btn
    //navigate to specific spot
    const idOfClicked = whenClicked.currentTarget.getAttribute(`href`).slice(1); //gets `href` bc 0-index is #
    const idOfElement = document.getElementById(idOfClicked);

    //calculate the heights
    const navHeight = navBar.getBoundingClientRect().height;
    const linksContainerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navBar.classList.contains(`fixed-nav`);

    let position = idOfElement.offsetTop - navHeight; //gives in pixels the position of clicked element

    if (!fixedNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
  });
});
