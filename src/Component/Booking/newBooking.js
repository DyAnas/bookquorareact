import React, { useEffect, useState } from "react";
import ImageMapper from "react-image-mapper";
import URL from '../../assets/map.jpg'
import BookDialog from "./ConfirmBooking";
import "../../Styles/mapStyle.css";
import { BookPlass, CheckStatusOfAllZones, getZoneList } from "../../service/BookingService/mapService";
import AuthService from '../../service/Authentication/authUser';
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Doughnut } from 'react-chartjs-2';
import en from "date-fns/locale/en-GB";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import successMessage from "../Message/SuccessMessage";
import errorMessage from "../Message/ErrorMessage";
import DatePickerCustomInput from "../../Module/DatePickerCustomInput";

const MapComponent = (props) => {

    const areas = [
        {
            id: 1,
            status: 0,
            style: "span1",
            zone: "Zone A",
            shape: "poly",
            coords: [235, 137, 235, 152, 216, 152, 212, 181, 221, 183, 217, 213, 284, 224, 295, 147],
            preFillColor: "#02f3af",
            fillColor: "#8bcdcd"
        },
        {
            id: 2,
            status: 0,
            style: "span2",
            zone: "Zone B",
            shape: "poly",
            coords: [86, 157, 88, 174, 82, 176, 84, 199, 98, 196, 102, 214, 190, 201, 180, 139],
            preFillColor: "#02f3af",
            fillColor: "#8bcdcd"
        },
        {
            id: 3,
            status: 0,
            style: "span3",
            zone: "Zone C",
            shape: "poly",
            coords: [11, 174, 42, 171, 63, 151, 59, 263, 6, 267],
            preFillColor: "#02f3af",
            fillColor: "#8bcdcd"
        },
        {
            id: 4,
            status: 0,
            zone: "Zone D",
            style: "span4",
            shape: "poly",
            coords: [11, 8, 64, 3, 65, 50, 62, 104, 14, 104],
            preFillColor: "#02f3af",
            fillColor: "#8bcdcd"
        },

        {
            id: 5,
            status: 0,
            zone: "Zone E",
            style: "span5",
            shape: "poly",
            coords: [67, 41, 64, 102, 152, 100, 156, 38],
            preFillColor: "#02f3af",
            fillColor: "#8bcdcd"
        },
        {
            id: 6,
            status: 0,
            zone: "Zone F",
            style: "span6",
            shape: "poly",
            coords: [157, 39, 154, 100, 250, 98, 250, 91, 264, 91, 291, 35],
            preFillColor: "#02f3af",
            fillColor: "#8bcdcd"
        },
        {
            id: 7,
            status: 0,
            zone: "Zone G",
            style: "span7",
            shape: "poly",
            coords: [15, 105, 63, 104, 63, 151, 41, 170, 11, 172],
            preFillColor: "#02f3af",
            fillColor: "#8bcdcd"
        },

    ];
    const [query, setQuery] = useState(2);
    // handle calender
    // today and maxDate to show in calendar
    const today = new Date();
    const [startDate, setStartDate] = useState(today);
    const date = startDate.getDate() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getFullYear();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const [barData, setBarData] = useState({});
    const [floor, setFloor] = useState(5)
    //  handle dialog
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);
    // handle zone
    const [ZoneID, setZoneID] = useState();
    const [Zone, setZone] = useState();
    const [mapAreas, setMapAreas] = useState({
        name: "choose a floor",
        areas: []
    });


    // method to get all active zones
    const getActiveZone = (floor) => {
        let items = [];
        let areasToShow;
        setFloor(floor)
        getZoneList(floor).then(
            response => {
                response.data.zoneDTOList.map((i, index) => {
                    areas[index].id = i.id
                    if (i.activated === true) {
                        return items.push(index);

                    }
                    return null;
                })
                areasToShow = items.map(item => {
                    return areas[item]
                })
                setMapAreas({
                    name: floor.toString(),
                    areas: areasToShow
                })
            })

    }

    // method to get all statistics of zones
    const getStatusOfAllZones = (floorId, date) => {
        let items = [];

        CheckStatusOfAllZones(floorId, date).then(
            response => {

                response.data.map((i, index) => {

                    // to change color of zone depend to percentage of booking
                    areas[index].status = i.bookedPercentage;
                    if (i.bookedPercentage < 40) {
                        areas[index].preFillColor = '#5aec90'

                    } else if (i.bookedPercentage >= 40 && i.bookedPercentage < 70) {
                        areas[index].preFillColor = '#ffff90';

                    } else {
                        areas[index].preFillColor = '#f36a96';

                    }
                    return items.push(i.totalReservation);
                })

                setBarData({
                    labels: ["Zone A", "Zon B", "Zone C", "Zone D", "Zone E", "Zone F", "Zone G"],
                    datasets: [
                        {
                            label: "Status Floor" + floorId + "By Zone",
                            data: items,
                            backgroundColor: [
                                '#0247fe',
                                '#6363ff',
                                '#8d81ff',
                                '#ae9fff',
                                '#cbbeff',
                                '#e6deff'
                            ],
                            borderWidth: 3
                        }
                    ]
                })

            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (error.response.status === 401) {
                    localStorage.clear()
                    props.history.push("/");
                    errorMessage("You have been inactive for a while. For your security, please sign in again")


                } else {
                    errorMessage(resMessage)

                }
            })

    }



    // floor handle
    const handleClickFloor = (floor) => {

        getStatusOfAllZones(floor, startDate)
        getActiveZone(floor);
        setFloor(floor);

    }
    // to update map areas when floor is clicked and date is changed
    useEffect(() => {
        setQuery(Math.random());

    }, [mapAreas, startDate,]);


    useEffect(() => {
        getStatusOfAllZones(floor, startDate)
        getActiveZone(floor);
    }, [floor, startDate]);


    // handle onclick zone
    const enterArea = (area) => {
        setZoneID(area.id);
        setZone(area.zone)
        handleShow();

    }

    const showDialog = () => {
        setTimeout(() => {
            setShow(false)
            props.history.push("/myBookings");
        }, 3000);
        setLoading(true);
        setShow(true);
    }

    // confirm booking
    const currentUser = AuthService.getCurrentUser();
    const confirmBooking = () => {
        BookPlass(startDate, currentUser.id, ZoneID).then(
            response => {
                successMessage(response.data.message)
                showDialog();

            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (error.response.status === 401) {
                    localStorage.clear()
                    props.history.push("/");

                    errorMessage("You have been inactive for a while. For your security, please sign in again")


                } else if (error.response.status === 400) {
                    errorMessage(resMessage);


                    setShow(false);

                } else {
                    errorMessage(resMessage)

                }
            })
    }

    const styleId = (id) => {
        let style = "";

        if (id === (floor - 1)) {
            style = "buttonActive mt-1 ml-1 mr-1"
        } else {
            style = "btn btn-light  mt-1 ml-1 mr-1";
        }
        return style;
    }


    return (
        <div className="container container-sm pl-0 pb-4 pr-0 pt-3" >
            <h2 className="title text-center mb-lg-5">New booking</h2>

            <div className="row mr-0 ml-0">
                <div className="col-md-4  m-auto  p-md-0">
                    <p className="justify-text mb-0" id="dpLable">Date:  </p>
                    <DatePicker
                        id="dates"
                        dateFormat="dd-MM-yyyy"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        startDate={startDate}
                        minDate={today}
                        maxDate={maxDate}
                        className=" datapicker btn-sm Calendar1 float-left "
                        locale={en}
                        showWeekNumbers
                        customInput={<DatePickerCustomInput />}
                    />
                    <div className="col d-sm-inline-block mb-4 mt-3 pl-0">
                        <h5><stong>Floors:</stong></h5>
                        <div className="btn-group">
                            {[...Array(7)].map((x, i) =>
                                <button className={styleId(i)} id={"btn" + i} key={i}
                                    onClick={() => handleClickFloor(i + 1)}>{i + 1}</button>
                            )}
                        </div>
                    </div>

                    <div className="col d-sm-inline-block  pl-0">
                        <div className="images">
                            <ImageMapper
                                src={`${URL}?${query}`}
                                map={mapAreas}
                                width={300}
                                onClick={enterArea}
                            />

                            {mapAreas.areas.map((x, i) =>

                                <span className={mapAreas.areas[i].style} key={i}> {mapAreas.areas[i].zone}
                                    <br />
                                    {mapAreas.areas[i].status}%
                                 </span>
                            )}
                        </div>
                        <p className="justify-text text-center mt-4 mr-lg-5" style={{ fontWeight: "bold", color: "#385844" }}
                            id="mapParagraph">Floor {floor} availability overview</p>
                        <BookDialog
                            show={show}
                            onHide={handleClose}
                            name={floor}
                            Zone={Zone}
                            ConfirmBooking={confirmBooking}
                            dates={date}
                            loading={loading}

                        />
                    </div>

                </div>

                <div className="col-md-6 d-none d-lg-block mb-0 text-center mt-3">

                    <Doughnut
                        data={barData}
                        width={60}
                        height={50}
                        id="doughnut"
                    />
                    <p className="justify-text text-center mt-3" style={{ fontWeight: "bold", color: "#385844" }}
                        id="mapParagraph">Number of bookings per zone in Floor {floor}</p>

                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={8000} />
        </div>

    );
}
export default withRouter(MapComponent);
