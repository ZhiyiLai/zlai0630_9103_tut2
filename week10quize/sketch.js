//Defining Variables
var song;
var fft;

// Add in music before start
function preload() {
  song = loadSound("./Audio/sample-visualisation.mp3");
}

//Creating interaction
function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
  }
}

function setup() {
  createCanvas(1000, 1000);
  angleMode(DEGREES);
  colorMode(HSB);
  fft = new p5.FFT(0.9, 64); //Initializing the FFT object for audio analysis
}

function draw() {
  background(0);
  //Analyzing the song's audio frequencies
  var spectrum = fft.analyze();
  noStroke();
  translate(width / 2, height / 2);//Move the drawing origin to the centre of the screen

  //Looping through the spectrum to generate the visual patterns
  for (var i = 0; i < spectrum.length; i++) {
    const step = 360 / spectrum.length;
    var angle = map(i, 0, spectrum.length, 0, 360);//Mapping Spectrum Data to Angles
    var amp = spectrum[i];
    var r = map(amp, 50, 256, 200, 400);//Mapping spectrum data to radius
    // Calculate x and y coordinates
    var x = r * cos(angle);
    var y = r * sin(angle);
    stroke(step * i, step * i, step * i);
    line(x / 2, y / 2, x, y);
  }
}
