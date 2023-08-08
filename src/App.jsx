import "./App.css";
import Burette from "./components/Burette";
import Beaker from "./components/Beaker";
import Details from "./components/Details";
import { useEffect, useState } from "react";
import CounterContext from "./components/CreateContext";

function App() {
  const [volume, setVolume] = useState(100);
  const [SelectedTitrant, setSelectedTitrant] = useState({});
  const [SelectedTitrate, setSelectedTitrate] = useState({});
  const [SelectedChem, setSelectedChem] = useState({});

  function drain() {
    setVolume(volume - 10);
  }

  useEffect(() => {
    console.log(SelectedChem);
  }, [SelectedChem, SelectedTitrant, SelectedTitrate]);

  return (
    <>
      <CounterContext.Provider
        value={[
          SelectedTitrant,
          setSelectedTitrant,
          SelectedTitrate,
          setSelectedTitrate,
          SelectedChem,
          setSelectedChem,
        ]}
      >
        <Details />

        <div className="flex flex-col items-center justify-center mx-auto h-96">
          <Burette volume={volume} onDrain={drain} Chemical={SelectedTitrant} />
          {/* <div className="w-20 h-4 py-4 bg-blue-900"></div> */}
          <Beaker volume={volume} onDrain={drain} Chemical={SelectedTitrant} />
        </div>
      </CounterContext.Provider>
    </>
  );
}

export default App;
