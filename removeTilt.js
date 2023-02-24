// define the class you want to remove
const classToRemove = 'tilt';

// function to remove class based on screen size
function removeClassOnScreenSize() {
  // get the window width
  const windowWidth = window.innerWidth;

  // check if the window width is less than or equal to 768px
  if (windowWidth <= 768) {
    // get the element(s) with the class to remove
    const elements = document.getElementsByClassName(classToRemove);

    // loop through the elements and remove the class
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(classToRemove);
    }
  }
}

// call the function on page load and when the window is resized
window.onload = removeClassOnScreenSize;
window.addEventListener('resize', removeClassOnScreenSize);
