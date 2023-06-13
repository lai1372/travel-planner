"use client"
import React, { useState } from "react";
import signUp from "../firebase/auth/signUp";

const getErrorMessage = (authCode: string) => {
  switch (authCode) {
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/email-already-in-use":
      return "Account with this email already exists";
    case "auth/missing-password":
      return "Password field is empty"
    case "auth/weak-password":
      return "Invalid password (Your password should be at least 6 characters long)"
    default:
      return `Unknown error ${authCode}}`;
  }
}

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");


  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    
    signUp(email, password, name).then(({result, error}) => {
      if (error) {
        setStatus(getErrorMessage(error.code))
      }
    })
  }

  return (
    <>
      <h1>Sign Up!</h1>
      <form onSubmit={handleSignUp}>
        <label htmlFor="name">Name:</label>
        <input placeholder="john doe" id="name" type="text" required onChange={(event) => {
          setName(event.target.value)
        }}/>
        <label htmlFor="email">Email:</label>
        <input placeholder="johndoe@hotmail.com" id="email" type="text" onChange={(event) => {
          setEmail(event.target.value)
        }}/>
        <label htmlFor="password">password:</label>
        <input placeholder="password" id="password" type="text" onChange={(event) => {
          setPassword(event.target.value)
        }}/>
        <p>{status}</p>
        <br></br>
        <button type="submit" >Submit</button>
      </form>
    </>
  );
}
