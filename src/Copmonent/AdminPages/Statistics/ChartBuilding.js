import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { CheckStatusOfAllFloorPeriod } from "../../../service/AdminStatistics";
import DatePicker from "react-datepicker";

const StatusBuilding = () => {
    const [data, setData] = useState([])
    // const [floor, setFloor]=useState(1)
    const [barData, setBarData] = useState({
        labels: ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4', 'Floor 5', 'Floor 6', 'Floor 7'],
        datasets: [
            {
                label: "Status Build By floor",
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderWidth: 3
            }
        ]
    });
    // set options
    const barOptions = {
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'Status Building By Floor',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    const [colors, setColors] = useState([])
    const statusBuilding = () => {

        let item = []
        let color = []
        CheckStatusOfAllFloorPeriod(startDate, endDate).then(response => {
            console.log(response.data)
            response.data.map((i, index) => {
                item.push(i.totalBooking)
                if (i.totalBooking < 30) {
                    color[index] = 'rgba(75, 192, 192, 0.6)';
                } else if (i.totalBooking > 30 || i.totalBooking < 70) {
                    color[index] = 'rgba(255, 206, 86, 0.6)';
                } else {
                    color[index] = 'rgba(255, 99, 132, 0.6)';
                }
            })
            setData(item)
            setColors(color)
        })

        setBarData({
            ...barData,
            datasets: [
                {
                    label: 'Status Building By Floor',
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 3
                }
            ]

        })

    }

    const today = new Date();
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    useEffect(() => {
        statusBuilding();
    }, [startDate, endDate]);
    // today and maxDate to show in calendar


    return (


        <div className="container ">

            <h2> Status Building </h2>
            <p className="text"> Choose a date to show status</p>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 labelsDate">
                        <label style={{ fontSize: "20px" }} className="mr-3 labelsDate m-0">From </label>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            startDate={startDate}
                            clearAriaLabel="From"
                            className="btn btn-info Calendar1 float-left"
                        />
                    </div>
                    <div className="col-md-6">
                        <label style={{ fontSize: "20px" }} className="mr-3 labelsDate m-0">To </label>
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            startDate={startDate}

                            className="btn btn-info Calendar1 float-left"
                        />

                    </div>
                </div>
            </div>
            <Bar
                data={barData}
                options={barOptions.options} />
        </div>
    )

}

export default StatusBuilding;