import { useState, useEffect } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('london');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const apiKey = 'f54483a620cd487e919190158232008';
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [location]);

  function handleFormSubmit(event) {
    event.preventDefault();
    setLocation(inputValue);
  }

  return (
    <div className="bg-[url('/src/assets/images/background.jpg')] h-full w-full bg-cover text-slate-200">
      <header className="flex items-center justify-center text-2xl px-7 py-5">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="h-full w-64 border-none outline-none rounded px-1 py-2 bg-primary text-white"
            placeholder="Search city"
          />
        </form>
      </header>
      <main className=" flex px-20 py-16">
        <div >
          <h1 className="text-5xl mb-3">Tbilisi, Georgia</h1>
          <p>Monday, 21 august</p>
          <div className="flex gap-8 items-center py-8 border-b-2">
            <img
              className="w-24 h-24"
              src="/src/assets/images/cloudy.png"
              alt="weather condition icon"
            />
            <p className="text-6xl">34&deg;C</p>
          </div>
          <p className='text-3xl my-2 flex justify-center'>Mostly Sunny</p>
          <p className='text-xl mb-5'>Feels like: 35&deg;C</p>
          <p className='text-xl mb-5'>Wind: 5 MPH</p>
          <p className='text-xl'>Humidity: 65 %</p>

        </div>
      </main>
    </div>
  );
}

export default App;
