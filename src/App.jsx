import { useState, useEffect } from "react";
import { DogCard } from "./DogCard";
import "./App.css";

function App() {
  const [dogBreads, setDogBreads] = useState([]);
  const [search , setSearch] = useState("");
  const [filteredBreeds , setFilteredBreeds] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (dogBreed) => {
const filtered = dogBreads.filter((breed) => {
      return breed.toLowerCase().includes(dogBreed.toLowerCase());
    })
    
    setFilteredBreeds(filtered);
  };


  const getAllBreads = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const breeds = Object.keys(data.message);
    setDogBreads(breeds);
    setFilteredBreeds(breeds);
  };

  useEffect(() => {
    getAllBreads();
  }, []);



  return (
    <div className="App">
      
      <input type="text" value={search} onChange={handleChange}  placeholder="Search for a dog breed" />
      <div className="breed-list">
        {filteredBreeds && filteredBreeds.map((breed, i) => (
          <DogCard key={i} dogBreed={breed} />
        ))}
      </div>
    </div>
  );
}

export default App;
