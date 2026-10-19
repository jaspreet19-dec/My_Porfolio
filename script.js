/* =========================================
   PART 1 — NAVBAR SHRINKS ON SCROLL
   When user scrolls down 40px, the navbar
   gets a little smaller and shows a shadow.
   ========================================= */

const navbar = document.getElementById('navbar');

// Listen for scroll event on the whole window
window.addEventListener('scroll', function () {

  // window.scrollY = how many pixels user has scrolled down
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');    // add class → CSS makes it smaller
  } else {
    navbar.classList.remove('scrolled'); // remove class → back to normal
  }

});


/* =========================================
   PART 2 — HAMBURGER MENU (MOBILE)
   On small screens, nav links are hidden.
   Clicking ☰ button shows/hides them.
   ========================================= */

// Get the hamburger button and the nav links list
const hamburger = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

// When hamburger is clicked, toggle the menu open/close
hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
  // toggle = if class exists → remove it | if not → add it
  // CSS shows the menu only when "open" class is present
});

// Also close the menu when any nav link is clicked
const allNavLinks = navLinks.querySelectorAll('a'); // get all <a> tags inside navLinks

allNavLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open'); // close menu after clicking a link
  });
});


/* =========================================
   PART 3 — SCROLL REVEAL ANIMATION
   Sections start invisible (opacity: 0).
   When they scroll into view, they fade in
   and slide up into position.
   ========================================= */

// IntersectionObserver watches when elements enter the screen
const revealObserver = new IntersectionObserver(function (entries) {

  entries.forEach(function (entry, index) {

    // entry.isIntersecting = true when element is visible on screen
    if (entry.isIntersecting) {

      // Use setTimeout to stagger: each element waits a little longer
      // index 0 = 0ms delay, index 1 = 100ms delay, index 2 = 200ms, etc.
      setTimeout(function () {
        entry.target.classList.add('visible');
        // Adding "visible" triggers CSS transition (opacity 0→1, slide up)
      }, index * 100);

    }
  });

}, { threshold: 0.12 }); // trigger when 12% of element is visible

// Find all elements with class "reveal" and watch them
const revealElements = document.querySelectorAll('.reveal');

revealElements.forEach(function (element) {
  revealObserver.observe(element); // start watching each element
});


/* =========================================
   PART 4 — ACTIVE NAV LINK HIGHLIGHT
   As you scroll through sections, the
   matching nav link turns white/bright.
   ========================================= */

// Get all sections that have an id (about, skills, projects, etc.)
const sections   = document.querySelectorAll('section[id]');

// Get all nav anchor links
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {

  let currentSection = ''; // will hold the id of current visible section

  // Loop through each section and check if we've scrolled past it
  sections.forEach(function (section) {
    // offsetTop = how far the section is from the top of the page
    // We subtract 80 so it activates slightly before the section
    if (window.scrollY >= section.offsetTop - 80) {
      currentSection = section.getAttribute('id'); // e.g. "about"
    }
  });

  // Now highlight the matching nav link
  navAnchors.forEach(function (link) {
    link.style.color = ''; // first reset all links to default color

    // Check if this link points to the current section
    // e.g. href="#about" === "#about"
    if (link.getAttribute('href') === '#' + currentSection) {
      link.style.color = '#ffffff'; // make the active link white
    }
  });

});


/* =========================================
   PART 5 — TYPING TEXT EFFECT
   The job title in hero section types out
   letter by letter, then deletes, then
   types the next one. Loops forever.
   ========================================= */

// List of roles to type out one by one
const roles = [
  'Full Stack Developer',
  'Python Developer',
  'Frontend Developer',
  'Flask Developer'
];

let roleIndex  = 0;     // which role we are currently showing
let charIndex  = 0;     // how many characters we've typed so far
let isDeleting = false; // are we typing forward or deleting backward?

// The <b> tag inside .hero-role in HTML
const heroRoleText = document.querySelector('.hero-role b');

// Only run if the element exists on the page
if (heroRoleText) {

  function typeEffect() {

    const currentRole = roles[roleIndex]; // e.g. "Full Stack Developer"

    if (!isDeleting) {
      // TYPING FORWARD: show one more character each time
      heroRoleText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      // When we've typed the full word, start deleting after a pause
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1800); // wait 1.8 seconds before deleting
        return; // stop here and wait
      }

    } else {
      // DELETING BACKWARD: remove one character each time
      heroRoleText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      // When fully deleted, move to the next role
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        // % roles.length makes it loop back to 0 after the last role
      }
    }

    // Call this function again after a short delay
    // Deleting (60ms) is faster than typing (100ms) — feels natural
    const speed = isDeleting ? 60 : 100;
    setTimeout(typeEffect, speed);
  }

  // Start the typing effect after 1.5 seconds (let page load first)
  setTimeout(typeEffect, 1500);

}


/* =========================================
   PART 6 — SMOOTH SCROLL FOR ANCHOR LINKS
   When you click a nav link like "#about",
   it scrolls smoothly instead of jumping.
   ========================================= */

// Get all links that start with "#" (anchor links)
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {

    // Get the target section e.g. "#about" → finds <section id="about">
    const targetId      = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      event.preventDefault(); // stop default jump behavior

      // Smoothly scroll to that section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

  });
});


/* =========================================
   PART 7 — SKILL TAG HOVER EFFECT
   Tags slightly grow when you hover them.
   ========================================= */

const allTags = document.querySelectorAll('.tag');

allTags.forEach(function (tag) {

  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.05)'; // grow 5% on hover
  });

  tag.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)'; // back to normal when mouse leaves
  });

});


/* =========================================
   PART 8 — AUTO UPDATE YEAR IN FOOTER
   So you don't have to manually change
   "2026" every year.
   ========================================= */

const footerTextEl = document.querySelector('.footer-text');

if (footerTextEl) {
  const currentYear = new Date().getFullYear(); // gets current year e.g. 2026
  footerTextEl.innerHTML = footerTextEl.innerHTML.replace('2026', currentYear);
}