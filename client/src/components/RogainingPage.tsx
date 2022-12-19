/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, {useState, Dispatch} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMapEvents } from 'react-leaflet';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

/*
// TODO
- Marker popupissa mahdollisuus päivittää pistearvo, nimetä piste, määrittää onko alku tai loppupiste
    - alku- ja loppupiste ovat uniikkeja, jos jollekin päivitetään arvo päälle niin millään muulla ei voi olla se päällä
- Markereihin näkymään kartalla pistearvo ja nimi?
- koordinaatit muotoon lat: jotain, y: jotain, kun nyt ovat "coordinates [60.123, 25.123]"
*/

const postDataToServer = async (markers: any[], velocity: string, timeLimit: string, randomFactor: string, setRouteData: Dispatch<any>, setIsLoading: Dispatch<any>) => {

  const baseUrl = process.env.REACT_APP_API_URL;
  let response;
  let data;

  setRouteData(undefined);
  setIsLoading(true);

  try {
    const url = `${baseUrl}api/rogainingRoute`;
    response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({points: markers, velocity, timeLimit, randomFactor}), // body data type must match "Content-Type" header
    });
    data = await response.json();    
  } catch (e) {
    alert(`Error! ${e}`);
  }
  setRouteData(data);
  setIsLoading(false);
};



interface LocationMarkerProps {
  setMarkers: (value: any) => void;
  markers: Array<any>;
}

const likelyUniqueId = () => Math.trunc(Date.now() * Math.random()).toString();

const LocationMarker = ({ setMarkers, markers }: LocationMarkerProps) => {
  const map = useMapEvents({
    click(e) {
      const updatedMarkers = [...markers, {id: likelyUniqueId(), name: '', pointValue: '', start: false, end: false, coordinates: [e.latlng.lat, e.latlng.lng]}];
      setMarkers(updatedMarkers);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const updateMarker = (markerId: string, attribute: string, newValue: any) => {

    console.log(`I probably should update attribute ${attribute} to value ${newValue} for marker with id ${markerId}`);

    const updatedMarkers = markers.map((marker: any) => marker.id === markerId ?  {...marker, [attribute]: newValue} : marker);

    console.log(updatedMarkers);
    setMarkers(updatedMarkers);
  };


  /*
    const updatedMarkers = [...markers, {id: likelyUniqueId(), name: '', pointValue: '', start: false, end: false, coordinates: [e.latlng.lat, e.latlng.lng]}];
      setMarkers(updatedMarkers);
  };
  */

  return markers && markers.length > 0 ? (
    <>
      {markers.map(marker => (
        <Marker position={marker.coordinates}>
          <Popup>
            id: 
            {' '}
            {marker.id}
            <br />
            Latitude: 
            {' '}
            {marker.coordinates[0]}
            <br />
            Longitude: 
            {' '}
            {marker.coordinates[1]}
            <br />
            <form noValidate autoComplete="off">
              <TextField id="standard-basic" label="Syötä nimi" type="text" defaultValue={marker.name} onChange={(e) => updateMarker(marker.id, 'name', e.target.value)} />
              <TextField id="filled-basic" label="Syötä pistearvo" type="number" defaultValue={marker.pointValue} onChange={(e) => updateMarker(marker.id, 'pointValue', e.target.value)} />
              <FormControlLabel
                control={<Checkbox checked={marker.start} onChange={(e) => updateMarker(marker.id, 'start', e.target.checked)} name="checkedStart" />}
                label="Alkupiste"
              />
              <FormControlLabel
                control={<Checkbox checked={marker.end} onChange={(e) => updateMarker(marker.id, 'end', e.target.checked)} name="checkedEnd" />}
                label="Loppupiste"
              />
             
            </form>
          </Popup>
        </Marker>
      ))}
    </>
  ) : null;
};


const columns: any = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'id', headerName: 'Id', width: 180, editable: false },
  { field: 'coordinates', headerName: 'Coordinates', editable: true, width: 250 },
  {
    field: 'pointValue',
    headerName: 'Points',
    type: 'string',
    width: 200,
    editable: true,
  },
  {
    field: 'start',
    headerName: 'Is start',
    type: 'boolean',
    width: 200,
    editable: true,
  },
  {
    field: 'end',
    headerName: 'Is end',
    type: 'boolean',
    width: 200,
    editable: true,
  },
];

const limeOptions = { color: 'lime' };

const RogainingPage = () => {

  const [markers, setMarkers] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [routeData, setRouteData] = useState<any>();
  const [timeLimit, setTimeLimit] = useState<string>('0');
  const [randomFactor, setRandomFactor] = useState<string>('0');
  const [velocity, setVelocity] = useState<string>('0');
  const [selected, setSelected] = React.useState<number | null>(null);

  const handleClick = (event: React.MouseEvent<unknown>, index: number) => {
    setSelected(selected === index ? null : index);
  };

  const isSelected = (index: number) => selected === index;

  return (
    <Container>
      <Typography variant="h4">Route planner for rogaining event</Typography>
      <Typography variant="body2" style={{marginBottom: '16px'}}>Should count the most efficient route based on attributes</Typography>
      {routeData || isLoading ? (
        !isLoading ? (
          <>
            <Typography variant="body2" style={{marginBottom: '16px'}}>{`Calculated routes. The max length of route based on given attributes is approximately ${Math.round(routeData.maxDistance) / 1000}km`}</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="route table">
                <TableHead>
                  <TableRow>
                    <TableCell>Pisteet</TableCell>
                    <TableCell align="right">Reitin pituus (m)</TableCell>
                    <TableCell align="right">Rasteja</TableCell>
                    <TableCell align="right">Reittipisteet</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {routeData.sortedRoutes.length > 0 && routeData.sortedRoutes.map((route: any, index: number) => {

                    const isItemSelected = isSelected(index);

                    return (
                    // eslint-disable-next-line react/no-array-index-key
                      <TableRow key={index} onClick={(event) => handleClick(event, index)} selected={isItemSelected}>
                        <TableCell component="th" scope="row">
                          {route.routePoints}
                        </TableCell>
                        <TableCell align="right">{route.routeLength}</TableCell>
                        <TableCell align="right">{route.routeLocations.length - 2}</TableCell>
                        <TableCell align="right">{route.routeLocations.map((r: any) => `${r.name} (${r.pointValue}), `)}</TableCell>
                      </TableRow>
                    );
                  }
                    ,
                
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : <CircularProgress />
      ) : null }
      <MapContainer center={[60.25559, 24.84286]} zoom={13} scrollWheelZoom={false} style={{height: '500px'}}>
        <LocationMarker markers={markers} setMarkers={setMarkers} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {routeData !== undefined && selected !== null ? <Polyline pathOptions={limeOptions} positions={routeData.sortedRoutes[selected].routeLocations.map((p: any) => p.coordinates)} /> : null}
      </MapContainer>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={markers} columns={columns} />
      </div>
      { /*
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="right">Longitude</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell align="right">Start</TableCell>
              <TableCell align="right">End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {markers.length > 0 && markers.map((marker: any, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {marker.name}
                </TableCell>
                <TableCell align="right">{marker.id}</TableCell>
                <TableCell align="right">{marker.coordinates[0]}</TableCell>
                <TableCell align="right">{marker.coordinates[1]}</TableCell>
                <TableCell align="right">{marker.pointValue}</TableCell>
                <TableCell align="right">{marker.start ? 'true' : 'false'}</TableCell>
                <TableCell align="right">{marker.end ? 'true' : 'false'}</TableCell>
              </TableRow>
            ),
                
            )}
          </TableBody>
        </Table>
      </TableContainer>
            */}
      <TextField id="standard-basic" label="Liikkumisnopeus (km/h)" type="number" onChange={(e) => setVelocity(e.target.value)} />
      <TextField id="standard-basic" label="Aikaraja (h)" type="number" onChange={(e) => setTimeLimit(e.target.value)} />
      <TextField id="standard-basic" label="sekoiluprosentti (%)" type="number" onChange={(e) => setRandomFactor(e.target.value)} />
      <Button variant="contained" onClick={() => postDataToServer(markers, velocity, timeLimit, randomFactor, setRouteData, setIsLoading)}>Lähetä tiedot härveliin</Button>
    </Container>
  );
};

export default RogainingPage;
