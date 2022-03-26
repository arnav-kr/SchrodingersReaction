import './css/style.css';
// PWAManager
import { PWAManager } from './js/PWAManager';
let PWAManagerInstance = new PWAManager({
  serviceWorkerPath: './sw.js',
  beforeInstallPrompt: () => { },
  appInstalled: () => { },
  controllerChange: () => { },
  installButton: null,
  updateButton: null,
});

PWAManagerInstance.init();

let mode = "like";
let icon = document.getElementById('icon');
let btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  if (mode === "like") {
    console.log("Like");
    icon.classList.add("!fill-green-500");
    icon.classList.remove("!fill-red-500");
    setTimeout(() => {
      icon.classList.remove("!fill-green-500");
      icon.classList.remove("!fill-red-500");
    }
      , 1000);
  }
  if (mode === "dislike") {
    console.log("Dislike");
    icon.classList.add("!fill-red-500");
    icon.classList.remove("!fill-green-500");
    setTimeout(() => {
      icon.classList.remove("!fill-green-500");
      icon.classList.remove("!fill-red-500");
    }
      , 1000);
  }
});

if (window.DeviceOrientationEvent) {
  initSensor();
}
else {
  alert("Your Device is a Potato!");
}

function initSensor() {
  window.addEventListener('deviceorientation', (event) => {
    let x = event.beta;
    let z = event.alpha;
    if (x >= 0 || z >= 0) {
      mode = "like";
    }
    if (x < 0 || z < 0) {
      mode = "dislike";
    }
  });
}
