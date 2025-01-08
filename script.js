// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
  // Raw JSON data (Replace this with your actual data)
  const recipes = [
    {
      "Recipe Name": "Bao dough",
      "Portion Size": 1,
      "Ingredient Name": "AP Flour",
      "Quantity": 2000,
      "Unit": "grams",
      "Conversions": "grams:1,cups:0.008",
      "Steps": "Mix all ingredients together."
    },
    {
      "Recipe Name": "Bao dough",
      "Portion Size": 1,
      "Ingredient Name": "Rice Flour",
      "Quantity": 100,
      "Unit": "grams",
      "Conversions": "grams:1,cups:0.008",
      "Steps": "Mix all ingredients together."
    },
    {
      "Recipe Name": "Bao dough",
      "Portion Size": 1,
      "Ingredient Name": "Baking soda",
      "Quantity": 15,
      "Unit": "grams",
      "Conversions": "grams:1,cups:0.008",
      "Steps": "Mix all ingredients together."
    },
    {
      "Recipe Name": "Bao dough",
      "Portion Size": 1,
      "Ingredient Name": "Instant dry active yeast",
      "Quantity": 25,
      "Unit": "grams",
      "Conversions": "grams:1,cups:0.008",
      "Steps": "Mix all ingredients together."
    },
    {
      "Recipe Name": "Bao dough",
      "Portion Size": 1,
      "Ingredient Name": "White sugar",
      "Quantity": 200,
      "Unit": "grams",
      "Conversions": "grams:1,cups:0.008",
      "Steps": "Mix all ingredients together."
    },
    {
      "Recipe Name": "Bao dough",
      "Portion Size": 1,
      "Ingredient Name": "Salt",
      "Quantity": 15,
      "Unit": "grams",
      "Conversions": "grams:1,cups:0.008",
      "Steps": "Mix all ingredients together."
    },
    {
      "Recipe Name": "Bao dough",
      "Portion Size": 1,
      "Ingredient Name": "Warm water",
      "Quantity": 1120,
      "Unit": "grams",
      "Conversions": "grams:1,cups:0.008",
      "Steps": "Mix all ingredients together."
    },
    {
      "Recipe Name": "Bao dough",
      "Portion Size": 1,
      "Ingredient Name": "Oil",
      "Quantity": 220,
      "Unit": "grams",
      "Conversions": "grams:1,cups:0.008",
      "Steps": "Mix all ingredients together."
    },
  ];

  // Group recipes by their "Recipe Name"
  const groupedRecipes = recipes.reduce((acc, recipe) => {
    if (!acc[recipe["Recipe Name"]]) {
      acc[recipe["Recipe Name"]] = {
        name: recipe["Recipe Name"],
        portionSize: recipe["Portion Size"],
        ingredients: [],
        steps: recipe["Steps"],
        conversions: recipe["Conversions"]
      };
    }

    // Add ingredient to the grouped recipe
    acc[recipe["Recipe Name"]].ingredients.push({
      ingredient: recipe["Ingredient Name"],
      quantity: recipe["Quantity"],
      unit: recipe["Unit"]
    });

    return acc;
  }, {});

  // Function to display the grouped recipes
  function displayRecipes(groupedRecipes) {
    const recipesContainer = document.getElementById("recipes-container");

    // Clear the existing recipes
    recipesContainer.innerHTML = '';

    // Loop through each grouped recipe and display it
    Object.values(groupedRecipes).forEach((recipe) => {
      const recipeElement = document.createElement('div');
      recipeElement.classList.add('recipe');

      // Format ingredients with each on its own line
      const ingredientsList = recipe.ingredients.map(ingredient => {
        return `${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit}`;
      }).join('<br>');  // Use <br> to separate ingredients onto new lines

      // Recipe title and ingredients
      recipeElement.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Portion Size:</strong> ${recipe.portionSize}</p>
        <p><strong>Ingredients:</strong><br> ${ingredientsList}</p>
        <p><strong>Instructions:</strong><br> ${recipe.steps}</p>
        <p><strong>Conversions:</strong><br> ${recipe.conversions}</p>
      `;

      recipesContainer.appendChild(recipeElement);
    });
  }

  // Function to handle the search
  function handleSearch() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();

    // Filter recipes based on search term (search by Recipe Name or Ingredient Name)
    const filteredRecipes = Object.values(groupedRecipes).filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(searchTerm)
      )
    );

    // Display filtered recipes
    displayRecipes(filteredRecipes);
  }

  // Add event listener to the search bar
  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('input', handleSearch);

  // Initial display of all grouped recipes
  displayRecipes(groupedRecipes);
});
