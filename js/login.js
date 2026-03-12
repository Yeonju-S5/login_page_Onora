document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.querySelector('.loginbox');
  const idInput = document.querySelector('.left_Loginbox .inputbox[type="text"]');
  const pwInput = document.querySelector('.left_Loginbox .inputbox[type="password"]');
  const noneMemberBtn = document.querySelector('.none-member');
  const serviceCenterLink = document.querySelector('.link_center a');

  if (loginBtn) {
    loginBtn.style.cursor = 'pointer';

    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (!idInput || !pwInput) {
        console.error("입력창을 찾을 수 없습니다. HTML 클래스를 확인하세요.");
        return;
      }

      const idValue = idInput.value.trim();
      const pwValue = pwInput.value.trim();

      console.log("입력 확인 -> 아이디:", idValue, "비번:", pwValue);

      if (idValue === "" && pwValue === "") {
        alert("아이디와 비밀번호가 모두 누락되었습니다.\n※모든 정보를 입력하신 후 다시 시도해 주세요.");
        idInput.focus();
      } else if (idValue === "") {
        alert("아이디가 입력되지 않았습니다.\n※가입하신 아이디를 확인 후 입력해 주세요.");
        idInput.focus();
      } else if (pwValue === "") {
        alert("비밀번호가 입력되지 않았습니다.\n※비밀번호 보안 정책에 맞게 입력하셨는지 확인해 주세요.");
        pwInput.focus();
      } else {
        alert(
          "로그인에 성공하였습니다!\n\n" +
          "[안내] 현재는 테스트 모드로 작동 중이며, 정식 런칭 시 보안 강화 및 실제 회원 DB 검증 로직이 적용될 예정입니다."
        );

        const saveIdCheck = document.querySelector('.save_id input[type="checkbox"]');

        if (saveIdCheck && saveIdCheck.checked) {
          pwInput.value = "";
          idInput.focus();
        } else {
          idInput.value = "";
          pwInput.value = "";
          idInput.focus();
        }
      }
    });
  }

  const noticeAlert = (e) => {
    e.preventDefault();
    alert(" [시스템 안내: 향후 업데이트 계획] \n\n" +
    "1. 비회원 주문조회:\n" +
    " - 현황: 현재 회원 로그인 기능 구현에 집중하여 설계되었습니다.\n" +
    " - 해결 방안: 추후 비회원 전용 주문 데이터 확인 페이지를 제작하여 주문번호 입력 시 정보를 호출하도록 기능을 확장할 예정입니다.\n\n" +
    "2. 고객센터 (CS Center):\n" +
    " - 현황: 사용자 편의를 위한 고객센터 레이아웃 기획 단계입니다.\n" +
    " - 해결 방안: 자주 묻는 질문(FAQ) 리스트와 1:1 상담 게시판 기능을 추가하여 사용자 지원 서비스를 강화할 계획입니다.\n\n" +
    "※ 현재는 로그인 및 아이디/비밀번호 찾기 위주로 검토해 주시면 감사하겠습니다.");
  };

  if (noneMemberBtn) noneMemberBtn.addEventListener('click', noticeAlert);
  if (serviceCenterLink) serviceCenterLink.addEventListener('click', noticeAlert);
});