import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';
import RecipeGallery from './components/RecipeGallery';
import SearchBar from './components/SearchBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RecipeShow from './components/RecipeShow';
import { Button } from 'react-bootstrap'
import { ArrowBarRight, ArrowBarLeft } from 'react-bootstrap-icons'
import NavigationBar from './components/NavigationBar';
import Favorites from './components/Favorites';

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
        <div className="fill">
          <a href="https://unsplash.com/@brookelark?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            <img src="../hero-image.jpg" />
          </a>
          <p>Photo by <a href="https://unsplash.com/@brookelark?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Brooke Lark</a> on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
        </div>
        <SearchBar searchForRecipes={searchForRecipes} />
        <RecipeGallery data={data} />
        <Button variant="light" onClick={previousPage}><ArrowBarLeft size={20} /></Button>
        <p style={{ display: "inline-block", margin: "0 10px 0 10px" }}>Page {page} of {Math.ceil(data.totalResults / 10)}</p>
        <Button variant="light" onClick={nextPage}><ArrowBarRight size={20} /></Button>
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
          <NavigationBar />
          <Routes>
            <Route path="/" element={
              renderGallery()
            } />
            <Route path="/favorites" element={
              <Favorites />
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
