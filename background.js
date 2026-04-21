browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.get('enabled').then((data) => {
    if (data.enabled === undefined) {
      browser.storage.local.set({ enabled: true });
    }
    updateIcon(data.enabled !== false);
  });
});

browser.action.onClicked.addListener(() => {
  browser.storage.local.get('enabled').then((data) => {
    const newState = data.enabled === false ? true : false;
    browser.storage.local.set({ enabled: newState });
    updateIcon(newState);
  });
});

browser.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.enabled) {
    updateIcon(changes.enabled.newValue !== false);
  }
});

function updateIcon(isEnabled) {
  const state = isEnabled ? 'active' : 'inactive';
  browser.action.setIcon({
    path: {
      "48": `icons/${state}-48.svg`,
      "96": `icons/${state}-96.svg`,
      "128": `icons/${state}-128.svg`
    }
  });
}
