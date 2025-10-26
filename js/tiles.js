// tiles.js
// Attach tile behavior: when a tile is clicked, add .tile--active to highlight and raise it.
(function(){
  function initTiles(root=document){
    // Define selectors for common card elements to be treated as tiles
    const selectors = ['.project-item', '.report-item', '.education-item', '.gallery img', '.display-item img', '.about-item'];
    const nodes = Array.from(root.querySelectorAll(selectors.join(',')));

    nodes.forEach(el=>{
      // add tile class if not present
      if(!el.classList.contains('tile')) el.classList.add('tile');
      // ensure pointer cursor
      el.style.cursor = 'pointer';
      // make element focusable for keyboard users if it isn't already
      const focusable = el.tabIndex >= 0 || el.querySelector && el.querySelector('a,button,input,textarea,select');
      if(!focusable) el.tabIndex = 0;
      // remove any existing click handlers (we're switching to hover/focus interaction)
      // (no-op here since we never attached named handlers earlier)
    });
  }

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', ()=>initTiles(document));

  // Expose function for dynamic content
  window.initTiles = initTiles;
})();
