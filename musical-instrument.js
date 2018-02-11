var freqA = 155.56;
var freqB = 10;
var freqC = 32.7;
var freqD = 38.89;
var fft, filter;

function setup() {
  createCanvas(400,400)
  fill(255, 40, 255);

  filter = new p5.LowPass(); // filter for taking out high frequencies
  amplitude = new p5.Amplitude(); // amplitude of the lowfrequency oscillator
	
// low frequency oscillator for modulation
  oscB = new p5.Oscillator(); 
  oscB.setType('sine');
  oscB.freq();
  oscB.amp();
  oscB.disconnect()
  oscB.connect(amplitude) 
  oscB.start();
  amplitude.setInput(oscB) 

// oscillators for sound 
  oscA = new p5.Oscillator();
  oscA.setType('triangle');
  oscA.freq(freqA);
  oscA.amp();
  oscA.disconnect();
  oscA.connect(filter);
  oscA.start();
	
  oscC = new p5.Oscillator();
  oscC.setType('triangle');
  oscC.freq(freqC);
  oscC.amp();
  oscC.disconnect();
  oscC.connect(filter);
  oscC.start();
	
  oscD = new p5.Oscillator();
  oscD.setType('square');
  oscD.freq(freqD);
  oscD.amp();
  oscD.disconnect();
  oscD.connect(filter);
  oscD.start();

  fft = new p5.FFT(); // spectrum analyzer  
}


function draw() {
  background(30);

// Map varibles to mouse coordinates
  var freqA1 = map(mouseX, 0, width, 1/10, 1); // pitch factor according to mouse up/down 
  var freqB = map(mouseY, height, 0, 1/8, 2); // wobble factor
  var wob = map(mouseY, height, 0, 1, 50); // wobble range sellector
  var raz = map(mouseX, 0, width, 0, 5); // resolution range sellector
	
  oscB.freq(freqB)
  oscD.freq(freqA*freqA1) //pitch the oscillator frequency up and down acording to factor freqA1
  oscA.freq(freqA*freqA1)
	
  var level = amplitude.getLevel(); //get the amplitude of oscillator oscB
  var resolution = map(level, 0, 1, 0, raz); //remap ocsilator amplitude to a range acceptable for modulating LowPass filter resolution
  var wobble = map(level, 0, 1, wob, 300*wob); //remap ocsilator amplitude to a range acceptable for modulating LowPass filter frequency
  filter.freq(wobble)
  filter.res(resolution);
  
 // draw filtered spectrum
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i < spectrum.length; i++) {
    var w = map(i, 0, spectrum.length, 0, 100);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    var x = map(w, 0, 10, 0, width);
    ellipse(x, height/2, w, h);
  }
// check if the mouse is over the canvas
  isMouseOverCanvas();
}

function isMouseOverCanvas() { //mouse checker
  var mX = mouseX, mY = mouseY;
  if (mX >0 && mX < width && mY <width && mY > 0) {
    oscA.amp(0.1, 0.2); // turn up the Oscillators
    oscB.amp(0.5, 0.2);
    oscC.amp(0.1, 0.2);
    oscD.amp(0.1, 0.2);
  } else {
    oscA.amp(0, 0.2); // turn down the Oscillators
    oscB.amp(0, 0.2);
    oscC.amp(0, 0.2);
    oscD.amp(0, 0.2);
  }
}


function keyPressed() { // change the key 
	print("got key press for ", key);
  if (key == 'A') {
    freqA = 130.81
	}
	if (key == 'S') {
    freqA = 185.00
	}
	if (key == 'D') {
    freqA = 155.56
	}
	if (key == 'F') {
    freqA = 220.00
	}
	if (key == 'G') {
    freqA = 277.18
	}
	if (key == 'H') {
    freqA = 196.00
	}
	if (key == 'J') {
    freqA = 329.63
	}
	if (key == 'K') {
    freqA = 233.08
	}
}	
