import React, {Component} from 'react';
import './App.css';
import BuildingsByZone from './BuildingsByZone'
import { black } from 'color-name';

const url = "https://applefacilities.review.blueriver.com/index.cfm/_api/json/v1/scv/building/?andOpenGrouping&locationCode%5B0%5D=sqo&or&locationCode%5B2%5D=nwr&or&locationCode%5B4%5D=scv&or&locationCode%5B6%5D=sfo&closeGrouping&fields=buildingname,buildingabbr,lat,lng,black,buildingZone&active=1&cachedwithin=600";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      isLoading: false,
      error:null,
      buildingZones:[],
      buildings:{},
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true});
    fetch(url)
      .then(response => response.json())
      .then(content => {
        this.getBuildingZone(content.data.items);
        this.setState({data: content.data.items, isLoading: false})
        console.log(content);
      })
    
  }


  getBuildingZone(data) {
    var building = {};
    data.map(element => {
      if(element.buildingzone !== "") {
        if(!(element.buildingzone in building)) {
          building[element.buildingzone] = [];
          var obj = {
            name: element.buildingname,
            black: element.black,
          }
          building[element.buildingzone].push(obj);
        }
        else {
          var obj = {
            name: element.buildingname,
            black: element.black,
          }
          building[element.buildingzone].push(obj);
        }
      }
      
    });

    console.log(building);
    
    this.setState({buildings: building});
  }


  render() {
    const buildings  = this.state.buildings;
    const isLoading = this.state.isLoading;
    if(isLoading) {
      return <p>Loading...</p>
    }
    console.log(buildings);
      return (
        <div className="App">
          <h1>Index</h1>
          <br></br>
          {Object.keys(buildings).sort().map((item) => {
            if(!item.includes("Other")) {
              console.log(buildings[item]);
              return <BuildingsByZone zoneName={item} data={buildings[item]} />;
            }
          })

          }
          {Object.keys(buildings).sort().map((item) => {
            if(item.includes("Other")) {
              console.log(buildings[item]);
              return <BuildingsByZone zoneName={item} data={buildings[item]} />;
            }
          })

          }
        </div>
      );
    }
  }

export default App;
