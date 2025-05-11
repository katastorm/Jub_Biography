

import HomePage from "./HomePage.js";
import {ProjectPage} from "./Projects/MarkdownProjectPage.tsx";
import ProfilePage from "./ProfilePage";
import UnityProjectsPage from "./Projects/UnityProjectsPage.js";


//import PageNotFound from "./404";
import { DrawHeaderNav, DrawFooterNav } from './Elements/NavHeader.js';
import { useState, useEffect } from 'react';
import folders from "./projectList.json"
//import { prettyFormat } from "@testing-library/react";
import ParralaxBackground from './jquerry/ParralaxBackground.js';
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";






////Gere la liste des projets
const App = () => {


    const [state, setState] = useState({
        projects: [],
        projectsDict: {},
        isBusy: true
    })

    const currentDate = new Date()

    //Supression des erreurs liés aux tags customs utilisés dans les .md du projet
    const realError = console.error;
    console.error = (...x) => {
        // on escape les tags customs;
        //console.log(JSON.stringify(x))
        if (x[0].length > 0 && x[0].includes("is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.")) {
            return;
        }
        realError(...x);
    };




    //Utilisé pour stoquer et récuperer de la data entre les pages

    console.log("Project list:" + Object.keys(state.projectsDict).length)
    //console.log("Isbusy =:" + state.isBusy)




    ///Gestion de la liste des projets

    const refreshContents = async () => {
        let contentCopy = [];
        let projectsDict2 = {};
        let id = 0;


        for (let folder of folders) {
            //const content = await (await fetch(folder + '/index.md')).text();

            let content = folder

            content.id = id++;

            let pat = "/Jub_Biography/Projects/" + content.folderName;
            content.folderPath = pat;


            try {

                //Si c'est la première init, executé 1 fois
                if (content.preview === undefined) {

                    content.inDeveloppement = false;

                    if (content.ending === undefined) {
                        content.ending = {
                            "year": (currentDate.getFullYear()),
                            "month": (currentDate.getMonth()),
                        }
                        content.inDeveloppement = true;
                    }

                }


                //image d epreview & index des pages
                // content.preview = await fetchImage(pat + "/preview.jpg", defaultImgUrl)

                if (content.hasPreview)
                    content.preview = pat + "preview.jpg"
                else
                    content.preview = "/Jub_Biography/preview_unkown.jpg"

                //content.folderName = encodeURIComponent(folder.folderName);
                content.mainMarkdownPath = content.hasMdFile ? content.folderPath + 'page.md' : "/Jub_Biography/ProjectWIP.md";



                projectsDict2[content.folderName] = content
                contentCopy.push(content);
            } catch (error) {
                console.error(error);
                console.log("cant load from " + pat)
            }
        }
        //Tri dans le sens décroissant
        contentCopy.sort((proj1, proj2) => (proj2.ending.year * 100 + proj2.ending.month) - (proj1.ending.year * 100 + proj1.ending.month));
        setState({ projects: contentCopy, projectsDict: projectsDict2, isBusy: false })
    }

    useEffect(() => {
        console.log("Refreshing Content")
        refreshContents();
    }, [])











    function LoadProject() {

        const toCut = "/Jub_Biography/projects/"
        const projectRelativePath = window.location.pathname.substring(toCut.length)//useParams()["*"];

            return (
                <ProjectPage project={state.projectsDict[projectRelativePath]} />
            );
    }

    function ShowHome() {
        return <HomePage projects={state.projects} />
    }



    function PreventHashtag() {
        let path = window.location.href
        // console.log(path)

        /*
          Jub_Biography/#projects/#Room505 => Jub_Biography/projects/Unity/Room505
        */

        if (path.includes("#")) {
            path = path.replace(origin, "").replaceAll("#", "")
            // console.log(path)
            return <Navigate to={path} replace />
        }
        return <></>
    }



    return (

        <div>
            <BrowserRouter >


                <div className="App">
                    <header className="App-header">
                        <DrawHeaderNav />

                        {
                            <ParralaxBackground />
                        }
                        <div className="background">

                            <img src="/Jub_Biography/images/backgroundTest2.jpg" alt="backgroundImg" />
                            <img src="/Jub_Biography/images/backgroundTest2.jpg" alt="backgroundImg" />
                            <img src="/Jub_Biography/images/backgroundTest2.jpg" alt="backgroundImg" />

                        </div>




                        <div className="Body Body-Position">

                            <Routes>
                            
                                <Route exact path="/Jub_Biography">

                                    <Route path={"home"} element={<ShowHome />} />

                                    <Route path={"profile"} element={<ProfilePage />} />

                                    <Route exact path={"Projects"}>
                                        <Route exact path={"Unity"}>
                                            <Route path={"*"} element={<LoadProject />} />
                                            <Route path={""} element={<UnityProjectsPage projects={state.projects} />} />
                                        </Route>
                                        <Route path={""} element={<Navigate to="/Jub_Biography/home" replace />} />
                                    </Route>

                                    <Route path={"*"} element={<Navigate to="/Jub_Biography/home" replace />} />
                                    <Route path="" element={<Navigate to="/Jub_Biography/home" replace />} /> {/* navigate to default route if no url matched */}
                                </Route>

                                <Route path="/*" element={<Navigate to="/Jub_Biography/home" replace />} /> {/* navigate to default route if no url matched */}





                            </Routes>

                            {/*Super important, permet de rectifier l'url de la page de l'ancien path avec des "#" vers des "/" */}
                            <PreventHashtag />






                        </div>

                        <DrawFooterNav></DrawFooterNav>
                    </header>
                </div>
            </BrowserRouter>




        </div>
    )
};

export default App;