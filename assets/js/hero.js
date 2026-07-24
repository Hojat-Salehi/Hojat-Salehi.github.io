document.addEventListener("DOMContentLoaded", function () {
  var video = document.getElementById("hero-pendulum-video");
  var toggle = document.getElementById("hero-pendulum-toggle");
  if (!video || !toggle) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setToggleLabel() {
    if (video.paused) {
      toggle.setAttribute("aria-label", "Play animation");
      toggle.innerHTML = '<span aria-hidden="true">&#9654;</span>';
    } else {
      toggle.setAttribute("aria-label", "Pause animation");
      toggle.innerHTML = '<span aria-hidden="true">&#10074;&#10074;</span>';
    }
  }

  if (!reduceMotion) {
    var playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(function () {
        // Autoplay blocked -- leave the poster frame showing, toggle still works.
      });
    }
  }
  setToggleLabel();

  toggle.addEventListener("click", function () {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    setToggleLabel();
  });
});
