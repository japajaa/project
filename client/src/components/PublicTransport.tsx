import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import StopDropdown from './StopDropdown';
import RouteDropdown from './RouteDropdown';
import DeparturesTable from './DeparturesTable';

const PublicTransport = () => {

  const [stopValue, setStopValue] = React.useState<any[]>([]);
  const [routeValue, setRouteValue] = React.useState<any[]>([]);
 
  console.log('in publicTransport, stops and routes', stopValue, routeValue);
  return (
    <Container>
      <Typography variant="h1">Julkisen liikenteen yhteydet</Typography>
      <StopDropdown handleChange={(value: any) => setStopValue(value)} />
      {stopValue.length > 0 ? (
        <RouteDropdown stopValue={stopValue} handleChange={(value: any) => setRouteValue(value)} />
      ) : null }
      {stopValue.length > 0 && (
      <DeparturesTable stopValue={stopValue} routeValue={routeValue} />
      )}
    </Container>
  );
};

export default PublicTransport;
