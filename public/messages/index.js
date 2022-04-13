(function () {
  if (window) {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== "https://casamento-convite.vercel.app") return;

        console.log(event.data);

        alert("Mensagem recebida do casamento-convite.vercel.app", event.data);
      },
      false
    );
  }
})();
