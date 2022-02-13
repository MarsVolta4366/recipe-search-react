import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';
import RecipeGallery from './components/RecipeGallery';
import SearchBar from './components/SearchBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RecipeShow from './components/RecipeShow';
import { Modal, Button } from 'react-bootstrap'

// Add pagination, use offset like this https://api.spoonacular.com/recipes/complexSearch?query=${search}&offset=10&apiKey=a40e27eb395e4e92a5f5dcb1c521082b

function App() {

  let [search, setSearch] = useState("")
  let [data, setData] = useState([])
  let [page, setPage] = useState(1)
  let [searchOffset, setSearchOffset] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&offset=${searchOffset}&apiKey=a40e27eb395e4e92a5f5dcb1c521082b`)
      const resData = await response.json()
      setData(resData)
      console.log(resData)
    }
    fetchData()
  }, [search, searchOffset])

  function searchForRecipes(input) {
    setPage(1)
    setSearchOffset(0)
    setSearch(input)
  }

  function renderGallery() {
    return (
      <div>
        <RecipeGallery data={data} />
        <Button variant="primary" onClick={previousPage}>Previous Page of Results</Button>
        <Button variant="primary" onClick={nextPage}>Next Page of Results</Button>
        <p>Page {page} of {Math.ceil(data.totalResults / 10)}</p>
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
      </div>
    </div>
  );
}

export default App;
