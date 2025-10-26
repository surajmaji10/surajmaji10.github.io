// particles.js - lightweight mouse particle effect
(function(){
  const MAX_PARTICLES = 1000;
  const PARTICLES_PER_TAP = 100; // particles generated per tap/click
  const particles = [];
  let canvas, ctx, w, h, dpr;

  function initCanvas(){
    canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.mixBlendMode = 'screen';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
  }

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function colorFromCSSVar(){
    try{
      const s = getComputedStyle(document.documentElement).getPropertyValue('--accent-2') || '#59cd24ff';
      return s.trim() || '#59cd24ff';
    }catch(e){ return '#59cd24ff'; }
  }

  function spawnParticlesAt(x, y, count){
    const baseColor = colorFromCSSVar();
    for(let i=0;i<count;i++){
      if(particles.length > MAX_PARTICLES) break;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 1.6;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed * (0.6 + Math.random()*0.9),
        vy: Math.sin(angle) * speed * (0.6 + Math.random()*0.9) - 0.3,
        size: 2 + Math.random()*4,
        life: 0,
        ttl: 45 + Math.random()*45,
        color: baseColor,
        alpha: 1
      });
    }
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03; // gravity
      p.life++;
      p.alpha = Math.max(0, 1 - p.life / p.ttl);

      // draw particle
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size*2);
      grd.addColorStop(0, hexToRgba(p.color, 0.95 * p.alpha));
      grd.addColorStop(1, hexToRgba(p.color, 0.0));
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      ctx.fill();

      if(p.life >= p.ttl || p.y - p.size > h+50) particles.splice(i,1);
    }
    requestAnimationFrame(step);
  }

  function hexToRgba(hex, a){
    const h = hex.replace('#','').trim();
    const bigint = parseInt(h.length===3? h.split('').map(c=>c+c).join(''): h,16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${a})`;
  }

  // Init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', ()=>{
    initCanvas();
    // listen to taps/clicks (generate a burst)
    function handleTap(e){
      const touch = (e.touches && e.touches[0]) || e;
      const x = touch.clientX || w/2;
      const y = touch.clientY || h/2;
      spawnParticlesAt(x, y, PARTICLES_PER_TAP);
    }

    window.addEventListener('click', handleTap, {passive:true});
    window.addEventListener('touchstart', handleTap, {passive:true});
    requestAnimationFrame(step);
  });

  function throttle(fn, wait){
    let last = 0;
    return function(...args){
      const now = Date.now();
      if(now - last >= wait){ last = now; fn.apply(this,args); }
    };
  }

})();
