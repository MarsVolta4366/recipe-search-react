import { useState } from "react"
import { Form, Navbar, Container, InputGroup } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"
import { Link, useNavigate } from "react-router-dom"
const SearchBar = (props) => {

    let [input, setInput] = useState("")
    const navigate = useNavigate()

    function submitSearch() {
        props.searchForRecipes(input)
    }

    return (
        <Navbar style={{ backgroundColor: "white" }}>
            <Container>
                <Navbar.Brand href="/">Recipe Search React</Navbar.Brand>
                <InputGroup style={{ width: "100%", cursor: "pointer" }}>
                    <InputGroup.Text onClick={submitSearch}>
                        <Link to="/" style={{ height: "27px" }}>
                            <Search color="black" />
                        </Link>
                    </InputGroup.Text>
                    <Form.Control type="text" onChange={(e) => setInput(e.target.value)} placeholder="Search Recipes"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                submitSearch()
                                navigate("/")
                            }
                        }} />
                </InputGroup>
                <Navbar.Collapse className="justify-content-end" style={{ marginLeft: "16px" }}>
                    <Navbar.Text style={{ whiteSpace: "nowrap" }} className="hideOnMediaQuery">
                        Made by <a href="https://portfolio-dfs.herokuapp.com/" target="_blank" rel="noreferrer">Derek Slauson</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default SearchBar