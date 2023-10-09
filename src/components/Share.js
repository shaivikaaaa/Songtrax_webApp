import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';

import { getAllLocations, getSampleById, createSampletoLocation, deleteSampletoLocation } from '../Api'; // Import createSampletoLocation and deleteSampletoLocation functions
import {guitar, piano, violin, cello,synth} from '../instruments';
import instrumentNoteMapping from "./instrumentNoteMapping";
const APIKEY = '7xQk61SYxQ';

function Share() {
  let location = useLocation();
  const { id } = useParams(); // Get the sample ID from the URL
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [instrument, setInstrument] = useState(''); // Assuming you have an instrument state
  const [sampleName, setSampleName] = useState('');
  const [type, setType] = useState('');
  const [recordedData, setRecordedData] = useState([]);

  useEffect(() => {
    if (location.state) {

    }
    console.log(location, 18);
  }, [location]);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const playKeyStates = async () => {
    console.log(type, recordedData, 38);
    if (!recordedData) {
      console.error('No instrument selected');
      return;
    }
    // Get the note mapping for the selected instrument
    const noteMapping = instrumentNoteMapping[capitalizeFirstLetter(type)];

    for (const rowLabel in recordedData) {
      const rowKeys = recordedData[rowLabel];
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
                console.error(`Unsupported instrument: ${recordedData}`);
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


  useEffect(() => {
    const fetchSamples = async () => {
      setIsLoading(true);
      const data = await getAllLocations();
      setLocations(data);
      setIsLoading(false);
    };
    fetchSamples();

    // Fetch the corresponding sample name and instrument based on the ID
    if (id) {
      const fetchSampleData = async () => {
        const sampleData = await getSampleById(id);
        setSampleName(sampleData.name);
        setRecordedData(JSON.parse(sampleData.recording_data));
        setType(sampleData.type);
        setInstrument(sampleData.instrument); // Assuming instrument data is available
      };
      fetchSampleData();
    }
  }, [id]);

  const playKeys = () => {
    if (instrument === 'piano') {
      // Play piano keys using Tone.js (adjust the notes and durations as needed)
      synth.triggerAttackRelease(['C4', 'E4', 'G4'], '8n');
    } else if (instrument === 'guitar') {
      // Play guitar keys using Tone.js (adjust the notes and durations as needed)
      guitar.triggerAttackRelease(['A3', 'C4', 'E4'], '8n');
    }
  };

  /**
 * Handles the click event when a user wants to share a sample with a location.
 *
 * @param {string} locationId - The ID of the location to share the sample with.
 * @throws {Error} Throws an error if the sharing process fails.
 */
const handleSharedClick = async (locationId) => {
  try {
    const sampleId = id; // Assuming `id` is the sample ID from the URL

    const sampleLocationData = {
      sample_id: sampleId,
      location_id: locationId,
      api_key: APIKEY, // Make sure APIKEY is defined
      // Add other properties as needed
    };

    // Call the createSampletoLocation function to send the data to the API
    const response = await createSampletoLocation(sampleLocationData);

    // Update the state to mark the location as shared
    setLocations((prevLocations) =>
      prevLocations.map((loc) =>
        loc.id === locationId ? { ...loc, sharing: !loc.sharing } : loc
      )
    );
  } catch (error) {
    console.error('Failed to share location:', error);
    // Handle any errors that occur during the process
  }
};


  /**
 * Handles the click event when a user wants to unshare a sample from a location.
 *
 * @param {string} sampleId - The ID of the sample to unshare.
 * @param {string} locationName - The name of the location from which to unshare the sample.
 * @throws {Error} Throws an error if the unsharing process fails.
 */
const handleNotSharedClick = async (sampleId, locationName) => {
  try {
    // Find the location object based on the location name
    const location = locations.find((loc) => loc.name === locationName);

    if (!location) {
      console.error(`Location not found: ${locationName}`);
      return;
    }

    // Use the sample ID and location ID to delete the relationship
    const { id: locationId } = location;
    await deleteSampletoLocation(sampleId, locationId);

    // Optionally, update the UI or state to reflect the change (e.g., remove the location from the list)
  } catch (error) {
    console.error('Failed to unshare location:', error);
    // Handle the error as needed (e.g., show an error message)
  }
};


  return (
    <main>
      <h2 className="title">Share This Sample</h2>

      <div className="card">
        <div className="song-details">
          <h3>{sampleName}</h3>
          {/* Display other details as needed */}
        </div>
        <div className="buttons">
          <button onClick={playKeyStates} className="bright-button">
            Preview
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        locations.map((location) => (
          <div key={location.id}>
            <div className="toggle-row-container">
              <div className="location-name-label">
                <h4>{location.name}</h4>
              </div>
              <div className="sequence-row-container">
                <button
                  className={`toggle ${location.sharing ? 'toggle-selected' : ''}`}
                  onClick={() => handleSharedClick(location.id)}
                >
                  Shared
                </button>
                <button
                  className={`toggle ${!location.sharing ? 'toggle-selected' : ''}`}
                  onClick={() => handleNotSharedClick(location.id, location.name)}
                >
                  Not Shared
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </main>
  );
}

export default Share;