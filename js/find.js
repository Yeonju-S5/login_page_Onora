window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#find_pw') {
    const pwRadio = document.getElementById('find_pw');
    if (pwRadio) pwRadio.checked = true;
  }

  if (window.location.hash === '#find_id') {
    const idRadio = document.getElementById('find_id');
    if (idRadio) idRadio.checked = true;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const verifyButtons = document.querySelectorAll('.btn_verify');
  const authBoxes = document.querySelectorAll('.auth_box');

  const mockAuthAlert = (e) => {
    if (e) e.preventDefault();
    alert("📢 안내드립니다.\n\n본 사이트는 개인 학습용으로 제작되어 실제 메시지 발송 및 외부 본인 인증 기능이 제한되어 있습니다.\n\n 하단의 찾기 버튼을 눌러 결과 페이지를 확인해 주세요!");
  };

  verifyButtons.forEach(btn => {
    btn.addEventListener('click', mockAuthAlert);
  });

  authBoxes.forEach(box => {
    box.addEventListener('click', mockAuthAlert);
  });

  const phoneInputs = document.querySelectorAll('.input_num');

  phoneInputs.forEach((input, index) => {
    input.setAttribute('maxlength', '4');

    input.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');

      if (this.value.length >= 4) {
        const nextInput = phoneInputs[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && this.value.length === 0) {
        const prevInput = phoneInputs[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      }
    });
  });


  const emailSelects = document.querySelectorAll('.domain_select');

  emailSelects.forEach(select => {
    select.addEventListener('change', function () {
      const emailInput = this.parentElement.querySelector('.input_email');

      if (this.value === 'direct') {
        this.style.display = 'none';

        const directInput = document.createElement('input');
        directInput.type = 'text';
        directInput.className = 'input_field domain_direct_input';
        directInput.placeholder = '도메인 입력';
        directInput.style.width = '140px';

        this.parentNode.insertBefore(directInput, this.nextSibling);
        directInput.focus();

        directInput.addEventListener('blur', function () {
          if (this.value === '') {
            this.remove();
            select.style.display = 'inline-block';
            select.value = 'naver.com';
          }
        });
      }
    });
  });
});