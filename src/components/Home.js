import { useEffect, useState } from "react"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Home = () => {

    let [favoriteRecipeTitle, setFavoriteRecipeTitle] = useState("")
    let [similarRecipes, setSimilarRecipes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const randomRecipeResponse = await fetch("http://localhost:3001/recipes/randomRecipe")
            const randomRecipeData = await randomRecipeResponse.json()

            const response = await fetch(`https://api.spoonacular.com/recipes/${randomRecipeData.recipe_id}/similar?number=10&apiKey=a40e27eb395e4e92a5f5dcb1c521082b`)
            const resData = await response.json()
            setSimilarRecipes(resData)

            const favoriteRecipeResponse = await fetch(`https://api.spoonacular.com/recipes/${randomRecipeData.recipe_id}/information?includeNutrition=false&apiKey=a40e27eb395e4e92a5f5dcb1c521082b`)
            const favoriteRecipeData = await favoriteRecipeResponse.json()
            setFavoriteRecipeTitle(favoriteRecipeData.title)
        }
        fetchData()
    }, [])

    let similarRecipesDisplay = similarRecipes.map((recipe, index) => {
        return (
            <div key={index}>
                <Card style={{ width: '18rem', margin: "0 auto" }}>
                    {/* <Card.Img variant="top" src={recipe.image} alt={`Image of ${recipe.title}`} /> */}
                    <Card.Body>
                        <Card.Title>{recipe.title}</Card.Title>
                        <Link to={`/showRecipe/${recipe.id}`}>
                            <Button variant="primary">Get Recipe</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        )
    })

    return (
        <div>
            <h1>Recipe picks for you</h1>
            <h2>Because you liked {favoriteRecipeTitle}</h2>
            {similarRecipesDisplay}
        </div>
    )
}

export default Home