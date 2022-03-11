import { Navbar, Container, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const NavigationBar = () => {

    const brandStyling = {
        padding: "5px",
        border: "2px solid #D4D6B9",
        color: "#D4D6B9"
    }

    return (
        <Navbar fixed="top" id="myNav">
            <Container>
                <Link to="/" className="myLink nav-link">
                    <Navbar.Brand style={brandStyling}>Recipe Search</Navbar.Brand>
                </Link>
                <Nav className="me-auto">
                    <Link to="/" className="nav-link myLink">Search</Link>
                    <Link to="/favorites" className="nav-link myLink">Favorites</Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavigationBar