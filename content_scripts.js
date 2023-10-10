window.onload = () => {
  setInterval(() => {
    try {
      let chatframe = document.getElementById("chatframe");
      let el;
      let inputContainer;
      let _window;

      // 새 창에서 새 탭 열기 -> chatframe이 존재하지 않음
      // null값을 체크해 inputContainer를 document에서 찾을지, el에서 찾을지 지정
      if (chatframe == null) {
        inputContainer = document.querySelector("#input");
        _window = window;
      } else {
        el = chatframe.contentWindow.document;
        inputContainer = el.querySelectorAll("#input")[1];
        _window = chatframe.contentWindow;
      }
      let input = inputContainer.children[1];

      // focus 이벤트
      inputContainer.addEventListener("focusin", function (e) {
        e.preventDefault();
        addPrefix(inputContainer, input, _window);
      });

      // click 이벤트
      inputContainer.addEventListener("click", function (e) {
        e.preventDefault();
        addPrefix(inputContainer, input, _window);
      });

      // enter 이벤트
      inputContainer.addEventListener("keyup", function (e) {
        if (e.keyCode === 13 && inputContainer.hasAttribute("focused")) {
          e.preventDefault();
          addPrefix(inputContainer, input, _window);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, 500);
};

// prefix 삽입 함수
function addPrefix(inputContainer, input, _window) {
  try {
    // On Off 상태 획득
    chrome.storage.local.get(["toggleState"], function (toggleResult) {
      // unchecked or undefined 시 리턴
      if (!toggleResult) return;
      if (toggleResult.toggleState != true) return;

      chrome.storage.local.get(["prefix"], function (result) {
        let prefix = result.prefix + "\u00a0";
        let inputText = input.innerText;

        if (!prefix || inputText) {
          return;
        }

        inputContainer.setAttribute("has-text", true);
        input.removeAttribute("aria-invalid");
        input.innerText = `${prefix}`;

        // 커서를 맨 뒤로 이동 -- start
        const range = document.createRange();
        range.setStart(input.childNodes[0], prefix.length);
        range.setEnd(input.childNodes[0], prefix.length);

        const selection = _window.document.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        // 커서를 맨 뒤로 이동 -- end
      });
    });
  } catch (err) {}
}
