function nextGeneration() {
  console.log("next generation");
  calculateFitness();

  for (let i = 0; i < TOTAL; i += 1) {
    birds[i] = reproduce();
  }

  for (let i = 0; i < TOTAL; i += 1) {
    savedBirds[i].brain.dispose();
  }
  savedBirds = [];
}

function reproduce() {
  const brainA = pickOne();
  const brainB = pickOne();
  const childBrain = brainA.crossover(brainB);
  childBrain.mutate(0.1);
  return new Bird(childBrain);
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r -= savedBirds[index].fitness;
    index += 1;
  }
  index -= 1;
  const bird = savedBirds[index];
  return bird.brain;
}

function calculateFitness() {
  let sum = 0;
  for (const bird of savedBirds) {
    sum += bird.score;
  }
  for (const bird of savedBirds) {
    bird.fitness = bird.score / sum;
  }
}
