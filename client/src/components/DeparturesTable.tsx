import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

interface DeparturesTableProps {
  stopValue: any[];
  routeValue: string[]; 
}

const Clock = () => {
  const [time, setTime] = React.useState<any>(new Date());

  const tick = () => {
    setTime(new Date());
  };

  useEffect(() => {
    const clockInterval = setInterval(tick, 1000);
    
    return () => {clearInterval(clockInterval); };
  }, []);
    


       
  const parseClock = (rawTime: number) => {
    const input = new Date(rawTime);
    const result = input.toLocaleTimeString();
    const finalResult = result.replaceAll('.', ':');

    return finalResult;
  };
  return (   
    <p>
      {parseClock(time.getTime())}
    </p>
  );
};
 
const DeparturesTable = ({ stopValue, routeValue }: DeparturesTableProps) => {
  const [departures, setDepartures] = React.useState<any[]>([]);
  const [time, setTime] = React.useState<any>(new Date());

  const baseUrl = process.env.REACT_APP_API_URL;

  const getJson = async () => {

    if (stopValue.length === 0) {
      return;
    }

    setTime(new Date());

    try {
      const stopParameters = stopValue.map((stop:any) => `stop=${stop.gtfsId}`);
      const query = `${baseUrl}api/departures?${stopParameters.join('&')}`;
      const response = await fetch(query);
      const json = await response.json();
      const deps: any[] = [];
      json.data.stops.forEach((stop: any) => {
        stop.stoptimesWithoutPatterns.forEach((stopTime: any) => {
          deps.push({...stopTime, stopName: stop.name});
        });
      }); 
      setDepartures(deps.flat().sort((a, b) => (a.realtimeDeparture || a.scheduledDeparture) - (b.realtimeDeparture || b.scheduledDeparture)));
    } catch (e) {
      alert(`Error! ${e}`);
    }

  };

  useEffect(() => {
    const departuresInterval = setInterval(getJson, 60000);
    getJson();

    return () => {clearInterval(departuresInterval);};
  }, [stopValue]);

  const timestamp = Math.floor(time.getTime() / 1000);

  const parseTime = (rawTime: number) => {
    const input = new Date(rawTime * 1000);
    const result = input.toLocaleTimeString();
    const replacedResult = result.replaceAll('.', ':');
    const finalResult = replacedResult.slice(0, -3);

    return finalResult;
  };

  const getAlerts =(departuresinput: any[]) => {

    const destArray = _.uniqBy(departuresinput, (x: any) => x.trip.route.shortName);

    const alertArray = destArray.map((x: any) => { return { shortName: x.trip.route.shortName, alerts: x.trip.route.alerts };});

    let finalArray = [];

    if (routeValue.length > 0) {
      finalArray = alertArray.filter((route: any) => routeValue.map((value: any)=> value.shortName).includes(route.shortName));

    } else { finalArray = alertArray;}

    return (finalArray.map(x => x.alerts.length > 0 ?(
      <>
        <Typography variant="h6">{x.shortName}</Typography>
        {x.alerts.map((alert: any) => (
          <>
            <Typography variant="subtitle1">{alert.alertHeaderText}</Typography>
            <Typography variant="subtitle2">{alert.alertDescriptionText}</Typography>
            <Link href={alert.alertUrl} variant="caption" target="_blank" rel="noreferrer">
              Lisätietoa
            </Link>
          </>
        ),
        )}
      </>
    ) : null));
  };

  return (
    <>
      
      <div>
        {departures.length > 0 && getAlerts(departures)}
      </div>
      <Clock />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Linja</TableCell>
              <TableCell align="right">Stop</TableCell>
              <TableCell align="right">Destination</TableCell>
              <TableCell align="right">Departure time</TableCell>
              <TableCell align="right">Time to departure</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departures.length > 0 && departures.map((departure: any) => routeValue.length === 0 || routeValue.map((route: any) => route.shortName).includes(departure.trip.route.shortName) ? (
              <TableRow key={`${departure.trip.route.shortName}${departure.scheduledDeparture}`}>
                <TableCell component="th" scope="row">
                  {departure.trip.route.shortName}
                </TableCell>
                <TableCell align="right">{departure.stopName}</TableCell>
                <TableCell align="right">{departure.headsign}</TableCell>
                <TableCell align="right">{departure.departureDelay > 60 ? `${parseTime(departure.scheduledDeparture + departure.serviceDay)} -> ${parseTime(departure.realtimeDeparture + departure.serviceDay)}` : parseTime((departure.realtimeDeparture || departure.scheduledDeparture) + departure.serviceDay)}</TableCell>
                <TableCell align="right">
                  { (departure.realtimeDeparture || departure.scheduledDeparture) + departure.serviceDay - timestamp > 0 ? Math.floor(((departure.realtimeDeparture || departure.scheduledDeparture) + departure.serviceDay - timestamp) / 60) : 0}
                  min
                </TableCell>
              </TableRow>
            ) : null,
                
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DeparturesTable;
