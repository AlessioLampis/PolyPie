var guest1 = document.getElementById("guest1");
var host1 = document.getElementById("host1");
var sub = 1; //number of tatum (subdivisions)

var guestBeats = [];
var hostBeats = [];
var cosetBeats = [];





//CROSS RHYTHM TATUM Calculation
function listenGuest(guest) { //Guest value input
    guest.value = Math.floor(
      guest.value
    );
  
    if (guest.value > 32) {
      guest.value = 32;
      //alert("Guest value can't exceed 8");
    }
    if (guest.value == 0) {
      guest.value = 1;
    }
  
    if (guest.value < 0){
      alert("Guest value must be positive");
      guest.value = 1;
    }
    tatum_calculation();
  };
  
  
  function listenHost(host) { //Host value input
    host.value = Math.floor(
      host.value
    );
  
    if (host.value > 32) {
      host.value = 32;
      //alert("Host value can't exceed 8");
    }
    if (host.value == 0) {
      host.value = 1;
    }
    if (host.value < 0){
      alert("Host value must be positive");
      host.value = 1;
    }
    tatum_calculation();
  };



  function tatum_calculation() { //Only for Cross Rhythm
    sub = lcm(
      Math.floor(host1.value),
      Math.floor(guest1.value)
    );
    //document.getElementById("result").innerHTML = sub;
  };

  
function lcm(x, y) {
    if (x == 0) {
      x = 1;
    }
    if (y == 0) {
      y = 1;
    }
    if (typeof x !== "number" || typeof y !== "number") return false;
    return Math.abs(x * y / gcd(x, y));
  }
  
  function gcd(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  }
  
//calculates the array for playing sounds and animations called in play

function calculate_pie() {

    guestBeats = [];
    hostBeats = [];
   
    for(var i = 0; i < sub; i ++){
        i%host1.value == 0 ? hostBeats.push(true) : hostBeats.push(false);
    };
  
  
    for(var y = 0; y < sub; y++) {
      y%guest1.value == 0 ? guestBeats.push(true) : guestBeats.push(false);
      
    };
  
  };

  function calculateCoset(toggle, n){
  cosetBeats = [];
  if(toggle){
    for(var x = 0; x < sub; x ++){
      x%guest1.value == 0 ? cosetBeats.push(true) : cosetBeats.push(false);
    };
    for(var i = 0; i < n ; i++){
      cosetBeats.unshift(cosetBeats[cosetBeats["length"] -1]);
      cosetBeats.pop();
    }
  }
  else{
    for(var y = 0; y < sub; y ++){
      y%host1.value == 0 ? cosetBeats.push(true) : cosetBeats.push(false);
    };
    for(var j = 0; j < n; j++){
      cosetBeats.unshift(cosetBeats[cosetBeats["length"] -1]);
      cosetBeats.pop();
    }
  }
  }

  export{calculate_pie,  hostBeats, guestBeats, sub, guest1, host1, listenGuest, listenHost, calculateCoset, cosetBeats }