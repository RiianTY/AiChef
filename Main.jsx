import React from "react";
import IngredientsList from "./components/IngredientsList";
import ClaudeRecipe from "./components/ClaudeRecipe";
import { getRecipeFromMistral } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    "chicken",
    "all the main spices",
    "corn",
    "heavy cream",
    "pasta",
  ]);
  const [recipe, setRecipe] = React.useState("");

  React.useEffect(() => {
    setRecipe(""); // Clear recipe when ingredients change
  }, [ingredients]);

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function removeIngredient(ingredientToRemove) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  }

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          addIngredient(formData);
          e.target.reset();
        }}
        className="add-ingredient-form"
      >
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      <IngredientsList
        ingredients={ingredients}
        getRecipe={getRecipe}
        onRemove={removeIngredient}
      />

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
