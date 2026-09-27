---
titulo: "Circuitos y sensores: la capa física de la mecatrónica"
fecha: "2026-09-27"
resumen: "Qué cubrir en electrónica básica, por qué es la capa que conecta el código con el mundo físico, y cómo evitar quemar componentes por prueba y error."
---

## Qué debería cubrir

- **Ley de Ohm** y cómo se combina en circuitos serie y paralelo.
- **Corriente continua vs. corriente alterna**, y por qué la mayoría de
  proyectos mecatrónicos trabajan en DC a bajo voltaje.
- **Sensores analógicos vs. digitales**: qué tipo de señal entregan y
  cómo interpretarla.
- **Microcontroladores básicos** (Arduino, ESP32): entradas, salidas,
  PWM, y comunicación serial.

## Por qué es necesaria

La mecatrónica es exactamente el punto donde el software deja de ser
abstracto: un sensor convierte una condición física (temperatura, luz,
distancia) en una señal que el código puede leer, y un actuador convierte
una decisión del código en movimiento real. Sin una base sólida de
electrónica, el código queda "sordo y mudo" — no tiene con qué sentir el
entorno ni con qué actuar sobre él, sin importar qué tan bien esté
escrita la lógica.

## Cómo evitar quemar componentes

- **Simula el circuito antes de armarlo** (Tinkercad, Falstad u otra
  herramienta similar). La mayoría de los errores costosos se detectan
  gratis en simulación.
- **Verifica el voltaje y la polaridad antes de conectar**, no después.
- **Usa resistencias limitadoras** en LEDs y salidas digitales por
  defecto, aunque el circuito "parezca" no necesitarlas.

## Practicar consciente

Medir con el multímetro para **confirmar** una intuición, no solo cuando
algo ya falló, entrena la capacidad de predecir el comportamiento de un
circuito antes de energizarlo. Documentar cada circuito armado — qué
componentes se usaron, qué datasheet se consultó, qué falló y por qué —
convierte cada error en una referencia futura, en vez de un tropiezo que
se repite meses después con el mismo componente.
