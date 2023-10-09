import React, { useEffect, useState } from 'react';
import { guitar, violin, piano, cello, synth } from '../instruments'; // Import all instruments
import { toneObject } from '../instruments';
import * as Tone from 'tone';
import instrumentNoteMapping from './instrumentNoteMapping';

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} string - The input string.
 * @returns {string} - The string with the first letter capitalized.
 */
const FirstLetterUp = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Functional component for a musical key.
 *
 * @param {Object} props - The component's properties.
 * @param {boolean} props.selected - Indicates whether the key is selected.
 * @param {Function} props.onClick - Function to handle click events on the key.
 * @param {Function} props.playSound - Function to play a sound when the key is clicked.
 */
function Key({ selected, onClick, playSound }) {
  return (
    <button
      className={`toggle${selected ? '-selected' : ''}`}
      onClick={() => {
        onClick();
        playSound();
      }}
    ></button>
  );
}

/**
 * Functional component for a set of musical keys.
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.sampleId - The sample ID.
 * @param {string} props.keyType - The type of keys (e.g., 'Guitar', 'Violin').
 */
function Keys({ sampleId, keyType }) {
  // State to keep track of the selected instrument
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  /**
   * Handles a click event on an instrument to select it.
   *
   * @param {string} instrument - The instrument to select.
   */
  const handleInstrumentClick = (instrument) => {
    setSelectedInstrument(instrument === selectedInstrument ? null : instrument);
  };

  useEffect(() => {
    setSelectedInstrument(FirstLetterUp(keyType))
  }, [keyType])

  // Define initial key states for musical keys
  const initialKeyStates = {
    B: Array(16).fill(false),
    A: Array(16).fill(false),
    C: Array(16).fill(false),
    D: Array(16).fill(false),
    E: Array(16).fill(false),
    F: Array(16).fill(false),
    G: Array(16).fill(false),
  };

  // Initialize the Tone.js synth
  const synth = new Tone.Synth().toDestination();

  /**
   * Plays the saved key states in order.
   */
  const playKeyStates = async () => {
    if (!selectedInstrument) {
      console.error('No instrument selected');
      return;
    }

    // Get the note mapping for the selected instrument
    const noteMapping = instrumentNoteMapping[selectedInstrument];
    for (const rowLabel in keyStates) {
      const rowKeys = keyStates[rowLabel];
      let counter = 0;
      for (let keyIndex = 0; keyIndex < rowKeys.length; keyIndex++) {
        if (rowKeys[keyIndex]) {
          const note = noteMapping[rowLabel];
          if (note) {
            counter += 1;
            switch (selectedInstrument) {
              case 'Guitar':
                guitar.triggerAttackRelease(note, '8n');
                break;
              case 'Violin':
                violin.triggerAttackRelease(note, '8n');
                break;
              case 'Piano':
                piano.triggerAttackRelease(note, '8n');
                break;
              case 'Cello':
                cello.triggerAttackRelease(note, '8n');
                break;
              default:
                // Handle other instruments or invalid cases if needed
                console.error(`Unsupported instrument: ${selectedInstrument}`);
                break;
            }
            // Play the note using Tone.js
            // synth.triggerAttackRelease(note, '8n');
            // Delay for a short duration before playing the next note
            await new Promise((resolve) => setTimeout(resolve, 150 * (counter + 1))); // Adjust the delay duration as needed
          }
        }
      }
    }
  };

  /**
   * Retrieves key states from local storage.
   *
   * @returns {Object} - The key states retrieved from local storage or initial states if not found.
   */
  const getKeyStatesFromLocalStorage = () => {
    if (sampleId !== 'new') {
      const storedKeyStates = localStorage.getItem(`keyStates_${sampleId}`);
      return storedKeyStates ? JSON.parse(storedKeyStates) : initialKeyStates;
    }
    return initialKeyStates;
  };

  const [keyStates, setKeyStates] = useState(getKeyStatesFromLocalStorage());

  /**
 * Toggles the state of a musical key and stores the updated state in local storage.
 *
 * @param {string} rowLabel - The label of the row of keys.
 * @param {number} keyIndex - The index of the key within the row.
 */
const toggleKey = (rowLabel, keyIndex) => {
  // Create a copy of the current key states
  const updatedKeyStates = { ...keyStates };

  // Toggle the state of the specified key
  updatedKeyStates[rowLabel][keyIndex] = !updatedKeyStates[rowLabel][keyIndex];

  // Update the state with the new key states
  setKeyStates(updatedKeyStates);

  // Store the updated key states in localStorage based on the sample's ID
  if (sampleId !== 'new') {
    localStorage.setItem(`keyStates_${sampleId}`, JSON.stringify(updatedKeyStates));
  }

  // Store the selected instrument type in localStorage
  localStorage.setItem(`keyType_${sampleId}`, JSON.stringify(selectedInstrument.toLowerCase()));
};

  /**
 * Plays a musical note for the selected instrument.
 *
 * @param {string} key - The musical key to be played.
 */
const playSound = (key) => {
  // Check if the instrument is selected
  if (!selectedInstrument) {
    console.error('No instrument selected');
    return;
  }

  // Check if the key is valid for the selected instrument
  if (!instrumentNoteMapping[selectedInstrument]) {
    console.error(`Invalid instrument: ${selectedInstrument}`);
    return;
  }

  // Get the musical note for the selected key
  const note = instrumentNoteMapping[selectedInstrument][key];

  // Check if the note is valid for the selected instrument
  if (!note) {
    console.error(`Invalid key for ${selectedInstrument}: ${key}`);
    return;
  }

  // Play the note based on the selected instrument
  switch (selectedInstrument) {
    case 'Guitar':
      guitar.triggerAttackRelease(note, '8n');
      break;
    case 'Violin':
      violin.triggerAttackRelease(note, '8n');
      break;
    case 'Piano':
      piano.triggerAttackRelease(note, '8n');
      break;
    case 'Cello':
      cello.triggerAttackRelease(note, '8n');
      break;
    default:
      // Handle other instruments or invalid cases if needed
      console.error(`Unsupported instrument: ${selectedInstrument}`);
      break;
  }
};

/**
 * Renders the main content of the Keys component, including instrument selection,
 * musical key toggles, and a preview button.
 *
 * @returns {JSX.Element} The JSX element representing the main content of the component.
 */
  return (
    <main>
      <div className="toggle-row-container">
        <div className="row-label">
          <h4>Instruments</h4>
        </div>
        <div className="sequence-row-container">
          {Object.keys(instrumentNoteMapping).map((instrument) => (
            <button
              key={instrument}
              className={`toggle${selectedInstrument === instrument ? '-selected' : ''}`}
              onClick={() => handleInstrumentClick(instrument)}
            >
              {instrument}
            </button>
          ))}
        </div>
      </div>
      {Object.entries(keyStates).map(([rowLabel, selectedKeys], rowIndex) => (
        <div className="toggle-row-container" key={rowLabel}>
          <div className="row-label">
            <h4>{rowLabel}</h4>
          </div>
          <div className="sequence-row-container">
            {selectedKeys.map((isSelected, keyIndex) => (
              <Key
                key={keyIndex}
                selected={isSelected}
                onClick={() => toggleKey(rowLabel, keyIndex)}
                playSound={() => playSound(rowLabel)}
              />
            ))}

            <div className="bar" />
          </div>
        </div>
      ))}
      <button onClick={playKeyStates}>Preview</button>
    </main>
  );
}

export default Keys;