window.onload = () => {
  setInterval(() => {
    let chatframe = document.getElementById("chatframe");
    let el = chatframe.contentWindow.document;
    let inputContainer = el.querySelector("#input");
    let input = inputContainer.children[1];

    inputContainer.addEventListener("focusin", function (e) {
      e.preventDefault();

      chrome.storage.sync.get(["prefix"], function (result) {
        let prefix = result.prefix;
        let inputText = input.innerText;

        if (!prefix || inputText) {
          console.log("return");
          return;
        }

        inputContainer.setAttribute("has-text", true);
        input.removeAttribute("aria-invalid");
        input.innerText = `${prefix}`;
      });
    });
  }, 2000);
};
