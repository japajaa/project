import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const PublicTransport = () => {

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<any[]>([]);
  const [stopValue, setStopValue] = React.useState<any[]>([]);
  const [stopInputValue, setStopInputValue] = React.useState('');
  const [openRoutes, setOpenRoutes] = React.useState(false);
  const [routeOptions, setRouteOptions] = React.useState<any[]>([]);
  const [routeValue, setRouteValue] = React.useState<any | null>(null);
  const [departures, setDepartures] = React.useState<any | null>(null);
  let fetchingStops = false;
  const loading = open && fetchingStops && stopInputValue.length > 2;
  const loadingRoutes = openRoutes && routeOptions.length === 0;

  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {

    const getJson = async () => {
      fetchingStops = true;
      try {
        const response = await fetch(`${baseUrl}api/stops?name=${stopInputValue}`);
        const json = await response.json();

        setOptions(json);
        fetchingStops = false;

      } catch (e) {
        fetchingStops = false;
        alert(`Error! ${e}`);
      }
    };
    if (stopInputValue.length === 3) {
      getJson();
    }
    if (stopInputValue.length < 3) setOptions([]);
  }, [stopInputValue]);


  useEffect(() => {
    const getJson = async () => {

      if (stopValue.length === 0) {
        return;
      }

      try {
        const response = await fetch(`${baseUrl}api/routes`);
        const json = await response.json();

        // get a list of routes that belong to stopvalues
        const routeList = stopValue.map((stop: any) => stop.routes.map((route: any) => route.id));
        const flatList = routeList.flat();
        const uniqueArray = flatList.filter((item: any, pos: any, self: any) =>{
          return self.indexOf(item) === pos;
        });
        console.log(uniqueArray);
        const filteredList = json.filter((route: any) => uniqueArray?.includes(route.id));
        setRouteOptions(filteredList);
      } catch (e) {
        alert(`Error! ${e}`);
      }

      try {
        const stopParameters = stopValue.map((stop:any) => `stop=${stop.gtfsId}`);
        console.log(stopParameters);
        const query = `${baseUrl}api/departures?${stopParameters.join('&')}`;
        console.log(query);
        const response = await fetch(query);
        const json = await response.json();
        console.log(json.data);
        console.log(json.data.stops);
        
        const deps: any[] = [];
        json.data.stops.forEach((stop: any) => { deps.push(stop.stoptimesWithoutPatterns); });
        console.log(deps);
        
        setDepartures(deps.flat());
      } catch (e) {
        alert(`Error! ${e}`);
      }

    };
    getJson();
  }, [stopValue]);

  const dateTime = Date.now();
  const timestamp = Math.floor(dateTime / 1000);

  const parseTime = (rawTime: number) => {
    const input = new Date(rawTime * 1000);
    const result = `${input.getHours()}:${input.getMinutes()}`;
    return result;
  };
 
  return (
    <Container>
      <Typography variant="h1">Julkisen liikenteen yhteydet</Typography>
      <Autocomplete
        id="selectstops"
        multiple
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        renderOption={(option) => (
          <>
            {option.name}
            {' '}
            (
            {option.code}
            )
          </>
        )}
        options={options}
        loading={loading}
        inputValue={stopInputValue}
        onInputChange={(event, newInputValue) => {
          setStopInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="Pysäkki"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        onChange={(event: any, newValue: any | null) => {
          setStopValue(newValue);
        }}
        value={stopValue}
      />
      {stopValue ? (
        <Autocomplete
          id="selectroutes"
          style={{ width: 300 }}
          open={openRoutes}
          onOpen={() => {
            setOpenRoutes(true);
          }}
          onClose={() => {
            setOpenRoutes(false);
          }}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.shortName}
          renderOption={(option) => (
            <>
              {option.shortName}
              {' '}
              (
              {option.longName}
              )
            </>
          )}
          options={routeOptions}
          loading={loadingRoutes}
          renderInput={(params) => (
            <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Linjat"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          onChange={(event: any, newValue: any | null) => {
            setRouteValue(newValue);
          }}
          value={routeValue}
        />
      ) : null }
      <Typography variant="body1">
        Täältä näkee mikä bussi tai juna on lähdössä! T.Dösäkuski
      </Typography>
      {stopValue && routeValue && (
        <>
          <Typography variant="body1">
            {`Tässä näytetään tulevat lähdöt pysäkiltä ${stopValue[0].name} linjalle ${routeValue.shortName} (${routeValue.longName})`}
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Linja</TableCell>
                  <TableCell align="right">Pysäkki</TableCell>
                  <TableCell align="right">Määränpää</TableCell>
                  <TableCell align="right">Kello</TableCell>
                  <TableCell align="right">Aikaa lähtöön</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departures.map((departure: any) => (
                  <TableRow key={`${departure.scheduledDeparture}`}>
                    <TableCell component="th" scope="row">
                      {departure.trip.route.shortName}
                    </TableCell>
                    <TableCell align="right">{stopValue[0].name}</TableCell>
                    <TableCell align="right">{departure.headsign}</TableCell>
                    <TableCell align="right">{parseTime(departure.scheduledDeparture + departure.serviceDay)}</TableCell>
                    <TableCell align="right">
                      {(departure.scheduledDeparture + departure.serviceDay - timestamp) / 60}
                      min
                    </TableCell>
                  </TableRow>
                ),
                
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default PublicTransport;
