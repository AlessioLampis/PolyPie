//POLYMETER notation
var guest_num = document.getElementById("guest_num");
var guest_denom = document.getElementById("guest_denom");
var host_num = document.getElementById("host_num");
var host_denom = document.getElementById("host_denom");
var n1, n2, d1, d2, k1, k2, nk1, nk2, d, n;
var num, denom;

//POLYMETER Tatum
//guest_num.onchange = () => {
document.querySelector(".minus1").onclick = function () {
  if (guest_num.value == 1) {
    guest_num.value = 1;
  }
  else {
    guest_num.value = Math.floor(guest_num.value) - 1;
  }
  num = Math.floor(measure_num(guest_num.value, guest_denom.value, host_num.value, host_denom.value));
  denom = Math.floor(measure_denom(guest_denom.value, host_denom.value));
  document.getElementsByClassName("num")[0].innerHTML = num;
  document.getElementsByClassName("denom")[0].innerHTML = denom;
};

document.querySelector(".plus1").onclick = function () {
  if (guest_num.value == 8) {
    guest_num.value = 8;
  }
  else {
    guest_num.value = Math.floor(guest_num.value) + 1;
  }
  num = Math.floor(measure_num(guest_num.value, guest_denom.value, host_num.value, host_denom.value));
  denom = Math.floor(measure_denom(guest_denom.value, host_denom.value));
  document.getElementsByClassName("num")[0].innerHTML = num;
  document.getElementsByClassName("denom")[0].innerHTML = denom;
};
//}

//guest_denom.onchange = () => {
document.querySelector(".minus2").onclick = function () {

  if (guest_denom.value == 16) {
    guest_denom.value = 8;
  }
  else if (guest_denom.value == 8) {
    guest_denom.value = 4;
  }
  else if (guest_denom.value == 4) {
    guest_denom.value = 4;
  }
  num = Math.floor(measure_num(guest_num.value, guest_denom.value, host_num.value, host_denom.value));
  denom = Math.floor(measure_denom(guest_denom.value, host_denom.value));
  document.getElementsByClassName("num")[0].innerHTML = num;
  document.getElementsByClassName("denom")[0].innerHTML = denom;
};

document.querySelector(".plus2").onclick = function () {
  if (guest_denom.value == 4) {
    guest_denom.value = 8;
  }
  else if (guest_denom.value == 8) {
    guest_denom.value = 16;
  }
  else if (guest_denom.value == 16) {
    guest_denom.value = 16;
  }
  num = Math.floor(measure_num(guest_num.value, guest_denom.value, host_num.value, host_denom.value));
  denom = Math.floor(measure_denom(guest_denom.value, host_denom.value));
  document.getElementsByClassName("num")[0].innerHTML = num;
  document.getElementsByClassName("denom")[0].innerHTML = denom;
};
//}

//host_num.onchange = () => {
document.querySelector(".minus3").onclick = function () {
  if (host_num.value == 1) {
    host_num.value = 1;
  }
  else {
    host_num.value = Math.floor(host_num.value) - 1;
  }
  num = Math.floor(measure_num(guest_num.value, guest_denom.value, host_num.value, host_denom.value));
  denom = Math.floor(measure_denom(guest_denom.value, host_denom.value));
  document.getElementsByClassName("num")[0].innerHTML = num;
  document.getElementsByClassName("denom")[0].innerHTML = denom;
};

document.querySelector(".plus3").onclick = function () {
  if (host_num.value == 8) {
    host_num.value = 8;
  }
  else {
    host_num.value = Math.floor(host_num.value) + 1;
  }
  num = Math.floor(measure_num(guest_num.value, guest_denom.value, host_num.value, host_denom.value));
  denom = Math.floor(measure_denom(guest_denom.value, host_denom.value));
  document.getElementsByClassName("num")[0].innerHTML = num;
  document.getElementsByClassName("denom")[0].innerHTML = denom;
};
//}

//host_denom.onchange = () => {
document.querySelector(".minus4").onclick = function () {

  if (host_denom.value == 16) {
    host_denom.value = 8;
  }
  else if (host_denom.value == 8) {
    host_denom.value = 4;
  }
  else if (host_denom.value == 4) {
    host_denom.value = 4;
  }
  num = Math.floor(measure_num(guest_num.value, guest_denom.value, host_num.value, host_denom.value));
  denom = Math.floor(measure_denom(guest_denom.value, host_denom.value));
  document.getElementsByClassName("num")[0].innerHTML = num;
  document.getElementsByClassName("denom")[0].innerHTML = denom;
};

document.querySelector(".plus4").onclick = function () {
  if (host_denom.value == 4) {
    host_denom.value = 8;
  }
  else if (host_denom.value == 8) {
    host_denom.value = 16;
  }
  else if (host_denom.value == 16) {
    host_denom.value = 16;
  }
  num = Math.floor(measure_num(guest_num.value, guest_denom.value, host_num.value, host_denom.value));
  denom = Math.floor(measure_denom(guest_denom.value, host_denom.value));
  document.getElementsByClassName("num")[0].innerHTML = num;
  document.getElementsByClassName("denom")[0].innerHTML = denom;
};
//}


function lcm_lcm(x, y) {
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

function measure_num(guest_num, guest_denom, host_num, host_denom) {

  n1 = Math.floor(guest_num);
  n2 = Math.floor(host_num);
  d1 = Math.floor(guest_denom);
  d2 = Math.floor(host_denom);
  d = lcm_lcm(d1, d2);
  k1 = d / d1;
  k2 = d / d2;

  nk1 = n1 * k1;
  nk2 = n2 * k2;

  n = lcm_lcm(nk1, nk2);

  return n;
}

function measure_denom(guest_denom, host_denom) {
  d1 = Math.floor(guest_denom);
  d2 = Math.floor(host_denom);
  d = lcm_lcm(d1, d2);
  return d;
}




export { guest_num, guest_denom, host_num, host_denom, measure_num, measure_denom }
