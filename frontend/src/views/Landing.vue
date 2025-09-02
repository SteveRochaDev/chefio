<template>
  <div class="landing">
    <div class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="title">Chefio</h1>
          <p class="subtitle">Find recipes from the ingredients you already have at home.</p>

          <div class="actions">
            <router-link to="/recipes" class="btn primary">Explore recipes</router-link>
            <router-link to="/register" class="btn ghost">Get started</router-link>
          </div>
        </div>

        <div class="hero-anim" aria-hidden="true">
          <!-- Pancake stack animation: flip, butter melt, steam; interactive on hover/click -->
          <div class="pancake-scene" @mousemove="onMouseMove" @mouseleave="resetParallax" @click="triggerFlip" role="img" aria-label="Pancake animation">
            <!-- expand viewBox left by 30px so pan handle (which extends past x=300) is inside viewport; allow overflow for transforms -->
            <svg class="pancake-svg" viewBox="-30 0 360 220" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden overflow="visible">
              <!-- plate -->
              <ellipse cx="150" cy="170" rx="110" ry="20" fill="#fffaf9" stroke="#ffecec" />

              <!-- group that contains pan + stack so pan movement affects pancakes -->
              <g :class="['pan-wrap', { 'flip-now': panFlip }]" transform="translate(0,12)">
                <!-- frying pan (frigideira) placed under the stack, animated on click -->
                <g class="pan" transform="translate(0,-2)">
                  <ellipse cx="150" cy="150" rx="95" ry="24" fill="#2b2b2b" opacity="0.95" />
                  <ellipse cx="150" cy="146" rx="86" ry="18" fill="#1f1f1f" opacity="0.9" />
                  <rect x="236" y="140" width="70" height="12" rx="6" fill="#2b2b2b" transform="rotate(12 236 140)" />
                  <rect x="246" y="136" width="12" height="28" rx="6" fill="#3b3b3b" transform="rotate(12 246 136)" />
                </g>

                <!-- stack (bottom to top) -->
                <g class="stack" transform="translate(0,10)">
                  <ellipse class="pancake p4" cx="150" cy="140" rx="78" ry="20" fill="#f3c6a6" stroke="#e8a87d" />
                  <ellipse class="pancake p3" cx="150" cy="120" rx="74" ry="18" fill="#f6cca8" stroke="#e8a87d" />
                  <ellipse class="pancake p2" cx="150" cy="102" rx="70" ry="16" fill="#f7d7b1" stroke="#e8a87d" />

                  <!-- top pancake that flips -->
                  <g :class="['top-group', { 'flip-now': flipNow }]">
                    <ellipse class="pancake p1" cx="150" cy="82" rx="66" ry="14" fill="#ffd9aa" stroke="#f0b07a" />

                    <!-- butter on top -->
                    <g class="butter" transform="translate(0,0)">
                      <rect x="138" y="70" width="24" height="12" rx="3" fill="#ffd36b" stroke="#ffb84a" />
                      <path class="melt" d="M142 78c3 2 8 4 14 3" stroke="#ffd36b" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.9" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="wave" aria-hidden="true"></div>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  data() {
    return { flipNow: false, reduceMotion: false, panFlip: false }
  },
  mounted() {
    // respect user's reduced motion preference
    this.reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  methods: {
    onMouseMove(e) {
      if (this.reduceMotion) return
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      // subtle parallax transform
      const tx = x * 10
      const ty = y * 6
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
      // slight rotation to imply depth
      el.style.rotate = `${x * 2}deg`
    },
    resetParallax(e) {
      const el = e.currentTarget
      el.style.transform = ''
      el.style.rotate = ''
    },
    triggerFlip() {
      if (this.reduceMotion) return
      // quick manual flip animation
      this.flipNow = true
      this.panFlip = true
      // clear after animation ends (match CSS duration)
      setTimeout(() => { this.flipNow = false; this.panFlip = false }, 1200)
    }
  }
}
</script>

<style scoped>
.landing { min-height: calc(100vh - 80px); display:flex; align-items:center; justify-content:center; position:relative; background: linear-gradient(180deg,#fff7f5 0%, #fff 60%); }
.hero { width:100%; padding:48px 20px; box-sizing:border-box }
.hero-content { display:flex; align-items:center; gap:24px; justify-content:center; max-width:1000px; margin:0 auto; }
.hero-text { flex:1; text-align:left }
.title { font-size:3rem; margin:0; color:#111827 }
.subtitle { color: #6b7280; margin-top:10px }
.actions { margin-top:22px; display:flex; gap:12px; justify-content:flex-start }
.btn { padding:12px 18px; border-radius:10px; text-decoration:none; font-weight:700; transition: transform .18s ease, box-shadow .18s ease }
.btn.primary { background:#ff6b6b; color:#fff }
.btn.ghost { background:transparent; border:1px solid rgba(16,24,40,0.06); color:#111827 }
.btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 20px rgba(17,24,39,0.06) }

/* animation container */
.hero-anim { flex:0 0 360px; display:flex; align-items:center; justify-content:center; cursor: pointer }
.pancake-scene { width:100%; max-width:380px; display:flex; align-items:center; justify-content:center; transition: transform .18s ease; }
.pancake-svg { width:320px; height:auto; display:block; overflow: visible }
.pancake-scene, .hero-anim { overflow: visible }

/* subtle continuous flip (slow) */
@keyframes flipTopSlow { 0% { transform: translateY(0) rotateX(0deg) } 50% { transform: translateY(-6px) rotateX(18deg) } 100% { transform: translateY(0) rotateX(0deg) } }
.top-group { transform-origin: 150px 82px; animation: flipTopSlow 8s cubic-bezier(.22,.9,.3,1) infinite; perspective: 900px; transform-style: preserve-3d; will-change: transform }

/* manual quick flip triggered on click - smoother curve + squash on land */
@keyframes flipTopFast {
  0% { transform: translateY(0) rotateX(0deg) scale(1) }
  28% { transform: translateY(-42px) rotateX(150deg) scale(1.02) }
  60% { transform: translateY(-8px) rotateX(260deg) scale(0.98) }
  88% { transform: translateY(2px) rotateX(340deg) scale(1.03) }
  100% { transform: translateY(0) rotateX(360deg) scale(1) }
}
.top-group.flip-now { animation: flipTopFast 1.25s cubic-bezier(.22,.9,.3,1) both; transform-style: preserve-3d; will-change: transform }

/* butter melt (scale and drip) */
@keyframes butterMelt { 0% { transform: translateY(0) scaleY(1); opacity:1 } 50% { transform: translateY(6px) scaleY(0.95); opacity:0.98 } 100% { transform: translateY(10px) scaleY(0.9); opacity:0.92 } }
.butter { transform-origin: 150px 70px; animation: butterMelt 4.2s ease-in-out infinite }
.melt { stroke-dasharray: 20; stroke-dashoffset: 20; animation: drip 4.2s linear infinite }
@keyframes drip { 0% { stroke-dashoffset: 20; opacity:0 } 40% { opacity:1 } 100% { stroke-dashoffset: 0; opacity:0 } }

/* bubbles/shine subtle scale */
@keyframes puff { 0%{ transform: scale(0.96); opacity:0.92 } 50%{ transform: scale(1.02); opacity:1 } 100%{ transform: scale(0.98); opacity:0.94 } }
.pancake { transform-origin: center; animation: puff 6s ease-in-out infinite }

/* steam animations */
@keyframes steamUpA { 0% { transform: translateY(0) scaleY(0.9); opacity:0 } 30%{ opacity:0.6 } 100% { transform: translateY(-40px) scaleY(1.1); opacity:0 } }
.steam .s1 { animation: steamUpA 3.2s ease-in-out infinite 0s }
.steam .s2 { animation: steamUpA 3.8s ease-in-out infinite 0.3s }
.steam .s3 { animation: steamUpA 3.6s ease-in-out infinite 0.7s }

/* manual quick pan tilt triggered on click */
@keyframes panFlipFast { 0% { transform: rotate(-1.5deg) translateY(0) } 30% { transform: rotate(-20deg) translateY(-20px) } 60% { transform: rotate(-6deg) translateY(-6px) scale(0.995) } 100% { transform: rotate(0deg) translateY(0) } }
.pan-wrap { transform-origin: 150px 150px; transition: transform .18s ease; will-change: transform }
.pan-wrap.flip-now { animation: panFlipFast 1.25s cubic-bezier(.22,.9,.3,1) both }

/* slight idle wobble for pan to feel alive (applies to the visual pan element only) */
@keyframes panIdle { 0% { transform: rotate(-0.6deg) } 50% { transform: rotate(0.8deg) } 100% { transform: rotate(-0.6deg) } }
.pan { animation: panIdle 6.5s ease-in-out infinite; transform-origin: 150px 150px; will-change: transform }

/* juggling animation for the full stack - staggered per pancake when pan-wrap.flip-now */
@keyframes juggle1 { 0% { transform: translateY(0) rotate(0deg) scale(1) } 28% { transform: translate(-6px,-72px) rotate(-18deg) scale(1.03) } 60% { transform: translate(6px,-22px) rotate(24deg) scale(0.98) } 92% { transform: translate(-2px,2px) rotate(6deg) scale(1.02) } 100% { transform: translateY(0) rotate(0deg) scale(1) } }
@keyframes juggle2 { 0% { transform: translateY(0) rotate(0deg) scale(1) } 28% { transform: translate(10px,-62px) rotate(8deg) scale(1.02) } 60% { transform: translate(-6px,-20px) rotate(-6deg) scale(0.98) } 92% { transform: translate(2px,2px) rotate(-4deg) scale(1.01) } 100% { transform: translateY(0) rotate(0deg) scale(1) } }
@keyframes juggle3 { 0% { transform: translateY(0) rotate(0deg) scale(1) } 28% { transform: translate(-12px,-50px) rotate(-10deg) scale(1.01) } 60% { transform: translate(8px,-16px) rotate(12deg) scale(0.985) } 92% { transform: translate(1px,1px) rotate(2deg) scale(1.01) } 100% { transform: translateY(0) rotate(0deg) scale(1) } }
@keyframes juggle4 { 0% { transform: translateY(0) rotate(0deg) scale(1) } 28% { transform: translate(6px,-36px) rotate(6deg) scale(1.01) } 60% { transform: translate(-4px,-8px) rotate(-4deg) scale(0.99) } 92% { transform: translate(0px,0px) rotate(0deg) scale(1.005) } 100% { transform: translateY(0) rotate(0deg) scale(1) } }

.pan-wrap.flip-now .pancake.p1 { animation: juggle1 1.25s cubic-bezier(.22,.9,.3,1) both }
.pan-wrap.flip-now .pancake.p2 { animation: juggle2 1.25s cubic-bezier(.22,.9,.3,1) 0.06s both }
.pan-wrap.flip-now .pancake.p3 { animation: juggle3 1.25s cubic-bezier(.22,.9,.3,1) 0.12s both }
.pan-wrap.flip-now .pancake.p4 { animation: juggle4 1.25s cubic-bezier(.22,.9,.3,1) 0.18s both }

/* make sure top-group's flip still runs on top */
.pan-wrap.flip-now .top-group { animation: flipTopFast 1.25s cubic-bezier(.22,.9,.3,1) both }

/* improve performance by hinting the browser */
.pancake, .top-group, .pan-wrap { will-change: transform }

@media (prefers-reduced-motion: reduce) {
  .top-group, .butter, .pancake, .steam path { animation: none !important }
  .pancake-scene { transition: none !important }
  .btn:hover { transform: none }
  .pan, .pan-wrap { animation: none !important }
}

/* decorative wave animation */
.wave { position:absolute; bottom:0; left:0; right:0; height:160px; background: radial-gradient(circle at 10% 20%, rgba(255,107,107,0.12), transparent 30%); animation: float 6s ease-in-out infinite; }
@keyframes float { 0%{ transform:translateY(0) } 50%{ transform:translateY(-8px) } 100%{ transform:translateY(0) } }

@media (max-width:900px){ .title{ font-size:2.4rem } .hero{ padding:28px } .hero-content{ flex-direction:column; } .hero-text{ text-align:center } .actions{ justify-content:center } .hero-anim{ order:-1; margin-bottom:12px } }
</style>
