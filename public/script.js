// Optional script for handling adjustments
(function () {
  function fitScreen() {
    const mockup = document.getElementById("mockup");
    const screen = document.getElementById("phone-screen");
    if (!mockup || !screen) return;
    // Currently placeholder: CSS handles screen sizing.
    // You can add dynamic adjustments here if needed.
  }
  window.addEventListener("resize", fitScreen);
  fitScreen();
})();




fetch("/track", { method: "POST" })
        .then((res) => res.json())
        .then((data) => console.log("Visitor tracked:", data))
        .catch((err) => console.error("Tracking failed:", err));