(function () {
  if (window) {
    window.addEventListener(
      "message",
      (event) => {
        console.log("im listening");
        console.log("***** EVENT ORIGIN **********", event.origin);
        console.log("***** EVENT DATA **********", event.data);
        if (event.origin !== "https://casamento-convite.vercel.app") return;

        console.log("***** POST IF **********");

        console.log("im listening 2");

        console.log(event.origin);
        console.log(event.data);
      },
      false
    );
  }
})();
