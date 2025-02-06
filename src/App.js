

import FrontPage from "./FrontPageUnity";
import ProjectPage from "./ProjectPage";
import ProfilePage from "./ProfilePage";
import PageNotFound from "./404";
import { DrawHeaderNav, DrawFooterNav } from './NavHeader.js';
import { useState, useEffect } from 'react';
import folders from "./projectList.json"
import { prettyFormat } from "@testing-library/react";
import ParralaxBackground from './jquerry/ParralaxBackground.js';
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";







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



    const fetchImage = async (url, defUrl) => {
        let img = undefined

        let imageBlob = undefined

        img = await fetch(url);

        imageBlob = await img.blob();


        // console.log(imageBlob.type)

        if (imageBlob == undefined || !imageBlob.type.includes("image")) {
            return defUrl;
        }

        return await URL.createObjectURL(imageBlob);
    };



    ///Gestion de la liste des projets

    const refreshContents = async () => {
        let contentCopy = [];
        let projectsDict2 = {};



        for (let folder of folders) {
            //const content = await (await fetch(folder + '/index.md')).text();
            let pat = "/Jub_Biography/Projects/" + folder.folderName;
            let content = folder



            try {

                //image d epreview & index des pages
                // content.preview = await fetchImage(pat + "/preview.jpg", defaultImgUrl)

                if (content.hasPreview)
                    content.preview = pat + "/preview.jpg"
                else
                    content.preview = "/Jub_Biography/preview_unkown.jpg"

                //content.folderName = encodeURIComponent(folder.folderName);
                content.folderPath = pat;
                content.mainMarkdownPath = content.hasMdFile ? content.folderPath + '/page.md' : "/Jub_Biography/ProjectWIP.md";

                if (content.ending == undefined) {
                    content.ending = {
                        "year": (currentDate.getFullYear()),
                        "month": (currentDate.getMonth()),
                    }
                }


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










    const site_basename = "/Jub_Biography"

    function RepairHashtagLink() {

        console.log("broken link")
        //console.log(useParams())


        return <h1>Broken shit</h1>

        //  return (<Navigate to="/Jub_Biography/home" replace />)

    }


    function LoadProject() {

        let allPaths = useParams()["*"];

        //Suprime le dernier '/'
        if (allPaths.length > 0 && allPaths[allPaths.length - 1] == "/")
            allPaths = allPaths.substring(0, allPaths.length - 1)

        //Link repair

        if (!allPaths.includes("/"))
            allPaths = "Unity/" + allPaths
        console.log(allPaths)

        return (
            <ProjectPage project={state.projectsDict[allPaths]} />
        );
    }

    function ShowHome() {
        return <FrontPage projects={state.projects} />
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


                        <ParralaxBackground />
                        <div className="background">
                            {/*
  <img src="Jub_Biography/images/lol_loop1.gif" alt="Lack of light - ingame screenshot"/>
  <img src="Jub_Biography/images/lol_loop2.gif" alt="Lack of light - ingame screenshot"/>
  <img src="Jub_Biography/images/lol_loop2.gif" alt="Lack of light - ingame screenshot"/>
*/}

                            <img src="/Jub_Biography/images/backgroundTest2.jpg" alt="backgroundImg" />
                            <img src="/Jub_Biography/images/backgroundTest2.jpg" alt="backgroundImg" />
                            <img src="/Jub_Biography/images/backgroundTest2.jpg" alt="backgroundImg" />


                        </div>




                        <div className="Body Body-Position">



                            <Routes>



                                <Route exact path="/Jub_Biography">

                                    <Route path={"home"} element={<ShowHome/>} />

                                    <Route path={"profile"} element={<ProfilePage />} />

                                    <Route path={"projects"}>
                                        <Route path={"*"} element={<LoadProject />} />
                                        <Route path={""} element={<Navigate to="/Jub_Biography/home" replace />} />
                                    </Route>

                                    <Route path={"*"} element={<Navigate to="/Jub_Biography/home" replace />} />
                                    <Route path={""} element={<ShowHome/>} />


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