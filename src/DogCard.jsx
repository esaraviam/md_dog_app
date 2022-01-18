import React , {useEffect , useState} from 'react'

export const DogCard = ({dogBreed}) => {
    const [dogImage, setDogImage] = useState("")

    const getDogImage = async (breed) => {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await response.json();
        setDogImage(data.message);
    }
    useEffect(() => {
        getDogImage(dogBreed);
    }, [])
    return (
        <>
            <img className="image" src={dogImage} alt={dogBreed} />
            <h3>{dogBreed}</h3>
        </>
    )
}
