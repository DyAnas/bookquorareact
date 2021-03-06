import React, { useEffect, useState } from 'react';
import { DeleteBookings, getAllBookingOfEmployeeInAPeriodEmployee } from "../../service/BookingService/bookingService";
import AuthService from '../../service/Authentication/authUser';
import MaterialTable from "material-table";
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessMessage from "../Message/SuccessMessage";
import ErrorMessage from "../Message/ErrorMessage";

export default function MyBookings(props) {
    const history = useHistory();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const today = new Date();
    const email = AuthService.getCurrentUser().email;
    const [ListBooking, setListBooking] = useState([]);


    const getAllBooking = () => {
        getAllBookingOfEmployeeInAPeriodEmployee(email, today, maxDate).then(
            response => {
                setListBooking(response.data.bookingToShowDtoLists);
            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (error.response.status === 401) {
                    localStorage.clear()
                    history.push("/");
                    ErrorMessage("You have been inactive for a while. For your security, please sign in again")


                } else {
                    ErrorMessage(resMessage)

                }
            })
    }
    const removeBooking = (item) => {

        DeleteBookings(item.bookingId).then(
            response => {
                SuccessMessage(response.data.message)

                getAllBooking();
            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (error.response.status === 401) {
                    localStorage.clear()
                    history.push("/");
                    ErrorMessage("You have been inactive for a while. For your security, please sign in again")

                } else {
                    ErrorMessage(resMessage)

                }
            })
    }

    useEffect(() => {
        getAllBooking();
    }, []);

    // remove one booking
    const columns =
        [
            { title: "Booking Id", field: "bookingId" },
            { title: "Date", field: "date", },
            { title: "Floor", field: "floor" },
            { title: "Zone", field: "zoneName", },
        ]

    return (
        <div>
            <ToastContainer
                position="top-center" />

            <MaterialTable
            matSortDisableClear="false"
                title="Your booking "
                columns={columns}
                id="tableBooking"
                data={ListBooking}
                options={{
                    headerStyle: {
                        backgroundColor: '#008891',
                        color: '#FFF',
                    },
                    actionsColumnIndex: -1 

                }}
                actions={[
                    rowData => ({
                        icon: 'delete',
                        tooltip: 'Delete Booking',
                        onClick: (event, rowData) => removeBooking(rowData),

                    })
                ]}
            />
        </div>
    );
}

