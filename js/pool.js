var socket = io.connect('http://pcovi-mbr-11046:8000');

var factor = 0.5;
var rolling_mag;
function deviceMotionHandler(eventData) {
    accel = eventData.acceleration;
    mag = Math.sqrt(accel.x*accel.x +
		    accel.y*accel.y +
		    accel.z*accel.z);
    if (rolling_mag == null) {rolling_mag = mag;}

    rolling_mag = factor*mag + (1.0-factor)*rolling_mag;

    if ( (mag-rolling_mag) > 3.0) {
	socket.emit('bump', new Date().getTime())
	//document.getElementById("main").style.backgroundColor = "green";
    }
    else {
	//document.getElementById("main").style.backgroundColor = "red";
    }
}

socket.on('green', function() {
  document.getElementById("main").style.backgroundColor = "green";
  setTimeout(function() {
        document.getElementById("main").style.backgroundColor = "red";
  }, 1000);
});

if (window.DeviceMotionEvent) {
    console.log("DeviceMotionEvent supported");
    window.addEventListener('devicemotion', deviceMotionHandler, true);
} 
else {
    document.getElementById("main").style.backgroundColor = "white";
}



