// ===========================================================
// LOGICUS ACADEMY — Kimia SMA page interactions (kelas tabs)
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
    initKelasTabs();
});

function initKelasTabs() {
    const tabs = document.querySelectorAll('.kelas-tab');
    const panels = document.querySelectorAll('.kelas-panel');
    if (!tabs.length || !panels.length) return;

    function activate(targetId, updateHash) {
        tabs.forEach((tab) => {
            const isMatch = tab.dataset.target === targetId;
            tab.classList.toggle('is-active', isMatch);
            tab.setAttribute('aria-selected', String(isMatch));
        });
        panels.forEach((panel) => {
            const isMatch = panel.id === targetId;
            panel.classList.toggle('is-active', isMatch);
            if (isMatch) {
                panel.removeAttribute('hidden');
            } else {
                panel.setAttribute('hidden', '');
            }
        });
        if (updateHash && history.replaceState) {
            history.replaceState(null, '', '#' + targetId);
        }
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => activate(tab.dataset.target, true));
    });

    // Deep-link support: #kelas-xi in URL opens that tab directly
    const initialHash = window.location.hash.replace('#', '');
    const validTargets = Array.from(panels).map((p) => p.id);
    if (validTargets.includes(initialHash)) {
        activate(initialHash, false);
    }
}
