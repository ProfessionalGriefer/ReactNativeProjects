# Physik Facharbeit - Applikation für mobile Endgeräte zur Simulation von Raketenflugbahnen

## Inhaltsverzeichnis

1. [Logbuch](#Logbuch)
2. [Gleichungen](#Gleichungen)
3. [Quellen](#Quellen)

## Logbuch

### 19.02.2020

Festlegung des Facharbeit Themas

### 21.02.2020

Erstellung des App Fundamentes. Leere Seite mit vorhandenem Draw Navigator.
Wiederholung von Physik Formeln aus der 10. Klasse:

## 23.20.2020

Ausschließlich mit dem Visualisierungs Frameworks D3 beschäftigt und versucht SVGs in der App zu implementieren. Ein Bug hat den Prozess für paar Stunden lahmgelegt, wurde jedoch von einem merkwürdigem Command gelöst: "expo r -c". Dieser solle den Cache der NPM Installationen leeren. Später habe ich gemerkt, dass React Packeges nicht mit React Native kompatibel sind. Somit bin ich auf den Framework Victory-native von Formidable umgewechselt. Die Funktion habe ich mithilfe eines Liniendiagramms gemacht.

- [ ] Animation
- [ ] Scrollen
- [ ] Anzeigen von Kraftvektoren
- [ ] etc.
      Das sind nützliche Features, die man in Betracht ziehen kann.

## 24.02.2020

Eslint + Prettier implementiert. Die App hat jetzt einen zweiten Screen: Input, wo die Eingabe in der Redux state gespeichert wird. Durch VictoryGraph ist es außerdem scrollbar.

## 26.02.2020

Mehr über React Hooks gelernt und JSX in den Screen Dateien überarbeitet, sodass Presentational und Container Components getrennt sind.

## 28.02.2020

Programm vom klassischen "class X extends React.component" zu React Hooks umgewandelt --> "const x = props => {}".

## 01.03.2020

Mehr Informationen über die Tsiolkovsky Raketengleichung gesammelt.

## 02.03.2020

Raketengleichung in den Graphen implementiert (zuerst Beschleunigung durch das Triebwerk, danach gewöhnliche Wurfparabel). Jedoch muss der Graph die Achsen automatisch skalieren.

## 03.03.2020

X und Y Achse passen sich automatisch je nach Hoch- und Nullpunkt an. Graphen der Rakete und der Ballistik (nachdem der Treibstoff verbraucht wurde) in zwei unterschiedlich farbige Graphen unterteilt.

## 05.03.2020

Alter Code

```javascript
sx = deltaV * Math.cos(alpha) * t2 + lastX;
sy = deltaV * Math.sin(alpha) * t2 - 0.5 * g * t ** 2 + lastY;
```

Neuer Code

```javascript
angle = Math.atan(
  (dataRocket[dataRocket.length - 1].y - dataRocket[dataRocket.length - 2].y) /
    (dataRocket[dataRocket.length - 1].x - dataRocket[dataRocket.length - 2].x)
);
sx = deltaV * Math.cos(angle) * t2 + lastX;
sy = deltaV * Math.sin(angle) * t2 - 0.5 * g * t2 ** 2 + lastY;
```

Diese zwei Änderungen (neue Zeitberechnung bei der Gravitation in sy und die Berechnung eines neuen Winkels) haben das Problem gelöst, woran ich viel zu lange gesessen habe. LOL.

## 30. und 31.03.2020

Facharbeit zu Ende geschrieben.

## Gleichungen

Nicht alle davon werden genutzt.

### Waagerechter Wurf:

- Wurfweite:  
  $$ s_w = \sqrt{\frac{2*h}{g}}*v_0  $$
- Wurfzeit:  
  $$ t = \sqrt{\frac{2*h}{g}} $$
- Bahngeschwindigkeit:  
  $$ v(t) = \sqrt{v_x^2+v_y^2} = \sqrt{v_0² + (g*t)^2} $$

### Senkrechter Wurf nach oben

- Bewegungsgleichungen:
  $$ s = v_0 * t - \frac{1}{2}*g*t² $$
- Steigzeit:  
  $$ t = \frac{v_0}{g} $$
- Wurfhöhe:  
  $$ h = v_0 * t_h - \frac{1}{2}*g*t² = \frac{v_0^2}{2g}$$

### Der schräge Wurf

- Wurfparabel
  $$ y = -\frac{1}{2}*\frac{g}{v_0^2*\cos^2\alpha}*x^2 + \tan\alpha*x + h_0 $$
- Wurfhöhe
  $$ y_s = \frac{1}{2} * \frac{v_0^2}{g}*\sin^2\alpha $$
- Wurfweite
  $$ x_E = \frac{v_0^2}{g}*\sin2\alpha $$

### Rocket Equation (in free space)

$$ F = -V_{exhaust} *\frac{dm}{dt} $$
$$ F = ma = m * \frac{dv}{dt} = -V_{exhaust} * \frac{dm}{dt} $$
$$ dV = -V_{exhaust} * \frac{dm}{m} $$

$$ \int_{V_i}^{V_f} \, dV = -V_{ex} \int_{m_i}^{m_f} $$
$$ \Delta V = -V_{ex}* \ln{\frac{m_f}{m_i}} = v_{ex} * \ln{\frac{m_i}{m_f}} $$

### Ideal Rocket Equation

$$ \Delta V = V_{ex} \ln{\frac{m_i}{m_f}} $$
$$ \frac{m_i}{m_f} = \exp{\frac{\Delta V}{V_{ex}}} $$
$$ m_{prop} = m_i - m_f = m_i [1 - \exp{\frac{-\Delta V}{V_{ex}}]} $$

$$ \frac{m_{pop}}{m_i} = 1 - \exp{\frac{-\Delta V}{V_{ex}}} $$
$$ V_{ex} = g_0 I_{sp} $$
$$ I_{sp} = specific\, impulse $$

## Klassische Raketengleichung

$$ a(t) = v_{ex} * \frac{\dot{m}}{m_0 - \dot{m} * t} $$
$$ v(t) = v_{ex} * \ln{\frac{m_0}{m_0 - \dot{m} * t}} $$
$$ s(t) = v_{ex} * (t - [t - \frac{m_0}{\dot{m}}] * \ln{[1 - \frac{\dot{m}}{m_0} * t]}) $$

## Quellen

Raketendistanz am Beispiel vom Videospiel Kerbal Space Program
https://www.youtube.com/watch?v=zLitRxZMsSc

Raketen Formeln (a, v, s) zusammen in Abhängigkeit von t
https://lexikon.astronomie.info/java/raketengleichung/function.html

Beispiel Graph Wurfparabel auf Geogebra
https://www.geogebra.org/graphing/ryapxjsw

Wikipedia Eintrag zur Raketengleichung
https://www.wikiwand.com/en/Tsiolkovsky_rocket_equation

Benötigte Einheiten und Größen, abgebildet auf Google Docs
https://docs.google.com/spreadsheets/d/1BDtNlsk82gipnMVdCVM7jO3fuhc_V_FAqcAUx1n3c7Q/edit?usp=sharing

Physik Facharbeit - wahrscheinlich auf privat eingestellt
https://docs.google.com/document/d/1DxnEDBO5YImbG9_u_r0hoq0O7OsNkwwZLy_ClEqMcZQ/edit#
