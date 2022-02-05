import GalleryItem from "./GalleryItem"
import { Card, Button } from "react-bootstrap"

const RecipeGallery = (props) => {

    let dataDisplay = []

    if (props.data.results) {
        dataDisplay = props.data.results.map((recipe, index) => {
            return (
                <div key={index}>
                    <Card style={{ width: '18rem', margin: "0 auto" }}>
                        <Card.Img variant="top" src={recipe.image} alt={`Image of ${recipe.title}`} />
                        <Card.Body>
                            <Card.Title>{recipe.title}</Card.Title>
                            <Button variant="primary">Get Recipe</Button>
                        </Card.Body>
                    </Card>
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