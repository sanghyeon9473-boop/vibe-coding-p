/**
 * leFolio — Sanghyeon An (Solo Developer) Portfolio
 * 초보자도 쉽게 이해할 수 있는 직관적인 자바스크립트 스크립트
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. 모바일 햄버거 메뉴 열기/닫기
  // ==========================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-item');

  // 햄버거 버튼 클릭 시 메뉴 토글
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // 메뉴 항목(링크)을 누르면 모바일 메뉴가 자동으로 닫히도록 설정
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 2. 화면 스크롤 시 헤더(네비게이션) 스타일 변경
  // ==========================================
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    // 30px 이상 스크롤되면 그림자가 생기는 클래스 추가
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 3. 미디어 쇼케이스 (비디오 재생/일시정지 인터랙션)
  // ==========================================
  const playBtn = document.getElementById('playBtn');
  const iconPlay = document.querySelector('.icon-play');
  const iconPause = document.querySelector('.icon-pause');
  const progressBarFill = document.getElementById('progressBarFill');
  const progressScrubber = document.getElementById('progressScrubber');
  const progressTrack = document.getElementById('progressTrack');
  const playingBadge = document.getElementById('playingBadge');
  const videoTime = document.getElementById('videoTime');

  let isPlaying = false;
  let progressPercent = 48; // 초기 48% 위치
  let playInterval = null;

  // 재생/일시정지 버튼 토글 함수
  function togglePlayState() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      // 재생 상태로 전환
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      playingBadge.classList.add('active');

      // 진행 바를 1초마다 조금씩 채워주는 타이머
      playInterval = setInterval(() => {
        if (progressPercent < 100) {
          progressPercent += 0.8;
          updateProgressUI(progressPercent);
        } else {
          // 영상이 끝나면 처음으로 리셋
          progressPercent = 0;
          updateProgressUI(progressPercent);
        }
      }, 200);
    } else {
      // 일시정지 상태로 전환
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
      playingBadge.classList.remove('active');
      clearInterval(playInterval);
    }
  }

  // 진행 바 UI 업데이트 함수
  function updateProgressUI(percent) {
    const clampedPercent = Math.min(Math.max(percent, 0), 100);
    progressBarFill.style.width = `${clampedPercent}%`;
    progressScrubber.style.left = `${clampedPercent}%`;
    
    // 타임코드 계산 (총 4분 23초 = 263초 기준)
    const totalSeconds = 263;
    const currentSeconds = Math.floor((clampedPercent / 100) * totalSeconds);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    videoTime.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs} MIN`;
  }

  if (playBtn) {
    playBtn.addEventListener('click', togglePlayState);
  }

  // 사용자가 진행 바(프로그레스 바)를 직접 클릭했을 때 해당 위치로 이동
  if (progressTrack) {
    progressTrack.addEventListener('click', (event) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const newPercent = (clickX / rect.width) * 100;
      progressPercent = newPercent;
      updateProgressUI(progressPercent);
    });
  }

  // ==========================================
  // 4. Contact Me / Hire Me 모달 팝업 열기 & 닫기
  // ==========================================
  const contactModal = document.getElementById('contactModal');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // 모든 Contact Me 버튼에 클릭 이벤트 연결
  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      contactModal.classList.add('active');
    });
  });

  // 닫기 (X) 버튼 클릭 시
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      contactModal.classList.remove('active');
    });
  }

  // 모달 바깥 어두운 배경 클릭 시 닫기
  if (contactModal) {
    contactModal.addEventListener('click', (event) => {
      if (event.target === contactModal) {
        contactModal.classList.remove('active');
      }
    });
  }

  // 키보드 ESC 키를 눌렀을 때도 닫히도록 지원
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contactModal.classList.contains('active')) {
      contactModal.classList.remove('active');
    }
  });

  // ==========================================
  // 5. 문의하기 폼 전송 이벤트 시뮬레이션
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const submitFormBtn = document.getElementById('submitFormBtn');

  if (submitFormBtn) {
    submitFormBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('nameInput');
      const emailInput = document.getElementById('emailInput');
      const messageInput = document.getElementById('messageInput');

      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('모든 필수 항목을 입력해주세요!');
        return;
      }

      // 전송 성공 피드백
      const originalText = submitFormBtn.textContent;
      submitFormBtn.textContent = '메시지가 성공적으로 전달되었습니다! ✨';
      submitFormBtn.style.backgroundColor = '#10B981';

      setTimeout(() => {
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
        submitFormBtn.textContent = originalText;
        submitFormBtn.style.backgroundColor = '';
        alert(`${nameInput.value || '고객'}님의 소중한 메시지가 개발자 안상현님에게 전송되었습니다!`);
      }, 1200);
    });
  }

  // ==========================================
  // 6. Download CV 링크 클릭 시 알림 안내
  // ==========================================
  const downloadCvLinks = document.querySelectorAll('a[href="#contact"].btn-text-link, #mobileCvBtn');
  downloadCvLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert('📄 Sanghyeon An의 최신 포트폴리오 및 개발자 이력서(CV.pdf) 다운로드가 시작됩니다!');
    });
  });
});
