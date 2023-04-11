let saveBtn = document.getElementById("saveBtn");
let prefixEl = document.getElementById("prefix");

// popup창 로딩시 동작
window.onload = () => {
  chrome.storage.sync.get(["prefix"], function (result) {
    if (result.prefix) {
      prefixEl.value = result.prefix;
      saveBtnToggle(false);
    } else {
      saveBtnToggle(true);
    }
  });
};

// 저장 버튼 클릭시 이벤트 처리
saveBtn.addEventListener("click", () => {
  if (saveBtn.innerText === "저장") {
    let value = prefixEl.value;
    chrome.storage.sync.set({ prefix: value }, function () {});
    saveBtnToggle(false);
  } else if (saveBtn.innerText === "수정") {
    saveBtnToggle(true);
  }
});

// 저장 <-> 수정 버튼 토글 기능
function saveBtnToggle(boolean) {
  if (boolean) {
    saveBtn.innerText = "저장";
    prefixEl.removeAttribute("disabled");
  } else {
    saveBtn.innerText = "수정";
    prefixEl.setAttribute("disabled", true);
  }
}

// 활성화 시 storage에 활성 여부 데이터를 저장.
$('#onoff').on('click', () => {
  chrome.storage.local.set({ 'isEnable': $('#onoff').is(':checked') }, () => { });
});

// On - Off 버튼 조정
chrome.storage.local.get('isEnable', (flag) => {  
  $('#onoff').prop('checked', flag.isEnable);
  chrome.storage.local.set({ 'isEnable': $('#onoff').is(':checked') }, () => { });
})