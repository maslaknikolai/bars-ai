const TOTAL = 100;
const pipeSpeed = 6;
const birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;
let checkbox;

function setup() {
  createCanvas(640, 480);
  ml5.tf.setBackend("cpu");

  slider = createSlider(1, 10, 1);
  checkbox = createCheckbox('Play', true);

  for (let i = 0; i < TOTAL; i += 1) {
    birds[i] = new Bird();
  }
}

function draw() {
  if (!checkbox.checked()) {
    return
  }

  for (let n = 0; n < slider.value(); n += 1) {
    if (counter % 75 === 0) {
      pipes.push(new Pipe());
    }

    counter += 1;

    for (let i = pipes.length - 1; i >= 0; i -= 1) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j -= 1) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let i = birds.length - 1; i >= 0; i -= 1) {
      if (birds[i].offScreen()) {
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }

    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
    }
  }

  background(0);

  for (let bird of birds) {
    bird.show();
  }

  for (let pipe of pipes) {
    pipe.show();
  }
}
