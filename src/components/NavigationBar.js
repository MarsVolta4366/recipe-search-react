import { Navbar, Container, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Recipe Search</Navbar.Brand>
                <Nav className="me-auto">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/search" className="nav-link">Search</Link>
                    <Link to="/favorites" className="nav-link">Favorites</Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavigationBar