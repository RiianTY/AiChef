import React from "react";

export default function IngredientsList(props) {
  const [loading, setLoading] = React.useState(false);

  function handleRemove(ingredient) {
    props.onRemove && props.onRemove(ingredient);
  }

  async function handleGetRecipe() {
    setLoading(true);
    try {
      await props.getRecipe();
    } finally {
      setLoading(false);
    }
  }

  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>
      {ingredient}
      <button
        type="button"
        aria-label={`Remove ${ingredient}`}
        onClick={() => handleRemove(ingredient)}
        style={{ marginLeft: "0.5em" }}
      >
        ×
      </button>
    </li>
  ));

  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      <div className="get-recipe-container">
        <div>
          <h3>Ready for a recipe?</h3>
          <p>Generate a recipe from your list of ingredients.</p>
        </div>
        <button
          onClick={handleGetRecipe}
          disabled={props.ingredients.length < 3 || loading}
        >
          {loading
            ? "Please wait..."
            : props.ingredients.length < 3
            ? "Add more ingredients"
            : "Get a recipe"}
        </button>
      </div>
    </section>
  );
}
