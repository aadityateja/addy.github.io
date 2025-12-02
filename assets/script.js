// Simple window open/close/minimize + drag
document.addEventListener('DOMContentLoaded', ()=>{

  // clock
  const clockEl = document.getElementById('clock');
  function updateClock(){
    const d = new Date();
    const h = d.getHours().toString().padStart(2,'0');
    const m = d.getMinutes().toString().padStart(2,'0');
    clockEl.textContent = `${h}:${m}`;
  }
  updateClock();
  setInterval(updateClock, 30000);

  // open windows by icon or dock
  document.querySelectorAll('[data-window]').forEach(el=>{
    el.addEventListener('click', ()=> {
      const id = el.dataset.window;
      openWindow(id);
    });
  });

  function openWindow(id){
    const w = document.getElementById(id);
    if(!w) return;
    w.style.display = 'block';
    bringToFront(w);
    // position slightly offset if already open
    w.style.left = (100 + Math.random()*120) + 'px';
    w.style.top = (80 + Math.random()*90) + 'px';
  }

  // close/minimize controls
  document.querySelectorAll('.window .close').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      btn.closest('.window').style.display = 'none';
    });
  });
  document.querySelectorAll('.window .min').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const w = btn.closest('.window');
      w.style.display = 'none';
    });
  });

  // bring clicked window to front
  document.addEventListener('mousedown', e=>{
    const w = e.target.closest('.window');
    if(w) bringToFront(w);
  });

  let zIndex = 100;
  function bringToFront(w){
    zIndex += 1;
    w.style.zIndex = zIndex;
  }

  // draggable windows (by titlebar)
  document.querySelectorAll('.window .titlebar').forEach(bar=>{
    const win = bar.closest('.window');
    bar.addEventListener('mousedown', startDrag);
    function startDrag(e){
      e.preventDefault();
      bringToFront(win);
      const startX = e.clientX;
      const startY = e.clientY;
      const rect = win.getBoundingClientRect();
      const offsetX = startX - rect.left;
      const offsetY = startY - rect.top;

      function onMove(ev){
        win.style.left = (ev.clientX - offsetX) + 'px';
        win.style.top = (ev.clientY - offsetY) + 'px';
      }
      function onUp(){
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      }
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    }
  });

});
