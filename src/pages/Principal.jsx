import { useState } from "react";
import "../styles/Principal.css";
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Principal = () => {
  const [city, setCity] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [temperature, setTemperature] = useState("");
  const [location, setLocation] = useState("");
  const [icon, setIcon] = useState(cloudIcon);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showWeather, setShowWeather] = useState(false);
  const [containerClass, setContainerClass] = useState("container");
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");

  const API_KEY = "237a745bac3037ac515c288140c64be2";

  const search = async () => {
    if (city === "") {
      return 0;
    }
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=pt_br`;
    const response = await fetch(url);

    if (response.status === 200) {
      const data = await response.json();
      setHumidity(data.main.humidity + " %");
      setWind(Math.floor(data.wind.speed) + " km/h");
      setTemperature(Math.floor(data.main.temp) + " °C");
      setLocation(data.name);
      const words = data.weather[0].description.split(" ");
      const formattedDescription = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setDescription(formattedDescription);
      setShowWeather(true);
      setErrorMessage("");
      setContainerClass("container expanded");
      setLoading(false);
      setCountry(data.sys.country);

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setIcon(clearIcon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setIcon(cloudIcon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setIcon(drizzleIcon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setIcon(drizzleIcon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setIcon(rainIcon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setIcon(rainIcon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setIcon(snowIcon);
      } else {
        setIcon(clearIcon);
      }
    } else {
      setErrorMessage("Erro | Cidade não encontrada.");
      setContainerClass("container");
      setShowWeather(false);
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className={containerClass}>
      <div className="titulo">
        <h1>Consulte o clima de sua cidade</h1>
      </div>
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Digite o nome de uma cidade"
          value={city}
          onChange={handleCityChange}
          onKeyPress={handleKeyPress}
        />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={searchIcon} alt="imagem do icone de busca" />
        </div>
      </div>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {showWeather && (
        <div>
          <div className="weather-image">
            <img src={icon} alt="icone da nuvem" />
          </div>
          <div className="description">{description}</div>
          <div className="weather-temp">{temperature}</div>
          <div className="weather-location-flag">
            <div className="weather-location">{location}</div>
            {country && (
              <img
                src={`https://flagsapi.com/${country}/flat/48.png`}
                alt={`Bandeira de ${country}`}
                className="flag-image"
              />
            )}
          </div>
          <div className="data-container">
            <div className="element">
              <img src={humidityIcon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">{humidity}</div>
                <div className="text">Humidade</div>
              </div>
            </div>
            <div className="element">
              <img src={windIcon} alt="" className="icon" />
              <div className="data">
                <div className="wind-rate">{wind}</div>
                <div className="text">Velocidade dos ventos</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="footer">
        <p>Made by Igor.</p>
        <p>
          <a
            href="https://www.linkedin.com/in/igorfreire3/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn className="icons" />
          </a>
          <a
            href="https://www.instagram.com/igorfreire.3/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram className="icons" />
          </a>
          <a
            href="https://github.com/IgorFreiredeMorais"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="icons" />
          </a>
        </p>
      </div>
    </div>
  );
};

export default Principal;
