import "./App.css";
import { useState } from "react";
import { validateEmail } from "./utils";

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};


function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [role, setRole] = useState("role");

  const getIsFormValid = () => {
    if(firstName && validateEmail(email) && password.value.length >= 8 && (role === "individual" || role === "business")){
      return true;
    }
    return false;
  };

  const clearForm = () => {
    // Implement this function
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setRole("role");
  };

  const handleSubmit = (event) => {
   event.preventDefault();
   clearForm();
   alert("form is submitted successfully");
   
  }
  return (
    <div className="App">
     <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign up</h2>
          <div className="Field">
            <label>
              First Name <sup>*</sup>
            </label>
            <input placeholder="First Name" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
          </div>
          <div className="Field">
            <label>
              Last Name
            </label>
            <input placeholder="Last Name" value={lastName} onChange={(e)=> setLastName(e.target.value)} />
          </div>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input placeholder="Email address" value={email} onChange={(e)=> setEmail(e.target.value)} />
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input 
              placeholder="Password" 
              type="password" 
              value={password.value} 
              onChange={(e)=>  setPassword({...password, value :e.target.value})}
              onBlur={() => { 
                setPassword({ ...password, isTouched: true }); 
              }} 
              />
            {password.isTouched && password.value.length < 8 ? PasswordErrorMessage() : null}
          </div>
          <div className="Field">
            <label>
              Role <sup>*</sup> 
            </label>
            <select onChange={(e)=> setRole(e.target.value)} value={role}>
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
              </select>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
     </form>
    </div>
  );
}

export default App;
