import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const RecipeShow = (props) => {

    const { recipeId } = useParams()
    let [recipe, setRecipe] = useState({})

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
        </div>
    )
}

export default RecipeShow