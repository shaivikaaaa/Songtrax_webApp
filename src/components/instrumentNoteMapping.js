/**
 * Module for instrument note mappings.
 * @module instrumentMappings
 */

/**
 * Object that maps musical notes to specific instruments.
 * @const
 * @type {Object}
 */
 /**
   * note mappings.
   * @type {Object}
   * @property {string} A - A note mapping.
   * @property {string} B - B note mapping.
   * @property {string} C - C note mapping.
   * @property {string} D - D note mapping.
   * @property {string} E - E note mapping.
   * @property {string} F - F note mapping.
   * @property {string} G - G note mapping.
   */
 export const instrumentNoteMapping = {
 
  Guitar: {
    A: 'C#4',
    B: 'D4',
    C: 'D#4',
    D: 'E4',
    E: 'F4',
    F: 'F#4',
    G: 'G4',
  },
 
  Violin: {
    A: 'A4',
    B: 'B4',
    C: 'C5',
    D: 'D5',
    E: 'E5',
    F: 'F5',
    G: 'G5',
  },
  
  Piano: {
    A: 'A3',
    B: 'B3',
    C: 'C4',
    D: 'D4',
    E: 'E4',
    F: 'F4',
    G: 'G4',
  },
  
  Cello: {
    A: 'A3',
    B: 'B3',
    C: 'C3',
    D: 'D3',
    E: 'E3',
    F: 'F3',
    G: 'G3',
  },
};

export default instrumentNoteMapping;
