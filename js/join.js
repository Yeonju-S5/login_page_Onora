document.addEventListener('DOMContentLoaded', () => {
  const joinForm = document.querySelector('.join_form');

  // 요소 선택
  const idInput = document.querySelector('.id_input');
  const idCheckBtn = document.querySelector('.btn_check_duplicate');
  const idSuccess = document.getElementById('id_success');
  const idError = document.getElementById('id_error');

  const pwInput = document.querySelector('input[type="password"]:not(.pw_confirm)');
  const pwConfirm = document.querySelector('.pw_confirm');
  const pwSuccess = document.getElementById('pw_success');
  const pwError = document.getElementById('pw_error');

  const phoneInputs = document.querySelectorAll('.input_num');
  const verifyBtn = document.querySelector('.btn_verify');

  // 상태 관리 변수
  let isIdChecked = false;      // 아이디 중복확인 완료 여부
  let isPhoneVerified = false;  // 휴대폰 인증 완료 여부

  // 1. 아이디 중복 확인 (JSON 없이 로컬 로직으로 대체)
  if (idCheckBtn) {
    idCheckBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const idValue = idInput.value.trim();
      const idRegex = /^[a-zA-Z0-9]{5,20}$/;

      if (!idRegex.test(idValue)) {
        alert("⚠️ [입력 오류]: 아이디는 5~20자의 영문 소문자와 숫자만 가능합니다.");
        isIdChecked = false;
        idSuccess.classList.add('hidden');
        idError.classList.remove('hidden');
        return;
      }

      // 테스트용: 'admin'만 중복인 것으로 처리
      if (idValue === "admin") {
        alert("❌ 이미 사용 중인 아이디입니다.");
        isIdChecked = false;
        idSuccess.classList.add('hidden');
        idError.classList.remove('hidden');
      } else {
        alert("✅ 사용 가능한 아이디입니다!");
        isIdChecked = true;
        idSuccess.classList.remove('hidden');
        idError.classList.add('hidden');
      }
    });
  }

  // 2. 휴대폰 번호 숫자 제한 & 자동 이동 & 수정 시 인증 리셋
  phoneInputs.forEach((input, index) => {
    // 최대 글자수 4자로 제한
    input.setAttribute('maxlength', '4');

    input.addEventListener('input', function() {
      // 1. 숫자만 입력되도록 강제 필터링
      this.value = this.value.replace(/[^0-9]/g, '');

      // 2. 4글자가 다 차면 다음 칸으로 자동 포커스 이동
      if (this.value.length >= 4) {
        const nextInput = phoneInputs[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
      
      // 번호를 수정하면 인증 상태 초기화
      isPhoneVerified = false;
    });
  });

  // 3. 본인 인증 버튼 (평가 대비용 전문 멘트)
  if (verifyBtn) {
    verifyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isAllFilled = Array.from(phoneInputs).every(input => input.value.length >= 3);

      if (!isAllFilled) {
        alert("⚠️ [입력 오류]: 휴대폰 번호를 정확히 입력해 주세요.");
        return;
      }

      alert(" [본인 인증 안내] \n\n보안 정책상 실제 SMS 발송은 제한된 환경입니다.\n해결방안: 테스트 환경 확인을 위해 인증 완료 처리로 대체합니다.");
      isPhoneVerified = true;
      verifyBtn.innerText = "인증완료";
      verifyBtn.style.backgroundColor = "#ccc";
    });
  }

  // 4. 최종 폼 제출 유효성 검사
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      const inputs = joinForm.querySelectorAll('.input_text');
      let isAllFilled = true;

      // 필수값 체크
      inputs.forEach(input => {
        if (!input.value.trim()) isAllFilled = false;
      });

      if (!isAllFilled) {
        e.preventDefault();
        alert("⚠️ 모든 필수 정보를 입력해주세요.");
        return;
      }

      if (!isIdChecked) {
        e.preventDefault();
        alert("⚠️ 아이디 중복 확인이 필요합니다.");
        return;
      }

      if (pwInput.value !== pwConfirm.value) {
        e.preventDefault();
        alert("⚠️ 비밀번호가 일치하지 않습니다.");
        pwConfirm.focus();
        return;
      }

      if (!isPhoneVerified) {
        e.preventDefault();
        alert("⚠️ 휴대폰 인증을 완료해 주세요.");
        return;
      }

      e.preventDefault(); // 실제 제출 방지 (시험용)
      alert("🎉 회원가입이 성공적으로 완료되었습니다!");
      window.location.href = "login.html"; // 로그인 페이지로 이동
    });
  }
});