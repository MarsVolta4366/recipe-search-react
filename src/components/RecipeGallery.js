import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const RecipeGallery = ({ data }) => {

    let dataDisplay = []

    if (data.results) {
        dataDisplay = data.results.map((recipe, index) => {
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
        <div className="myFlexBox">
            {dataDisplay}
        </div>
    )
}

export default RecipeGallery