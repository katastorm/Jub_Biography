import { GetPreview } from './Projects/ProjectFuncs.js';
import { HomeIntro } from './HomeElements/HomeIntro.js';

import { HomeProjectPreviewArea } from './HomeElements/HomeProjectPreview.js';

import './styles/HomePage.scss';

import { useState } from 'react';



function HomePage(props) {

  const [filters, setfilters] = useState([false, false])

  let renderedProjects = props.projects

  console.log("START")




  //On creer la variable modifiable newFilters
  let newFilters = []
  filters.forEach(m => newFilters.push(m))



  let filter_fullPages = false
  let filter_equip = false







  //Charger les filters depuis la session storage 
  const loadFilter = JSON.parse(sessionStorage.getItem("filters"))
  // console.log("LOAD:")
  // console.log(loadFilter)
  if (loadFilter != null) {
    for (let i = 0; i < newFilters.length; i++)
      newFilters[i] = loadFilter[i];
  }

  const projDatas = (sessionStorage.getItem("renderedProjects"));
  if (projDatas != null) {
    renderedProjects = (JSON.parse(projDatas));
    // console.log(projDatas)
  }

  UpdateVariables(newFilters)//Saving des cookies pour la premiere fois



  //Appelé quand les filtres sont changés via les toggles
  function changeFilter(id, value) {
    console.log(value)
    console.log(id)


    newFilters[id] = value
    setfilters(newFilters)

    console.log("new filters : " + newFilters)
    //localStorage.setItem("filters", newFilters);
    sessionStorage.setItem("filters", JSON.stringify(newFilters));
    UpdateVariables(newFilters)
  }

  function UpdateVariables(filterArray) {
    filter_fullPages = filterArray[0]
    filter_equip = filterArray[1]

    renderedProjects = GetModifiedProjectArray(props.projects)
    sessionStorage.setItem("renderedProjects", JSON.stringify(renderedProjects));
    console.log(renderedProjects)
  }



  ///Obtenir la liste des projets, avec des filtres et modifications appliqués
  function GetModifiedProjectArray(projects) {
    let res = []

    projects.forEach(proj => {

      if (filter_fullPages && (!proj.hasMdFile || !proj.hasPreview))
        return

      if (filter_equip && (proj.membersCount <= 1))
        return


      res.push(proj)
    })

    return res
  }



  const sayHello = () => {
    alert("Hello!")
  };




  return (

    <>


     <h1>Portfolio</h1>

     <HomeIntro/>

      <h2>Projets dans les grandes lignes</h2>

      <HomeProjectPreviewArea projects={props.projects}/>



    </>

  );
}

export default HomePage;

