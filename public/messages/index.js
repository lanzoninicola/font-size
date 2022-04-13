(function () {
  if (window) {
    window.addEventListener(
      "message",
      (event) => {
        if (
          event.origin !== "https://font-size-eight.vercel.app" ||
          event.origin !== "http://172.24.64.1:3000"
        )
          return;
      },
      false
    );
  }
})();
