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
    </div>
  );
}

export default App;
