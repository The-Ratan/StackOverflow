import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { darkModes, SetWhether } from "./actions/DarkMode";
import { useRecoilState } from "recoil";
import { GetWhetherData } from "./actions/takelocation";

function App() {
  const [storedLocation,setstoredLocation] = useState(undefined)
  const [whether, setWhether] = useRecoilState(SetWhether);
  const [darkMode, setDarkMode] = useRecoilState(darkModes);
  const [time, setTime] = useState();
  const dispatch = useDispatch();

  const fetchWhether = async()=>{
    const data = await GetWhetherData()
    setWhether(data);
  }

  useEffect(()=>{
    setstoredLocation(localStorage.getItem("location"));
    fetchWhether()
  },[storedLocation,localStorage])

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  useEffect(() => {
    if (whether) {
      if (whether.msg === "whether is Sunny") {
        setDarkMode(false);
      } else {
        setDarkMode(true);
      }
    } else {
      const date = new Date();
      setTime(date.getHours());
      if (date.getHours() > 5 && date.getHours() < 17) {
        setDarkMode(false);
      } else {
        setDarkMode(true);
      }
    }
  }, [time, whether]);

  return (
    <div className={`App ${darkMode ? "bg-slate-800 text-white" : ""}`}>
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <div className="mt-5">
          <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
        </div>
      </Router>
    </div>
  );
}

export default App;
