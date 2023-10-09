import React from 'react';
import  { useState } from 'react';
import { guitar } from '../instruments';
import Bar from './Bar'
function Bars({ sequence, setSequence, toneObject }) {


    function handleBarClick(bar) {
      const now = toneObject.now();
      guitar.triggerAttackRelease("C3", "8n", now);
      let filteredSequence = sequence.filter((_bar) => _bar.barID !== bar.barID);
      setSequence([ ...filteredSequence, { ...bar, barEnabled: !bar.barEnabled } ]);

    
        toneObject.start();
        toneTransport.stop();
    
        if(previewing) {
            setPreviewing(false);
            console.log("Preview stopped manually.");
        } else {
            setPreviewing(true);
            console.log("Preview started.");
            toneTransport.start();
        }
    }
        
    }

    function sortSequence(bar, otherBar) {
        if (bar.barID < otherBar.barID) {
            return -1;
        }
        if (bar.barID > otherBar.barID) {
            return 1;
        }
        return 0;
    }
    return sequence.sort(sortSequence).map(bar => <Bar key={bar.barID} {...bar} handleBarClick={() => handleBarClick(bar)} />);



function Sequencer({ toneObject, toneTransport, tonePart }) {

   let initialSequence = [];
    for(let bar = 1; bar <= 16; bar++) {
        initialSequence.push({
            barID: bar,
            barEnabled: false,
            barEnabled: bar % 2 == 1 ? true : false, // Pre-fill every second bar for testing
        });
    }
    // ...
    const [sequence, setSequence] = useState(initialSequence);

    return (
        <>
            <div className="sequencer">
                <Bars sequence={sequence} setSequence={setSequence} toneObject={toneObject} />
            </div>
        </>
    );

}
export default Bars;