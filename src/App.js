import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  const length = data.length;

  const getData = () => {
    fetch('http://localhost:3000/data.json')
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(current);
  const previousSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  return (
    <div>
      <div className='slideshow-container'>
        <button className='prev' onClick={previousSlide}>
          prev
        </button>
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <div
                className={index === current ? 'mySlides active' : 'mySlides'}
                key={index}>
                <p className='app-title'>Storybook</p>
                <img src={item.image} alt={item.name} />
                <div className='heading-text'>
                  <h2 className='title'>{item.name}</h2>
                  <p className='known-for'>{item.knownFor}</p>
                </div>
              </div>
            );
          })}
        <button className='next' onClick={nextSlide}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
