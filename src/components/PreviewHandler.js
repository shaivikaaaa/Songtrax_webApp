import React from "react";
import  './Homescreen';
 
function Preview({ previewing, setPreviewing }) {
    return <button>{previewing ? "Stop Previewing" : "Preview"}</button>;

     function handleButtonClick() {
            if(previewing) {
                setPreviewing(false);
                console.log("Preview stopped manually.");
            }
            else {
                setPreviewing(true);
                console.log("Preview started.");
            }
        }
        
        return <button onClick={handleButtonClick}>{previewing ? "Stop Previewing" : "Preview"}</button>;
        
}

function Sequencer({ toneObject, toneTransport, tonePart }) {
    // ...
    const [sequence, setSequence] = useState(initialSequence);
    
    const initialPreviewing = false;
    const [previewing, setPreviewing] = useState(initialPreviewing);
    
    // ...
    
    return (
        <>
            <div className="sequencer">
                <Bars sequence={sequence} setSequence={setSequence} toneObject={toneObject} />
            </div>
            <h4>Play Multiple Bars From Sequence</h4>
            <p>
                <Preview previewing={previewing} setPreviewing={setPreviewing} />
            </p>
        </>
    );
}
 export default Preview;