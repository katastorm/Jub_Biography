
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/FrontPage.scss';


import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
//import { useLocation } from "wouter";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


function GetMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('fr-FR', { month: 'long' });
}


/**
* Retourne le projet en format JSX tableau  
*/
function GetProjectInfos_TableMode(project, oldTable = false) {


  let start_status = `${GetMonthName(project.creation.month)} ${project.creation.year}`;             
  let end_status = project.inDeveloppement? "En développement": `${GetMonthName(project.ending.month)} ${project.ending.year}`; 
        
  
  const languages = project.tags_languages.length > 0 ? <tr><td>Langages</td><td>{project.tags_languages.join(", ") }</td></tr> : <></>
  const frameWorks = project.tags_technos.length > 0 ? <tr><td>Frameworks/Outils</td><td>{project.tags_technos.join(", ") }</td></tr> : <></>
  const skills = project.tags_skills.length > 0 ?   <tr><td>Compétences</td><td>{project.tags_skills.join(", ") }</td></tr> : <></>


  
  if(oldTable){

  
             return (
             <table className='old_blue_table'><thead><tr><th>Date de création</th><th>Finalisation</th><th>Ampleur du projet</th><th>Wow effect</th><th>Type de projet </th><th>En Ligne</th></tr></thead><tbody><tr>
             <td>{start_status}</td>
             <td>{end_status}</td>
             <td>{project.tab_devType}</td>
             <td>{project.tab_projectType}</td>
             <td>{project.tab_isOnlineGame}</td>             
             </tr></tbody></table>)
  }
    /*/<td>{project.tab_wowEffect}</td>*/
    /*<tr><td>Wow effect</td><td>{project.tab_wowEffect}</td></tr>*/

  return (
    <table className='table_compact_horizontal_big'>
    <tbody>
    <tr><th colSpan="2" className='table_cell_centered table_cell_title_decorator'>Récap Technique</th></tr>
    <tr><td>Type de projet </td><td>{project.tab_projectType}</td></tr>
    {languages}
    <tr><td>Logiciels</td><td>{project.tags_softwares.join(", ") }</td></tr>
    {frameWorks}
    {skills}

    <tr><td>Equipe</td><td>{project.membersCount > 1 ? `${project.membersCount} Membres`: "Projet solo"}</td></tr>
    
    <tr><th colSpan="2" className='table_cell_title_decorator'></th></tr>
    <tr></tr>

    <tr><td>Date de création</td><td>{start_status}</td></tr>
    <tr><td>Finalisation</td><td>{end_status}</td></tr>
    <tr><td>Ampleur du projet</td><td>{project.tab_devType}</td></tr>
    <tr><td>Mis en ligne</td><td>{project.tab_isOnlineGame}</td></tr>          
    </tbody>
    </table>)

}





const ProjectPopup = (project, drawPreview) => {



  
  

  let technos = (project.tags_languages.length > 0 || project.tags_technos.length > 0)? <><br/><strong>Technos :</strong> {project.tags_languages.concat(project.tags_technos).join(", ")} </>: <></>



  let prev = <></>

  if (drawPreview) {
    prev = (
      <img src={project.preview} alt='project preview'></img>
    );
  }
  else{//On ajoute un espace pour la visibilité
    technos = <><br/>{technos}</>
  }

  //let dateText =  " - "  + GetMonthName(project.ending.month+1) + " " + project.ending.year
  let dateText = project.creation.year.toString()

  if (project.creation.year !== project.ending.year)
    dateText = dateText + " - " + project.ending.year



  if (dateText.includes("null"))
    dateText = ""

  return (
    <Popover  id="popover-basic" >
      <Popover.Header id="popover-header">{project.name}<br />{dateText}</Popover.Header>
      <Popover.Body id="popover-body">
        {project.description}
        {prev}
        {technos}
        </Popover.Body>
    </Popover>
  )
};





function GetPreview(props) {

  //const [location, setLocation] = useLocation();


  let project = props.project;
  //style={{ backgroundImage: `url(${project.preview})` }}> 
  //<div className='halftone'>


  const navigate = useNavigate();

  return (

    <motion.div layout className='ProjectBoxLayout'
    key={"itemFrame" +  project.id}
    initial={{ opacity:0}}
    animate={{  opacity:1}}
    exit={{ opacity:0}}
    transition={{ duration: 0.2 }}
  >

    <OverlayTrigger className="link" trigger={["hover", "focus"]} placement="top" overlay={ProjectPopup(project, false)}>


      <div className="ProjectBox img-zoom-in" onClick={() =>   navigate("/Jub_Biography/projects/" + project.folderName)}>

      <img src={project.preview} alt="Preview not found"/>
      <p className='ProjectTitle'>{project.name}</p>

      <div className="scanlines"> </div>
      <div className="movingRefreshScanline"></div>

   </div>
    
     </OverlayTrigger>
     </motion.div>

  
  );
}




export { GetPreview, ProjectPopup, GetMonthName, GetProjectInfos_TableMode };
