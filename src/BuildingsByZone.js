import React from 'react';
import ReactDOM from 'react-dom';

function BuildingsByZong(props) {

    console.log(props.data);
    return (
        <div className="zone">
            <h2>
                {props.zoneName}
            </h2>
            <div className="container">
            {props.data.sort((a,b) => (a.name > b.name) ? 1: -1).map((value,index) => {
                if(value.black) {
                    return <p key={index} className="buildinglink">{value.name}</p>
                }
                else {
                    return <a key={index} className="buildinglink" href="https://applefacilities.review.blueriver.com">{value.name}</a>
                }
            })}
            </div>
            <br></br>
        </div>
    );
}

export default BuildingsByZong;