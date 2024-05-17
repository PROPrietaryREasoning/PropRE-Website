window.addEventListener('scroll', function() {
  let navbar = document.getElementById('pageheader');

  // Get the current scroll position
  let scrollPosition = window.scrollY;

  // Add or remove the 'black' class based on the scroll position
  if (scrollPosition > 75) { // Change 200 to the scroll distance when you want the navbar to turn black
    navbar.classList.add('pageheader_black');
  } else {
    navbar.classList.remove('pageheader_black');
  }
});



const buttons = document.querySelectorAll('button');

buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    button.style.backgroundColor = "#00beef";
    setTimeout(function() {
      button.style.backgroundColor = ""; // Revert to original color
    }, 200);
  });
});

const hamburger = document.querySelector(".nav_icon");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const menuhead_mobile = document.querySelector(".menuhead_mobile");


hamburger.addEventListener("click", () => {
  bar1.classList.toggle("animate_bar");
  bar2.classList.toggle("animate_bar");
  bar3.classList.toggle("animate_bar");
  menuhead_mobile.classList.toggle("open_menuhead_mobile");
});

const video = document.getElementById("video_back");
const videoBackDuration = 8; 
video.addEventListener("timeupdate", function() {
  if (video.currentTime >= videoBackDuration) {
    video.currentTime=0;
  }
});

// document.getElementById("butt_subs").addEventListener("click", function() {
//     window.location.href = "forms.html", "_blank"; // Redirect to the forms.html file
// });

document.getElementById("butt_subs").addEventListener("click", function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Open a pop-up window with the form URL
  let formUrl = "forms.html"; // Replace "forms.html" with the URL of your form
  let popupWindow = window.open(formUrl, "_blank", "width=800,height=600");

  // Focus on the pop-up window (optional)
  if (popupWindow) {
    popupWindow.focus();
  }
});


// Carousel transitions

/*To avoid conflicts and to make this as portable as possible, it’ll be in our best interest to shield our code from the global scope, so we’ll wrap it up in an IIFE.*/
(function(d){
  // All code will go in here. We've renamed 'document' to 'd'.
  let itemClassName = "postcard",
    items = d.getElementsByClassName(itemClassName),
    totalItems = items.length,
    slide = 0,
    moving = true;

  // Set classes
  function setInitialClasses() {
    // Targets the previous, current, and next items
    // This assumes there are at least three items.
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
  }
  // Set event listeners
  function setEventListeners() {
    let next = d.getElementsByClassName('carousel-button next')[0],
        prev = d.getElementsByClassName('carousel-button prev')[0];
    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
  }

  // Next navigation handler
  function moveNext() {
    // Check if moving
    if (!moving) {
      // If it's the last slide, reset to 0, else +1
      if (slide === (totalItems - 1)) {
        slide = 0;
      } else {
        slide++;
      }
      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }
  // Previous navigation handler
  function movePrev() {
    // Check if moving
    if (!moving) {
      // If it's the first slide, set as the last slide, else -1
      if (slide === 0) {
        slide = (totalItems - 1);
      } else {
        slide--;
      }
            
      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  function disableInteraction() {
    // Set 'moving' to true for the same duration as our transition.
    // (0.5s = 500ms)
    
    moving = true;
    // setTimeout runs its function once after the given time
    setTimeout(function(){
      moving = false
    }, 500);
  }

  function moveCarouselTo(slide) {
    // Check if carousel is moving, if not, allow interaction
    if(!moving) {
      // temporarily disable interactivity
      disableInteraction();
      // Update the "old" adjacent slides with "new" ones
      let newPrevious = slide - 1,
          newNext = slide + 1,
          oldPrevious = slide - 2,
          oldNext = slide + 2;
      // Test if carousel has more than three items
      if ((totalItems - 1) > 3) {
        // Checks and updates if the new slides are out of bounds
        if (newPrevious <= 0) {
          oldPrevious = (totalItems - 1);
        } else if (newNext >= (totalItems - 1)){
          oldNext = 0;
        }
        // Checks and updates if slide is at the beginning/end
        if (slide === 0) {
          newPrevious = (totalItems - 1);
          oldPrevious = (totalItems - 2);
          oldNext = (slide + 1);
        } else if (slide === (totalItems -1)) {
          newPrevious = (slide - 1);
          newNext = 0;
          oldNext = 1;
        }
        // Now we've worked out where we are and where we're going, 
        // by adding/removing classes we'll trigger the transitions.
        // Reset old next/prev elements to default classes
        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;
        // Add new classes
        items[newPrevious].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[newNext].className = itemClassName + " next";
      }
    }
  }

  function initCarousel() {
    setInitialClasses();
    setEventListeners();
    // Set moving to false so that the carousel becomes interactive
    moving = false;
  }

  // Initialize the carousel
  initCarousel();

}(document));

