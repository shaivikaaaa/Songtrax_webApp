import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllSamples } from '../Api.js';
import instrumentNoteMapping from "./instrumentNoteMapping";
import * as Tone from "tone";
import { guitar, cello, piano, violin } from "../instruments";

/**
 * Homescreen component to display the list of samples and create new samples.
 * @param {object} props - The props passed to the Homescreen component.
 * @returns {JSX.Element} The Homescreen component.
 */
function Homescreen(props) {
  const [samples, setSamples] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSamples = async () => {
      setIsLoading(true);
      const data = await getAllSamples();
      setSamples(data);
      setIsLoading(false);
    };
    fetchSamples();
  }, []);

  const synth = new Tone.Synth().toDestination();

  /**
   * Capitalizes the first letter of a string.
   * @param {string} string - The input string.
   * @returns {string} The string with the first letter capitalized.
   */
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Plays the key states of a selected instrument.
   * @param {object} selectedInstrument - The selected instrument's key states.
   * @param {string} type - The type of the selected instrument.
   */
  const playKeyStates = async (selectedInstrument, type) => {
    if (!selectedInstrument) {
      console.error('No instrument selected');
      return;
    }
    // Get the note mapping for the selected instrument
    const noteMapping = instrumentNoteMapping[capitalizeFirstLetter(type)];

    for (const rowLabel in selectedInstrument) {
      const rowKeys = selectedInstrument[rowLabel];
      let counter = 0;
      for (let keyIndex = 0; keyIndex < rowKeys.length; keyIndex++) {
        if (rowKeys[keyIndex]) {
          const note = noteMapping[rowLabel];
          if (note) {
            counter += 1;
            switch (capitalizeFirstLetter(type)) {
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
            await new Promise((resolve) => setTimeout(resolve, 200 * (counter + 1))); // Adjust the delay duration as needed
          }
        }
      }
    }
  };

  return (
    <main>
      <h2 className="title">My Songs</h2>
      <div className="create-card">
        {/* Link to create a new sample */}
        <Link to="/edit-sample/new" className="full-button">
          Create Sample
        </Link>
      </div>

      <section className="sample">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          samples.map((sample) => (
            <div className="card" key={sample.id}>
              <div className="song-details">
                <h3>{sample.name}</h3>
                <p>{sample.datetime}</p>
              </div>
              <div className="button-group-container">
                <Link
                  to={`/edit-sample/${sample.id}`}
                  className="bright-button"
                >
                  Edit
                </Link>
                <Link to={''} onClick={() => playKeyStates(JSON.parse(sample.recording_data), sample.type)}>
                  Preview
                </Link>
                <Link
                  to={{
                    pathname: `/share-sample/${sample.id}`,
                  }}
                  state={{
                    sample,
                    sampleName: sample.name,
                    keyState: sample.keyStates,
                  }}
                  className="bright-button"
                >
                  Share
                </Link>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default Homescreen;
