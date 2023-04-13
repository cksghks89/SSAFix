window.onload = () => {
  const pattern = /\[[\uAC00-\uD7AF]+_+[\uAC00-\uD7AF\d]+[\uAC00-\uD7AF]+_[\uAC00-\uD7AF]+\]/;
  const area = ["대전", "부울경", "서울", "구미", "광주"];
  console.log(chrome.storage);
  chrome.storage.sync.get(["prefix"], function (result) {
    let prefix = result.prefix;
    console.log(prefix);
    if (!prefix) {
      return;
    }
    if (pattern.test(prefix)) {
      let spT = prefix.replace("[", "").replace("]", "").split("_");
      console.log(spT);
      let nameInput = document.querySelector("input[name='name']");
      let locationInput = document.querySelector("input[name='location']");
      let classNumInput = document.querySelector("input[name='classNum']");

      nameInput.value = spT[2];
      locationInput.value = spT[0];
      classNumInput.value = spT[1].replace(/[^0-9]/gi, "");
    }
  });
};
