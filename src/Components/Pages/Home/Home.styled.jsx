import React, { useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation.styled";
import Card from "../../Card/Card.styled";
import styled from "styled-components";

const StyledHome = styled.div`
  .container {
    padding-top: 8rem;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    width: 80%;
  }
`;

const Home = () => {
  const [fetchedData, setfetchedData] = useState("");
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    fetch(process.env.REACT_APP_CONTENT_URL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setfetchedData(data);
      });
  }, []);
  return (
    <>
      <StyledHome>
        <Navigation text1="Home" linkto1="/" text2="Add" linkto2="/add" />
        <section className="container">
          {fetchedData.length === 0 ? (
            <h2>No data was found, please Add item</h2>
          ) : (
            fetchedData.map((data) => <Card key={data.id} {...data} />)
          )}
        </section>
      </StyledHome>
    </>
  );
};

export default Home;
