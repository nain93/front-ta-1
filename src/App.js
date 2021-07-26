import React from 'react';
import styled from 'styled-components';

import InfiniteScrollList from './components/InfiniteScrollList';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

function App() {
  return (
    <Container>
      <InfiniteScrollList />
    </Container>
  );
}

export default App;
