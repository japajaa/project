import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const PublicTransport = () => {

  const [data, setData] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [openRoutes, setOpenRoutes] = React.useState(false);
  const [options, setOptions] = React.useState<any[]>([]);
  const [routeOptions, setRouteOptions] = React.useState<any[]>([]);
  const [stopValue, setStopValue] = React.useState<string | null>(null);
  const [routeValue, setRouteValue] = React.useState<string | null>(null);
  const loading = open && options.length === 0;
  const loadingRoutes = openRoutes && routeOptions.length === 0;

  const baseUrl = process.env.REACT_APP_API_URL;

  const reqData = { query: '{stops(name:"Hertton") {id code name routes {id}}}'};

  const routeReqData = { query: '{routes {id longName shortName}}'};

  // const reqData = { query: '{stop(id: "HSL:1040129") {id name}}'};

  const reqOptions = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(reqData), // body data type must match "Content-Type" header
  };

  const routeReqOptions = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(routeReqData), // body data type must match "Content-Type" header
  };

  console.log('stopValue is', stopValue);
  console.log('routeValue is', routeValue);
  useEffect(() => {
    let active = true;

    if (!loading) {
      return;
    }
    const getJson = async () => {
      try {

        const response = await fetch(`${baseUrl}api/stops`, reqOptions);
        const json = await response.json();
        if (active) {
          setOptions(json);
        }

        setData(json);
        active = false;
      } catch (e) {
        active = false;
        alert(`Error! ${e}`);
      }
    };
    getJson();
  }, [loading]);

  useEffect(() => {
    let active = true;

    if (!loadingRoutes) {
      return;
    }
    const getJson = async () => {
      try {

        const response = await fetch(`${baseUrl}api/routes`, routeReqOptions);
        const json = await response.json();
        if (active) {
          setRouteOptions(json);
        }

        setData(json);
        active = false;
      } catch (e) {
        active = false;
        alert(`Error! ${e}`);
      }
    };
    getJson();
  }, [loadingRoutes]);

  return (
    <Container>
      <Typography variant="h1">Julkisen liikenteen yhteydet</Typography>
      <Autocomplete
        id="selectstops"
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
        onChange={(event: any, newValue: string | null) => {
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
          onChange={(event: any, newValue: string | null) => {
            setRouteValue(newValue);
          }}
          value={routeValue}
        />
      ) : null }
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
