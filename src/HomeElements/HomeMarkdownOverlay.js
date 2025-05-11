


import './HomeProjectPreview.scss';
import './HomeMarkdownOverlay.scss';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { RefreshLoadMarkdown } from "../Projects/MarkdownProjectPage.tsx";



import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import { GetProjectInfos_TableMode } from "../Projects/ProjectFuncs"



const DrawMarkdown = (prop) => {

  //Modifier le titre en haut de page du projet. On passe le state en paramètre car à cause du fucking asynchrone ont sait jamais quand State(usestate) sera update
  const [imageNotFound, setImageNotFound] = useState(false);
  //Setter pour les infos du projet
  const [projectMd, setProjectMd] = useState(<p></p>)


  const project = prop.project


  RefreshLoadMarkdown(project, (md, prof) => setProjectMd(md), (str) => str)

  
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
            history: 
            () => {
              return (
                <></>
                //<history><button className="funky_text_button" onClick={() => setHistoryState(!state.historyDisplay)}>{(!state.historyDisplay && "Voir plus d'infos") || "Voir moins d'infos"}</button></history>
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
              return props.children;
             // return <Link to={props.href}>{props.children}</Link>
            },

            autotab: () => <>{
              GetProjectInfos_TableMode(project)
            }</>,

            title: () => {

          

              if (!imageNotFound) {
               
                return (
                <img

                  alt={`Project title : ${project.name}`} id="TitleImage"
                  src={`${project.folderPath}medias/title.png`}

                  onError={() => {
                      setImageNotFound(true)
                    }
                  }         
                />)
              }

              return <h1>{project.name}</h1>

            },

            nextprojects: () => {
              return <></>
             // return GetNextPreviousProject()
            },

          }}

        >{projectMd}</ReactMarkdown>

      </div>
    </div>
  )



}








//Page de markdown overlay
const HomeMarkdownOverlay = (prop) => {


  const selectedProject = prop.selectedProject
  const turnOffMethod = prop.turnOffMethod//A passer en paramètre pour éteindre le popup

  let content;

  if (selectedProject == null)
    content = null;
  else
    content = (
      <motion.div
      className='HomeMarkdownAnimation' 
        initial={{ opacity: 0, transform:"translateY(10vh)" }}
        animate={{ opacity: 1, transform:"translateY(0)"  }}
        exit={{ opacity: 0, transform:"translateY(2vh)" }}
        transition={{ duration: 0.2, delay: 0, ease: "easeInOut" }}>
        <>
          <div className='HomeMarkdownBackgroundClick'  onClick={turnOffMethod}>
            </div>

          <div className='HomeMarkdownOverlay'>
            <div className='HomeMarkdownSection'>

        
          <DrawMarkdown project={selectedProject}/>



          </div>
          </div>
        </>
      </motion.div>
    )



  return (

    <AnimatePresence>
      {content}
    </AnimatePresence>

  )



}





export { HomeMarkdownOverlay }






