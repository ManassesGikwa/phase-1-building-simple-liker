// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


// Select all elements with the class 'like-glyph' (hearts)
const hearts = document.querySelectorAll(".like-glyph");

// Select the modal element by its ID
const modal = document.getElementById("modal");

// Initially, set the modal's class to 'hidden' to hide it
modal.className = "hidden";

// Callback function to handle the click event on a heart
function likeCallback(e) {
  // Get the heart element that triggered the click event
  const heart = e.target;

  // Simulate a server call using mimicServerCall
  mimicServerCall()
    .then(() => {
      // If the heart is currently empty, fill it; otherwise, empty it
      if (heart.innerText === EMPTY_HEART) {
        heart.innerText = FULL_HEART;
        heart.className = "activated-heart";
      } else {
        heart.innerText = EMPTY_HEART;
        heart.className = "";
      }
    })
    .catch((error) => {
      // If there is a server error, display the modal with the error message
      modal.className = "";
      modal.innerText = error;

      // Hide the modal after 3 seconds
      setTimeout(() => (modal.className = "hidden"), 3000);
    });
}

// Add the click event listener to each heart
for (const glyph of hearts) {
  glyph.addEventListener("click", likeCallback);
}



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
