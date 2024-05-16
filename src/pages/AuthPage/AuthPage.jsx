import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Routes, Route } from "react-router-dom"

export default function AuthPage({setUser}) {
    return (
        <>
          <Routes>
            <Route path="/" element={<LoginForm setUser={setUser}/>} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        </>
    )
}