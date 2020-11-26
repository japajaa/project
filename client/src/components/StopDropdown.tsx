import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

interface StopDropdownProps {
  handleChange: (value: any) => void;
}

const StopDropdown = ({ handleChange }: StopDropdownProps) => {

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<any[]>([]);
  const [stopValue, setStopValue] = React.useState<any[]>([]);
  const [stopInputValue, setStopInputValue] = React.useState('');
  let fetchingStops = false;
  const loading = open && fetchingStops && stopInputValue.length > 2;

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
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      renderOption={(option) => (
        <>{`${option.name} (${option.code})`}</>
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
        console.log('new value is', newValue);
        setStopValue(newValue);
        handleChange(newValue);
      }}
      value={stopValue}
    />
  );
};

export default StopDropdown;
