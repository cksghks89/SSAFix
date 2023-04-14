window.onload = () => {
  try {
    //패턴 " [한글_숫자한글_한글] "
    const pattern = /\[[\uAC00-\uD7AF]+_+[\uAC00-\uD7AF\d]+[\uAC00-\uD7AF]+_[\uAC00-\uD7AF]+\]/;
    //싸피 지역
    const area = ["대전", "부울경", "서울", "구미", "광주"];

    chrome.storage.local.get(["prefix"], function (result) {
      let prefix = result.prefix;
      console.log(prefix);

      if (!prefix) {
        return;
      }
      //패턴이 [지역_05반_이름] 맞다면
      if (pattern.test(prefix)) {
        let spT = prefix.replace("[", "").replace("]", "").split("_");
        let areaCheck = false;

        //입력한 지역이 싸피 지역인지 체크
        for (let i = 0; i < area.length; i++) {
          if (area[i] == spT[0]) {
            areaCheck = true;
            break;
          }
        }

        //loactionInput의 default 값 공백
        let locationInput = "";
        let nameInput = document.querySelector("input[name='name']");
        //만약 area 배열에 있는 값이 아니면 패스
        if (areaCheck) locationInput = document.querySelector("input[name='location']");
        let classNumInput = document.querySelector("input[name='classNum']");

        //input value 값 설정
        nameInput.value = spT[2];
        locationInput.value = spT[0];
        classNumInput.value = parseInt(spT[1].replace(/[^0-9]/gi, ""), 10);

        //이벤트 생성  { bubbles: true } 옵션을 추가하여, 이벤트가 상위 요소로 전파되도록 설정
        let event = new Event("change", { bubbles: true });

        //이벤트 강제 발생 (onChange)
        nameInput.dispatchEvent(event);
        locationInput.dispatchEvent(event);
        classNumInput.dispatchEvent(event);
      }
    });
  } catch (err) {}
};
