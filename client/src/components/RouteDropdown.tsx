import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

interface RouteDropdownProps {
  handleChange: (value: any) => void;
  stopValue: string[];
}
  
const RouteDropdown = ({ handleChange, stopValue }: RouteDropdownProps) => {
  const [options, setOptions] = React.useState<any[]>([]);
  const [routeValue, setRouteValue] = React.useState<any[]>([]);
  const [routeInputValue, setRouteInputValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const loading = open && options.length === 0;
  const baseUrl = process.env.REACT_APP_API_URL;

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
        setOptions(filteredList);
      } catch (e) {
        alert(`Error! ${e}`);
      }
    };
    getJson();
  }, [stopValue]);

  return (
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
      getOptionSelected={(option, value) => option.name === value.shortName}
      getOptionLabel={(option) => option.shortName}
      renderOption={(option) => (
        <>{`${option.shortName} (${option.longName})`}</>
      )}
      options={options}
      loading={loading}
      inputValue={routeInputValue}
      onInputChange={(event, newInputValue) => {
        setRouteInputValue(newInputValue);
      }}
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
        handleChange(newValue);
      }}
      value={routeValue}
    />
  );
};

export default RouteDropdown;
