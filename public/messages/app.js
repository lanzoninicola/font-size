(function () {
  if (window) {
    window.addEventListener(
      "message",
      (event) => {
        console.log(event.data);
        if (
          event.origin !== "https://font-size-eight.vercel.app" ||
          event.origin !== "http://172.24.64.1:3000"
        )
          return;

        console.log("im listening");

        console.log(event.origin);
        console.log(event.data);
      },
      false
    );
  }
})();
