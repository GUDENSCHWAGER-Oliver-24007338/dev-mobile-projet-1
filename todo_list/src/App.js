import logo from './logo.svg';
import './App.css';
import data from "./data.json"
import {useState} from "react";

function App() {
    const [mode, setMode] = useState("Tasks");
    const [taches, setTaches] = useState(data.taches);
    const [relations, setRelations] = useState(data.relations);
    const [dossiers, setDossiers] = useState(data.dossiers);

    const [fNonFinies, setFNonFinies] = useState(true);
    const [fDateCreation, setFDateCreation] = useState(false);
    const [fDateEcheance, setFDateEcheance] = useState(true);
    const [fNom, setFNom] = useState(false);
    const [modeSimple, setModeSimple] = useState(true);

    function LoadTasks() {
        let tachesFiltrees = taches

        if (fNonFinies) {
            tachesFiltrees = taches.filter((task) => task["etat"] === "Nouveau" || task["etat"] === "En cours" || task["etat"] === "En attente");
        }

        function compareTachesDE(a,b) {
            if (a["date_echeance"] < b["date_echeance"]){
                return -1;
            }
            if (a["date_echeance"] > b["date_echeance"]){
                return 1;
            }
            return 0;
        }
        function compareTachesDC(a,b) {
            if (a["date_creation"] < b["date_creation"]){
                return -1;
            }
            if (a["date_creation"] > b["date_creation"]){
                return 1;
            }
            return 0;
        }
        function compareTachesT(a,b) {
            if (a["title"] < b["title"]){
                return -1;
            }
            if (a["title"] > b["title"]){
                return 1;
            }
            return 0;
        }

        if (fDateEcheance) {
            tachesFiltrees.sort(compareTachesDE);
        }
        if (fDateCreation) {
            tachesFiltrees.sort(compareTachesDC);
        }
        if (fNom) {
            tachesFiltrees.sort(compareTachesT);
        }

        return (
            <>
                {tachesFiltrees && tachesFiltrees.map((task) =>
                    <>
                        <p>{task["title"]}</p>
                        <p>ID: {task["id"]}</p>
                        {task["description"] !== "" && <p>Desc: {task["description"]}</p>}
                        <p>Created: {task["date_creation"]}</p>
                        <p>Due by: {task["date_echeance"]}</p>
                        <p>STATUS: {task["etat"]}</p>
                        {task["equipiers"] && task["equipiers"].map((equipier) =>
                            <>
                                <p>Partner: {equipier["name"]}</p>
                            </>
                        )}
                        <p>Categories:</p>
                        {relations && relations.filter((relation) => relation["tache"] === task["id"]).filter((relation, order) => !modeSimple || order <= 1).map((relation) =>
                            <>
                                <p>{relation["dossier"]}</p>
                            </>
                        )}
                        <p></p>
                    </>
                )}
            </>
        )
    }

    function ResetTasks() {
        const [BoolBtnClick, setBoolBtnClick] = useState(true);
        const [BoolConfBtn, setBoolConfBtn] = useState(false);

        function BtnClick() {
            if (BoolBtnClick) {
                setBoolBtnClick(false);
                setBoolConfBtn(true);
            } else {
                setBoolBtnClick(true);
                setBoolConfBtn(false);
            }
        }

        function Reset() {
            setTaches("");
            LoadTasks();
            BtnClick();
        }

        return (
            <>
                {BoolBtnClick && <button onClick={BtnClick}>Reset</button>}
                {BoolConfBtn && <button onClick={BtnClick}>Cancel</button>}
                {BoolConfBtn && <button onClick={Reset}>Confirm</button>}
            </>
        )
    }

    function CurrentMode() {
        function ChangeMode() {
            if (mode === "Tasks") {
                setMode("Files")
            } else {
                setMode("Tasks")
            }
        }

        return <button onClick={ChangeMode}>Mode: {mode}</button>
        }

        function LoadFilters() {
            function ChangeFNonFinies() {
                if (fNonFinies) {
                    setFNonFinies(false)
                } else {
                    setFNonFinies(true)
                }
            }

        function ChangeFDateCreation() {
            if (fDateCreation) {
                setFDateCreation(false)
            } else {
                setFDateCreation(true)
                setFDateEcheance(false)
                setFNom(false)
            }
        }

        function ChangeFDateEcheance() {
            if (fDateEcheance) {
                setFDateEcheance(false)
            } else {
                setFDateEcheance(true)
                setFNom(false)
                setFDateCreation(false)
            }
        }

        function ChangeFNom() {
            if (fNom) {
                setFNom(false)
            } else {
                setFNom(true)
                setFDateCreation(false)
                setFDateEcheance(false)
            }
        }

        return (
            <>
                <p>Filter/Order by</p>
                <button onClick={ChangeFNonFinies}>Unfinished {fNonFinies && "✓"}</button>
                <button onClick={ChangeFDateCreation}>Creation Date {fDateCreation && "✓"}</button>
                <button onClick={ChangeFDateEcheance}>Due Date {fDateEcheance && "✓"}</button>
                <button onClick={ChangeFNom}>Name {fNom && "✓"}</button>
            </>
        )
    }

    function LoadFiles() {
        return (
            <>
                {dossiers && dossiers.map((dossier) =>
                    <>
                        <p>{dossier["title"]}</p>
                        {dossier["icon"] !== "" && <p>Icon: {dossier["icon"]}</p>}
                        <p>ID: {dossier["id"]}</p>
                        {dossier["type"] !== "" && <p>Type: {dossier["type"]}</p>}
                        {dossier["description"] !== "" && <p>Desc: {dossier["description"]}</p>}
                        <p>Color: {dossier["color"]}</p>
                        <p></p>
                    </>
                )}
            </>
        )
    }

    function LoadMode() {

        function ChangeMode() {
            if (modeSimple) {
                setModeSimple(false)
            } else {
                setModeSimple(true)
            }
        }

        return (
            <>
                <button onClick={ChangeMode}>△</button>
                <p>Mode: {modeSimple ? "Simple" : "Complet"}</p>
            </>
        )
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <LoadMode />
                <CurrentMode />
                {mode === "Tasks" && <ResetTasks />}
                {mode === "Tasks" && <LoadFilters />}
                {mode === "Tasks" && <LoadTasks />}
                {mode === "Files" && <LoadFiles />}
            </header>
        </div>
    );
}

export default App;
