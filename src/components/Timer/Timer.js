import React, {useState, useEffect} from 'react';
import {secondsToTime} from '../../components/utils/secondsToTime';


const Timer = ({ totalTime, submit }) => {

const [seconds, setSeconds] = useState(1);
const [minutes, setMinutes] = useState(1);
const [hours, setHours] = useState(1);

useEffect(() => {
    const totalTimeString = secondsToTime(totalTime);
    const timeStringArray = totalTimeString.split(":");
    setSeconds(timeStringArray[2]);
    setMinutes(timeStringArray[1]);
    setHours(timeStringArray[0]);
  }, [totalTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) setSeconds((prevSeconds) => prevSeconds - 1);
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(59);
            setHours((prevHours) => prevHours - 1);
          }
        } else {
          setSeconds(59);
          setMinutes((prevMinutes) => prevMinutes - 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });


  useEffect(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        if (hours === 0) {
          submit();
          //toast(Times up, question submitted)
      }
    }
  }
  }, [seconds, minutes, hours, submit]);


  useEffect(() => {
    if (hours === 0 && minutes === 1 && seconds === 0) {
      //toast("Test will automatically submit in 1 minute);
    }
  }, [seconds, minutes, hours]);

return (
<div className="timer__container d-flex flex-column">
 <div className="timer d-flex flex-row align-items-center pb-1">
  <p>{hours < 10 ? `0${hours}` : hours}</p> 
  <p>:</p>
  <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
  <p>:</p>
  <p>{seconds < 10 ? `0${seconds}` : seconds}</p> 
 </div>
 <div className="timer d-flex flex-row align-items-center">
   <small>Hours</small>
   <small>Mins</small>
   <small>Secs</small>
 </div>
</div>
)
}

export default Timer;
