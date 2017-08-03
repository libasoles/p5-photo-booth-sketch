var capture;
var camWidth = 640;
var camHeight = 480;

var canvas, dot;
var dotColor = 100;

var record = false;
var lastTime;
var lapse = 1000; // x secs

var snapshots = [];
var snapsCounter = 0;
var snapWidth;
var snapHeight;
var snapMarginH = 2;
var snapMarginV = 55;

var marginTop = 30;
var marginBottom = 30;

function setup() {
    
  canvas = createCanvas(camWidth+snapMarginH*4, camHeight+marginTop+snapMarginV*2+marginBottom);
  canvas.position(camWidth, 0);
  
  capture = createCapture(VIDEO);
  capture.size(camWidth, camHeight);
  
  // cell size
  snapWidth = camWidth/3;
  snapHeight = camHeight/3;
  
  lastTime = millis();
  
  dot = createDiv('');
  dot.class('dot');
  dot.position(20, 20);
  
  background(255);
  noStroke();
}

function draw() {
  
  if(record) {
      
    // recording icon    
    dot.class('dot red');
    
    if(lastTime + lapse < millis()) {        
        captureSnap();
    }
  } else {   
    // reset dot
    dot.class('dot');
  }  
}

function captureSnap() {
            
    // display snapshots
    if(snapsCounter < 9) {
        
        var col = snapsCounter%3;
        var row = Math.floor(snapsCounter/3);
        
        // display image
        image(capture, 
                snapWidth * col + snapMarginH * (col+1), 
                snapHeight * row + snapMarginV * row + marginTop, 
                snapWidth, 
                snapHeight);          
       
        snapsCounter++;
        
        lastTime=millis();  
            
    } else if(snapsCounter == 9) {
        
        // save to disk
        saveSnaps();
       
        // stop recording
        reset();
    }
}

function saveSnaps() {
    save("snap-"+millis()+".jpg");
}

function mouseClicked() {   
  record = !record;  
  
  if(!record) {    
    reset(); // reset frames 
  }
  
  // always reset bg
  background(255); 
}

function reset() {
    snapsCounter = 0;
    record = false;
}
