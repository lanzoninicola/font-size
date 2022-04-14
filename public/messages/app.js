(function () {
  if (window) {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== "https://font-size-eight.vercel.app") return;

        const iframeBody = document.getElementsByTagName("body");

        if (iframeBody[0]) {
          const style = document.createElement("style");
          style.textContent = event.data;

          iframeBody[0].appendChild(style);
        }
      },
      false
    );
  }
})();
