const xlsx = require("xlsx");
const fs = require("fs");
const jsontoxml = require("jsontoxml");
const path = require('path');
const reader = require('xlsx')
var directory_name = ".";
var saveDir_name = "../src/projectList.json";
var project_folder = "../public/Projects/";


const month = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]


function ExcelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}


//Creation du projet
function treatProject(line) {
    const proj = {}

    const date = ExcelDateToJSDate(line.Start)

    proj.name = line.Json_Name
    proj.creation = {}
    proj.creation.year = date.getFullYear()
    proj.creation.month = date.getMonth()
    proj.description = line.Description
    proj.folderName = line.Json_FolderName
    proj.tags = []
    proj.membersCount = line.Json_MembersCount

    proj.tab_wowEffect = line.Json_WowEffect
    proj.tab_devType = line.Json_Development
    proj.tab_projectType = line.Json_ProjectType
    proj.tab_isOnlineGame = line.Json_Online



    proj.hasPreview = fs.existsSync(project_folder + proj.folderName + "/preview.jpg")
    proj.hasMdFile = fs.existsSync(project_folder + proj.folderName + "/page.md")


    return proj
}




let filenames = fs.readdirSync(directory_name);
let projectDatas = []


let markdownDicts = {};


console.log("\nFilenames in directory:");


filenames.forEach((fileName) => {

    if (!fileName.includes("xlsx") || fileName.includes("~$")) return;

    const _file = path.resolve(directory_name, fileName);
    console.log(_file);

    // var workbook = xlsx.readFile(_file);

    if (fs.lstatSync(_file).isDirectory()) return;
    // Reading our test file
    const file = reader.readFile(_file)


    const sheets = file.SheetNames

    //Seulement la premiere page
    for (let i = 0; i < sheets.length && i < 1; i++) {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])


        //Pour chaque ligne
        temp.forEach((res) => {


            if (!res.Json_FolderName) return
            if (!res.Json_Name) return
            if (!res.Json_JsonGenerate) return
            if (!res.Name) return
            if (res.Json_JsonGenerate == "NO") return

            currentProject = treatProject(res)
            projectDatas.push(currentProject)
            //console.log(res)


            const pathName = project_folder + res.Json_FolderName

            //Creation du dossier associé
            if (!fs.existsSync(pathName))
                fs.mkdirSync(pathName);

            //Dossier media chill
            if (!fs.existsSync(pathName + "/medias"))
                fs.mkdirSync(pathName + "/medias");

            //Pour chaque projet, on construit un petit json pour aider l'edition du Markdown.
            fs.writeFile(pathName + "/info.json", JSON.stringify(currentProject), function (err) {
                if (err) {
                    console.log("Error :")
                    console.log(err);
                }
            });



            //Met à jour automatiquement la balise <autotab></autotab> présente dans les markdown
            TableReplacement(pathName + "/page.md", currentProject);

        })
    }


    //On trie par dates
    projectDatas.sort(function (a, b) {
        return (a.creation["year"] + a.creation["month"] / 100) - (b.creation["year"] + b.creation["month"] / 100)
    })


    let pathName
    let next
    let before

    //On retire tous les projets non terminés
    specificData = []
    projectDatas.forEach((res) => {
        pathName = project_folder + res.folderName + "/page.md"
        if (fs.existsSync(pathName))
            specificData.push(res)
    })




    //Et on génère les "projet suivants" et "projets précédents"
    for (var i = 0; i < specificData.length; i++) {

        next = null;
        before = null;

        //console.log(res.creation["year"])
        pathName = project_folder + specificData[i].folderName + "/page.md"
        if (i > 0)
            before = specificData[i - 1]
        if (i < specificData.length - 1)
            next = specificData[i + 1]


        NextProjects(pathName, before, next)


    }



    for(var key in markdownDicts) {

        console.log("Writing <autotab> & <nextprojects>:" + key);

    fs.writeFile(key,markdownDicts[key], function (err) {
        if (err) {
            console.log("Error :")
            console.log(err);
        }
    });

    }







    if (fs.existsSync(saveDir_name)) {

        fs.unlink(saveDir_name, (err) => {
            if (err) {
                throw err;
            }
        }
        )
    }

    console.log(saveDir_name)

    fs.writeFile(saveDir_name, JSON.stringify(projectDatas), function (err) {
        if (err) {
            console.log("Error :")
            console.log(err);
        }
    });



    // Printing data




});



//Met à jour automatiquement la balise <autotab></autotab> présente dans les markdown
function TableReplacement(markdownPath, jsonData) {


    if (fs.existsSync(markdownPath)) {
        tab = "<table><thead><tr><th>Date de création</th><th>Ampleur du projet</th><th>Wow effect</th><th>Type de projet </th><th>En Ligne</th></tr></thead><tbody>" +
        `<tr><td>${month[jsonData.creation["month"]]} ${jsonData.creation["year"]}</td><td>${jsonData.tab_devType}</td><td>${jsonData.tab_wowEffect}</td><td>${jsonData.tab_projectType}</td><td>${jsonData.tab_isOnlineGame}</td></tr></tbody></table>`



        data =  fs.readFileSync(markdownPath, 'utf8');//, (err, data) => {
            

            //if (!err && data) {


          
                var newString = data.replace(/(<autotab>)[\s\S]*(<\/autotab>)/g, `$1</br>${tab}$2`);
                // (<autotab>)[\s\S]*(<\/autotab>)

                markdownDicts[markdownPath] = newString
            //}
        //})



    }



}



//Met à jour automatiquement la balise <autotab></autotab> présente dans les markdowns et génère les liens "projet suivant" "projet précédent"
function NextProjects(markdownPath, projectBefore, projectAfter) {


    let res = "\n\n"

    if (projectBefore != null)
        res += `> Projet précédent -  [${projectBefore.name}](/Jub_Biography/#projects/#${projectBefore.folderName})\n\n`
    if (projectAfter != null)
        res += `> Projet suivant -  [${projectAfter.name}](/Jub_Biography/#projects/#${projectAfter.folderName})\n\n`

    //console.log("write:"+res)

    text = markdownDicts[markdownPath]



    markdownDicts[markdownPath] = text.replace(/(<nextprojects>)[\s\S]*(<\/nextprojects>)/g, `<nextprojects>${res}</nextprojects>`);
    // (<autotab>)[\s\S]*(<\/autotab>)

}


