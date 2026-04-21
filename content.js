(() => {
  'use strict';
  
  const ATTR = 'data-user-expanded';
  
  const collapseJob = (details) => {
    if (details.open && !details.hasAttribute(ATTR)) {
      details.removeAttribute('open');
    }
  };

  const markUserExpanded = (e) => {
    const details = e.target.closest('details.js-checks-log-details');
    if (details) {
      details.setAttribute(ATTR, 'true');
    }
  };

  const run = () => {
    browser.storage.local.get('enabled').then(data => {
      if (data.enabled === false) return;

      document.querySelectorAll('details.js-checks-log-details[open]').forEach(collapseJob);
      
      document.querySelectorAll('details.js-checks-log-details summary').forEach(summary => {
        if (!summary._l) { 
          summary.addEventListener('click', markUserExpanded, {passive: true}); 
          summary._l = true; 
        }
      });
    });
  };

  setTimeout(run, 300);
  
  const obs = new MutationObserver(() => {
    setTimeout(run, 200);
  });
  
  obs.observe(document.body, {childList: true, subtree: true});
})();
