import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [dogBreads, setDogBreads] = useState([]);
  const [breadListImages, setBreadListImages] = useState([]);
  const [loading, setLoading] = useState(false);
  async function loadArrayImages(breeds) {
    let proms = breeds.map(async (breed) => {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );
      const data = await response.json();
      const image = data.message;
      return image;
    });
    const images = await Promise.all(proms);
    return images;
  }

  async function getDogImages(breeds) {
    const breadsImagesArray = await loadArrayImages(breeds);
    setBreadListImages(breadsImagesArray);
  }

  const getAllBreads = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    const breeds = Object.keys(data.message);
    setDogBreads(breeds);
  };

  useEffect(() => {
    getAllBreads();
  }, []);
  useEffect(() => {
    setLoading(true);
    getDogImages(dogBreads);
    setLoading(false);
  }, [dogBreads]);

  return (
    <div className="App">
      {loading ? <h1>Loading...</h1> : null}
      <div className="bread-list">
        {breadListImages.map((bread, i) => (
          <img className="image" key={i} src={bread} alt={bread} />
        ))}
      </div>
    </div>
  );


}

export default App;
