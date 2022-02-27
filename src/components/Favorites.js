import { useEffect, useState } from "react"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Favorites = () => {

    let [recipes, setRecipes] = useState({})
    let dataDisplay = []

    useEffect(() => {
        const fetchData = async () => {
            let recipeIds = ""

            // GET RECIPE ID'S FROM DATABASE
            const response = await fetch("http://localhost:3001/recipes")
            const resData = await response.json()

            resData.forEach((item, index) => {
                recipeIds += item.recipe_id
                if ((index + 1) !== resData.length) {
                    recipeIds += ","
                }
            })

            if (resData.length > 0) {
                // GET RECIPE INFO BULK USING recipeIds
                const responseRecipes = await fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}&apiKey=a40e27eb395e4e92a5f5dcb1c521082b`)
                const resDataRecipes = await responseRecipes.json()
                setRecipes(resDataRecipes)
            }
        }
        fetchData()
    }, [])

    if (recipes[0]) {
        dataDisplay = recipes.map((recipe, index) => {
            return (
                <div key={index}>
                    <Card style={{ width: '18rem', margin: "0 auto" }}>
                        <Card.Img variant="top" src={recipe.image} alt={`Image of ${recipe.title}`} />
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
    }

    return (
        <div>
            <h1>Favorites</h1>
            <div className="myFlexBox">
                {dataDisplay}
            </div>
        </div>
    )
}

export default Favorites