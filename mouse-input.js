var freqA = 174;
var freqS = 196;
var freqD = 220;
var freqF = 246;
var fr = 1;
var oscA, oscS, oscD, oscF;
var playingA = false;
var playingS = false;
var playingD = false;
var playingF = false;
var x = 0
function setup() {
  createCanvas(500,500)
  backgroundColor = (255);
  textAlign(CENTER);
  colorMode(HSB,50, 100, 100, 1)
  rectMode(CENTER)
  noFill()
   
  
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
  fr = map(mouseY,height,0,0.001,1,true)
  oscA.freq(freqA*fr);
  oscS.freq(freqS*fr);
  oscD.freq(freqD*fr);
  oscF.freq(freqF*fr);
  x = x + 5 
  if (x > width) {
    x = 0
  }
  print(x)
  
  if (playingA) {
    stroke(random(10*fr,20*fr),255,255)
    triangle(500*fr,x,x,random(height),500*fr,random(height))
  } else if (playingS){
    stroke(random(20*fr,30*fr),255,255)
    triangle(x,500*fr,x,random(height)/500*fr,500*fr,random(height))
  } else if (playingD){
    stroke(random(30*fr,40*fr),255,255)
    triangle(x,random(height),x,random(height),500*fr,random(height))
  } else if (playingF){
    stroke(random(40*fr,50*fr),255,255)
    triangle(x,random(height),random(height),x,500*fr,random(height))
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
