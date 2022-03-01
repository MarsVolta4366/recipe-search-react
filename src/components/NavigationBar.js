import { Navbar, Container, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const NavigationBar = () => {

    const brandStyling = {
        padding: "5px",
        border: "2px solid #aec4ff",
        color: "#aec4ff"
    }

    return (
        <Navbar fixed="top" id="myNav">
            <Container>
                <Navbar.Brand href="#" style={brandStyling}>Recipe Search</Navbar.Brand>
                <Nav className="me-auto">
                    <Link to="/" className="nav-link myLink">Search</Link>
                    <Link to="/favorites" className="nav-link myLink">Favorites</Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavigationBar