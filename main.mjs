console.clear();

import { calculate_pie, hostBeats, guestBeats, sub, guest1, host1, listenGuest, listenHost, calculateCoset, cosetBeats } from "./polyr.mjs"
import { PolyrhythmPie } from "./pies.mjs"
import { kick, openHiHat, closedHiHat, hat } from "./sound.mjs"
import { guest_num, guest_denom, host_num, host_denom, num, denom } from "./polym.mjs"


///
//**MODEL**//
///
Tone.context.latencyHint = 'fastest';
//Tone.context.lookAhead = 0;

//CANVAS VARIABLES
const canvas = document.getElementById('myCanvas');
const canvas2 = document.getElementById('myCanvas2');
const rcursor = document.getElementById("rcursor");


//  Timing variables 
let start = 0;
let end = 0;



var smallPie;
var largePie;
var smallerPie;

//NAVIGATE THROUGHT PAGE variables
var CurrentPage = 0; //page where you are 
var selectors = document.querySelectorAll("button"); //

//PAGE NUMBER 0 variable
let Btn = document.getElementsByClassName("firstbtn");


//SOUNDS: LOOP
var cnt1;
var cnt2;
var coset = false;


listenGuest(guest1);
listenHost(host1);
calculate_pie();
var smallPie = new PolyrhythmPie(200 / Math.sqrt(1.62), guest1.value, 1, canvas);
var largePie = new PolyrhythmPie(200, host1.value, 0, canvas);

var polyrhythmLoop = new Tone.Loop(rhythmLoopCallback(largePie, smallPie, smallerPie, coset), "4n"); // the coset parameters are useless for now

var smallMeter = new PolyrhythmPie(200 / Math.sqrt(1.62), guest_num.value, 1, canvas2);
var largeMeter = new PolyrhythmPie(200, host_num.value, 0, canvas2);

var polymeterLoop = new Tone.Loop(meterLoopCallback(smallMeter, largeMeter), "4n");

/***    BUTTON LISTENERS    ***/
guest1.onchange = () => {
    if (!guest1.value) guest1.value = 1;
    listenGuest(guest1);
    calculate_pie();
    //smallPie = new PolyrhythmPie(200 / Math.sqrt(1.62), guest1.value, 1, canvas);
    //smallPie.currentSub = guest1.value;
    smallPie.setSub(guest1.value);

}
host1.onchange = () => {
    if (!host1.value) host1.value = 1;
    listenHost(host1);
    calculate_pie();
    //largePie = new PolyrhythmPie(200, host1.value, 0, canvas);
    //largePie.currentSub = host1.value;
    largePie.setSub(host1.value);
}



function rhythmLoopCallback(pieOut, pieIn) {
    return function (time) {
        if (cnt1 == 0) {
            kick.triggerAttackRelease("C2", "16n");
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
                    pieIn.animate({ timing: backEaseOut, duration: 300 })
                }, time);
        }

        cnt1++;
        cnt1 = cnt1 % sub;
        console.log(cnt1);
    }
}


function meterLoopCallback(pieOut, pieIn) {
    return function (time) {
        var n = guest_denom.value / 4;
        var m = host_denom.value / 4;
        Tone.Draw.schedule(function () {
            if (cnt2 % n == 0) pieIn.animate({ timing: backEaseOut, duration: 200/n });
            if (cnt2 % m == 0) pieOut.animate({ timing: backEaseOut, duration: 200/m });
        }, time);
        //play hi hat
        //
        if (cnt2%fastest(guest_num.value, guest_denom.value, host_num.value, host_denom.value)==0){
            kick.triggerAttackRelease("C1", "16n");
        }
        if (cnt2%(slowest(guest_num.value, guest_denom.value, host_num.value, host_denom.value)*speedRatio(guest_denom.value, host_denom.value))==0){
           hat.triggerAttackRelease("C2", "16n")
        }
        cnt2++;
        cnt2 = cnt2 % denom;
    }
}

function speedRatio(g, h) {
    var largeSub = g >= h ? g : h;
    var smallSub = h <= g ? h : g;
    return largeSub / smallSub;
}

function fastest(gn, gd, hn, hd) {
    var fast = gd >= hd ? gn : hn;
    return fast;
}
function slowest(gn, gd, hn, hd) {
    var slow = gd <= hd ? gn : hn;
    return slow;
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
var result = document.getElementById("result");
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

//CURSOR ANIMATION
var rctx = rcursor.getContext("2d");
//cursor in polyrhythm
rctx.beginPath();
rctx.moveTo(210 + 100/Math.sqrt(3), 0);
rctx.lineTo(210, 100);
rctx.lineTo(210 - 100/Math.sqrt(3), 0 );
rctx.closePath();
rctx.lineWidth =2;
rctx.strokeStyle = "white";
rctx.stroke();


/////
//**CONTROLLER**//
////


document.documentElement.addEventListener('mousedown', function () {
    if (Tone.context.state !== 'running') Tone.context.resume();
});

document.getElementById("startbtn").onclick = function () {
    Tone.Transport.cancel();
    start = performance.now();
    cnt1 = 0;
    largePie.innerPie = smallPie;
    //polyrhythmLoop.callback = rhythmLoopCallback(largePie, smallPie);
    polyrhythmLoop = new Tone.Loop(rhythmLoopCallback(largePie, smallPie), "4n");
    Tone.start();
    ShowPage(3);
    polyrhythmLoop.start("+0.01");
    Tone.Transport.start("+1");
    Tone.Transport.bpm.value = 80 * Math.floor(host1.value);
    console.log(hostBeats.toString());
    console.log(guestBeats.toString());
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
    // SSET THE BPM TO SLOW
    polyrhythmLoop.stop();
    //polyrhythmLoop.dispose();
    Tone.Transport.stop();
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    cnt1 = 0;
    largePie.resetTheta();
    smallPie.resetTheta();
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

//POLYMETER PAGE
document.getElementById("startbtn1").onclick = function () {
    // SET THE BPM TO A NORMAL VALUE!
    Tone.Transport.cancel();
    start = performance.now();
    cnt2 = 1;
    largeMeter.setSub(host_num.value);
    smallMeter.setSub(guest_num.value);
    largeMeter.innerPie = smallMeter;
    console.log(denom + "n");
    polymeterLoop = new Tone.Loop(meterLoopCallback(largeMeter, smallMeter), denom + "n");
    polymeterLoop.start();
    Tone.start();
    ShowPage(4);
    Tone.Transport.start("+1");
    end = performance.now();
    console.log("Call to do the whole function took " + (end - start) + " milliseconds.");
};

document.getElementById("backbtn1").onclick = function () {

    Tone.Transport.stop();
    ShowPage(1);


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

//BPM POLYRHYTHM
var bpm1 = document.getElementById("tempo_choose");

function bpmChange(toggle, input) {
    if (toggle.checked == true) {
        console.log("fast tempo");
        Tone.Transport.bpm.value = 120 * Math.floor(input.value);

    }
    else {
        console.log("slow tempo");
        Tone.Transport.bpm.value = 80 * Math.floor(input.value);

    }
};

bpm1.onclick = function () {
    bpmChange(bpm1, host1)
};

//COSET

//smallerPie.animate({timing: backEaseOut, duration: 300})

var coset_toggle = document.getElementById("coset_toggle");

function toggle_coset() {
    if (coset_toggle.checked == true) {
        coset = !coset;
        console.log("coset " + coset);


    }
    else {
        coset = !coset;
        smallerPie = new PolyrhythmPie(200 / Math.sqrt(3.24), host1.value, 2, canvas);
        smallerPie.setSub(host1.value);
        smallPie.innerPie = smallerPie;
        console.log("coset " + coset);
        calculateCoset(false, 1);
        console.log("guest " + hostBeats);
        console.log("host " + guestBeats);
        console.log("coset " + cosetBeats);
    }
};



coset_toggle.onclick = function () {
    coset = !coset;
    console.log("coset " + coset);
    calculateCoset(false, 1);
    console.log(hostBeats.toString());
    console.log(guestBeats.toString());
    console.log(cosetBeats.toString());

};

/*if(toggle == true){
    if(cosetBeats[cnt1]) {
          //kick.triggerAttackRelease("C1", "16n");
        Tone.Draw.schedule(
          function () {
         pieCos.animate({timing: backEaseOut, duration: 300})
         }, time);
            }
        }*/