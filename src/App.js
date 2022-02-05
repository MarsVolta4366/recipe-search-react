import { useEffect, useState } from 'react';
import './App.css';
import RecipeGallery from './components/RecipeGallery';
import SearchBar from './components/SearchBar';

function App() {

  let [search, setSearch] = useState("")
  let [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=a40e27eb395e4e92a5f5dcb1c521082b`)
      const resData = await response.json()
      setData(resData)
      console.log(resData.results)
    }
    fetchData()
  }, [search])

  function searchForRecipes(input) {
    setSearch(input)
  }

  function renderGallery() {
    return (
      <RecipeGallery data={data} />
    )
  }

  return (
    <div className="App">
      <SearchBar searchForRecipes={searchForRecipes} />
      {renderGallery()}
    </div>
  );
}

export default App;
