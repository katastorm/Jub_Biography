<autotab></br><table><thead><tr><th>Date de création</th><th>Finalisation</th><th>Ampleur du projet</th><th>Wow effect</th><th>Type de projet </th><th>En Ligne</th></tr></thead><tbody><tr>
        <td>mars 2020</td>
        <td>avril 2021</td>
        <td>medium</td><td>very cool</td>
        <td>Prototype jouable</td><td>NO</td>
        </tr></tbody></table></autotab>

## Description

Jeu fortement inspiré de `Minecraft`.

![inventory anim](./medias/inventory.gif)

## Contexte

J'ai beaucoup joué à `Minecraft` étant plus jeune. Mais j'avais des difficultés à accepter qu'un jeu aussi simple visuellement puisse lagger sur certain ordinateurs. Je me suis lancé dans l'idée de recoder un minecraft, mais avec une fréquence de bloc 2x fois plus élevée, et avec une render-distance 2x plus élevée aussi. Je voulais implémenter beaucoup de fonctionnalités non supporté de base par minecraft, tel que l'import de mods, de scripts en lua, de nouveaux models 3D...

## Développement


Generer des chunks de (32 * 32 * 128) blocs, dans un champ de vision de 16 chunks, disont carré, donc 16 * 16 chunks à afficher, on obtient 33.54 million de cubes à afficher. Okay. Par où commencer ? Comment stoquer tout ça... Je me suis beaucoup interessé aux meshs, aux matérieux et aux tableaux pendant cette phase du développement.



<imagegroup></imagegroup>
![](./medias/idee1.jpg)
![](./medias/mesh1.jpg)

![](./medias/mesh2.jpg)
*premières ébauches du développement des meshs*


Pendant cette première phase de dev, tout était "Critique". Le type de données utilisés pour les cubes, la façon dont ils étaient générés, puis affichés. Chacunes des ces étapes seraient répétés 33.54 millions de fois durant le jeu, il fallait donc prendre des précautions. Assez rapidmeent, l'affichage de gigantesques meshs multi-matériaux fut apréhendé. On eu alors des premiers prototypes de terrains. La génération était faite avec des noises (cellular noise pour les biomes). Un gros problème aura été de trouver une manière de connecter les biomes entre eux, de manière "smooth", mais grâce au math, on peut tout faire.

<imagegroup></imagegroup>
![Terrain](./medias/mesh3.jpg)
![Terrain](./medias/mesh4.jpg)

![Terrain](./medias/biomes.gif)
*premières ébauches des terrains*




 Je me suis intéréssé à la génération de cavernes basiques. Le résultat était super, mais la map mettait beaucoup de temps à générer, même avec des analyse de la complexité faites au préalable.

<imagegroup></imagegroup>
![Les cavernes](./medias/idee2.jpg)
![Les cavernes](./medias/mesh5.jpg)

*Test de génération de cavernes*

A partir de ce moment là, des gens étaient interessés pour travailler sur le projet avec moi (`Victoire` et `Brian` pour les intimes). Victoire se chargeait d'implémenter un système de mods, avec chargement de ressources et scripts lua. Brian travaillait sur une généation de terrain plus réaliste et plus complête (système multi-noise avec des "températures" etc.). Pendant ce temps je travaillais sur l'interface de l'inventaire et l'importation de structures depuis `MagicaVoxel`. `MagicaVoxel` c'est un logiciel de création de models 3D en voxel.

<imagegroup></imagegroup>
![Importation de fichiers en voxels](./medias/voxel1.jpg)
![Importation de fichiers en voxels](./medias/voxel2.jpg)

*A gauche, un arbre visualisé dans l'editeur `MagicaVoxel`, à droite : des arbres importés dynamiquement dans le projet*

## Produit final

Le prototype est jouable, avec une arrivée sur la map dont la génération est infinie. Il existe 5 biomes différents, et le plusieurs joueurs peuvent se connecter sur le même map. Les fonctionnalités d'inventaire, de gestion des objets ainsi que le système de pioche sont fonctionnelles.



## Ressenti

Du fait de la complexité du projet, chaque étape réussie était très valorisante, et j'apprenais beaucoup de choses. Même si le jeu a un statut de prototype, il a eu une place importante dans le développement de mes compétences techniques.

![pickaxe anim](./medias/muinekarfPickaxe.gif)


## Mode histoire


<history>
*[Infos en vrac]*

Par rapport au shéma sur les 3 cubes, j'ai choisi l'option 2, qui permet
- De ne pas générer les faces inutilisés
- D'afficher une partie de la texture différente sur chaque faces (4 uvs différents/Faces)


Avec le développement de ce jeu, j'ai pu découvrir combien la génération procédurale m'intéresse et me motive !
En effet, la découverte des noise avec l'application de fonction mathématiques complexes des bruits par exemple, était extrêmement intéressante.

En bon développeur dans le domaine de l'informatique et du jeu vidéo, j'avais joué à de nombreux jeux dont `Minecraft`. Bien qu'un classique de l'industrie entière, de nombreux éléments me dérangeaient comme son esthétique, son manque d'optimisation qui ammenait à des lagues réguliers, et comme des fonctionnalités manquantes ou pas suffisamment poussées. Unity en tant que moteur semblait posséder les ressources nécessaires à le faire tourner même avec les ajouts ou modifications que j'envisageai, puisque `Minecraft` reste un monde composé d'une succession de cubes.

Mon objectif était le suivant : faire un rework du jeu en augmentant fortement la précision, c'est à dire qu'on pourrait désormais casser des centimètres de terrain. L'approche serait alors plus réaliste, comme par exemple la capacité de creuser un trou 20 blocs par 20 blocs.
Cela donnerait des millions de blocs à mettre en mémoire et stocker, ainsi qu'à afficher de manière procédurale.

Les premières questions qui ont dues être posées sont qu'est ce qui définit un cube ? Un chunk ? La différence entre les deux, effectuer une sorte de veille sur les fonctionnalités de base, chercher les méthodes qui permettraient un maximum de simplification (multithreading), etc. Il était nécessaire que tout s'approche le plus possible du parfait, car un problème sur un bloc, c'est les millions d'autres qui sont impactés (quelle optimisation, la meilleure possible, stocker entier ou short ?, utilisation de pointeur, etc).

Il s'est avéré que des blocs deux fois plus petits que leur taille originelle
accessible en faisant des blocs deux fois plus petits que minecraft - rendu et génération de blocs de 50cm au lieu de 1m, ça ne laguati pas sur des orids ok

Début, placer des bocs dans un environnement (gérer meshs et vertex, et mélange de plusieurs modèles 3D bien chiant)

Intérêt à la génération -> mec de DUT1 se sont intéressés au projet, idées donnée, LUA, style VOXEL (pixel en 3 `voxalidit`)

Jeu doit être compatible avec ce genre de modèle 3D pour que les futurs joueurs puissent importer leur fichier de config sans problème => Système d'exportation fonctionnel (exemple arbres)

arrêt du projet après inventaire, gestion des objets, système de pioche

génération avec des noises pour placer des minerais de manière pas entièrement aléatoire

gros problèmes d'optimisation même avec les études de complexité faites au préalable

Fonctionne en multi - semblant, même map

autres mecs commentaient par leurs avancées, moteur pour charger LUA par exemple il s'est arrêté en plein milieu du coup bug quasi impossible à corriger, même si élément fonctionnel

Prototype jouable, arrivée sur la map, génération infinie, 5 biomes différents, multi ok tier.

A tout moment du projet, très optimiste et heureux du résultat - toutes les fonctionnalités et logiques étaient compliquées, donc chaque élément compris était comme un mini projet réussi donc valorisation et retour positif immédiats.

</history>



<nextprojects>

> Projet précédent -  [Historycon](/Jub_Biography/projects/Unity/historyGit)

> Projet suivant -  [Underwar](/Jub_Biography/projects/Unity/Underwar)

</nextprojects>
