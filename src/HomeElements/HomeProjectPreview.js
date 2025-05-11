import './HomeProjectPreview.scss';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';

import { SessionVisitedKey } from './HomeIntro';
import { HomeMarkdownOverlay } from './HomeMarkdownOverlay.js';
import { GetProjectTagsToBubbles } from "../Projects/ProjectFuncs"


const HomeProjectPreview = (prop) => {

    const id = prop.id;
    const visited = prop.visited;
    const project = prop.project;
    const onClick = prop.onClick;


    return (

        <motion.div layout className='homeProjectPreviewLayout'
            key={"homeProj" + id}
            initial={{ opacity: 0, transform: "scale(0.8)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0, transform: "scale(1)" }}
            transition={{ duration: 0.4, delay: (visited ? 0 : 1.2) + id * 0.15, ease: "easeInOut" }}
        >
            <div className='homeProjectPreview' onClick={onClick}>

                <img src={project.preview} className='homeProjectPreviewImg' />


                <div className='homeProjectPreviewTextArea'>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className='BubbleArea'>{GetProjectTagsToBubbles(project.tags_languages)}</div>
                </div>
                

            </div>
        </motion.div>
    );


}


//Affichage des projets sur la page principale Home
const HomeProjectPreviewArea = (datas) => {
    const SessionAnimationKey = SessionVisitedKey + "_previews"

    const [selectedProject, setPopupProject] = useState(null)


    useEffect(() => {//Jouer l'anim que une seule fois dans la session

        if (!visited) {
            sessionStorage.setItem(SessionAnimationKey, true);
        }
        else {

        }
    }, []);


    const projects = datas.projects;

    const visited = sessionStorage.getItem(SessionAnimationKey);


    console.log("VISITED : " + visited);

    let projLi = []
    let id = 0




    projects.forEach(proj => {
        projLi.push(
            <HomeProjectPreview id={id++} onClick={() => setPopupProject(proj)} visited={visited} key={id} project={proj}>
            </HomeProjectPreview>
        )
    });



    

    return (

        <>

            <div className="homeProjectPreviewArea">
                <AnimatePresence>
                    {projLi}
                </AnimatePresence>

            </div>


                <HomeMarkdownOverlay selectedProject={selectedProject} turnOffMethod={() => setPopupProject(null)} />
        </>
    );


}







export { HomeProjectPreviewArea }