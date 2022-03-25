import './css/style.css';
// TODO: Uncomment the following lines to enable PWA Support
// // PWAManager
// import { PWAManager } from './PWAManager';
// let PWAManagerInstance = new PWAManager({
//   serviceWorkerPath: './sw.js',
//   beforeInstallPrompt: () => { },
//   appInstalled: () => { },
//   controllerChange: () => { },
//   installButton: null,
//   updateButton: null,
// });
//
// PWAManagerInstance.init();
import {
  AbsoluteOrientationSensor,
  RelativeOrientationSensor
} from './js/polyfills/motion-sensor.js';
import ToEulerAngles from './js/utils/toEulerAngles';

const params = new URLSearchParams(new URL(window.location.href).search.slice(1));
const relative = false
const coordinateSystem = params.get("coord");
const colors = {
  red: "#ef4444",
  green: "#22c55e",
}
let color = colors.green;
let icon = document.getElementById('icon');
let btn = document.getElementById('btn');
let likeCount = document.getElementById('like-count');
let reactionWrapper = document.getElementById('reaction-wrapper');
let transform = 0, opacity = 1, mode = "like";
let reactions = { likes: 0, dislikes: 0 };
btn.addEventListener('click', () => {
  icon.style.fill = color;
});

// if (navigator.permissions) {
//   // https://w3c.github.io/orientation-sensor/#model
//   Promise.all([navigator.permissions.query({ name: "accelerometer" }),
//   navigator.permissions.query({ name: "magnetometer" }),
//   navigator.permissions.query({ name: "gyroscope" })])
//     .then(results => {
//       if (results.every(result => result.state === "granted")) {
//         initSensor();
//       } else {
//         console.log("Permission to use sensor was denied.");
//       }
//     }).catch(err => {
//       console.log("Integration with Permissions API is not enabled, still try to start app.");
//       initSensor();
//     });
// } else {
//   console.log("No Permissions API, still try to start app.");
//   initSensor();
// }

if (window.DeviceOrientationEvent) {
  initSensor();
}
else {
  console.log("Not supported");
}

function initSensor() {
  window.addEventListener('deviceorientation', function (event) {
    let x = event.beta;
    let y = event.gamma;
    let z = event.alpha;
    let threshold = 20;
    if (x >= 0 || x >= 0) {
      console.log("Up");
      mode = "like";
      color = colors.green;
    }
    if (x < 0 || z < 0) {
      console.log("Down");
      mode = "dislike";
      color = colors.red;
    }
    transform = z;
  });
}

function animate() {
  requestAnimationFrame(animate);
  reactionWrapper.style.transform = `rotate(${transform}deg)`;
  reactionWrapper.style.opacity = opacity;
  if (mode == "like") {
    likeCount.innerText = `+${reactions.likes}`;
  }
  else {
    likeCount.innerText = `-${reactions.dislikes}`;
  }
}
requestAnimationFrame(animate);