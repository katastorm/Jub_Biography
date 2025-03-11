



import React from 'react'
import ReactMarkdown from 'react-markdown'
//import ReactDom from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/FrontPage.scss';
import './styles/FunkyTextButton.scss';
//import ReactDOMServer from 'react-dom/server'
import { useState } from 'react';
import { GetProjectInfos_TableMode } from "./ProjectFuncs"
import rehypeRaw from "rehype-raw";
import { Route, Link, Routes, useLocation } from 'react-router-dom';

const draw404Project = () => {
  return (
    <h1>{'404 project not found !\n'}</h1>
  )

}

const errorWhenLoadingProject = () => {
  return (
    "## Error when loading the project page."
  )

}


const initialState = {
  projectNameLocker: "",
  projectMd: "",//La page Md chargée
  historyDisplay: false,//afficher les infos supplémentaire des pages
  //titleTag : (<h1>Project title</h1>)
}

const ProjectPage = (props) => {

  const location = useLocation();

  //Setter pour les infos du projet
  const [state, setState] = useState(initialState)
  //Modifier le titre en haut de page du projet. On passe le state en paramètre car à cause du fucking asynchrone ont sait jamais quand State(usestate) sera update
  const [imageNotFound, setImageNotFound] = useState(false);





  function setProjectMd(md, project/*, titleTag=null*/) {
    //Dupplication de l'ancien state
    const m = { ...state }
    m.projectMd = md

    //if(titleTag !== null)
    //  m.titleTag = titleTag

    if (project !== undefined) {
      m.projectNameLocker = project.folderName
    }

    // console.log("Refresh project MD, sending :")
    // console.log(m)

    //Application
    setState(m)
    return m
  }






  function setHistoryState(historyEnabled) {
    const m = { ...state }
    m.historyDisplay = historyEnabled
    m.projectNameLocker = ""//Pour faire un force reload du markdown

    
    // console.log("Refresh history display = " + historyEnabled)    
    setState(m)
  }




  
  ///////////////////////////Démarrage




  //Liste des projets précédents/suivants, actualisé dynamiquement avec le choix du menu principal
  let nextPreviousProjects = undefined


  if (props?.project === undefined) {
    //console.log("Classic error")
    return draw404Project()
  }



  const project = props.project
  const projectMdFilePath = project.mainMarkdownPath






  async function refreshMd() {

    //const content = await (await fetch(folder + '/index.md')).text();


    //console.log("Reading project " + projectMdFilePath)


    if (projectMdFilePath == null) {

      setProjectMd(draw404Project, undefined)
      return
    }


    try {



      const fet = await fetch(projectMdFilePath);

      //console.log(fet)
      let content = await fet.text();



      if (content.includes("<!DOCTYPE html>")) {
        setProjectMd(errorWhenLoadingProject(), project)
        return
      }


      //content = ChangeNextPreviousProjects(content) // Modification des balises <nextprojects>
      content = ShowHistoryMode(content, state.historyDisplay)//Supression / affichage des balises <history>
      

      if(!/(?:<title>[\s\S]*?<\/title>|<title\/>)/g.test(content))
        content = "<title></title>" + content
      
      
      





      const stateGenerated = setProjectMd(content, project)
      //findProjectTitleCallBack(project, stateGenerated)//Déclenchera une update de la page si une image est trouvée

      //console.log("Md loaded!" + content)



    } catch (error) {
      console.error(error);
      setProjectMd(errorWhenLoadingProject(), project)
      return
    }
  }




  if (state.projectNameLocker.localeCompare(project.folderName) !== 0) {
    console.log("Trying to load " + project.folderName)
    refreshMd();
  }






  function GetNextPreviousProject() {
    //On cherche le projet suivant et précédent
    const projects = JSON.parse(window.sessionStorage.getItem("renderedProjects"));
    let result = <></>

    if (projects != null) {
      let index = projects.findIndex(findProj => findProj.folderName === project.folderName);

      nextPreviousProjects = []

      nextPreviousProjects.push(<br key="elem1" />)

      if (index > 0) {
        nextPreviousProjects.push(<p key="elem2">Projet suivant - <Link to={`/Jub_Biography/projects/${projects[index - 1].folderName}`}>{projects[index - 1].name}</Link></p>)
      }
      if (index < projects.length - 1) {
        nextPreviousProjects.push(<p key="elem3">Projet précédent - <Link to={`/Jub_Biography/projects/${projects[index + 1].folderName}`}>{projects[index + 1].name}</Link></p>)
      }

      // console.log("Generating previous & next projects " + index)
      //On applique les modifications du texte
      if (nextPreviousProjects != null)
        result = <>{nextPreviousProjects}</>;

    } else {
      console.log("Projects array is null !")
    }

    return result
  }




  ///Afficher ou non le contenu des balises <history> en fonction du bool historyMode
  function ShowHistoryMode(content, historyMode) {

    //console.log(historyMode)

    if (historyMode) {
      content = content.replace(/(<history>)([\s\S]*?)(<\/history>)/g, "$1$3\n\n$2\n\n");
    } else {

      const photoRegex = /!\[.*\].*\(.*\)/g
      content = content.replace(/(<history>)[\s\S]*?(<\/history>)/g, RemHistory);

      function RemHistory(text, capture1, capture2) {

        const photos = [...text.matchAll(photoRegex)];
        return capture1 + capture2 + photos.join("\n")
      }
    }

    //console.log(content)

    return content;
  }





  







  return (
    <div>

      <div className="ReactMarkdown">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          transformImageUri={uri =>
            uri.startsWith("http") ? uri : `${project.folderPath + "/"}${uri}`
          }

          components={{
            p: "span",
            // @ts-ignore
            history: () => {
              return (
                <history><button className="funky_text_button" onClick={() => setHistoryState(!state.historyDisplay)}>{(!state.historyDisplay && "Voir plus d'infos") || "Voir moins d'infos"}</button></history>
              );
            },

            imagegroup: (m) => {
              return (
                <div className="imagegroup"></div>
              );

            },

            //Changement de la navigation a travers les pages
            a: (props) => {
              // console.log(props)
              return <Link to={props.href}>{props.children}</Link>
            },

            autotab: () => <>{GetProjectInfos_TableMode(project)}</>,

            title: () => {

          

              if (!imageNotFound) {
               
                return (
                <img

                  alt={`Project title : ${project.name}`} id="TitleImage"
                  src="medias/title.png"

                  onError={() => {

                      setImageNotFound(true)
                    }
                  }         
                />)
              }

              return <h1>{project.name}</h1>

            },

            nextprojects: () => {
              return GetNextPreviousProject()
            },

          }}




        >{"<p></p>" + state.projectMd}</ReactMarkdown>

      </div>
    </div>
  )
}



export default ProjectPage


