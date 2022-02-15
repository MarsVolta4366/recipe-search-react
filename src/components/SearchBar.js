import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
const SearchBar = (props) => {

    let [input, setInput] = useState("")

    function submitSearch() {
        props.searchForRecipes(input)
        document.getElementById("searchInput").value = ""
    }

    return (
        <Form id="searchBar">
            <Form.Group className="mb-3" controlId="searchInput">
                <Form.Label>
                    <h1>Search Recipes</h1>
                </Form.Label>
                <Form.Control type="text" onChange={(e) => setInput(e.target.value)} placeholder="Search Recipes" />
            </Form.Group>
            <Link to="/">
                <Button variant="primary" onClick={submitSearch}>Search</Button>
            </Link>
        </Form>
    )
}

export default SearchBar