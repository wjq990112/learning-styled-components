import type { Component } from 'solid-js';

import styled from './styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const App: Component = () => {
  return (
    <Wrapper>
      <Title>Hello World!</Title>
    </Wrapper>
  );
};

export { App as default };
