import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const RecipeGallery = (props) => {

    let dataDisplay = []

    if (props.data.results) {
        dataDisplay = props.data.results.map((recipe, index) => {
            return (
                <div key={index}>
                    <Link to={`/showRecipe/${recipe.id}`} style={{ textDecoration: "none" }}>
                        <Card className="recipeCard">
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
        <div id="myFlexBox">
            {dataDisplay}
        </div>
    )
}

export default RecipeGallery