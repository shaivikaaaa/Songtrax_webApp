// musicFunctions.js

import { Sampler } from "tone";
import { violin } from "./instruments";

export function playNotesOne(synth, toneObject) {
    const now = toneObject.now();
    synth.triggerAttackRelease("G#3", "8n"); // Plays a G# note on the 3rd octave
  }
  
  export function playNotesManually(synth, toneObject) {
    const now = toneObject.now();
    synth.triggerAttackRelease("F#3", "8n", now); // Plays an F# note on the 3rd octave
    synth.triggerAttackRelease("D#3", "8n", now + 0.5); // Plays a D# note on the 3rd octave
    synth.triggerAttackRelease("C#3", "8n", now + 1); // Plays a C# note on the 3rd octave
  }
  
  export function playNotesFromArray(synth, toneObject) {
    const now = toneObject.now();
    const sequence = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];
    sequence.forEach((note, time) => {
      synth.triggerAttackRelease(note, "8n", now + (time / 4)); // Plays 0.25s apart
    });
  }

export function playViolinSound(violin, toneObject) {
    const now = toneObject.now();
    
    // Choose the note you want to play from the violin sampler
    const noteToPlay = "A4"; // Change this to the desired note
  
    // Trigger the note
    violin.triggerAttackRelease(noteToPlay, "8n", now);
  }
  