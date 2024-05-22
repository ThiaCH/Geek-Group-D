import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Routes, Route } from "react-router-dom"
import QR from "../../components/QR/QR";

export default function AuthPage({setUser}) {
    return (
        <>
          <Routes>
            <Route path="/" element={<LoginForm setUser={setUser}/>} />
            <Route path="/:loginId" element={<LoginForm setUser={setUser}/>} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="qr" element={<QR />} />
          </Routes>
        </>
    )
}