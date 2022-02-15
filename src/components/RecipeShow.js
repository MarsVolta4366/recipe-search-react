// Model show page like https://www.foodnetwork.com/recipes/giada-de-laurentiis/israeli-couscous-salad-with-smoked-paprika-recipe-2043334
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button, ListGroup, Table } from "react-bootstrap"

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
        }
        fetchData()
    }, [recipeId])

    return (
        <div>
            {recipe.image ? <img src={recipe.image} alt={`Image of ${recipe.title}`} /> : ""}
            <h1>{recipe.title}</h1>
            <Button onClick={() => navigate(-1)} style={{marginBottom: "10px"}}>Back to Results</Button>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Dairy Free</th>
                        <th>Gluten Free</th>
                        <th>Vegetarian</th>
                        <th>Ready in</th>
                        <th>Amount of Servings</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{recipe.dairyFree ? "Yes" : "No"}</td>
                        <td>{recipe.glutenFree ? "Yes" : "No"}</td>
                        <td>{recipe.vegetarian ? "Yes" : "No"}</td>
                        <td>{recipe.readyInMinutes} Minutes</td>
                        <td>{recipe.servings} Servings</td>
                    </tr>
                </tbody>
            </Table>
            <div>
                <h1 style={{textAlign: "left"}}>Ingredients</h1>
                <ListGroup style={{textAlign: "left"}}>
                    {ingredients}
                </ListGroup>
            </div>
            <div>
                <h1 style={{textAlign: "left"}}>Instructions</h1>
                <ListGroup as="ol" numbered style={{textAlign: "left"}}>
                    {instructions}
                </ListGroup>
            </div>
        </div>
    )
}

export default RecipeShow