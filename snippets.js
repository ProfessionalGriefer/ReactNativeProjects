// Nicht benutzter Code, der trotzdem von Gebrauch sein kann.

/*
    Stellt eine klassische Wurfparabel dar. Wurde jedoch von der Raketengleichung abgelöst.
    Aus MainScreen.js
*/
// für Taschenrechner: -0.5 * (g / (v*v * cos(alpha)*cos(alpha) ) ) * x*x + tan(alpha) * x + h;
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
