var kick = new Tone.MembraneSynth();
var hat = new Tone.MetalSynth();
var gain = new Tone.Gain(1).toMaster();
var s1 = new Tone.Synth({
    oscillator : {
    type : 'fmsine'
    } ,
    envelope : {
    attack : 0.0005 ,
    decay : 0.01 ,
    sustain : 0.3 ,
    release : 0.1
    }
}).toMaster();
var s2 = new Tone.Synth({
    oscillator : {
    type : 'fmsine'
    } ,
    envelope : {
    attack : 0.0005 ,
    decay : 0.01 ,
    sustain : 0.3 ,
    release : 0.1
    }
}).toMaster();
var s3 = new Tone.Synth({
    oscillator : {
    type : 'fmsine'
    } ,
    envelope : {
    attack : 0.0005 ,
    decay : 0.01 ,
    sustain : 0.3 ,
    release : 0.1
    }
}).toMaster();
var c1 = new Tone.AMSynth({
    oscillator : {
        type : 'fmsine'
        } 
}).toMaster();
var c2 = new Tone.AMSynth({
    oscillator : {
        type : 'fmsine'
        } 
}).toMaster();
var c3 = new Tone.AMSynth({
    oscillator : {
        type : 'fmsine'
        } 
}).toMaster();
var c4 = new Tone.AMSynth({
    oscillator : {
        type : 'fmsine'
        } 
}).toMaster();

var closedHiHat = new Tone.NoiseSynth({
    volume : -10,
    filter : {
        Q : 1
    },
    envelope : {
        attack : 0.01,
        decay : 0.15
    },
    filterEnvelope : {
        attack : 0.01,
        decay : 0.03,
        baseFrequency : 4000,
        octaves : -2.5,
        exponent : 4,

    }
});

var openHiHat = new Tone.NoiseSynth({
    volume : -10,
    filter : {
        Q : 1
    },
    envelope : {
        attack : 0.01,
        decay : 0.3
    },
    filterEnvelope : {
        attack : 0.01,
        decay : 0.03,
        baseFrequency : 4000,
        octaves : -2.5,
        exponent : 4,
    }
});

var reverb = new Tone.Reverb({
     decay : 1000 ,
     preDelay : 0.0001
});
//var delay = new Tone.FeedbackDelay(0.5).toMaster();
var gain = new Tone.Gain(0.7).toMaster();
var comp = new Tone.Compressor({
     ratio : 20 ,
     threshold : -50 ,
     release : 0.35 ,
     attack : 0.0003 ,
     knee : 30
}).toMaster();
//
//kick.chain(comp, reverb, gain );
kick.chain(gain, reverb, comp);
closedHiHat.chain(gain, reverb, comp);
openHiHat.chain(gain, reverb, comp);
hat.chain(gain, reverb, comp);

//Tone.context.latencyHint = 'fastest';
//Tone.context.lookAhead = 0;

export{ s1, s2, s3, c1, c2, c3, c4}