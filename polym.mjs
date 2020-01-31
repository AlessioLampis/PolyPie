//POLYMETER notation
var guest_num = document.getElementById("guest_num");
var guest_denom = document.getElementById("guest_denom");
var host_num = document.getElementById("host_num");
var host_denom = document.getElementById("host_denom");

//POLYMETER Tatum
//guest_num.onchange = () => {
  document.querySelector(".minus1").onclick = function () {
    if (guest_num.value == 1) {
      guest_num.value = 1;
    }
    else {
      guest_num.value = Math.floor(guest_num.value) - 1;
    }
  };

  document.querySelector(".plus1").onclick = function () {
    if (guest_num.value == 8) {
      guest_num.value = 8;
    }
    else {
      guest_num.value = Math.floor(guest_num.value) + 1;
    }
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
  };

  document.querySelector(".plus3").onclick = function () {
    if (host_num.value == 8) {
      host_num.value = 8;
    }
    else {
      host_num.value = Math.floor(host_num.value) + 1;
    }
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
  };
//}

export {guest_num, guest_denom, host_num, host_denom}