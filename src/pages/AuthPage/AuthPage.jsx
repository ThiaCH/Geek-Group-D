import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

export default function AuthPage({ setUser }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm setUser={setUser} />} />
        <Route path="/:loginId" element={<LoginForm setUser={setUser} />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
