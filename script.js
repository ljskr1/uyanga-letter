/**
 * A LOVE LETTER FOR UYANGA 🍃🌸✨
 * Interactive Sound, Particle Physics & Envelope Opening Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const waxSeal = document.getElementById('wax-seal');
  const envelope = document.getElementById('envelope');
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const letterModal = document.getElementById('letter-modal');
  const letterPaper = document.getElementById('letter-paper');
  const refoldBtn = document.getElementById('refold-btn');
  const loveShowerBtn = document.getElementById('love-shower-btn');
  const musicBtn = document.getElementById('music-btn');
  const audioStatus = document.getElementById('audio-status');
  const letterDateEl = document.getElementById('letter-date');
  const sparkleHint = document.getElementById('sparkle-hint');

  // Set formatted current date
  if (letterDateEl) {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    letterDateEl.textContent = now.toLocaleDateString(undefined, options);
  }

  // Audio status toast helper
  let statusToastTimer = null;
  function showAudioStatus(text) {
    if (!audioStatus) return;
    audioStatus.textContent = text;
    audioStatus.classList.add('visible');
    if (statusToastTimer) clearTimeout(statusToastTimer);
    statusToastTimer = setTimeout(() => {
      audioStatus.classList.remove('visible');
    }, 2400);
  }

  // =========================================================================
  // 1. WEB AUDIO API SYNTHESIZER (iOS Safari Safe & Self-Contained)
  // =========================================================================
  let audioCtx = null;
  let isMusicPlaying = false;
  let musicTimer = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Wax Crack / Paper Rustle Sound
  function playWaxBreakSound() {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    
    // Noise burst for wax seal crack
    const bufferSize = audioCtx.sampleRate * 0.08;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, now);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start(now);

    // Warm resonant bell chime
    playTone(523.25, 0.4, 0.22, 'sine'); // C5
    setTimeout(() => playTone(659.25, 0.6, 0.2, 'sine'), 100); // E5
    setTimeout(() => playTone(783.99, 0.8, 0.18, 'sine'), 220); // G5
    setTimeout(() => playTone(1046.50, 1.2, 0.15, 'sine'), 350); // C6
  }

  // Heart celebration chime
  function playHeartChime() {
    if (!audioCtx) return;
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playTone(freq, 0.8, 0.18, 'sine');
      }, idx * 65);
    });
  }

  // Play a gentle bell tone
  function playTone(freq, duration, volume = 0.2, type = 'sine') {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const now = audioCtx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Audio fallback
    }
  }

  // Soothing Pentatonic Ambient Lo-Fi Melody Loop
  const lofiMelody = [
    { freq: 440.00, dur: 1.5 }, // A4
    { freq: 523.25, dur: 1.8 }, // C5
    { freq: 587.33, dur: 1.5 }, // D5
    { freq: 659.25, dur: 2.2 }, // E5
    { freq: 587.33, dur: 1.5 }, // D5
    { freq: 523.25, dur: 2.0 }, // C5
    { freq: 392.00, dur: 2.5 }, // G4
    { freq: 440.00, dur: 3.0 }  // A4
  ];

  function startAmbientMusic(showToast = true) {
    if (isMusicPlaying) return;
    initAudio();
    isMusicPlaying = true;
    if (musicBtn) {
      musicBtn.classList.add('playing');
      musicBtn.querySelector('.music-icon').textContent = '🎶';
    }
    if (showToast) {
      showAudioStatus('🎵 Playing Gentle Breeze');
    }

    let noteIndex = 0;
    function scheduleNextNote() {
      if (!isMusicPlaying) return;
      const note = lofiMelody[noteIndex];
      playTone(note.freq, note.dur, 0.08, 'sine');
      
      // Subtle harmonic octave bell
      if (Math.random() > 0.45) {
        setTimeout(() => {
          if (isMusicPlaying) playTone(note.freq * 2, 0.6, 0.025, 'sine');
        }, 150);
      }

      noteIndex = (noteIndex + 1) % lofiMelody.length;
      musicTimer = setTimeout(scheduleNextNote, 1200 + Math.random() * 400);
    }

    scheduleNextNote();
  }

  function stopAmbientMusic(showToast = true) {
    isMusicPlaying = false;
    if (musicTimer) clearTimeout(musicTimer);
    if (musicBtn) {
      musicBtn.classList.remove('playing');
      musicBtn.querySelector('.music-icon').textContent = '🎵';
    }
    if (showToast) {
      showAudioStatus('🔇 Music Muted');
    }
  }

  // Music toggle button
  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      if (isMusicPlaying) {
        stopAmbientMusic(true);
      } else {
        startAmbientMusic(true);
      }
    });
  }

  // =========================================================================
  // 2. ENVELOPE OPENING & REFOLD CHOREOGRAPHY
  // =========================================================================
  let isEnvelopeOpened = false;

  function openLetter() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    initAudio();
    playWaxBreakSound();
    startAmbientMusic(false);

    // Wax seal explodes with particles
    if (waxSeal) {
      waxSeal.classList.add('broken');
      const rect = waxSeal.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      spawnParticleBurst(centerX, centerY, 55, ['#e2b251', '#fce58d', '#8f1925', '#ffb7c5', '#ffffff']);
    }

    // Flap opens
    setTimeout(() => {
      if (envelope) envelope.classList.add('open');
    }, 320);

    // Fade out hint
    if (sparkleHint) {
      sparkleHint.style.opacity = '0';
      sparkleHint.style.transition = 'opacity 0.6s ease';
    }

    // Letter emerges & modal appears
    setTimeout(() => {
      if (envelopeWrapper) envelopeWrapper.classList.add('fade-out');
      if (letterModal) {
        letterModal.classList.add('open');
        letterModal.setAttribute('aria-hidden', 'false');
      }
    }, 950);
  }

  function refoldLetter() {
    if (!isEnvelopeOpened) return;
    isEnvelopeOpened = false;

    // Close letter modal
    if (letterModal) {
      letterModal.classList.remove('open');
      letterModal.setAttribute('aria-hidden', 'true');
    }

    // Return envelope
    setTimeout(() => {
      if (envelopeWrapper) envelopeWrapper.classList.remove('fade-out');
      if (envelope) envelope.classList.remove('open');
      if (waxSeal) waxSeal.classList.remove('broken');
      if (sparkleHint) sparkleHint.style.opacity = '0.8';
    }, 400);
  }

  if (waxSeal) {
    waxSeal.addEventListener('click', openLetter);
    waxSeal.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLetter();
      }
    });
  }

  if (refoldBtn) {
    refoldBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      refoldLetter();
    });
  }

  // =========================================================================
  // 3. INTERACTIVE LOVE SHOWER BUTTON
  // =========================================================================
  if (loveShowerBtn) {
    loveShowerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      playHeartChime();

      const rect = loveShowerBtn.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      // Massive shower of emojis & sparkling particles
      spawnEmojiShower(originX, originY);
      spawnParticleBurst(originX, originY, 60, ['#ff4d6d', '#ff85a1', '#ffd166', '#ffb7c5', '#ffffff']);

      // Button feedback
      loveShowerBtn.innerHTML = `
        <span class="btn-sparkle">✨</span>
        <span class="btn-text">Forever & Always, Uyanga</span>
        <span class="btn-heart">❤️</span>
      `;
      loveShowerBtn.style.background = 'linear-gradient(135deg, #781728 0%, #b82b43 100%)';

      // Haptic feedback
      if (navigator.vibrate) {
        try { navigator.vibrate([40, 60, 40]); } catch (e) {}
      }
    });
  }

  // =========================================================================
  // 4. CANVAS BACKGROUND: FALLING SAKURA & GOLDEN GLITTERS
  // =========================================================================
  const ambientCanvas = document.getElementById('ambient-canvas');
  const ambientCtx = ambientCanvas.getContext('2d');

  let width = (ambientCanvas.width = window.innerWidth);
  let height = (ambientCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = ambientCanvas.width = touchCanvas.width = window.innerWidth;
    height = ambientCanvas.height = touchCanvas.height = window.innerHeight;
  });

  // Sakura Petals
  class SakuraPetal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = 10 + Math.random() * 12;
      this.speedY = 1.1 + Math.random() * 1.6;
      this.speedX = -0.4 + Math.random() * 1.4;
      this.angle = Math.random() * 360;
      this.spin = (Math.random() - 0.5) * 2;
      this.oscillation = Math.random() * Math.PI * 2;
      this.oscillationSpeed = 0.02 + Math.random() * 0.03;
      this.opacity = 0.45 + Math.random() * 0.5;
      this.color = Math.random() > 0.3 ? '#ffb7c5' : '#ffccd5';
    }

    update() {
      this.oscillation += this.oscillationSpeed;
      this.x += this.speedX + Math.sin(this.oscillation) * 0.8;
      this.y += this.speedY;
      this.angle += this.spin;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size * 0.5, -this.size * 0.8, this.size, -this.size * 0.2, 0, this.size);
      ctx.bezierCurveTo(-this.size, -this.size * 0.2, -this.size * 0.5, -this.size * 0.8, 0, 0);

      const grad = ctx.createLinearGradient(0, -this.size, 0, this.size);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, this.color);
      grad.addColorStop(1, '#ff8fa3');

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }
  }

  // Golden Glitter Background Dust
  class AmbientGlitter {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = 0.8 + Math.random() * 2.2;
      this.speedY = -0.2 - Math.random() * 0.4;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random();
      this.alphaSpeed = 0.015 + Math.random() * 0.02;
      this.increasing = Math.random() > 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.increasing) {
        this.alpha += this.alphaSpeed;
        if (this.alpha >= 1) this.increasing = false;
      } else {
        this.alpha -= this.alphaSpeed;
        if (this.alpha <= 0.1) this.increasing = true;
      }

      if (this.y < -10) this.y = height + 10;
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha * 0.7));
      ctx.fillStyle = '#fce58d';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#dfb85d';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const petals = Array.from({ length: 24 }, () => new SakuraPetal());
  const glitters = Array.from({ length: 35 }, () => new AmbientGlitter());

  function renderAmbient() {
    ambientCtx.clearRect(0, 0, width, height);

    glitters.forEach((g) => {
      g.update();
      g.draw(ambientCtx);
    });

    petals.forEach((p) => {
      p.update();
      p.draw(ambientCtx);
    });

    requestAnimationFrame(renderAmbient);
  }
  renderAmbient();

  // =========================================================================
  // 5. TOUCH & CURSOR INTERACTIVE SPARKLE TRAIL
  // =========================================================================
  const touchCanvas = document.getElementById('touch-canvas');
  const touchCtx = touchCanvas.getContext('2d');

  let touchParticles = [];

  class TouchSparkle {
    constructor(x, y, color = null) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 2.8;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 0.5;
      this.size = 2 + Math.random() * 4.5;
      this.life = 1;
      this.decay = 0.02 + Math.random() * 0.025;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.2;
      this.isStar = Math.random() > 0.35;
      this.color = color || (Math.random() > 0.5 ? '#fce58d' : (Math.random() > 0.5 ? '#ffb7c5' : '#ffffff'));
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotSpeed;
      this.life -= this.decay;
      this.size *= 0.96;
    }

    draw(ctx) {
      if (this.life <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = Math.max(0, this.life);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;

      if (this.isStar) {
        ctx.beginPath();
        const s = this.size * 2.2;
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(0, 0, s, 0);
        ctx.quadraticCurveTo(0, 0, 0, s);
        ctx.quadraticCurveTo(0, 0, -s, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function spawnSparkleAt(x, y, count = 2) {
    for (let i = 0; i < count; i++) {
      touchParticles.push(new TouchSparkle(x, y));
    }
  }

  function spawnParticleBurst(x, y, count = 40, colors = ['#fce58d', '#ffb7c5', '#ffffff']) {
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      touchParticles.push(new TouchSparkle(x, y, color));
    }
  }

  // Floating Emoji Shower
  function spawnEmojiShower(x, y) {
    const emojis = ['🌸', '✨', '💖', '🌺', '❤️', '🌷', '💫'];
    for (let i = 0; i < 45; i++) {
      const el = document.createElement('div');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.position = 'fixed';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.fontSize = `${1.2 + Math.random() * 1.5}rem`;
      el.style.pointerEvents = 'none';
      el.style.zIndex = '999';
      el.style.transform = 'translate(-50%, -50%)';
      el.style.transition = `all ${1.2 + Math.random() * 1.2}s cubic-bezier(0.1, 0.8, 0.3, 1)`;

      document.body.appendChild(el);

      const destX = (Math.random() - 0.5) * window.innerWidth * 0.9;
      const destY = -120 - Math.random() * 350;
      const rot = (Math.random() - 0.5) * 540;

      requestAnimationFrame(() => {
        el.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) rotate(${rot}deg) scale(${1.2 + Math.random() * 0.5})`;
        el.style.opacity = '0';
      });

      setTimeout(() => {
        el.remove();
      }, 2500);
    }
  }

  // Touch handlers for iPhone Safari (passive for silky 60fps)
  window.addEventListener('touchstart', (e) => {
    for (let i = 0; i < e.touches.length; i++) {
      spawnSparkleAt(e.touches[i].clientX, e.touches[i].clientY, 4);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    for (let i = 0; i < e.touches.length; i++) {
      spawnSparkleAt(e.touches[i].clientX, e.touches[i].clientY, 2);
    }
  }, { passive: true });

  // Desktop Pointer support
  window.addEventListener('pointermove', (e) => {
    if (Math.random() > 0.4) {
      spawnSparkleAt(e.clientX, e.clientY, 1);
    }
  });

  window.addEventListener('pointerdown', (e) => {
    spawnSparkleAt(e.clientX, e.clientY, 5);
  });

  function renderTouchSparkles() {
    touchCtx.clearRect(0, 0, width, height);

    for (let i = touchParticles.length - 1; i >= 0; i--) {
      const p = touchParticles[i];
      p.update();
      p.draw(touchCtx);
      if (p.life <= 0) {
        touchParticles.splice(i, 1);
      }
    }

    requestAnimationFrame(renderTouchSparkles);
  }
  renderTouchSparkles();
});
