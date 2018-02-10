var freqA = 174;
var freqS = 196;
var freqD = 220;
var freqF = 246;

var oscA, oscS, oscD, oscF;

var playingA = false;
var playingS = false;
var playingD = false;
var playingF = false;

function setup() {
  createCanvas(400,400)
  backgroundColor = color(255);
  textAlign(CENTER);
  colorMode(HSB,100)
  
  oscA = new p5.Oscillator();
  oscA.setType('triangle');
  oscA.freq(freqA);
  oscA.amp(0);
  oscA.start();
  
  oscS = new p5.Oscillator();
  oscS.setType('triangle');
  oscS.freq(freqS);
  oscS.amp(0);
  oscS.start();
  
  oscD = new p5.Oscillator();
  oscD.setType('triangle');
  oscD.freq(freqD);
  oscD.amp(0);
  oscD.start();
  
  oscF = new p5.Oscillator();
  oscF.setType('triangle');
  oscF.freq(freqF);
  oscF.amp(0);
  oscF.start();
}

function draw() {
  if (playingA) {
    fill(random(0,25),255,255)
    rect(random(width),random(width),10,10)
  } else if (playingS){
    fill(random(25,50),255,255)
    rect(random(width),random(width),10,10)
  } else if (playingD){
    fill(random(50,75),255,255)
    rect(random(width),random(width),10,10)
  } else if (playingF){
    fill(random(75,100),255,255)
    rect(random(width),random(width),10,10)
	}
}

function keyPressed() {
  print("got key press for ", key);
  var osc;
  if (key == 'A') {
    osc = oscA;
    osc.amp(0.5, 0.1);
    playingA = true;
  } else if (key == 'S') {
    osc = oscS;
    osc.amp(0.5, 0.1);
    playingS = true;
  } else if (key == 'D') {
    osc = oscD;
    osc.amp(0.5, 0.1);
    playingD = true;
  } else if (key == 'F') {
    osc = oscF;
    osc.amp(0.5, 0.1);
    playingF = true;
  }  
}

function keyReleased() {
  print("got key release for ", key);
  var osc;
  if (key == 'A') {
    osc = oscA;
    osc.amp(0, 0.5);
    playingA = false;
  } else if (key == 'S') {
    osc = oscS;
    osc.amp(0, 0.5);
    playingS = false;
  } else if (key == 'D') {
    osc = oscD;
    osc.amp(0, 0.5);
    playingD = false;
  } else if (key == 'F') {
    osc = oscF;
    osc.amp(0, 0.5);
    playingF = false;
  }
}
