// "Get in Touch" button: mailto: only does something if the visitor's
// browser has a default mail client configured, which many don't. Copying
// the address to the clipboard on click always works, regardless -- the
// mailto navigation still fires normally alongside it for anyone who does
// have a client set up.
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("home-cta-email");
  if (!btn || !navigator.clipboard) return;

  var originalLabel = btn.textContent;
  var resetTimer = null;

  btn.addEventListener("click", function () {
    var email = btn.getAttribute("href").replace(/^mailto:/, "").split("?")[0];
    navigator.clipboard.writeText(email).then(function () {
      btn.textContent = "Copied!";
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        btn.textContent = originalLabel;
      }, 2000);
    });
  });
});
