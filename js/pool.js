
var rolling_mag;
function deviceMotionHandler(eventData) {
    accel = eventData.acceleration;
    mag = Math.sqrt(accel.x*accel.x +
		    accel.y*accel.y +
		    accel.z*accel.z);
    factor = 0.7;
    if (rolling_mag == null) {rolling_mag = mag;}
    rolling_mag = factor*mag + (1.0-factor)*rolling_mag;

    if (Math.abs(mag-rolling_mag) > 1.5) {
	document.getElementById("main").style.backgroundColor = "green";
    }
    else {
	document.getElementById("main").style.backgroundColor = "red";
    }
}

if (window.DeviceMotionEvent) {
    console.log("DeviceMotionEvent supported");
    window.addEventListener('devicemotion', deviceMotionHandler, true);
} 
else {
    document.getElementById("main").style.backgroundColor = "white";
}



