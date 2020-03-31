// Nicht benutzter Code, der trotzdem von Gebrauch sein kann.

/*
    Stellt eine klassische Wurfparabel dar. Wurde jedoch von der Raketengleichung abgelöst.
    Aus MainScreen.js
*/
// für Taschenrechner: -0.5 * (g / (v*v * cos(alpha)*cos(alpha) ) ) * x*x + tan(alpha) * x + h;
/* eslint-disable */
const wurfParabel = (
  x,
  v = input.velocity,
  alpha = input.angle,
  h = input.height,
  g = input.gravity
) => {
  return (
    -0.5 * (g / (v * v * Math.cos(toRadians(alpha)) ** 2)) * x * x +
    Math.tan(toRadians(alpha)) * x +
    h
  );
};
if (inputRocket.checked) {
  for (let t = 0; t <= sample; t += 0.5) {
    if (t < burnTime) {
      sx = Math.cos(alpha) * vex * (t - (t - m0 / mf) * Math.log(1 - (mf * t) / m0));
      sy =
        Math.sin(alpha) * vex * (t - (t - m0 / mf) * Math.log(1 - (mf * t) / m0)) -
        0.5 * g * t ** 2 +
        h;
      lastX = sx;
      lastY = sy;
      dataRocket.push({ x: sx, y: sy });
    } else {
      angle = Math.atan(
        (dataRocket[dataRocket.length - 1].y - dataRocket[dataRocket.length - 2].y) /
          (dataRocket[dataRocket.length - 1].x - dataRocket[dataRocket.length - 2].x)
      );
      sx = deltaV * Math.cos(angle) * t2 + lastX;
      sy = deltaV * Math.sin(angle) * t2 - 0.5 * g * t2 ** 2 + lastY;
      sy = sy < 0 ? 0 : sy;
      dataBallistic.push({ x: sx, y: sy });
      t2 += 0.1;
    }
  }
} else {
  for (let t = 0; t <= sample; t += 0.2) {
    sx = v * Math.cos(alpha) * t;
    sy = v * Math.sin(alpha) * t - 0.5 * g * t ** 2 + h;
    sy = sy < 0 ? 0 : sy;
    dataBallistic.push({ x: sx, y: sy });
  }
  dataRocket = null;
}
