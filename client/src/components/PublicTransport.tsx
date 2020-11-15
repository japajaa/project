import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const PublicTransport = () => {

  const [data, setData] = useState<any>();

  useEffect(() => {
    const getJson = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/departures');
        const json = await response.json();
        setData(json);
      } catch (e) {
        alert(`Error! ${e}`);
      }
    };
    getJson();
  }, []);

  return (
    <Container>
      <Typography variant="h1">Julkisen liikenteen yhteydet</Typography>
      <Typography variant="body1">
        Täältä näkee mikä bussi tai juna on lähdössä! T.Dösäkuski
        <div>
          {data && <span>{JSON.stringify(data)}</span>}
        </div>
      </Typography>
    </Container>
  );
};

export default PublicTransport;
