
import './styles/Timeline.scss';
import React, { useState } from 'react'

import {ProjectPopup} from "./ProjectFuncs.js";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useLocation } from "wouter";


const GetTimeline = (props) => {

const [location, setLocation] = useLocation();
const [positionOffset, setPosition] = useState(0);

  const startYear = 2014;
  const endYear = 2024;

  const yearCount = endYear - startYear;

  const rendSize = "calc(100% / " + (yearCount) + ")";



///////////////////////////Le css

  const timeline__item = {
    position: "relative",
    display: "inline-block",
    width: rendSize,
    "margin-left": `${positionOffset}px`,
    "counter-increment" : "year -2",
  };


  const timeline__counter = {
    "counterReset": "year " + (endYear),
    "margin-left": `${positionOffset}px`
  }


/////////////////////////

  let yearMonthPlacement = {}

  let projectList = props.renderedProjects
  let pointerDraw = []


  console.log(projectList)

  for (let i = 0; i < projectList.length; i++) {



    let p = projectList[i]

    if(p.creation.year == undefined || p.creation.month == undefined) continue

    let yearList = yearMonthPlacement[p.creation.year]



    if (yearList == undefined) {
      yearMonthPlacement[p.creation.year] = {}
      yearList = yearMonthPlacement[p.creation.year]
    }

    if (yearList[p.creation.month] == undefined) {
      yearList[p.creation.month] = 0
    } else
      yearList[p.creation.month]++


    let offset = yearList[p.creation.month] / 2

    //1 - pour inverser (gauche = decembre)
    let monthLocalPosition = 1.0 - (offset + parseInt(p.creation.month)) / 13
    // Conversion en CSS
    let monthLocalPlacement = "calc(" + monthLocalPosition + " * " + rendSize + " - 15px)"

    //Placement au niveau de l'année
    let yearPlacementPercent = ((endYear - parseInt(p.creation.year)-2)/ yearCount) * 100 + "%"
    let total = "calc(" + monthLocalPlacement + " + " + yearPlacementPercent + ")"



    pointerDraw.push(
      
      
<OverlayTrigger trigger={["hover", "focus"]} key={"timePointTrigger"+i} placement="bottom" overlay={ProjectPopup(p, p.hasPreview)}>



      
      <img src={require("./frontPage/timelinePin.gif")} className="timelinePoint"
        style={{
          // left:((endYear - p.creation.year)*100/yearCount)+"%"
          left: total,
          filter: 
          "brightness(" + (1 +  (Math.cos(monthLocalPosition*20000) * 0.5))+
           ") hue-rotate(" + Math.cos(monthLocalPosition*999999) *20 +   "deg) " +
          "drop-shadow(-2px 0px 0px    rgba(0, 0, 0, 1)) "+
          "drop-shadow(2px 0px 0px    rgba(0, 0, 0, 1)) ",
          
          // bottom:Math.abs(Math.cos(monthPosition*1000))*20,
          //filter: "hue-rotate(" + monthPosition * 360 * 10 + "deg) brightness(2000%) saturate(200%)"
          key:"timePoint"+i
        }}
        onClick={() => setLocation("projects/#"+p.folderName, true)}
        
      />

</OverlayTrigger>

    );
      
    
  }




  let timelineDraw = []

  for (let pas = 0; pas < yearCount; pas++) {
    timelineDraw.push(<li className="base-timeline__item" key={"timeFrag"+pas} style={timeline__item}>
    </li>)
  }


  return (
//<button onClick={() => setPosition(positionOffset+20) }>Next</button>

<div>


    <ul className="base-timeline" style={timeline__counter}>

      {pointerDraw}

      {timelineDraw}


    </ul>

</div>

  );
}




export default GetTimeline;
