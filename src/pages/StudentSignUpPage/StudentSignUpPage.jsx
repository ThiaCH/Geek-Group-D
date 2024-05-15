import SignUpForm from "../../components/SignUpForm/SignUpForm"

export default function StudentSignUp ({ setUser }) {

  return (
    <>
      <h1>Student Sign Up Page</h1>
      <p>Fill in the details below if you are signing up as a new student.</p>
      <SignUpForm setUser={setUser}/>   
    </>
  )
}