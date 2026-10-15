const chair = document.querySelector('#chair');
const rotation = document.querySelector('#rotate');
function setRotation(enabled) {
  chair.autoRotate = enabled;
  rotation.setAttribute('aria-pressed', String(enabled));
  rotation.textContent = enabled ? 'Pause rotation' : 'Resume rotation';
}
customElements.whenDefined('model-viewer').then(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) setRotation(false);
  chair.addEventListener('load', () => document.querySelector('#status').textContent = 'INTERACTIVE / 3D');
  chair.addEventListener('error', () => {
    document.querySelector('#status').textContent = 'PREVIEW MODE';
    document.querySelector('#error').hidden = false;
  });
  rotation.addEventListener('click', () => setRotation(!chair.autoRotate));
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    setRotation(false);
    chair.resetTurntableRotation(0);
    chair.cameraOrbit = button.dataset.view;
    chair.cameraTarget = '0m 0.6m 0m';
    document.querySelectorAll('[data-view]').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
  }));
});
