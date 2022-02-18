import { Navbar, Container, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Recipe Search</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link>
                        <Link to="/" className="nav-link">Home</Link>    
                    </Nav.Link> 
                    <Nav.Link>
                        <Link to="/search" className="nav-link">Search</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/favorites" className="nav-link">Favorites</Link>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavigationBar