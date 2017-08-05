import * as P5 from 'p5'

export class Sketch {

    private p5;

    private capture;
    private camWidth = 640;
    private camHeight = 480;

    private canvas;
    private dot;
    private dotColor = 100;

    private record = false;
    private lastTime;
    private lapse = 1000; // x secs

    private snapshots = [];
    private snapsCounter = 0;
    private snapWidth;
    private snapHeight;
    private snapMarginH = 2;
    private snapMarginV = 55;

    private marginTop = 30;
    private marginBottom = 30;

    constructor(p5) {

        this.p5 = p5;

        this.canvas = p5.createCanvas(
            this.camWidth+this.snapMarginH*4,
            this.camHeight+this.marginTop+this.snapMarginV*2+this.marginBottom);
        this.canvas.position(this.camWidth, 0);
        this.canvas.parent('canvas');

        this.capture = p5.createCapture(P5.VIDEO);
        this.capture.size(this.camWidth, this.camHeight);

        // cell size
        this.snapWidth = this.camWidth/3;
        this.snapHeight = this.camHeight/3;

        this.lastTime = p5.millis();

        this.dot = p5.createDiv('');
        this.dot.class('dot');
        this.dot.position(20, 20);

        // event listener
        this.mouseClicked = this.mouseClicked.bind(this);
        this.canvas.mouseClicked(this.mouseClicked);

        p5.background(255);
        p5.noStroke();
    }

    display() {

        if(this.record) {

            // recording icon
          this.dot.class('dot red');

            if(this.lastTime + this.lapse < this.p5.millis()) {
                this.captureSnap();
            }
        } else {
            // reset dot
            this.dot.class('dot');
        }
    }

    captureSnap() {

        // display snapshots
        if(this.snapsCounter < 9) {

            const col = this.snapsCounter%3;
            const row = Math.floor(this.snapsCounter/3);

            // display image
            this.p5.image(this.capture,
                    this.snapWidth * col + this.snapMarginH * (col+1),
                    this.snapHeight * row + this.snapMarginV * row + this.marginTop,
                    this.snapWidth,
                    this.snapHeight);

            this.snapsCounter++;

            this.lastTime=this.p5.millis();

        } else if(this.snapsCounter == 9) {

            // save to disk
            this.saveSnaps();

            // stop recording
            this.reset();
        }
    }

    saveSnaps() {
        this.p5.save("snap-"+this.p5.millis()+".jpg");
    }

    mouseClicked() {

        this.record = !this.record;

        // this gives you x seconds
        this.lastTime = this.p5.millis();

        if(!this.record) {
            this.reset(); // reset frames
        }

        // always reset bg
        this.p5.background(255);
    }

    reset() {
        this.snapsCounter = 0;
        this.record = false;
    }
}
