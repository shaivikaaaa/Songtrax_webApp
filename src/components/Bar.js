import React from 'react';

function Bar({ barID, barEnabled, handleBarClick }) {
    
    function barSelected() {
        if (barEnabled) {
            return "selected";
        }
        return "";
    }

    return (
        <div className={`bar bar-${barID} ${barSelected()}`} onClick={handleBarClick}>
            {barID}
        </div>
    )
}

export default Bar;
