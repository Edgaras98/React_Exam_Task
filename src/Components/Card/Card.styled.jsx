import styled from "styled-components";
import React from "react";

let StyledCard = styled.div`
  margin: 1rem;
  text-align: center;
  width: 15rem;
  padding: 1rem;
  border: 1px solid black;
`;

function Card({ title, description }) {
  return (
    <StyledCard>
      <p>{title}</p>
      <p>{description}</p>
    </StyledCard>
  );
}

export default Card;
