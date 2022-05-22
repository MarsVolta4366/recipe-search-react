import { useEffect, useState } from 'react';
import React from 'react';
import './css/styles.css'
import RecipeGallery from './components/RecipeGallery';
import SearchBar from './components/SearchBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RecipeShow from './components/RecipeShow';
import { Button } from 'react-bootstrap'
import { ArrowBarRight, ArrowBarLeft } from 'react-bootstrap-icons'

function App() {

  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [foodJoke, setFoodJoke] = useState("")
  const [page, setPage] = useState(1)
  const [searchOffset, setSearchOffset] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      // const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&offset=${searchOffset}&apiKey=a40e27eb395e4e92a5f5dcb1c521082b`)
      // const resData = await response.json()
      // setData(resData)
    }
    fetchData()
  }, [search, searchOffset])

  async function fetchFoodJoke() {
    const jokeResponse = await fetch("https://api.spoonacular.com/food/jokes/random?apiKey=a40e27eb395e4e92a5f5dcb1c521082b")
    const jokeData = await jokeResponse.json()
    setFoodJoke(jokeData.text)
  }

  function searchForRecipes(input) {
    setPage(1)
    setSearchOffset(0)
    setSearch(input)
  }

  function renderGallery() {
    return (
      <div>
        {/* <RecipeGallery data={data} /> */}
        <div style={{ marginTop: "10px" }}>
          <Button variant="light" className="pageButton" onClick={previousPage}><ArrowBarLeft size={20} /></Button>
          <p style={{ display: "inline-block", margin: "0 10px 0 10px" }}>Page {page} of {Math.ceil(data.totalResults / 10)}</p>
          <Button variant="light" className="pageButton" onClick={nextPage}><ArrowBarRight size={20} /></Button>
        </div>
      </div>
    )
  }

  function nextPage() {
    if ((searchOffset + 10) <= data.totalResults) {
      setSearchOffset(searchOffset + 10)
      setPage(page + 1)
      window.scrollTo(0, 0)
    }
  }

  function previousPage() {
    if (searchOffset >= 10) {
      setSearchOffset(searchOffset - 10)
      setPage(page - 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="App">
      <div id="container" style={{ marginBottom: "20px" }}>
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
        <Button variant="light" className="backButton" onClick={fetchFoodJoke}
          style={{ marginTop: "10px" }}>Wanna hear a food joke?</Button>
        <p>{foodJoke}</p>
      </div>
    </div>
  )
}

export default App
