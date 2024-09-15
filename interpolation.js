function interpolation({ step, start, end, callback, duration }) {
  const stepSize = (end - start) / step;
  const timeStep = duration / step;

  for (let i = 0; i < step; i++) {
    const distance = start + i * stepSize;
    const point = i * timeStep;

    setTimeout(() => {
      callback([distance, point]);
    }, point);
  }
}