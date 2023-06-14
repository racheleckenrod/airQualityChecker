import React, {useState} from 'react';
import CitySearch from './Components/CitySearch';
import AirQualityCard from './Components/AirQualityCard';
import PolutantInfo from './Components/PollutantInfo';
import AirQualityTable from './Components/AirQualityTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
const [airQualityData, setAirQualityData] = useState(null);
const [error, setError] = useState(null);

  async function getAirQuality(city) {
    try {
      const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${process.env.REACT_APP_AQI_API_TOKEN}`);
      const data = await response.json();
      console.log(data);
      if (response.ok && data.status === 'ok') {
        setAirQualityData(data.data);
        setError(null);
      } else {
        setError("Sorry, we couldn't find your city. Try another city or check that your spelling is correct.");
        setAirQualityData(null);
      }
    } catch (error) {
      console.error("network error", error);
      setError('Something went really wrong');
      setAirQualityData(null);
      // set error state
      // set air quality data to null
    }
  }
  
  return (
    <div className='container'>
    <h1 className='mt-5 mb-3'>World Air Quality Index Checker</h1>
    <CitySearch getAirQuality={getAirQuality} />
    {error && (
      <div className='alert alert-danger' role='alert'>{error}</div>
    )}
    {airQualityData && (
      // Air Quality Card Component
      // Polutant Info
      <>
      <AirQualityCard data={airQualityData} />
      <PolutantInfo pollutant={airQualityData.dominentpol} />
      
      </>
    )}
    <AirQualityTable />
    </div>
  );
}

export default App;
