import { useState } from "react";
// import { create } from "ipfs-http-client";

//INTERNAL IMPORT
import Style from "../styles/signUp.module.css";
import images from "../img";

// const client = create("https://ipfs.infura.io:5001/api/v0");

const SignUp = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const socialImage = [
    {
      social: images.google,
      name: "Google"
    },
    {
      social: images.twitter,
      name: "Twitter"
    },
    {
      social: images.facebook,
      name: "facebook"
    },
  ];

  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };
 
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className={Style.success}
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className={Style.error}
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className={Style.signup} style={{marginTop: 94}}>
      <div className={Style.signup_box}>
        <h1>Sign Up!</h1>
            
      <div className={Style.input}>
        {/* Labels and inputs for form data */}
        <div className={Style.input_box}>
          <label htmlFor="name">Name:</label>
          <input onChange={handleName} placeholder="Full Name" value={name} type="text" />
        </div>
        <div className={Style.input_box}>
          <label htmlFor="email">Email:</label>
          <input onChange={handleEmail} placeholder="someone@example.com" value={email} type="email" />
        </div>
        <div className={Style.input_box}>
        <label
              htmlFor="password"
              className={Style.input_box_label}
            >
              <p>Password</p>
              <p>
                <a href="#">Forgot password?</a>
              </p>
            </label>
            <input type="password" onChange={handlePassword} placeholder="" value={password} />
        </div>
        
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
        
        <button onClick={handleSubmit} className={Style.button} type="submit">
          Submit
        </button>
      </div>

      <p className={Style.user_box_or}>OR</p>

      <div className={Style.user_box_social}>
          {socialImage.map((el, i) => (
            <div
              key={i + 1}
              onClick={() => setActiveBtn(i + 1)}
              className={`${Style.user_box_social_item} ${
                activeBtn === i + 1 ? Style.active : ""
              }`}
            >
              <img
                src={el.social}
                alt={el.name}
                width={40}
                height={40}
                className={Style.user_box_social_item_img}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SignUp;