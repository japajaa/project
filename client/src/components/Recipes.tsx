import React from 'react';
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

const mockData = [
  {
    name: 'Goulash stew',
    description: 'Delicious stew made out of bell peppers and potatoes',
    ingredients: [{ name: 'bell pepper', amount: '1 pcs' }, { name: 'potato', amount: '7 - 10 pcs' }],
    instruction: 'Put stuff in a pot. Put pot in the oven and wait',
  },
  {
    name: 'Hamburger1',
    description: 'The best hamburger in the world',
    ingredients: [{ name: 'bun', amount: '1 pcs' }, { name: 'ground beef patty', amount: '2 pcs' }],
    instruction: 'Split the bun, put beef pattys in the middle. Enjoy!',
  },
  {
    name: 'Hamburger2',
    description: 'The best hamburger in the world',
    ingredients: [{ name: 'bun', amount: '1 pcs' }, { name: 'ground beef patty', amount: '2 pcs' }],
    instruction: 'Split the bun, put beef pattys in the middle. Enjoy!',
  },
  {
    name: 'Hamburger3',
    description: 'The best hamburger in the world',
    ingredients: [{ name: 'bun', amount: '1 pcs' }, { name: 'ground beef patty', amount: '2 pcs' }],
    instruction: 'Split the bun, put beef pattys in the middle. Enjoy!',
  },
  {
    name: 'Hamburger4',
    description: 'The best hamburger in the world',
    ingredients: [{ name: 'bun', amount: '1 pcs' }, { name: 'ground beef patty', amount: '2 pcs' }],
    instruction: 'Split the bun, put beef pattys in the middle. Enjoy!',
  },
  {
    name: 'Hamburger5',
    description: 'The best hamburger in the world',
    ingredients: [{ name: 'bun', amount: '1 pcs' }, { name: 'ground beef patty', amount: '2 pcs' }],
    instruction: 'Split the bun, put beef pattys in the middle. Enjoy!',
  },
  {
    name: 'Hamburger6',
    description: 'The best hamburger in the world',
    ingredients: [{ name: 'bun', amount: '1 pcs' }, { name: 'ground beef patty', amount: '2 pcs' }],
    instruction: 'Split the bun, put beef pattys in the middle. Enjoy!',
  },
];

const Recipes = () => {
  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h1">Reseptit</Typography>
      <Typography variant="body1">
        Rutkasti herkullisia reseptejä, uudessa ulkoasussa!
      </Typography>
      <Grid container spacing={1}>
        {mockData.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card key={recipe.name} className={classes.card}>
              <CardHeader
                title={recipe.name}
                subheader={recipe.description}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {recipe.ingredients.map((ingredient) => (
                    <>
                      <span>
                        {ingredient.name}
                        {' '}
                        :
                        {' '}
                        {ingredient.amount}
                      </span>
                      <br />

                    </>
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
