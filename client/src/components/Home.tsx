import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Home = () => {

  return (
    <Container>
      <Typography variant="h1">Kotiverkko 2.0</Typography>
      <Typography variant="body1">
        Kaikki palvelut, joita kotona voi tarvita! Typescriptillä!
      </Typography>
    </Container>
  );
};

export default Home;
