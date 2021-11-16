import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../../Navigation/Navigation.styled";

const StyledRegister = styled.div`
  .container {
    margin-top: 2rem;
  }

  form {
    padding: 2rem;
    border: 1px solid black;
    width: 30%;
    margin: 0 auto;
  }

  form input {
    box-sizing: border-box;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
  }

  .label {
    font-size: 18px;
  }

  form button {
    border: none;
    background-color: #3498db;
    padding: 0.8rem;
    width: 100%;
    text-align: center;
    text-decoration: none;
    color: white;
  }

  form button:hover {
    cursor: pointer;
  }

  textarea {
    box-sizing: border-box;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
  }
`;

const Register = () => {
  let navigate = useNavigate();
  const [userInputs, setUserInputs] = useState();
  const password = useRef();
  const passwordRep = useRef();
  return (
    <>
      <StyledRegister>
        <Navigation
          text1="log in"
          linkto1="/login"
          text2="register"
          linkto2="/register"
        />
        <section className="section">
          <div className="container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (password.current.value !== passwordRep.current.value) {
                  return alert("Passwords do not match!");
                }
                fetch(process.env.REACT_APP_REGISTER_URL, {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(userInputs),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.affectedRows !== 1) {
                      return alert("Something went wrong, please try again");
                    }
                    alert("Succesfully registered! redirecting to login page");
                  })
                  .catch((err) => alert(err.msg))
                  .finally(() => e.target.reset(), navigate("/login"));
              }}
            >
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="a@b.com"
                onChange={(e) => {
                  setUserInputs({
                    ...userInputs,
                    email: e.target.value.trim().toLocaleLowerCase(),
                  });
                }}
                required
              />
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="password"
                ref={password}
                onChange={(e) =>
                  setUserInputs({
                    ...userInputs,
                    password: e.target.value,
                  })
                }
                required
              />
              <label className="label">Repeat Password</label>
              <input
                type="password"
                placeholder="password"
                ref={passwordRep}
                required
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </section>
      </StyledRegister>
    </>
  );
};

export default Register;
