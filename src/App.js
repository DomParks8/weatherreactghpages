import React from "react";
import "./App.css";
import Moment from "moment";
import "moment-timezone";
class App extends React.Component {
  state = {};
  getTime = () => {
    const time = Moment()
      .utcOffset(this.state.timezone / 60)
      .format("h:mm a");
    this.setState({
      time: time,
    });
  };
  getWeather = () => {
    let zipInput = document.getElementById("zipInput").value;
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
        zipInput +
        ",us&units=imperial&appid=afa414029123a5e21033ca313da75564"
    )
      .then((response) => {
        if (response.status !== 200) {
          console.log("Status Code: " + response.status);
          return;
        }
        response.json().then((data) => {
          console.log(data);
          this.setState({
            zip: zipInput,
            temperature: data.main.temp,
            city: data.name,
            description: data.weather[0].description,
            Country: data.sys.country,
            timezone: data.timezone,
          });
          this.getTime();
        });
      })
      .catch((error) => {
        console.log("Error");
      });
  };
  render() {
    return (
      <div className="container">
        <div className="display-1 ">
          <h1 className="Header">Have a wonderful day.</h1>
        </div>
        <div className="display">
          <input
            type="text"
            id="zipInput"
            className="search-input"
            placeholder="Enter Zipcode"
            maxLength="5"
          />
          <button className="material-icons" onClick={this.getWeather}>
            search
          </button>
        </div>
        <div className="display">
          <h6>
            {this.state.city} {this.state.Country}
          </h6>
          <h6>{this.state.temperature} &#8457;</h6>
          <h6>{this.state.description}</h6>
          <h6>{this.state.time}</h6>
        </div>
      </div>
    );
  }
}
export default App;
