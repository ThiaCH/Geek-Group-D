import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({setUser}) {
    return (
        <>
          <SignUpForm setUser={setUser}/>
          <LoginForm setUser={setUser}/>
        </>
    )
}