
import '../styles/HomePage.scss';
import './HomeIntro.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const SessionVisitedKey = 'AlreadyVisited4'

const HomeIntro = () => {

    const localVisited = SessionVisitedKey + "_intro"

    useEffect(() => {//Jouer l'anim que une seule fois dans la session

        const visited = sessionStorage.getItem(localVisited);

        if (!visited) {
            sessionStorage.setItem(localVisited, true);
            document.documentElement.style.setProperty('--start-anim-time', '1.1s');
        }
        else {
            const elements = document.querySelectorAll('.start');

            document.documentElement.style.setProperty('--start-anim-time', '0s');

            elements.forEach((el) => {
                el.classList.remove('start');

            });

        }
    }, []);




    return (


        <div className='start homeIntroArea'>

            <div className='start homeIntroAreaBar'>
                <div className='start homeIntroAreaGradient'></div>
            </div>

            <div className='start homeIntroText'>
                <h3>Julien Faidide</h3>
                <p>💻 Ingénieur diplômé de <Link to="https://www.esiee.fr/">l'ESIEE PARIS</Link><br />
                    💼 4 années d’expériences en développement<br />
                    💾 Je vous présente mes projets et mon parcours<br />
                    ➡️ <Link to="/Jub_Biography/profile">En savoir plus sur mon profil</Link></p>
            </div>




            <img src='images/julienFace2.png' className='start homeIntroImg' />


        </div>


    );

}


export { HomeIntro, SessionVisitedKey };
