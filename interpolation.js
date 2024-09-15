function interpolation({ step, start, end, callback, duration }) {
  const stepSize = (end - start) / step;
  const timeStep = duration / step;

  let currentStep = 0;

  function executeStep() {
    if (currentStep < step) {
      const distance = start + currentStep * stepSize;
      const point = currentStep * timeStep;

      callback([distance, point]);

      currentStep++;
      setTimeout(executeStep, timeStep);
    }
  }

  executeStep();
}