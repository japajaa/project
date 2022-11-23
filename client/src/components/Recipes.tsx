import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    height: '250px',
  },
});

const Recipes = () => {
  const classes = useStyles();

  const [data, setData] = useState<any>();

  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getJson = async () => {
      try {
        const response = await fetch(`${baseUrl}api/recipes`);
        const json = await response.json();
        setData(json);
      } catch (e) {
        console.log(`Error! ${e}`);
      }
    };
    getJson();
  }, []);



  return (
    <Container>
      <Typography variant="h1">Reseptit</Typography>
      <Typography variant="body1">
        Rutkasti herkullisia reseptejä, uudessa ulkoasussa!
      </Typography>
      <Grid container spacing={1}>
        {data && data.map((recipe: any) => (
          // eslint-disable-next-line no-underscore-dangle
          <Grid key={recipe._id} item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              <CardHeader
                title={recipe.name}
                subheader={recipe.description}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {recipe.ingredients.map((ingredient: any) => (
                    <React.Fragment key={ingredient.name}>
                      <span>
                        {ingredient.name}
                        {' '}
                        :
                        {' '}
                        {ingredient.amount}
                      </span>
                      <br />

                    </React.Fragment>
                  ))}
                  {recipe.instruction}
                </Typography>
              </CardContent>

            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Recipes;
