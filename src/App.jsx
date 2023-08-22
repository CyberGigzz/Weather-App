import { useState, useEffect } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('london');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiKey = 'f54483a620cd487e919190158232008';
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data from Weather API');
        }
        const data = await response.json();
        setWeatherData(data);
        console.log(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
    fetchData();
  }, [location]);

  function handleFormSubmit(event) {
    event.preventDefault();
    setLocation(inputValue);
    setInputValue('');
  }

  return (
    <div className="bg-[url('/src/assets/images/background.jpg')] h-full w-full bg-cover text-slate-200">
      <header className="flex items-start justify-center text-2xl px-7 py-5 h-36">
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="h-full w-64 border-none outline-none rounded px-1 py-2 bg-primary text-white"
            placeholder="Search city"
          />
          {error && <span className="text-red-500 text-xl animate-slide-up">{error}</span>}
        </form>
      </header>
      {weatherData && (
        <main className=" flex px-20 py-10">
          <div>
            <h1 className="text-5xl mb-3">
              {weatherData.location.name}, {weatherData.location.country}
            </h1>
            <p>
              {new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              }).format(new Date(weatherData.location.localtime))}
            </p>
            <div className="flex gap-8 items-center pt-6 pb-4 w-64 border-b-2">
              <img
                className="w-24 h-24"
                src={weatherData.current.condition.icon}
                alt="weather condition icon"
              />
              <p className="text-6xl ">{weatherData.current.temp_c}&deg;C</p>
            </div>
            <p className="text-3xl my-2 flex justify-center w-64 mb-4">
              {weatherData.current.condition.text}
            </p>
            <p className="text-xl mb-4">
              {' '}
              Feels like: {weatherData.current.feelslike_c}&deg;C
            </p>
            <p className="text-xl mb-4">
              Wind: {weatherData.current.wind_kph} KPH
            </p>
            <p className="text-xl">Humidity: {weatherData.current.humidity}%</p>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
