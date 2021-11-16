import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/Auth";
import styled from "styled-components";
import Navigation from "../../Navigation/Navigation.styled";

const StyledLogin = styled.div`
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
`;

const Login = () => {
  let navigate = useNavigate();
  const [userInputs, setUserInputs] = useState();
  const authContext = useContext(AuthContext);
  return (
    <>
      <StyledLogin>
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
                fetch(process.env.REACT_APP_LOGIN_URL, {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(userInputs),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.msg !== "Successfully logged in" || !data.token) {
                      alert(data.err);
                    } else {
                      localStorage.setItem("token", data.token);
                      authContext.setToken(data.token);
                    }
                  })
                  .catch((err) => alert(err))
                  .finally(() => e.target.reset(), navigate("/"));
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
                onChange={(e) =>
                  setUserInputs({
                    ...userInputs,
                    password: e.target.value,
                  })
                }
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </section>
      </StyledLogin>
    </>
  );
};

export default Login;
