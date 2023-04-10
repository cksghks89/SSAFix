window.onload = () => {
  setInterval(() => {
    let chatframe = document.getElementById("chatframe");
    let el = chatframe.contentWindow.document;
    let inputContainer = el.querySelector("#input");
    let input = inputContainer.children[1];

    // focus 이벤트
    inputContainer.addEventListener("focusin", function (e) {
      e.preventDefault();
      addPrefix(inputContainer, input);
    });

    // click 이벤트
    inputContainer.addEventListener("click", function (e) {
      e.preventDefault();
      addPrefix(inputContainer, input);
    });

    // enter 이벤트
    inputContainer.addEventListener("keyup", function (e) {
      if (e.keyCode === 13 && inputContainer.hasAttribute("focused")) {
        e.preventDefault();
        addPrefix(inputContainer, input);
      }
    });
  }, 2000);
};

// prefix 삽입 함수
function addPrefix(inputContainer, input) {
  chrome.storage.sync.get(["prefix"], function (result) {
    let prefix = result.prefix;
    let inputText = input.innerText;

    if (!prefix || inputText) {
      return;
    }

    inputContainer.setAttribute("has-text", true);
    input.removeAttribute("aria-invalid");
    input.innerText = `${prefix}`;
  });
}
