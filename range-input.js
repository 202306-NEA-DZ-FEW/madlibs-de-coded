/**
 * Initializes and manages custom styling for range input elements with class 'slider-progress'.
 */
for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
  // Set the initial value, min, and max as custom properties for styling.
  e.style.setProperty('--value', e.value);
  e.style.setProperty('--min', e.min == '' ? '0' : e.min);
  e.style.setProperty('--max', e.max == '' ? '100' : e.max);

  // Add input event listener to dynamically update the custom property '--value'.
  e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}
