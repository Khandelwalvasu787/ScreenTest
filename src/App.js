
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [joke, setJoke] =useState(null)
  const [image, setimage] = useState('')
  const [category, setcategory] = useState([])
  const [selectCat, setSelectCat] = useState('')
  const [random, setrandom] = useState('')
  const [newDate, setNewDate] = useState('')
  



  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=zImPQhoIdSOhIVttjlqSShHbVUET0OSYRu0h4jIe').then((res) => setimage(res.data.hdurl))
    axios.get('https://api.chucknorris.io/jokes/categories').then((res) => setcategory(res.data))
    console.log(category);
  }, [])

    
  const fetchJoke = (value) => {
    axios.get(`https://api.chucknorris.io/jokes/random?category=${value}`).then((res) => setJoke(res.data.value))
    setNewDate(new Date())
  }


  const RandomJoke = (string) => {
    axios.get(`https://api.chucknorris.io/jokes/search?query=${string}`).then((res) => setJoke(res.data.result[Math.floor(Math.random()* res.data.result.length)].value))
    setNewDate(new Date())
  }

  const SearchRandom = () => {
    axios.get(`https://api.chucknorris.io/jokes/random`).then((res) => setJoke(res.data.value))
    setNewDate(new Date())
  }

  return (
    <div className="App" style={{
      backgroundImage: `url(${image})`, backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat', height: '100vh', width: '100%'
    }}>
      <h1>Search by category</h1>
      <div className='checkFlex'>
        {category.map((value, index) => {
          return <div className='innerclass' key={index}>
            <input type="checkbox" id={value} name={value} value={value} onClick={() => setSelectCat(value)} />
            <label> {value}</label><br></br>

          </div>
        })}
        <button className='btn1' onClick={() => fetchJoke(selectCat)}>GetJoke</button>
      </div>
      
<h1>Search by keyword(max:3 words)</h1>
      <div>
        <input type='text' maxLength='3' value={random} onChange={(e) => setrandom(e.target.value)}></input><button onClick={() => RandomJoke(random)}>GetJoke</button>
      </div>
      <button onClick={SearchRandom}>Search a Random Joke</button>
      
      {joke && <h1>Here is your Joke</h1>}
      {joke && <div className='jokeContainer'>
        <span><h3>Time stamp:</h3> {newDate.toString()}</span><br/>
        {joke}
      </div>}
    </div>
  );
}

export default App;


