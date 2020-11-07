import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

// tälle sivulle linkit joukkoliikenne-sivulle ja reseptisivuille ja vanhaan reseptiwikiin
// single-page application? mitenkäs se pitikään mennä? :D
//js vai typescript?
// linttaus ja autolint on save?


function App() {
  return (
    <Container>
       <Typography variant="h1">Kotiverkko 2.0</Typography>
      <Typography variant="body1"  >Kaikki palvelut, joita kotona voi tarvita!</Typography>
      <Link href="#">
        Link
      </Link>      
    </Container>
  );
}

export default App;
