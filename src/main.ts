import * as p5 from 'p5'
import './styles.scss'
import { Sketch } from './sketch'

// Sketch scope
export function app (p) {

  let sketch;

  // Setup function
  // ======================================
  p.setup = () => {
    let canvas = p.createCanvas(p.displayWidth, p.displayHeight);

    // make library globally available
    sketch = new Sketch(p);
  }

  // Draw function
  // ======================================
  p.draw = () => {
    sketch.display();
  }
}

// Initialize app
new p5(app);
