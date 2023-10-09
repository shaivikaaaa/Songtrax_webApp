import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSampleById, createNewSample, updateSample } from '../Api';
import Keys from './Keys';

/**
 * EditSample component for editing and creating samples.
 * @returns {JSX.Element} The EditSample component.
 */
function EditSample() {
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useParams();
  const history = useNavigate();
  const [sample, setSample] = useState({ name: '', type: '', recording_data: '' });
  const [keyStates, setKeyStates] = useState({
    B: Array(16).fill(false),
    A: Array(16).fill(false),
    C: Array(16).fill(false),
    D: Array(16).fill(false),
    E: Array(16).fill(false),
    F: Array(16).fill(false),
    G: Array(16).fill(false),
  });

  /**
   * Fetches sample data when the component mounts.
   */
  useEffect(() => {
    if (id !== 'new') {
      const fetchSample = async () => {
        const data = await getSampleById(id);
        setSample(data);
        // Convert recording_data from JSON to an object
        setKeyStates(JSON.parse(data.recording_data));
      };
      fetchSample();
    } else {
      // If the ID is 'new', create a blank sample
      const newSample = { name: '', type: '', recording_data: '' };
      setSample(newSample);
    }
  }, [id]);

  /**
   * Handles saving the sample data.
   */
  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Convert keyStates object to a JSON string and save it in recording_data
      sample.recording_data = localStorage.getItem(`keyStates_${id}`);
      sample.type = JSON.parse(localStorage.getItem(`keyType_${id}`));

      if (id === 'new') {
        // Create a new sample with key states set to the initial state
        const createdSample = await createNewSample(sample, sample.type);

        // Redirect to the sample list or any other appropriate page
        history(`/edit-sample/${createdSample.id}`);
      } else {
        await updateSample(id, sample);
      }
    } catch (error) {
      // Handle error appropriately
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Handles key click events.
   * @param {string} rowLabel - The label of the key row (e.g., 'A', 'B').
   * @param {number} keyIndex - The index of the key within the row.
   */
  const handleKeyClick = (rowLabel, keyIndex) => {
    // Update the key states when a key is clicked
    const updatedKeyStates = { ...keyStates };
    updatedKeyStates[rowLabel][keyIndex] = !updatedKeyStates[rowLabel][keyIndex];
    setKeyStates(updatedKeyStates);
  };

  return (
    <main>
      <h2 className="title">Edit Sample:</h2>
      <form className="card edit-card" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          id="name"
          name="name"
          value={sample.name}
          onChange={(e) =>
            setSample((prevSample) => ({
              ...prevSample,
              name: e.target.value,
            }))
          }
        />
        <div className="button-group-container">
          <button type="button" className="bright-button" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <div className="spinner"></div> : 'Save'}
          </button>
        </div>
      </form>

      {/* Render the Keys component with sampleId, keyStates, and onKeyClick function */}
      <Keys sampleId={id} keyType={sample.type} keyStates={keyStates} onKeyClick={handleKeyClick} />

      {/* Save button at the bottom */}
      <div className="button-group-container">
        <button type="button" className="bright-button" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <div className="spinner"></div> : 'Save'}
        </button>
      </div>
    </main>
  );
}

export default EditSample;
