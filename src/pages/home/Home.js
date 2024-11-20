import React, { useRef, useEffect, useState } from 'react';
import './Home.css';
import {getMeasurements} from '../../API/measurementAPI';
import{getExerciseHistory} from '../../API/exerciseAPI';
import { getDeload, addDeloadPeriod } from '../../API/deloadAPI';
import { logout } from '../../Protect';
import { Link, useNavigate } from 'react-router-dom';
import { Chart } from 'chart.js/auto';

const updateDeload = async (event, userID, token, start, end, navigate) => {
    event.preventDefault();
    const data = {
        user_id: userID,
        start_date: start,
        end_date: end
    };
    addDeloadPeriod(data,token,navigate);
}

const MeasurementChart = ({ userID, token}) => {
    const chartRef = useRef([null, null, null]);
    const [measurementData, setMeasurementData] = useState([]);
    const [currentChartIndex, setCurrentChartIndex] = useState(0);

    //get all measurements once there is a change in userID, in this case during login
    useEffect(() => {
        getMeasurements(setMeasurementData, userID, token);
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
                    // responsive: false,
                    // maintainAspectRatio: true,
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

    useEffect(() => {
        const rotationInterval = setInterval(() => {
          setCurrentChartIndex(prevIndex => (prevIndex + 1) % 3); // Cycle through 0, 1, 2
        }, 5000); // Change chart every 5 seconds
    
        return () => clearInterval(rotationInterval); // Cleanup interval on component unmount
    }, []);

      const handleChartClick = () => {
        setCurrentChartIndex(prevIndex => (prevIndex + 1) % 3); // Cycle through 0, 1, 2 on click
      };

    return (
        <>
            <div id="chart-home" onClick={handleChartClick}>
                <canvas ref={el => (chartRef.current[0] = el)} className="measurementChart" style={{ display: currentChartIndex === 0 ? "block" : "none" }} />
                <canvas ref={el => (chartRef.current[1] = el)} className="measurementChart" style={{ display: currentChartIndex === 1 ? "block" : "none" }} />
                <canvas ref={el => (chartRef.current[2] = el)} className="measurementChart" style={{ display: currentChartIndex === 2 ? "block" : "none" }} />    
            </div>
        </>
    );
};

const ExerciseHistoryChart = ({ userID, token}) => {
    const chartRef = useRef(null);
    const [exerciseHistory, setExerciseHistory] = useState({});

    //get exercise history only when there is a change in userID
    useEffect(() => {
        getExerciseHistory(setExerciseHistory, userID, token);
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
                    data: muscleGroups.map(muscleGroup => exerciseHistory[muscleGroup][week]), // Get workout counts for each week
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
                const rgba = currentBackgroundColor.replace(/[^,]+(?=\))/, '1'); // Change the only opacity value to 1
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

function Home() {
    //get userID, username and token
    const userID = localStorage.getItem('userID');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    //default values
    localStorage.setItem('deload', false);//set default deload status in localstorage
    const [deload, setActive] = useState(false);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    //get deload status once there is a change in userID, i.e. on startup of page
    useEffect(() => {
        getDeload(userID, token, setActive, setStart, setEnd, setDisabled);
    }, [userID]);

    return (
        <>
            <div id='menu'>
                <ul className="menu_1">
                    <li>
                        <Link to="/workouts" className='menu-link' tabIndex={3}>
                            <i className="fa-solid fa-dumbbell"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className='menu-link' tabIndex={2}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                </ul>
                <ul className="menu_2">
                    <li>
                        <Link to="/home" className='menu-link active' tabIndex={1}>
                            <i className="fa-solid fa-house"></i>
                        </Link>
                    </li>
                    <li style={{ float: "right" }}>
                        <Link to="/" className='menu-link' tabIndex={4} onClick={(e) => logout(e)}>
                            Log out
                        </Link>
                    </li>
                </ul>
            </div>
            <h1 id='welcome-home'>Welcome {username}!</h1>
            <div className='deload-home'>
                <fieldset id='deload-home'>
                    <legend>Deload</legend>
                    <div>
                        <label id='label-home'>Status: </label>
                        {/* display ACTIVE if true, else INACTIVE */}
                        <label><u>{deload ? 'ACTIVE' : 'INACTIVE'}</u></label>
                    </div>
                    <div>
                        <label id='label-home' htmlFor='startDate-home'>Start Date: </label>
                        <input type='date' id='startDate-home' value={start} disabled={disabled} onChange={(e) => setStart(e.target.value)} />
                    </div>
                    <div>
                        <label id='label-home' htmlFor='endDate-home'>End Date: </label>
                        <input type='date' id='endDate-home' value={end} disabled={disabled} onChange={(e) => setEnd(e.target.value)} />
                    </div>
                    <div id='btn-home'>
                        <button id='setDeload-home' disabled={deload} onClick={(e) => updateDeload(e, userID, token,start, end, navigate)}>Activate</button>
                    </div>

                </fieldset>
            </div>
            <div className='charts-home'>
                <div className='measurementchart-home'>
                    <fieldset id='measurementchart-home'>
                        <legend>Measurements</legend>
                        <div className='chart-home'>
                            <MeasurementChart userID={userID} token={token}/>
                        </div>
                    </fieldset>
                </div>
                <div className='musclechart-home'>
                    <fieldset id='musclechart-home'>
                        <legend>Muscle Load</legend>
                        <div className='chart-home'>
                            <ExerciseHistoryChart userID={userID} token ={token}/>
                        </div>
                    </fieldset>
                </div>
            </div>
            
        </>
    );
}

export default Home;