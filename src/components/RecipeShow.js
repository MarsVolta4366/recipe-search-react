import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ListGroup, Table, ToggleButton } from "react-bootstrap"
import { Heart } from "react-bootstrap-icons"

const RecipeShow = () => {

    const { recipeId } = useParams()
    let [recipe, setRecipe] = useState({})
    let [checked, setChecked] = useState(false)

    let ingredients = []
    let instructions = []

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

            // CHECKS IF RECIPE ID IS FAVORITED, CHECKS CHECKBOX IF TRUE
            const responseFavorite = await fetch(`http://localhost:3001/recipes/${recipeId}`)
            const resDataFavorite = await responseFavorite.json()
            if (resDataFavorite !== null) {
                setChecked(true)
            }
        }
        fetchData()
    }, [recipeId])

    const addToFavorites = async () => {

        // IF ALLREADY FAVORITED, DELETE FROM FAVORITES, OTHERWISE ADD TO FAVORITES
        if (checked) {
            const data = {
                recipe_id: recipeId
            }
            const response = await fetch(`http://localhost:3001/recipes/${recipeId}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            return response.json()
        } else {
            const data = {
                recipe_id: recipeId
            }
            const response = await fetch("http://localhost:3001/recipes", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            return response.json()
        }
    }

    return (
        <div>
            {recipe.image ? <img src={recipe.image} alt={`${recipe.title}`} /> : ""}
            <h1>{recipe.title}</h1>
            <ToggleButton
                id="toggle-check"
                type="checkbox"
                variant="outline-danger"
                checked={checked}
                value="1"
                onChange={(e) => setChecked(e.currentTarget.checked)}
                onClick={addToFavorites}
            >
                <Heart />
            </ToggleButton>
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
                <h1 style={{ textAlign: "left" }}>Ingredients</h1>
                <ListGroup style={{ textAlign: "left" }}>
                    {ingredients}
                </ListGroup>
            </div>
            <div>
                <h1 style={{ textAlign: "left" }}>Instructions</h1>
                <ListGroup as="ol" numbered style={{ textAlign: "left" }}>
                    {instructions}
                </ListGroup>
            </div>
        </div>
    )
}

export default RecipeShow