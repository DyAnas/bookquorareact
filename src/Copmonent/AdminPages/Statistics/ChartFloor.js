import React, {useCallback, useEffect, useState} from "react";
import {Bar} from 'react-chartjs-2';
import {CheckStatusOfAllZones} from "../../../service/BookingService/mapService";
import DatePicker from "react-datepicker";
import en from "date-fns/locale/en-GB";


const StatusFloor = () => {
    const [floor, setFloor] = useState(1)
    const [barData, setBarData] = useState({
        labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E', 'Zone F', 'Zone G'],
        datasets: [
            {
                label: "Percentage Status Floor" + floor + "By Zone",
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
    const today = new Date();
    const [startDate, setStartDate] = useState(today);

    // set options
    const [barOptions, setBarOptions] = useState({
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
                text: 'Percentage Status Floor ' + 1 + ' By Zone',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    });
    const getStatus= (response)=> {
        let item = []
        let color = []
            response.data.map((i, index) => {
                if (i.bookedPercentage < 30) {
                    color[index] = 'rgba(75, 192, 192, 0.6)';
                } else if (i.bookedPercentage > 30 || i.bookedPercentage < 70) {
                    color[index] = 'rgba(255, 206, 86, 0.6)';
                } else {
                    color[index] = 'rgba(255, 99, 132, 0.6)';
                }
                return  item.push(i.bookedPercentage);
            })


        setBarOptions({
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                max: 100,
                                beginAtZero: true
                            }
                        }
                    ]
                },
                title: {
                    display: true,
                    text: 'Percentage Status Floor ' + floor + ' By Zone',
                    fontSize: 25
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        })

        setBarData({
            ...barData,
            datasets: [
                {
                    label: " Percentage Status Floor " + floor + " By Zone",
                    data: item,
                    backgroundColor: color,
                    borderWidth: 3
                }
            ]
        })

}
    const fetchBooking= useCallback(() => {
        CheckStatusOfAllZones(floor, startDate).then(getStatus)
    }, [startDate, floor,])
    useEffect(() => {
        fetchBooking()
    }, [fetchBooking])

    // today and maxDate to show in calendar


    return (


        <div className=" ">
            <h2  className="  title"> Status Floor </h2>
            <p className="text"> Choose a date and floor to show status</p>
            <div className="row ">
                <div className="col-md-6 labelsDate">
                    <h2 style={{fontSize: "20px"}} className="mr-3 labelsDate m-0">From </h2>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        startDate={startDate}
                        clearAriaLabel="From"
                        locale={en}
                        showWeekNumbers
                        className="btn btn-info Calendar1 float-left"
                    />
                </div>

                <div className="col-sm ml-2">
                    <h2 style={{fontSize: "20px"}} className="mr-3 labelsDate m-0">Floor </h2>
                    <div className="dropdown labelsDate">
                        <button className="btn btn-info dropdown-toggle btn-sm" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            floor: {floor}
                        </button>
                        <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                            {[...Array(7)].map((x, i) =>
                                <a className="dropdown-item" href="#" key={i}
                                    onClick={() => setFloor(i + 1)} >{i + 1}</a>
                            )}


                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className=" ">
                    <Bar
                        data={barData}
                        options={barOptions.options}
                        width={100}
                        height={85}/>
                </div>

            </div>

        </div>
    )

}

export default StatusFloor;