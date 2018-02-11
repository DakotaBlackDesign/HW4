var freqA = 170;
var freqB = 10;
var freqC = 30;
var freqD = 45;
var fft, filter;

function setup() {
  createCanvas(400,400)
  fill(255, 40, 255);

  filter = new p5.LowPass();
  amplitude = new p5.Amplitude();
	
  oscB = new p5.Oscillator();
  oscB.setType('sine');
  oscB.freq();
  oscB.amp();
	oscB.disconnect()
	oscB.connect(amplitude)
  oscB.start();
	
	amplitude.setInput(oscB)
	
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


	fft = new p5.FFT();
  
  
}

function draw() {
  background(30);

  // set the BandPass frequency based on mouseX
  var freqA1 = map(mouseX, 0, width, 1/10, 1);
  var freqB = map(mouseY, height, 0, 1/8, 2);
	var wob = map(mouseY, height, 0, 1, 50);
	var raz = map(mouseX, 0, width, 0, 5);
  oscB.freq(freqB)
	oscD.freq(freqA*freqA1)
	oscA.freq(freqA*freqA1)
  // give the filter a narrow band (lower res = wider bandpass)
  
	
	var level = amplitude.getLevel();
	var resolution = map(level, 0, 1, 0, raz);
	var wobble = map(level, 0, 1, wob, 300*wob);
	filter.freq(wobble)
  filter.res(resolution);
  print(size)
  
  // draw filtered spectrum
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i < spectrum.length; i++) {
    var w = map(i, 0, spectrum.length, 0, 100);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
		var x = map(w, 0, 10, 0, width);
    ellipse(x, height/2, w, h);
  }

  isMouseOverCanvas();
}

function isMouseOverCanvas() {
  var mX = mouseX, mY = mouseY;
  if (mX >0 && mX < width && mY <width && mY > 0) {
    oscA.amp(0.1, 0.2);
		oscB.amp(0.5, 0.2);
		oscC.amp(0.1, 0.2);
		oscD.amp(0.1, 0.2);
  } else {
    oscA.amp(0, 0.2);
		oscB.amp(0, 0.2);
		oscC.amp(0, 0.2);
		oscD.amp(0, 0.2);
  }
}
