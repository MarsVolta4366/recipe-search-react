// Model show page like https://www.foodnetwork.com/recipes/giada-de-laurentiis/israeli-couscous-salad-with-smoked-paprika-recipe-2043334
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button, ListGroup } from "react-bootstrap"

const RecipeShow = (props) => {

    const { recipeId } = useParams()
    let [recipe, setRecipe] = useState({})

    let ingredients = []
    let instructions = []
    let navigate = useNavigate()

    if (recipe.extendedIngredients) {
        ingredients = recipe.extendedIngredients.map((ingredient, index) => {
            return (
                <ListGroup.Item key={index}>{ingredient.original}</ListGroup.Item>
            )
        })
    }

    if (recipe.analyzedInstructions) {
        instructions = recipe.analyzedInstructions[0].steps.map((step, index) => {
            return (
                <ListGroup.Item key={index} as="li">{step.step}</ListGroup.Item>
            )
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=a40e27eb395e4e92a5f5dcb1c521082b`)
            const resData = await response.json()
            setRecipe(resData)
            console.log(resData)
        }
        fetchData()
    }, [])

    return (
        <div>
            <Button onClick={() => navigate(-1)}>Back to Results</Button>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={`Image of ${recipe.title}`} />
            <ul>
                <li>
                    {recipe.dairyFree ? "Dairy Free" : "Has Dairy"}
                </li>
                <li>
                    {recipe.glutenFree ? "Gluten Free" : "Has Gluten"}
                </li>
                <li>
                    {recipe.vegetarian ? "Vegetarian" : "Not Vegetarian"}
                </li>
                <li>
                    Ready in {recipe.readyInMinutes} minutes
                </li>
                <li>
                    {recipe.servings} servings
                </li>
            </ul>
            <div>
                <h1>Ingredients</h1>
                <ListGroup>
                    {ingredients}
                </ListGroup>
            </div>
            <div>
                <h1>Instructions</h1>
                <ListGroup as="ol" numbered>
                    {instructions}
                </ListGroup>
            </div>
        </div>
    )
}

export default RecipeShow