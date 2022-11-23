import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import StopDropdown from './StopDropdown';
import RouteDropdown from './RouteDropdown';
import DeparturesTable from './DeparturesTable';

const PublicTransport = () => {

  const [stopValue, setStopValue] = React.useState<any[]>([]);
  const [routeValue, setRouteValue] = React.useState<any[]>([]);
 
  return (
    <Container>
      <Typography variant="h4">Public transport connections (HSL)</Typography>
      <Typography variant="body2" style={{marginBottom: '16px'}}>Type at least three characters to populate the list</Typography>
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
