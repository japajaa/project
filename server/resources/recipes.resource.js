const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    
const ingredient = new mongoose.Schema({ name: String, amount: String });
const recipe = new mongoose.Schema({ name: String, description: String, instruction: String, ingredients: [ingredient] });

const RecipeModel = mongoose.model('Recipe', recipe);

const readRecipes = async () => {
    let recipesFromDb;
    try {
    recipesFromDb = await RecipeModel.find({});
    } catch (e) {
        console.log(e)
        return {error: e}
    }
    
    return recipesFromDb
    }

exports.readRecipes = readRecipes;