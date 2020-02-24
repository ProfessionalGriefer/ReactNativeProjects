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
Muss alles noch implementiert werden.

## 24.02.2020



## Gleichungen


### Waagerechter Wurf:
* Wurfweite:            
  $$ s_w = \sqrt{\frac{2*h}{g}}*v_0  $$
* Wurfzeit:             
  $$ t = \sqrt{\frac{2*h}{g}} $$
* Bahngeschwindigkeit:  
  $$ v(t) = \sqrt{v_x^2+v_y^2} = \sqrt{v_0² + (g*t)^2} $$

### Senkrechter Wurf nach oben
* Bewegungsgleichungen: 
  $$ s = v_0 * t - \frac{1}{2}*g*t² $$
* Steigzeit:            
  $$ t = \frac{v_0}{g} $$
* Wurfhöhe:             
  $$ h = v_0 * t_h - \frac{1}{2}*g*t² = \frac{v_0^2}{2g}$$

### Der schräge Wurf
* Wurfparabel
  $$ y = -\frac{1}{2}*\frac{g}{v_0^2*\cos^2\alpha}*x^2 + \tan\alpha*x + h_0 $$
* Wurfhöhe
  $$ y_s = \frac{1}{2} * \frac{v_0^2}{g}*\sin^2\alpha $$
* Wurfweite
  $$ x_E = \frac{v_0^2}{g}*\sin2\alpha

### Rocket Equation (in free space)
$$ F = -V_{exhaust} *\frac{dm}{dt} $$ 
$$ F = ma = m * \frac{dv}{dt} = -V_{exhaust} * \frac{dm}{dt} $$ 
$$ dV = -V_{exhaust} * \frac{dm}{m} $$ 

$$ \int_{V_i}^{V_f} \, dV = -V_{ex} \int_{m_i}^{m_f} $$ 
$$ \Delta V = -V_{ex}* ln(\frac{m_f}{m_i}) = v_{ex} * ln(\frac{m_i}{m_f}) $$

### Ideal Rocket Equation
$$ \Delta V = V_{ex} ln(\frac{m_i}{m_f}) $$
$$ \frac{m_i}{m_f} = exp(\frac{\Delta V}{V_{ex}}) $$
$$ m_{prop} = m_i - m_f = m_i [1-exp(\frac{-\Delta V}{V_{ex}})] $$

### Propellant Fraction
$$ \frac{m_{pop}{m_i}} = 1 - exp(\frac{-\Delta V}{V_{ex}}) $$
$$ V_{ex} = g_0 I_{sp} $$
$$ I_{sp} = specific\, impulse $$



## Quellen
https://web.mit.edu/16.unified/www/FALL/systems/Lab_Notes/traj.pdf

Link für die Wurfparabel auf Geogebra: https://www.geogebra.org/graphing/ryapxjsw

https://web.mit.edu/16.unified/www/SPRING/propulsion/notes/node103.html
https://www.wikiwand.com/en/Tsiolkovsky_rocket_equation