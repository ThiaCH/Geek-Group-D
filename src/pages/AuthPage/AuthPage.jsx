import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Routes, Route } from "react-router-dom";
import QR from "../../components/QR/QR";
import { useState } from "react";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

export default function AuthPage({ setUser }) {
  const [validLoginIds, setValidLoginIds] = useState("");

  const generateValidLoginIds = () => {
    const randomId = "GA" + Math.random().toString(36).substr(2, 10); // Generates a random string of 6 characters
    return randomId;
  };

  const handleGenerateIds = async () => {
    try {
      const ids = generateValidLoginIds();
      const response = await fetch("/api/users/loginId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loginId: ids }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate IDs");
      }
      const data = await response.json();
      setValidLoginIds(data.loginId);
    } catch (error) {
      console.error("Error generating IDs:", error);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm setUser={setUser} />} />
        <Route
          path="/:loginId"
          element={
            <LoginForm setUser={setUser} />
          }
        />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="qr"
          element={
            <QR
              handleGenerateIds={handleGenerateIds}
              validLoginIds={validLoginIds}
            />
          }
        />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
