import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavigation = styled.header`
  header {
    border-bottom: 1px solid black;
  }
  .header-wrapper {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-wrapper img {
    width: 10rem;
  }

  .btn-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20%;
  }

  .nav-link-first {
    background-color: #3498db;
    padding: 1rem;
    width: 40%;
    text-align: center;
    margin: 1rem;
    text-decoration: none;
    color: white;
  }

  .nav-link-first:hover {
    background-color: rgb(228, 228, 228);
    border: 1px solid black;
    color: black;
  }
`;

const Navigation = ({ text1, text2, linkto1, linkto2 }) => {
  return (
    <StyledNavigation>
      <header>
        <div className="header-wrapper">
          <img
            src="https://www.qapla.it/wp-content/uploads/2020/07/logocert-webdev.png"
            alt="logo"
          />
          <div className="btn-div">
            <Link className="nav-link-first" to={linkto1}>
              {text1}
            </Link>
            <Link className="nav-link-first" to={linkto2}>
              {text2}
            </Link>
          </div>
        </div>
      </header>
    </StyledNavigation>
  );
};

export default Navigation;
