console.clear();
"use strict";

import { calculate_pie, hostBeats, guestBeats, sub, guest1, host1, listenGuest, listenHost, calculateCoset, cosetBeats } from "./polyr.mjs"
import { PolyrhythmPie } from "./pies.mjs"
import{ s1, s2, s3, c1, c2, c3, c4} from "./sound.mjs"
import { gn, gd, hn, hd, num, denom} from "./polym.mjs"


///
//**MODEL**//
///
Tone.context.latencyHint = 'fastest';
//Tone.context.lookAhead = 0;

//CANVAS VARIABLES
const canvas = document.getElementById('myCanvas');
const canvas2 = document.getElementById('myCanvas2');
const rcursor = document.getElementById("cursor");
const mcursor = document.getElementById("cursor1");


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
var cosetPie = new PolyrhythmPie(200 / Math.sqrt(3.24), gn, 2, canvas);

var polyrhythmLoop = new Tone.Loop(rhythmLoopCallback(largePie, smallPie, cosetPie, coset), "4n"); // the coset parameters are useless for now

var smallMeter = new PolyrhythmPie(200 / Math.sqrt(1.62), gn, 1, canvas2);
var largeMeter = new PolyrhythmPie(200, hn, 0, canvas2);
var cosetMeter = new PolyrhythmPie(200 / Math.sqrt(3.24), gn, 2, canvas2);

var polymeterShift = 0;
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



function rhythmLoopCallback(pieOut, pieIn, smallerPie) {
    return function (time) {
        if (cnt1 == 0) {
            flashCursor(rcursor, "flashTogether");
            c1.triggerAttackRelease(chord[0], "8n");
            c2.triggerAttackRelease(chord[1], "8n");
            c3.triggerAttackRelease(chord[2], "8n");
            c4.triggerAttackRelease(chord[3], "8n");
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
            flashCursor(rcursor, "flashGuest");
            s2.triggerAttackRelease(chord[2],"16n");
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
            flashCursor(rcursor, "flashHost");
            s1.triggerAttackRelease(chord[0],"16n");
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


function meterLoopCallback(pieOut, pieIn, pieCos) {
    return function (time) {
        var n = gd/4;
        var m = hd/4;
        var inFactor = pieIn.slowerThan(pieOut)? speedRatio(gd, hd): 1;
        var outFactor = pieOut.slowerThan(pieIn)? speedRatio(gd, hd): 1;
        //console.log(speedRatio(guest_denom.value, host_denom.value));
        
        //play hi hat
        //
        console.log("cnt = " + cnt2);
        //s3.triggerAttackRelease(chord[2], "64n");

        if (cnt2 == 0) {
            flashCursor(mcursor, "flashTogether");
            c1.triggerAttackRelease(chord[0], "16n");
            c2.triggerAttackRelease(chord[1], "16n");
            c3.triggerAttackRelease(chord[2], "16n");
            c4.triggerAttackRelease(chord[3], "16n");
        }

        
        else if (cnt2%(outFactor*pieOut.sub)==0){
            flashCursor(mcursor, "flashHost");
            s1.triggerAttackRelease(chord[0], "16n");   //HOST
        }
        else if (cnt2%(inFactor*pieIn.sub)==0){
            flashCursor(mcursor, "flashGuest");
            s2.triggerAttackRelease(chord[2], "16n");   //GUEST
        }

        if(setCoset && cnt2%(inFactor*pieIn.sub) == polymeterShift*inFactor && cosetOnOff.checked){
            flashCursor(mcursor, "flashCoset");
            s3.triggerAttackRelease(chord[1], "16n");       //PLAYS WITH THE GUEST
        }

        if(!setCoset && cnt2%(outFactor*pieOut.sub) == polymeterShift*outFactor && cosetOnOff.checked){
            flashCursor(mcursor, "flashCoset");
            s3.triggerAttackRelease(chord[1], "16n");       //PLAYS WITH THE HOST
        }

        Tone.Draw.schedule(function () {
            if (cnt2 % outFactor == 0) {
             //console.log("N REMAINDER = "+ n);
                pieOut.animate({ timing: backEaseOut, duration: 200/(m**(1.2)) });
                if(!setCoset && cosetOnOff.checked){
                    pieCos.animate({ timing: backEaseOut, duration: 200/(m**(1.2)) });
                }
                else if (!setCoset && !cosetOnOff.checked){pieCos.incrementTheta(); }
            }
            if (cnt2 % inFactor == 0) {
                //console.log("M REMAINDER = " + m);
                pieIn.animate({ timing: backEaseOut, duration: 200/(n**(1.2)) });
                if(setCoset && cosetOnOff.checked){
                    pieCos.animate({ timing: backEaseOut, duration: 200/(n**(1.2)) });
                }
                else if (setCoset && !cosetOnOff.checked){pieCos.incrementTheta();}
            }
            cnt2++;
            cnt2 = cnt2 % num;
        }, time);
        
    }
}

function speedRatio(g, h) {
    var largeSub = g >= h ? g : h;
    var smallSub = h <= g ? h : g;
    return largeSub / smallSub;
    /*return (g/h > 1)? g/h: h/g;*/
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
function flashCursor(element, animation){
    element.classList.remove(element.classList[1]);
    void element.offsetWidth;
    element.classList.add(animation);
};


/////
//**CONTROLLER**//
////


document.documentElement.addEventListener('mousedown', function () {
    if (Tone.context.state !== 'running') Tone.context.resume();
});

document.getElementById("startbtn").onclick = function () {
    document.querySelector("#togglebtn").textContent = "Stop";
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
    bpm1.checked = false;
    chord = chord1;
    polyrhythmLoop.stop();
    //polyrhythmLoop.dispose();
    Tone.Transport.stop();
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    cnt1 = 0;
    largePie.resetTheta();
    smallPie.resetTheta();
    ShowPage(0);
    

};

//POLYMETER PAGE
document.getElementById("startbtn1").onclick = function () {
    document.querySelector("#togglebtn1").textContent = "Stop";
    Tone.Transport.cancel();
    Tone.Transport.bpm.value = 80;
    start = performance.now();
    cnt2 = 0;
    largeMeter.resetTheta();
    smallMeter.resetTheta();
    cosetMeter.resetTheta();
    largeMeter.setSub(hn);
    largeMeter.setDenom(hd);
    smallMeter.setSub(gn);
    smallMeter.setDenom(gd);
    cosetMeter.setSub(cosetChoose.checked? hn: gn);
    cosetMeter.setDenom(cosetChoose.checked? hd: gd);
    //cosetMeter.setSub(gn);
    //cosetMeter.setDenom(gd);
    largeMeter.innerPie = smallMeter;
    
    polymeterLoop = new Tone.Loop(meterLoopCallback(largeMeter, smallMeter, cosetMeter), denom + "n");
    polymeterLoop.start();
    Tone.start();
    ShowPage(4);
    Tone.Transport.start("+1");
    end = performance.now();
    console.log("Call to do the whole function took " + (end - start) + " milliseconds.");
};

document.getElementById("togglebtn1").onclick = function () {
    if (document.querySelector("#togglebtn1").textContent == "Stop") {
        polymeterLoop.stop();
        document.querySelector("#togglebtn1").textContent = "Start";

    }
    else {

        document.querySelector("#togglebtn1").textContent = "Stop"
        polymeterLoop.start();
    }
};


document.getElementById("backbtn1").onclick = function () {
    bpm2.checked = false;
    chord = chord1;
    polymeterLoop.stop();
    Tone.Transport.stop();
    canvas2.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.height);
    polymeterShift = 0;
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
var bpm2 = document.getElementById("tempo_choose1");
var chord1 = ['A1', 'C3', 'E3', 'G3'];
var chord2 = ['C2', 'E3', 'G3', 'B3'];
var chord = chord1;

function bpmChange(toggle, input) {
    if (toggle.checked == true) {
        console.log("fast tempo");
        Tone.Transport.bpm.value = 120 * Math.floor(input);
        chord = chord2;
    }
    else {
        console.log("slow tempo");
        Tone.Transport.bpm.value = 80 * Math.floor(input);
        chord = chord1;
    }
};

bpm1.onclick = function () {
    bpmChange(bpm1, host1.value)
};

bpm2.onclick = function () {
    bpmChange(bpm2, 1)
};


//COSET

//smallerPie.animate({timing: backEaseOut, duration: 300})
var setCoset = true;
var cosetChoose = document.getElementById("coset_chose1");

document.getElementById('removeCoset1').onclick = function (){
    let gamma = (cosetMeter.alpha*(cosetMeter.sub-2) -Math.PI/2);

    cosetMeter.theta -= cosetMeter.alpha;
    polymeterShift++;
    polymeterShift = polymeterShift%cosetMeter.sub;

    if(polymeterLoop.state === "stopped" && cosetOnOff.checked){
        cosetMeter.draw(cosetMeter.progress);
    }
}

document.getElementById('addCoset1').onclick = function (){
    cosetMeter.incrementTheta();
    
    polymeterShift--;
    if (polymeterShift<0) polymeterShift = cosetMeter.sub-1;

    if(polymeterLoop.state === "stopped" && cosetOnOff.checked){
        cosetMeter.draw(cosetMeter.progress);
    }
}

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



cosetChoose.onclick = function () {
    setCoset = !setCoset;
    polymeterShift = 0;
    if (cosetChoose.checked) {
        cosetMeter.setSub(hn);
        cosetMeter.theta = largeMeter.theta;
        cosetMeter.progress = largeMeter.progress;
    }
    else {
        cosetMeter.setSub(gn);
        cosetMeter.theta = smallMeter.theta;
        cosetMeter.progress = smallMeter.progress;
    }

    if(polymeterLoop.state === "stopped" && cosetOnOff.checked){
        cosetMeter.draw(cosetMeter.progress);
    }
};

var cosetOnOff = document.getElementById("coset_toggle1");

cosetOnOff.onclick = ()=>{
    if(cosetOnOff.checked){
        smallMeter.innerPie = cosetMeter;
        /*cosetMeter.theta = smallMeter.theta;
        cosetMeter.progress = smallMeter.progress;*/
        if(polymeterLoop.state === "stopped") smallMeter.draw(smallMeter.progress);
    }
    else {
        smallMeter.innerPie = null;
        if(polymeterLoop.state === "stopped") smallMeter.draw(smallMeter.progress);
    }
}