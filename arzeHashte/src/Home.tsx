import ShowCountryInfo from './component/ShowCountryInfo.tsx'
import App from './App.tsx'
import './index.css'
import { useState } from 'react'

const Home = () => {

    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleCountryClick = (country:any) => {
    setSelectedCountry(country);
    };

    return (selectedCountry != null ? <ShowCountryInfo country={selectedCountry} handleCountryClick={handleCountryClick}/> : <App handleCountryClick={handleCountryClick} />) ;
}


export default Home;