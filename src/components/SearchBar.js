import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
const SearchBar = (props) => {

    let [input, setInput] = useState("")

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Search Recipes</Form.Label>
                <Form.Control type="text" onChange={(e) => setInput(e.target.value)} placeholder="Search Recipes" />
            </Form.Group>
            <Button variant="primary" onClick={() => props.searchForRecipes(input)}>Search</Button>
        </Form>
    )
}

export default SearchBar