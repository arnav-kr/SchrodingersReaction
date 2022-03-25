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
let color = "#22c55e";
let icon = document.getElementById('icon');
let btn = document.getElementById('btn');
let likeCount = document.getElementById('like-count');
let reactionWrapper = document.getElementById('reaction-wrapper');

btn.addEventListener('click', () => {
  icon.style.fill = color;
});

let sensor;

if (navigator.permissions) {
  // https://w3c.github.io/orientation-sensor/#model
  Promise.all([navigator.permissions.query({ name: "accelerometer" }),
  navigator.permissions.query({ name: "magnetometer" }),
  navigator.permissions.query({ name: "gyroscope" })])
    .then(results => {
      if (results.every(result => result.state === "granted")) {
        initSensor();
      } else {
        console.log("Permission to use sensor was denied.");
      }
    }).catch(err => {
      console.log("Integration with Permissions API is not enabled, still try to start app.");
      initSensor();
    });
} else {
  console.log("No Permissions API, still try to start app.");
  initSensor();
}

function initSensor() {
  const options = { frequency: 60, coordinateSystem };
  console.log(JSON.stringify(options));
  sensor = relative ? new RelativeOrientationSensor(options) : new AbsoluteOrientationSensor(options);
  sensor.onreading = () => {
    let quaternion = sensor.quaternion;
    let euler = ToEulerAngles(quaternion);
    let threshold = 30;
    if (euler[0] > threshold) {
      console.log("Up");
      color = "#22c55e";
    }
    if (euler[0] < -threshold) {
      console.log("Down");
      color = "#ef4444";
    }
    reactionWrapper.style.transform = `rotate(${360 - euler[1]}deg)`;
    console.log(euler);
  }
  sensor.onerror = (event) => {
    if (event.error.name == 'NotReadableError') {
      console.log("Sensor is not available.");
    }
  }
  sensor.start();
}