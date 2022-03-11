import { useState } from "react"
import { Form, Button, FormControl, ButtonGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
const SearchBar = (props) => {

    let [input, setInput] = useState("")

    function submitSearch(e) {
        e.preventDefault()
        props.searchForRecipes(input)
        document.getElementById("searchInput").value = ""
    }

    return (
        <Form id="searchBar" onSubmit={(e) => submitSearch(e)}>
            <Form.Group className="mb-3" controlId="searchInput">
                <Form.Label>
                    <h1>Search recipes</h1>
                </Form.Label>
            </Form.Group>
            <Form.Group>
                <ButtonGroup aria-label="Basic example">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        onChange={(e) => setInput(e.target.value)}
                        aria-label="Search"
                        style={{ display: "inline-block", width: "500px" }}
                        id="searchInput"
                    />
                    <Button variant="outline-success" onClick={submitSearch}>Search</Button>
                </ButtonGroup>
            </Form.Group>
        </Form>
    )
}

export default SearchBar