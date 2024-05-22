import { useState } from "react";

export default function QR({ handleGenerateIds, validLoginIds }) {
  const [lastClickTime, setLastClickTime] = useState(null);
  const handleButtonClick = () => {
    handleGenerateIds();
    setLastClickTime(new Date());
  };

  return (
    <>
      <button onClick={handleButtonClick}>Generate IDs</button>
      {lastClickTime && (
        <p>
          Last Generated: {lastClickTime.toLocaleString('en-SG')}
        </p>
      )}
      <img
        src={`http://api.qrserver.com/v1/create-qr-code/?data=https://project-3-geekery.onrender.com/${validLoginIds}&size=300x300`}
      />
    </>
  );
}
