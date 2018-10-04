const app = new Vue({
    el: '#app',
    data: {
        deviceready: false,
        acceleration: null,
        accelerationIncludingGravity: null,
        rotationRate: null,
        needsCompassCalibration: false
    },
    methods: {
        init: function () {
            this.deviceready = true;
            console.log('Received Event: deviceready');
        },
        showTime: function () {
            const now = new Date();
            const nn = (n) => (n < 10) ? ('0' + n) : n;
            const time = `${now.getFullYear()}/${nn(now.getMonth())}/${nn(now.getDay())}-${nn(now.getHours())}:${nn(now.getMinutes())}:${nn(now.getSeconds())}`;
            navigator.notification.alert(
                time, null, 'Time', 'OK'
            );
        },
        vibrate: function () {
            navigator.vibrate(1000);
        },
        compassCalibration: function (event) {
            this.needsCompassCalibration = true;
            event.preventDefault();
        },
        deviceMotion: function (event) {
            this.acceleration = event.acceleration;
            this.accelerationIncludingGravity = event.accelerationIncludingGravity;
            this.rotationRate = event.rotationRate;
        }
    }
});

document.addEventListener('deviceready', app.init);
window.addEventListener('compassneedscalibration', app.compassCalibration, true);
window.addEventListener("devicemotion", app.deviceMotion, true);