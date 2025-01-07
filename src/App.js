

import { Link, Route, Switch } from "wouter";
import FrontPage from "./FrontPageUnity";
import ProjectPage from "./ProjectPage";
import ProfilePage from "./ProfilePage";
import PageNotFound from "./404";
import { DrawHeaderNav, DrawFooterNav } from './NavHeader.js';
import { useState, useEffect } from 'react';
import folders from "./projectList.json"
import { useLocationProperty, navigate } from "wouter/use-location";
import { Router, Redirect } from "wouter";
import { prettyFormat } from "@testing-library/react";
import ParralaxBackground from './jquerry/ParralaxBackground.js';



const App = () => {


    const [state, setState] = useState({
        projects: [],
        projectsDict: {},
        isBusy: true
    })


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

                content.folderName = encodeURIComponent(folder.folderName);
                content.folderPath = pat;
                content.mainMarkdownPath = content.hasMdFile ? content.folderPath + '/page.md' : "/Jub_Biography/ProjectWIP.md";



                projectsDict2[content.folderName] = content
                contentCopy.push(content);
            } catch (error) {
                console.error(error);
                console.log("cant load from " + pat)
            }
        }

        contentCopy.sort((proj1, proj2) => (proj1.creation.year * 100 + proj1.creation.month) - (proj2.creation.year * 100 + proj2.creation.month));
        setState({ projects: contentCopy, projectsDict: projectsDict2, isBusy: false })
    }

    useEffect(() => {
        console.log("Refreshing Content")
        refreshContents();
    }, [])




    const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";

    const hashNavigate = (to) => navigate("#" + to);

    const useHashLocation = () => {
        let location = useLocationProperty(hashLocation);
        // console.log(location);
        return [location, hashNavigate];
    };









    ///En cas de refresh de la page, on attends que les Projets soient correctements chargés avant de mettre en place la navigation
    function loadingRoutes() {

        if (!state.isBusy) {

            return (<div>
                <Route path="projects/#:currentFolderName">
                    {(params) => <ProjectPage project={state.projectsDict[params.currentFolderName]} />}
                </Route>

                <Route path="404" component={PageNotFound} />
                <Route>
                    <Redirect to={"404"} />
                </Route>
            </div>

            )
        }
        return <h1>Loading..</h1>

    }



    return (

        <Router base="/Jub_Biography" hook={useHashLocation}>

            <div className="App">
                <header className="App-header">
                    <DrawHeaderNav />


                    <ParralaxBackground />
                    <div class="background">
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








                        <Switch>
                        
                        <Route path="profile">
                                {(params) => <ProfilePage/>}
                         </Route>
                            

                            <Route path="home">
                                {(params) => <FrontPage projects={state.projects} />}
                            </Route>
                            {
                                <Route exact path="/">
                                    {(params) => <FrontPage projects={state.projects} />}
                                </Route>
                            }


                            {
                                loadingRoutes()
                            }



                        </Switch>




                    </div>
                    <DrawFooterNav></DrawFooterNav>
                </header>
            </div>
        </Router>
    )
};

export default App;