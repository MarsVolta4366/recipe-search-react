import { useEffect, useState } from 'react';
import './App.css';
import RecipeGallery from './components/RecipeGallery';
import SearchBar from './components/SearchBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RecipeShow from './components/RecipeShow';
import { Modal, Button } from 'react-bootstrap'

function App() {

  let [search, setSearch] = useState("")
  let [data, setData] = useState([])

  // For displaying and hiding bootstrap modal
  let [show, setShow] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=a40e27eb395e4e92a5f5dcb1c521082b`)
      const resData = await response.json()
      setData(resData)
      console.log(data)

      // If data is an object, this means the limit of requests allowed has been reached
      // if (data.number > 0) {
      // } else {
      //   setShow(true)
      // }
    }
    fetchData()
  }, [search])

  function searchForRecipes(input) {
    setSearch(input)
  }

  function renderGallery() {
    return (
      <div>
        <RecipeGallery data={data} />
      </div>
    )
  }

  return (
    <div className="App">
      <div id="container">
        <Router>
          <SearchBar searchForRecipes={searchForRecipes} />
          <Routes>
            <Route path="/" element={
              renderGallery()
            } />
            <Route path="/showRecipe/:recipeId" element={
              <RecipeShow />
            } />
          </Routes>
        </Router>

        {/* This modal displays if API request limit has been reached */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Limit of Requests Reached</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You've reached the limit of requests allowed for the day, please come back tomorrow!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
