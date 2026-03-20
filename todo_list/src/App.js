import logo from './logo.svg';
import './App.css';
import data from "./data.json"
import {useState} from "react";

function App() {
  const [mode, setMode] = useState("Tasks");
  const [taches, setTaches] = useState(data.taches);

  const [fNonFinies, setFNonFinies] = useState(true);
  const [fDateCreation, setFDateCreation] = useState(false);
  const [fDateEcheance, setFDateEcheance] = useState(false);
  const [fNom, setFNom] = useState(false);

  function LoadTasks() {
      return (
          <>
              {taches && taches.map((task) =>
                  <>
                      <p>{task["title"]}</p>
                      <p>ID: {task["id"]}</p>
                      <p>Desc: {task["description"]}</p>
                      <p>Created: {task["date_creation"]}</p>
                      <p>Due by: {task["date_echeance"]}</p>
                      <p>STATUS: {task["etat"]}</p>
                      {task["equipiers"] && task["equipiers"].map((equipier) =>
                          <>
                              <p>Partner: {equipier["name"]}</p>
                          </>
                      )}
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
            {BoolBtnClick && <button onClick={BtnClick}>Repartir de zéro</button>}
            {BoolConfBtn && <button onClick={BtnClick}>Annuler</button>}
            {BoolConfBtn && <button onClick={Reset}>Confirmer</button>}
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

      return <button onClick={ChangeMode}>MODE: {mode}</button>
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
          }
      }

      function ChangeFDateEcheance() {
          if (fDateEcheance) {
              setFDateEcheance(false)
          } else {
              setFDateEcheance(true)
          }
      }

      function ChangeFNom() {
          if (fNom) {
              setFNom(false)
          } else {
              setFNom(true)
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <CurrentMode />
          {mode === "Tasks" && <ResetTasks />}
          {mode === "Tasks" && <LoadFilters />}
          {mode === "Tasks" && <LoadTasks />}
              </header>
    </div>
  );
}

export default App;
