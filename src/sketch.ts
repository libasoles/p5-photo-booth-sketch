import * as P5 from 'p5'
import 'p5/lib/addons/p5.dom';
import * as $ from 'jquery'

export class Sketch {

    private p5;

    private capture;
    private camWidth = 640;
    private camHeight = 480;

    private canvas;

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

    private startBtn;

    constructor(p5) {

        this.p5 = p5;

        // create canvas and place it inside container
        this.canvas = p5.createCanvas(
            this.camWidth+this.snapMarginH*4,
            this.camHeight+this.marginTop+this.snapMarginV*2+this.marginBottom);
        this.canvas.parent('canvas-container');

        // init camera
        this.capture = p5.createCapture(p5.VIDEO);
        this.capture.size(this.camWidth, this.camHeight);

        // cell size
        this.snapWidth = this.camWidth/3;
        this.snapHeight = this.camHeight/3;

        // timer
        this.lastTime = p5.millis();

        // event listeners
        this.startBtn = p5.select('.btn-start');
        this.startBtn.mouseClicked(_=>this.start());

        this.startBtn = p5.select('.btn-save');
        this.startBtn.mouseClicked(_=>this.saveSnaps());

        p5.background(255);
        p5.noStroke();
    }

    display() {

        if(this.record) {

          $('body').addClass('recording');

          if(this.lastTime + this.lapse < this.p5.millis()) {
              this.captureSnap();
          }
        } else {
            $('body').removeClass('recording');
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
            // stop recording
            this.stop();
        }
    }

    saveSnaps() {
        this.p5.save("snap-"+this.p5.millis()+".jpg");
    }

    start() {

        this.record = !this.record;

        // this gives you x seconds
        this.lastTime = this.p5.millis();

        if(!this.record) {
            this.stop(); // reset frames
        } else {
          $('body').removeClass('pristine');
        }

        // always reset bg
        this.p5.background(255);
    }

    stop() {
        this.snapsCounter = 0;
        this.record = false;
    }

    reset() {
        this.stop();
        $('body').addClass('pristine');
    }
}
