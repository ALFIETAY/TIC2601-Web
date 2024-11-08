import React, { useRef,useEffect,useState } from 'react';
import './Home.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Chart } from 'chart.js/auto';

//get all logged measurements of user
const getMeasurements = async (setMeasurementData, userID) => {
    try{
        const response= await fetch(`http://localhost:5001/api/measurements/${userID}`, {
            method: 'GET',
        });
        if (response.status === 200) {
            const data = await response.json();
            setMeasurementData(data.measurements);
        }
    }
    catch (error) {
        console.error(error);
    }
};

const getDeload = async (userID,setActive,setStart,setEnd,setDisabled) =>{
    try{
        const response = await fetch (`http://localhost:5001/api/deload/${userID}`,{
            method: 'GET'
        });
        if (response.status === 200){
            const data = await response.json();
            if (data.deload){
                setActive(data.deload); //set deload status == true
                setStart(data.start_date);//set start date
                setEnd(data.end_date);//set end date
                setDisabled(true);//disable date pickers
            }
        }
    }
    catch(error){
        console.error(error);
    }
};

const updateDeload = async (event, userID, start, end, navigate) =>{
    event.preventDefault();
    const data = {
        user_id: userID, 
        start_date: start, 
        end_date: end
    };
    try{
        const response = await fetch (`http://localhost:5001/api/deload/add_deload`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (response.status === 200){
            navigate(0);
        }
    }
    catch(error){
        console.error(error);
    }
}

const MeasurementChart = ({userID}) => {
    const chartRef = useRef([null,null,null]);
    const [measurementData, setMeasurementData] = useState([]);

    //get all measurements once there is a change in userID, in this case during login
    useEffect (() => {
        getMeasurements(setMeasurementData,userID);
    }, [userID]);

    //create graphs once there is a change in measurement data
    useEffect(() => {
        const xValues = measurementData.map(measurement => measurement.date); //get all dates of data
        const weight = measurementData.map(measurement => parseFloat(measurement.weight));//get all user weights data
        const bodyFat = measurementData.map(measurement => parseFloat(measurement.bodyfat_percentage));//get all user bodyfat percentage data
        const waistline = measurementData.map(measurement => parseFloat(measurement.waistline));//get all user waistline data
        const chartDatas = [
            {
                refIndex: 0,
                label: 'Weight (kg)',
                data: weight, //all weight data
                borderColor: "red", //line color
                fill: false, //if true, will shade area under line
            },
            {
                refIndex: 1,
                label: 'Bodyfat Percentage (%)',
                data: bodyFat, //all bodyfat data
                borderColor: "green", //line color
                fill: false, //if true, will shade area under line
            },
            {
                refIndex: 2,
                label: 'Waistline (cm)',
                data: waistline, //all waistline data
                borderColor: "blue",//line color
                fill: false, //if true, will shade area under line
            }
        ];

        // Create charts
        const newCharts = chartDatas.map(chartData => {
            const ctx = chartRef.current[chartData.refIndex].getContext('2d');
            return new Chart(ctx, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [
                    {
                        label: chartData.label,
                        data: chartData.data,
                        borderColor: chartData.borderColor
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: "white" //color for labels
                        }
                    },
                 },
                scales: {
                    x: {
                        grid: {
                            color: "white" //color for grid lines in X-axis
                        },
                        ticks: {
                            color: "white" //color for values on X-axis
                        }
                    },
                    y: {
                        grid: {
                            color: "white" //color for grid lines in Y-axis
                        },
                        ticks: {
                            color: "white" //color for values on Y-axis
                        }
                    },
                },
            },
        });
    });

        return () => {
            newCharts.forEach(chart => chart.destroy()); //remove existing graphs before update
        };
    }, [measurementData]);

    return (
        <>
            <div id='chart-home'>
                <canvas ref={(el) => (chartRef.current[0]=el)} className="measurementChart" />
            </div>
            <div id='chart-home'>
                <canvas ref={(el) => (chartRef.current[1]=el)} className="measurementChart" />
            </div>
            <div id='chart-home'>
                <canvas ref={(el) => (chartRef.current[2]=el)} className="measurementChart" />
            </div>
        </>
    );
};

//get history of exercises for the past 4 weeks
const getExerciseHistory = async (setExerciseHistory,userID) =>{
    try{
        const response= await fetch(`http://localhost:5001/api/exercises/exercise_history/${userID}`,{
            method: 'GET',
        });
        if(response.status === 200){
            const data = await response.json();
            setExerciseHistory(data.muscle_group_breakdown);
        }
    }
    catch (error){
        console.error(error);
    }
}

const ExerciseHistoryChart = ({userID}) => {
    const chartRef = useRef(null);
    const [exerciseHistory, setExerciseHistory] = useState({});

    //get exercise history only when there is a change in userID
    useEffect (()=>{
        getExerciseHistory(setExerciseHistory,userID);
    }, [userID]);

    //create bar chart once there is a change in exerciseHistory
    useEffect(() => {
        // Prepare the data for the chart
        if (!Object.keys(exerciseHistory).length) return;//if there is no exerciseHistory
        const muscleGroups = Object.keys(exerciseHistory);
        const weeks = Object.keys(exerciseHistory[muscleGroups[0]]);
    
        const chartData = {
          labels: muscleGroups, // Week labels (e.g., "wk1", "wk2", "wk3", "wk4")
          datasets: weeks.map(week => (
                {
                    label: week,
                    data: muscleGroups.map(muscleGroup=> exerciseHistory[muscleGroup][week]), // Get workout counts for each week
                }
            )),
        };
    
        // Create the bar chart
        const ctx = chartRef.current.getContext('2d'); // Get the canvas context
        const chart = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            plugins: {
                legend: {
                    labels: {
                        color: "white" //color for labels
                    }
                },
             },
            scales: {
                x: {
                    grid: {
                        color: "white" //color for grid lines in X-axis
                    },
                    ticks: {
                        color: "white" //color for values on X-axis
                    }
                },
                y: {
                    grid: {
                        color: "white" //color for grid lines in Y-axis
                    },
                    ticks: {
                        color: "white", //color for values on Y-axis
                        precision: 1
                    }
                },
            },
        },
        });

        //change the opacity of the bars
        if (chart) {
            chart.data.datasets.forEach((dataset) => {
                // Get current background color of dataset and apply 50% opacity
                const currentBackgroundColor = dataset.backgroundColor; //current colors
                const rgba = currentBackgroundColor.replace(/[^,]+(?=\))/, '1'); // Change the opacity value to 1
                dataset.backgroundColor = rgba;
            });

            // Update the chart to apply changes
            chart.update();
        }

         //remove chart before update
        return () => {
          chart.destroy();
        };
      }, [exerciseHistory]);
    
      return (
        <div id='chart-home'>
            <canvas ref={chartRef} />
        </div>); 
};

function Home(){
    const location = useLocation();

    //get userID and username passed after login or signup
    const {userID, username} = location.state || {};

    //default values
    const [deload,setActive] = useState(false);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    //get deload status once there is a change in userID, i.e. on startup of page
    useEffect(()=>{
        getDeload(userID,setActive,setStart,setEnd,setDisabled);
    }, [userID]);

    return (
        <>
            <nav id='menu'>
                <ul className="menu_1">
                    <li>
                        <Link to="/workouts" state={{userID: userID, username: username, deload: deload}} className='menu-link' tabIndex={3}>
                            <i className="fa-solid fa-dumbbell"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" state={{userID: userID, username: username, deload: deload}} className='menu-link' tabIndex={2}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                </ul>
                <ul className="menu_2">
                    <li>
                        <Link to="/home" state={{userID: userID, username: username, deload: deload}} className='menu-link active' tabIndex={1}>
                            <i className="fa-solid fa-house"></i>
                        </Link>
                    </li>
                    <li style={{float: "right"}}>
                        <Link to="/" className='menu-link' tabIndex={4}>
                            Log out
                        </Link>
                    </li>
                </ul>
            </nav>
            <h1 id='welcome-home'>Welcome {username}!</h1>
            <div className='deload-home'>
                <fieldset id='deload-home'>
                    <legend>Deload</legend>
                    <div>
                        <label id='label-home'>Status: </label>
                        {/* display ACTIVE if true, else INACTIVE */}
                        <label><u>{deload? 'ACTIVE': 'INACTIVE'}</u></label>
                    </div>
                    <div>
                        <label id='label-home' htmlFor='startDate-home'>Start Date: </label>
                        <input type='date' id='startDate-home' value={start} disabled={disabled} onChange={(e) => setStart(e.target.value)}/>
                    </div>
                    <div>
                        <label id='label-home' htmlFor='endDate-home'>End Date: </label>
                        <input type='date' id='endDate-home' value={end} disabled={disabled} onChange={(e) => setEnd(e.target.value)}/>
                    </div>
                    <div id='btn-home'>
                        <button id='setDeload-home' disabled={deload} onClick={(e) => updateDeload(e, userID, start, end, navigate)}>Activate</button>
                    </div>
                    
                </fieldset>
            </div>
            <div className='measurementchart-home'>
                <fieldset id='measurementchart-home'>
                    <legend>Measurements</legend>
                    <div className='chart-home'>
                        <MeasurementChart userID={userID}/>
                    </div>
                </fieldset>
            </div>
            <div className='measurementchart-home'>
                <fieldset id='measurementchart-home'>
                    <legend>Muscle Load</legend>
                    <div className='chart-home'>
                        <ExerciseHistoryChart userID={userID}/>
                    </div>
                </fieldset>
            </div>
        </>
    );
}

export default Home;