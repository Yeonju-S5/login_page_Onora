document.addEventListener('DOMContentLoaded', () => {

  // id_result
  const goToLoginBtn = document.querySelector('.go_login_btn');
  if (goToLoginBtn) {
    goToLoginBtn.addEventListener('click', () => {
      location.href = "./login.html";
    });
  }

  
  // pw_result
  const pwInput = document.getElementById('new_pw');
  const pwConfirm = document.getElementById('confirm_pw');
  const pwCheckBtn = document.getElementById('pw_check_btn');
  const successMsg = document.getElementById('pw_success');
  const errorMsg = document.getElementById('pw_error');
  const changePwBtn = document.getElementById('change_pw_btn');

  if (pwInput && pwConfirm && pwCheckBtn) {

    pwCheckBtn.addEventListener('click', () => {
      const val1 = pwInput.value.trim();
      const val2 = pwConfirm.value.trim();

      successMsg.classList.add('hidden');
      errorMsg.classList.add('hidden');

      if (!val1 || !val2) {
        alert("비밀번호를 입력해주세요.");
        return;
      }

      if (val1 === val2) {
        successMsg.classList.remove('hidden');
      } else {
        errorMsg.classList.remove('hidden');
      }
    });

    if (changePwBtn) {
      changePwBtn.addEventListener('click', () => {
        if (successMsg.classList.contains('hidden')) {
          alert("비밀번호 일치 확인을 완료해주세요.");
          return;
        }

        // 비밀번호 길이/형식 추가 검사 (필요 시)
        if (pwInput.value.length < 8) {
          alert("비밀번호는 최소 8자리 이상이어야 합니다.");
          return;
        }

        alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
        location.href = "./login.html";
      });
    }
  }
});