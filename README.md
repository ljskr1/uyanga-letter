# A Love Letter for Uyanga 🌸🍃✨

A digital love letter and traditional animated envelope crafted with an anime/Naruto-inspired visual aesthetic, floating cherry blossoms, interactive glitter trails, and heartfelt romance.

Engineered specifically for **Safari on iPhone** to send directly via text/iMessage.

---

## ✨ Features

- **Traditional 3D Letter Opening Animation**:
  - Deep royal crimson envelope with golden foil trim and Japanese washi texture.
  - Golden wax seal featuring an embossed leaf crest that pulses softly (`Tap seal to open ✨`).
  - Realistic wax cracking sound & bell chime on tap (built with zero-dependency Web Audio API, guaranteed instant playback on iOS Safari).
  - 3D flap opening and smooth paper slide-out and unfold animation.
- **Anime Aesthetic & Color Palette**:
  - Naruto/anime-inspired twilight and sunset tones (crimson `#731e2b`, warm amber gold `#dfb85d`, twilight sky `#090c12`).
  - Gentle falling Sakura (cherry blossom) petals with natural wind flutter and 3D leaf rotation.
  - Ambient golden floating dust and stardust twinkling across the screen.
- **Interactive Touch Glitters & Petals**:
  - Touching or dragging a finger across the screen leaves a shimmering trail of 4-pointed golden sparkle stars, soft pink petals, and stardust.
- **Pure Heartfelt Love Letter**:
  - Sincere, deeply romantic words celebrating Uyanga without confusing anime lore or jargon.
  - 3 sweet romantic cards: *Your Blooming Warmth*, *Magic in Every Moment*, and *My Constant Promise*.
  - An interactive **"Send Love Back ❤️"** button that unleashes a celebratory shower of flowers, sparkles, and floating hearts.
- **Safari on iPhone Optimization**:
  - `100dvh` viewport sizing to prevent iOS Safari address-bar bouncing.
  - Safe-area inset protection (`env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`).
  - Open Graph meta tags for beautiful iMessage & SMS link preview cards.
  - Self-contained audio synthesizer (no external audio files to break or load slowly).

---

## 🚀 How to Deploy to GitHub Pages

Since `gh` CLI is installed on your Mac, you can deploy this website to GitHub Pages in less than 30 seconds!

### Option 1: Automatic Deployment with GitHub CLI (`gh`)

Run this single command in your terminal inside `/Users/lijah/uyanga_letter`:

```bash
# 1. Commit files
git add .
git commit -m "feat: digital love letter for Uyanga"

# 2. Create the GitHub repository and push
gh repo create uyanga-letter --public --source=. --push

# 3. Enable GitHub Pages on main branch
gh repo edit --enable-pages --pages-branch main
```

Your live link will be:
```
https://ljskr1.github.io/uyanga-letter/
```

### Option 2: Manual GitHub Web Interface

1. Create a new public repository on [GitHub](https://github.com/new) named `uyanga-letter`.
2. Push your code:
   ```bash
   git remote add origin https://github.com/ljskr1/uyanga-letter.git
   git branch -M main
   git push -u origin main
   ```
3. Go to your repository on GitHub:
   - Click **Settings** → **Pages** (under "Code and automation").
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. In about 1 minute, your site will be live at:
   `https://ljskr1.github.io/uyanga-letter/`

---

## 💌 Personalizing the Letter

If you would like to edit or add any specific inside jokes, nicknames, or memories, simply open [`index.html`](file:///Users/lijah/uyanga_letter/index.html) and adjust lines 120–190:

```html
<!-- Paragraphs -->
<p class="letter-paragraph opening">
  I wanted to make something special just for you...
</p>

<!-- The 3 Cards -->
<div class="vow-card">
  <div class="vow-icon">🌸</div>
  <div class="vow-details">
    <h3 class="vow-title">Your Blooming Warmth</h3>
    <p class="vow-desc">...</p>
  </div>
</div>
```

---

## 📱 Testing Locally

To preview the letter on your computer or mobile:
```bash
python3 -m http.server 8080
```
Then visit `http://localhost:8080` in your browser.
