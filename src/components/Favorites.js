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
                    <Link to={`/showRecipe/${recipe.id}`} className="cardLink">
                        <Card className="myCard">
                            <Card.Img variant="top" src={recipe.image} alt={`Image of ${recipe.title}`} />
                            <Card.Body>
                                <Card.Title>{recipe.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
            )
        })
    }

    return (
        <div>
            <div id="heroDiv">
                <h1 id="heroHeader">Favorites</h1>
                <img src="../hero-imageB.jpg" alt="Bowl of fruit" id="heroImage" />
            </div>
            <div className="myContainer">
                <p>Photo by <a href="https://unsplash.com/@pwign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Anh Nguyen</a> on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
                <div className="myFlexBox">
                    {dataDisplay}
                </div>
            </div>
        </div>
    )
}

export default Favorites