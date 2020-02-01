console.clear();

import { calculate_pie, hostBeats, guestBeats, sub, guest1, host1, listenGuest, listenHost, lcm} from "./polyr.mjs"
import { PolyrhythmPie } from "./pies.mjs"
import { kick, openHiHat, closedHiHat, hat } from "./sound.mjs"
import { guest_num, guest_denom, host_num, host_denom,} from "./polym.mjs"


///
//**MODEL**//
///
Tone.context.latencyHint = 'fastest';
Tone.context.lookAhead = 0;

//CANVAS VARIABLES
const canvas = document.getElementById('myCanvas');
const canvas2 = document.getElementById('myCanvas2');


//  Timing variables 
let start = 0;
let end = 0;

const tm = document.querySelector("#bpm")
var bpm = Math.floor(tm.value);
Tone.Transport.bpm.value = bpm;

var smallPie;
var largePie;

//NAVIGATE THROUGHT PAGE variables
var CurrentPage = 0; //page where you are 
var selectors = document.querySelectorAll("button"); //

//PAGE NUMBER 0 variable
let Btn = document.getElementsByClassName("firstbtn");


//SOUNDS: LOOP
var cnt1;
var polyrhythmLoop;
var d1, d2;
var num;
var denom;

listenGuest(guest1);
listenHost(host1);
calculate_pie();
smallPie = new PolyrhythmPie(200 / Math.sqrt(1.62), guest1.value, 1, canvas);
largePie = new PolyrhythmPie(200, host1.value, 0, canvas);

guest1.onchange = (guest)=>{
    if (!guest1.value) guest1.value = 1;
    listenGuest(guest);
    calculate_pie();
    smallPie = new PolyrhythmPie(200 / Math.sqrt(1.62), guest1.value, 1, canvas);
}
host1.onchange = (host)=>{
    if (!host1.value) host1.value = 1;
    listenHost(host);
    calculate_pie();
    largePie = new PolyrhythmPie(200, host1.value, 0, canvas);
}

// POLYMETER 
guest_num.onchange = () => {
    alert("changed");
    num = whole_measure_num (guest_num, guest_denom, host_num, host_denom);
    document.getElementsByClassName("num").innerHTML = num.toString();
}
guest_denom.onchange = () => {
    num = whole_measure_num (guest_num, guest_denom, host_num, host_denom);
    d1 = Math.floor(guest_denom);
    d2 = Math.floor(host_denom);
    denom = lcm(d1, d2);
    document.getElementsByClassName("num").innerHTML = num.toString();
    document.getElementsByClassName("denom").innerHTML = denom.toString();

}
host_num.onchange = () => {
    num = whole_measure_num (guest_num, guest_denom, host_num, host_denom);
    document.getElementsByClassName("num").innerHTML = num.toString();
}
host_denom.onchange = () => {
    num = whole_measure_num (guest_num, guest_denom, host_num, host_denom);
    d1 = Math.floor(guest_denom);
    d2 = Math.floor(host_denom);
    denom = lcm(d3, d4);
    document.getElementsByClassName("num").innerHTML = num.toString();
    document.getElementsByClassName("denom").innerHTML = denom.toString();
}


function createLoop(pieOut, pieIn){
    var loop = new Tone.Loop(
        function (time) {
            if (cnt1 == 0) {
                kick.triggerAttackRelease("C1", "16n");
                hat.triggerAttackRelease("C2", "16n");
                Tone.Draw.schedule(
                    function () {
                                pieIn.animate({
                                    timing: backEaseOut, duration: 300
                                });
                                pieOut.animate({
                                    timing: backEaseOut, duration: 300
                                })
                            }, time);
                    } 
            
    
            else if (guestBeats[cnt1]) {
                hat.triggerAttackRelease("C2", "16n");               
                    Tone.Draw.schedule(
                        function () {
                            pieOut.animate(
                                {
                                    timing: backEaseOut, duration: 300
                                }
                            )
                        }, time);
            }
    
            else if (hostBeats[cnt1]) {
                kick.triggerAttackRelease("C1", "16n");
                    Tone.Draw.schedule(
                        function () {
                            pieIn.animate({timing: backEaseOut, duration: 300})
                            }, time);
            }
            cnt1++;
            cnt1 = cnt1%sub;
        }
        , "4n");
    

    return loop;
}


//animation setup
var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

//Animation of cross rhythm pies



/////
//**FUNCTIONS**//
////

//PAGE NUMBER 0: opening the website

Btn[0].onclick = function () {
    document.getElementsByClassName("page")[0].style.display = "block"; document.getElementsByClassName("page")[0].classList.add("animate-in");
    setTimeout(function () {
        document.getElementsByClassName("page")[0].classList.remove("animate-in");

    }, 600);
    document.getElementsByClassName("firstpage")[0].style.display = "none"
};

//VIEW PAGES: navigate throught the website

selectors[0].style.background = "black"; //First selection of buttons
selectors[0].style.color = "#dce1d5";

// Function that allow to switch page
function ShowPage(n) {
    document.querySelector("#togglebtn").textContent = "Stop";

    var x = document.getElementsByClassName("page");
    var buttons = document.getElementsByTagName("button");
    x[CurrentPage].style.display = "none";
    //buttons[CurrentPage].style.backgroundColor = "";
    CurrentPage = n;
    x[n].style.display = "block";
    //buttons[n].style.backgroundColor = "blue";
};

//Function that color the button of the page selected
function color_button(event) {
    selectors.forEach(reset_buttons);
    if (event.target.className == "LinBtn") {
        ShowPage(0);
        selectors[0].style.background = "black";
        selectors[0].style.color = "#dce1d5";
    };
    if (event.target.className == "IrrBtn") {
        ShowPage(1);
        selectors[4].style.background = "black";
        selectors[4].style.color = "#dce1d5";
    };
    if (event.target.className == "ClvBtn") {
        ShowPage(2);
        selectors[8].style.background = "black";
        selectors[8].style.color = "#dce1d5";
    };

};

function reset_buttons(selector) {
    selector.style.background = "#dce1d5";
    selector.style.color = "black";
};

function select_button(selector) {
    selector.onclick = color_button;
};

selectors.forEach(select_button);

//HELPER

let helper = true;
var elementList = [guest1, host1, result];



elementList.forEach(function (element) {
    if (helper == true) {
        if (element == guest1) {
            element.addEventListener("mouseover", function () {
                var x = document.getElementById("snackbarGuest");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);
            });
        };

        if (element == host1) {
            element.addEventListener("mouseover", function () {
                var x = document.getElementById("snackbarHost");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);
            }
            );
        }
        if (element == result) {
            element.addEventListener("mouseover", function () {
                var x = document.getElementById("snackbarTatum");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);
            }
            );
        }
    };
});



/////
//**CONTROLLER**//
////


document.documentElement.addEventListener('mousedown', function () {
    if (Tone.context.state !== 'running') Tone.context.resume();
});

document.getElementById("startbtn").onclick = function () {
    start = performance.now();
    cnt1 = 0;
    largePie.innerPie = smallPie;
    polyrhythmLoop = createLoop(largePie, smallPie);
    Tone.start();
    ShowPage(3);
    polyrhythmLoop.start();

    Tone.Transport.start("+1");


    end = performance.now();
    console.log("Call to do the whole function took " + (end - start) + " milliseconds.");
};

document.getElementById("togglebtn").onclick = function () {
    if (document.querySelector("#togglebtn").textContent == "Stop") {
        polyrhythmLoop.stop();
        document.querySelector("#togglebtn").textContent = "Start";

    }
    else {
        
        document.querySelector("#togglebtn").textContent = "Stop"
        polyrhythmLoop.start();



    }

};

document.getElementById("backbtn").onclick = function () {

    Tone.Transport.stop();
    ShowPage(0);


    if (document.querySelector("#togglebtn").textContent == "Stop") {

        polyrhythmLoop.start();
        ShowPage(0);
        Tone.Transport.stop()
    }
    else {
        ShowPage(0);
    }
};

document.getElementById("startbtn1").onclick = function () {
  
    Tone.start();
    ShowPage(4);
  
    Tone.Transport.start("+1");
  
    end = performance.now();
  };
  
  document.getElementById("backbtn1").onclick = function () {
  
    Tone.Transport.stop();
    ShowPage(1);
  
  //if (document.querySelector("#togglebtn").textContent == "Stop") {
  //  ShowPage(1);
  //  Tone.Transport.stop()
  //}
  //else{
  //  ShowPage(1);
  //}
  };


document.getElementById("coset_toggle").onclick = function () {
    check_coset();
    if (this.checked) {
        coset = true;
    }
    else {
        coset = false;
    }
}
//CHANGE OF BPM
tm.onchange = function () {
    bpm = Math.floor(tm.value);
    Tone.Transport.bpm.value = bpm;
};


//TIMING FOR ANIMATION

function back(timeFraction) {
    let x = 2.0;
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
}


function linear(timeFraction) {
    return timeFraction;
}

// accepts a timing function, returns the transformed variant
function makeEaseOut(timing) {
    return function (timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
}

var backEaseOut = makeEaseOut(back);

  //var linEaseOut = makeEaseOut(linear);
