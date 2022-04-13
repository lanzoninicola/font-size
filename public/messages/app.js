window.addEventListener(
  "message",
  (event) => {
    console.log("im listening");
    if (event.origin !== "https://font-size-eight.vercel.app/") return;
  },
  false
);
