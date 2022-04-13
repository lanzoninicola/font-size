(function () {
  if (window) {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== "https://casamento-convite.vercel.app") return;

        console.log(event.data);
      },
      false
    );
  }
})();
