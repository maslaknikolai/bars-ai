class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;

    if (brain) {
      this.brain = brain;
    } else {
      this.brain = ml5.neuralNetwork({
        inputs: 5,
        outputs: ["up", "down"],
        task: "classification",
        noTraining: true,
      });
    }
  }

  show() {
    stroke(255);
    fill(255, 100);
    ellipse(this.x, this.y, 32, 32);
  }

  up() {
    this.velocity += this.lift;
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  think(pipes) {
    let closestPipe = null;
    let closestD = Infinity;

    for (let i = 0; i < pipes.length; i += 1) {
      const d = pipes[i].x + pipes[i].w - this.x;

      if (d < closestD && d > 0) {
        closestPipe = pipes[i];
        closestD = d;
      }
    }

    const inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closestPipe.top / height;
    inputs[2] = closestPipe.bottom / height;
    inputs[3] = closestPipe.x / width;
    inputs[4] = this.velocity / 10;

    const results = this.brain.classifySync(inputs);

    if (results[0].label === "up") {
      this.up();
    }
  }

  offScreen() {
    return this.y > height || this.y < 0;
  }

  update() {
    this.score += 1;
    this.velocity += this.gravity;
    this.y += this.velocity;
  }
}
