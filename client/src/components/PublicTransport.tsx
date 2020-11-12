import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const PublicTransport = () => {

  return (
    <Container>
      <Typography variant="h1">Julkisen liikenteen yhteydet</Typography>
      <Typography variant="body1">
        Täältä näkee mikä bussi tai juna on lähdössä! T.Dösäkuski
      </Typography>
    </Container>
  );
};

export default PublicTransport;
