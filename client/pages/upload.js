import { useState } from "react";
import Link from "next/link";
export default function PrivatePage(props) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", file);
    let response = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body,
    });
    response = await response.json();
    if (
      response.message ===
      "Data successfully inserted, but might take some time to update"
    ) {
      setMessage(
        "Successfully uploaded, but it might take some time for changes to take place"
      );
    } else {
      setMessage("Failed- the file may be of the wrong type");
    }
  };

  return (
    <div>
      <Link href="/">Back to Home</Link>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          top: "50vh",
        }}
      >
        <div>
          <h4>Select file</h4>
          <input type="file" name="myfile" onChange={uploadToClient} />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={uploadToServer}
          >
            Send to server
          </button>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
}
