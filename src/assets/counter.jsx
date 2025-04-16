import { useState, useEffect } from "react";
import '../App.css'

let initTime = Date.now() / 1000 ;
let intervals;
let timeobj = { hour: 0, minute: 0, seconds: 0 };
let ongoingtime = { hour: 0, minute: 0, seconds: 0 };


function Counter() {

    const [seconds, setSeconds] = useState(`00`);
    const [minutes, setMinutes] = useState(`00`);


    const starttimer = () => {
        timeobj["seconds"] = Math.floor((Date.now() / 1000 - initTime) % 60) + ongoingtime["seconds"];
        timeobj["minute"] = Math.floor((Date.now() / 1000 - initTime) / 60) + ongoingtime["minute"];
        timeobj["hour"] = Math.floor((Date.now() / 1000 - initTime) / 3600) + ongoingtime["hour"];

        setSeconds(timeobj["seconds"].toString().length == 1 ? `0${timeobj['seconds']}` : timeobj["seconds"]);
        setMinutes(timeobj["minute"].toString().length == 1 ? `0${timeobj['minute']}` : timeobj["minute"]);
    }

    const pause = () => {
        initTime = Date.now() / 1000;
        clearInterval(intervals);
        ongoingtime = { ...timeobj };
        localStorage.setItem("storetime", JSON.stringify(ongoingtime));
    };

    const begintimer = () => {
        initTime = Date.now() / 1000;
        intervals = setInterval(starttimer, 1000);
    };


    useEffect(() => {
        if (localStorage.getItem("storetime")) {
        ongoingtime = JSON.parse(localStorage.getItem("storetime"));

        setSeconds(ongoingtime["seconds"].toString().length == 1 ? `0${ongoingtime['seconds']}` : ongoingtime["seconds"]);
        setMinutes(ongoingtime["minute"].toString().length == 1 ? `0${ongoingtime['minute']}` : ongoingtime["minute"]);
        }
    }, []);


  
    return (
        <>

        <div className="outercircle">
            <div className="innercircle"></div>
            <div className="timertext">{minutes} : {seconds}</div>
            <div className="startbutton" onClick={begintimer}>Start</div>
            <div className="startbutton" onClick={pause}>pause</div>
        </div>


        </>
    )
}

export { Counter }
