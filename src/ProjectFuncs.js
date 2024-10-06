
import React from 'react'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/FrontPage.scss';


import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useLocation } from "wouter";


function GetMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);  
    return date.toLocaleString('fr-FR', { month: 'long' });
  }




const ProjectPopup = (project, drawPreview, renderedProjects) => {


  let prev = undefined

  if(drawPreview){
    prev = (
<img src={project.preview}></img>

    );

  }

let dateText =  " - "  + GetMonthName(project.creation.month+1) + " " + project.creation.year
if(dateText.includes("null"))
dateText = ""

   return (
  <Popover id="popover-basic">
    <Popover.Header as="h3">{project.name + dateText }</Popover.Header>
    <Popover.Body>
   {project.description}
  {prev}

    </Popover.Body>
  </Popover>
   )
    };





    function  GetPreview  (props)  {

      const [location, setLocation] = useLocation();


let project = props.project;
//style={{ backgroundImage: `url(${project.preview})` }}> 
//<div className='halftone'>



    return (

<OverlayTrigger className="link" trigger={["hover", "focus"]} placement="top" overlay={ProjectPopup(project, false)}>
<div className="ProjectBox img-zoom-in" onClick={() => setLocation("projects/#"+project.folderName, true)}> 


<img src={project.preview} alt="Image not found"/>

    <p className='ProjectTitle'>{project.name}</p>

 
    <div className="movingRefreshScanline"></div> 
 

    <div className="scanlines"> </div>

</div>

</OverlayTrigger>


    );
}




export {GetPreview,ProjectPopup, GetMonthName};
