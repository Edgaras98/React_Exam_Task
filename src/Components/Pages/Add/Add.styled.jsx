import React, { useState, useContext } from "react";
import Navigation from "../../Navigation/Navigation.styled";
import { useNavigate } from "react-router";
import styled from "styled-components";

const StyledAdd = styled.div`
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

const Add = () => {
  const token = window.localStorage.getItem("token");
  let navigate = useNavigate();
  const [userInputs, setUserInputs] = useState();
  return (
    <>
      <StyledAdd>
        <Navigation text1="Home" linkto1="/" text2="Add" linkto2="/add" />
        <section className="section">
          <div className="container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetch(process.env.REACT_APP_CONTENT_URL, {
                  method: "POST",
                  headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(userInputs),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data) {
                      console.log(data.msg);
                      return navigate("/");
                    }
                    return alert("Data is not correct");
                  })
                  .catch((err) => alert(err))
                  .finally(() => e.target.reset());
              }}
            >
              <label className="label">Title</label>
              <input
                type="text"
                placeholder="title"
                onChange={(e) => {
                  setUserInputs({
                    ...userInputs,
                    title: e.target.value,
                  });
                }}
                required
              />
              <label className="label">Description</label>
              <textarea
                type="text"
                placeholder="Description"
                onChange={(e) =>
                  setUserInputs({
                    ...userInputs,
                    description: e.target.value,
                  })
                }
                required
              />
              <button type="submit">Add product</button>
            </form>
          </div>
        </section>
      </StyledAdd>
    </>
  );
};

export default Add;
