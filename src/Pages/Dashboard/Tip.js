import React, { useEffect, useState } from "react";


const Tip = ({ setShowTooltip, ...rest }) => {
    const [payload, setPayload] = useState(rest.payload);
  
    // When the payload has data (area hovered in the chart), add it to the state
    // so we can use it to show and hide the tooltip at our expense
    useEffect(() => {
      rest.payload.length && setPayload(rest.payload);
    }, [rest.payload]);
  
    return payload.length ? (
      <div
        // Tooltip hides when leaving the tooltip itself
        onMouseLeave={() => setShowTooltip(false)}
        // Prevent Rechart events while the mouse is over the tooltip
        onMouseMove={e => e.stopPropagation()}
        style={{
          background: "white",
          padding: "2em",
          borderRadius: "4px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      >
        {`${payload[0].name}: ${payload[0].value}`}
      </div>
    ) : null;
  };

  export default Tip