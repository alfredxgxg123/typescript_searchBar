import * as React from "react";
import styled from "styled-components";

import SearchBar  from "./SearchBar/SearchBar"

const Heading = styled.strong`
  display: block;
  font-size: 2rem;
  margin: 0.75em 0 1em;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 30rem;
  text-align: center;
`;

const Root = () => {
  return (
    <Wrapper>
      <Heading>Search Bar</Heading>
      <SearchBar />
    </Wrapper>
  );
};

export default Root;