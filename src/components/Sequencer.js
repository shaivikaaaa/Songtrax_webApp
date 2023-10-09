import React, { useState, useEffect } from 'react';
import Bars from './Bars';

function Preview({ previewing, setPreviewing }) {
  return <button>{previewing ? "Stop Previewing" : "Preview"}</button>;
}

function Sequencer({ toneObject, toneTransport, tonePart }) {
  let initialSequence = [];
  for (let bar = 1; bar <= 16; bar++) {
    initialSequence.push({
      barID: bar,
      barEnabled: bar % 2 === 1 ? true : false, // Pre-fill every second bar for testing
    });
  }
  const initialPreviewing = false;
  const [previewing, setPreviewing] = useState(initialPreviewing);
  const [sequence, setSequence] = useState(initialSequence);

  useEffect(() => {
    tonePart.clear();
    toneTransport.cancel();

    sequence
      .filter(bar => bar.barEnabled)
      .forEach(bar => {
        toneObject.synth.triggerAttackRelease("C3", "0.25"); // Replace "synth" with your actual synth object
      });
  }, [sequence, toneObject, tonePart, toneTransport]);

  return (
    <div>
      <div className="sequencer">
        <Bars sequence={sequence} setSequence={setSequence} toneObject={toneObject} />
      </div>
      <div>
        <Preview previewing={previewing} setPreviewing={setPreviewing} />
      </div>
    </div>
  );
}

export default Sequencer;
