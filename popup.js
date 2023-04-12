let saveBtn = document.getElementById("saveBtn");
let prefixEl = document.getElementById("prefix");
let clearBtn = document.getElementById("clearBtn");
let inputBox = document.getElementById("input-box");
let clearBox = document.getElementById("clear-box");
let state = null;

// popup창 로딩시 동작
window.onload = () => {
  chrome.storage.sync.get(["prefix"], function (result) {
    if (result.prefix) {
      prefixEl.value = result.prefix;
      //값이있다면 클리어 버튼 출력해라
      clearBtn.style.visibility = "visible";
      state = false;
      saveBtnToggle(false);
    } else {
      state = true;
      saveBtnToggle(true);
    }
  });
};

// 저장 버튼 클릭시 이벤트 처리
saveBtn.addEventListener("click", () => {
  if (saveBtn.innerText === "저장") {
    let value = prefixEl.value;
    chrome.storage.sync.set({ prefix: value }, function () {});
    //state 변수 false로 사용 (focus 이벤트를 위해 사용)
    state = false;
    saveBtnToggle(false);
  } else if (saveBtn.innerText === "수정") {
    //state 변수 true로 사용 (focus 이벤트를 위해 사용)
    state = true;
    saveBtnToggle(true);
  }
});

// 저장 <-> 수정 버튼 토글 기능
function saveBtnToggle(boolean) {
  if (boolean) {
    saveBtn.innerText = "저장";
    prefixEl.removeAttribute("disabled");
    //inputBox의 배경색 변경
    inputBox.style.backgroundColor = "white";
    clearBox.style.backgroundColor = "white";
  } else {
    saveBtn.innerText = "수정";
    prefixEl.setAttribute("disabled", true);
    //inputBox의 배경색 변경
    inputBox.style.backgroundColor = "rgba(239, 239, 239)";
    clearBox.style.backgroundColor = "rgba(239, 239, 239)";
  }
}

//클리어 버튼 클릭시 storage와 value값 초기화
clearBtn.addEventListener("click", () => {
  prefixEl.value = null;
  chrome.storage.sync.set({ prefix: null }, function () {});
  saveBtn.innerText = "저장";
  state = true;
  saveBtnToggle(true);
  clearBtn.style.visibility = "hidden";
});

//input에 키가 눌릴때마다 value 체크해서 클리어 버튼 보여짐 여부
prefixEl.addEventListener("keyup", () => {
  if (prefixEl.value == "") {
    clearBtn.style.visibility = "hidden";
  } else {
    clearBtn.style.visibility = "visible";
  }
});

//박스에 테드리 focus 위한 이벤트
inputBox.addEventListener("mouseover", () => {
  if (state) inputBox.style.boxShadow = "0 0 0 1px black inset";
});

inputBox.addEventListener("mouseout", () => {
  if (state) inputBox.style.boxShadow = "0 0 0 0 black inset";
});
