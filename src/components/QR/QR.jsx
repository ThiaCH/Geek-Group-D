export default function QR({ handleGenerateIds, validLoginIds }) {
  return (
    <>
      <button onClick={handleGenerateIds}>Generate IDs</button>
      <img
        src={`http://api.qrserver.com/v1/create-qr-code/?data=https://project-3-geekery.onrender.com/${validLoginIds}&size=100x100`}
      />
    </>
  );
}
