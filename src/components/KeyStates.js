// KeyStates.js

import React, { useEffect, useState } from 'react';

function KeyStates({ sampleId }) {
  const loadKeyStates = () => {
    if (sampleId === 'new') {
      return getDefaultKeyStates();
    } else {
      const storedKeyStates = localStorage.getItem(`keyStates_${sampleId}`);
      return storedKeyStates ? JSON.parse(storedKeyStates) : getDefaultKeyStates();
    }
  };

  const getDefaultKeyStates = () => ({
    B: Array(16).fill(false),
    A: Array(16).fill(false),
    C: Array(16).fill(false),
    D: Array(16).fill(false),
    E: Array(16).fill(false),
    F: Array(16).fill(false),
    G: Array(16).fill(false),
    H: Array(16).fill(false),
  });

  const [keyStates, setKeyStates] = useState(loadKeyStates);

  const toggleKey = (rowLabel, keyIndex) => {
    const updatedKeyStates = { ...keyStates };
    updatedKeyStates[rowLabel][keyIndex] = !updatedKeyStates[rowLabel][keyIndex];
    setKeyStates(updatedKeyStates);

    if (sampleId !== 'new') {
      localStorage.setItem(`keyStates_${sampleId}`, JSON.stringify(updatedKeyStates));
    }
  };

  return { keyStates, toggleKey };
}

export default KeyStates;
