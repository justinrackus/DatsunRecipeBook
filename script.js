const recipes = [
    {
        "Recipe Name": "Pancakes",
        "Ingredients": [
            { "name": "Flour", "quantity": 200, "unit": "grams" },
            { "name": "Milk", "quantity": 300, "unit": "ml" },
            { "name": "Egg", "quantity": 2, "unit": "pieces" }
        ],
        "Steps": "Mix all ingredients and cook on a pan.",
        "Portion Size": 4
    }
];

const recipesDiv = document.getElementById('recipes');
const searchInput = document.getElementById('search');

function displayRecipes(filter = '') {
    recipesDiv.innerHTML = '';
    recipes
        .filter(recipe => recipe["Recipe Name"].toLowerCase().includes(filter.toLowerCase()))
        .forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';

            // Ingredients List with Initial Quantities
            const ingredientsList = recipe.Ingredients.map(ingredient => `
                <li>${ingredient.name}: 
                <span class="quantity">${ingredient.quantity}</span> 
                <span class="unit">${ingredient.unit}</span>
                </li>
            `).join('');

            recipeDiv.innerHTML = `
                <h2>${recipe["Recipe Name"]}</h2>
                <p><strong>Steps:</strong> ${recipe.Steps}</p>
                <p><strong>Portion Size:</strong> ${recipe["Portion Size"]}</p>
                <label for="portion">Adjust Portion Size:</label>
                <input type="number" id="portion-${recipe["Recipe Name"]}" value="${recipe["Portion Size"]}" onchange="adjustPortion(this, '${recipe["Recipe Name"]}')">
                <ul>${ingredientsList}</ul>
            `;
            recipesDiv.appendChild(recipeDiv);
        });
}

function adjustPortion(input, recipeName) {
    const newPortion = input.value;
    const recipe = recipes.find(r => r["Recipe Name"] === recipeName);

    if (!recipe) return;

    const scalingFactor = newPortion / recipe["Portion Size"];

    // Update Ingredient Quantities Dynamically
    recipe.Ingredients.forEach((ingredient, index) => {
        const quantitySpan = document.querySelectorAll('.quantity')[index];
        const updatedQuantity = (ingredient.quantity * scalingFactor).toFixed(2); // Round to 2 decimals
        quantitySpan.textContent = updatedQuantity;
    });

    // Update Portion Size
    recipe["Portion Size"] = newPortion;
}

searchInput.addEventListener('input', () => displayRecipes(searchInput.value));
displayRecipes();


function displayRecipes(filter = '') {
    recipesDiv.innerHTML = '';
    recipes
        .filter(recipe => recipe["Recipe Name"].toLowerCase().includes(filter.toLowerCase()))
        .forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';

            const ingredientsList = recipe.Ingredients.map((ingredient, index) => `
                <li>
                    ${ingredient.name}: 
                    <span class="quantity">${ingredient.quantity}</span>
                    <select id="unit-${recipe["Recipe Name"]}-${index}" onchange="convertUnit('${recipe["Recipe Name"]}', ${index}, this.value)">
                        ${Object.keys(ingredient.conversions).map(unit => `
                            <option value="${unit}" ${unit === ingredient.unit ? 'selected' : ''}>
                                ${unit}
                            </option>
                        `).join('')}
                    </select>
                </li>
            `).join('');

            recipeDiv.innerHTML = `
                <h2>${recipe["Recipe Name"]}</h2>
                <p><strong>Steps:</strong> ${recipe.Steps}</p>
                <label for="portion">Adjust Portion Size:</label>
                <input type="number" id="portion-${recipe["Recipe Name"]}" value="${recipe["Portion Size"]}" onchange="adjustPortion(this, '${recipe["Recipe Name"]}')">
                <ul>${ingredientsList}</ul>
            `;
            recipesDiv.appendChild(recipeDiv);
        });
}

function convertUnit(recipeName, ingredientIndex, newUnit) {
    const recipe = recipes.find(r => r["Recipe Name"] === recipeName);
    if (!recipe) return;

    const ingredient = recipe.Ingredients[ingredientIndex];
    if (!ingredient || !ingredient.conversions[newUnit]) return;

    const conversionFactor = ingredient.conversions[newUnit] / ingredient.conversions[ingredient.unit];
    ingredient.quantity = (ingredient.quantity * conversionFactor).toFixed(2);
    ingredient.unit = newUnit;

    // Re-render the recipes
    displayRecipes(searchInput.value);
}
