import {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardContent, FormControl, Grid2, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {Formik} from "formik";

function SearchBookings(props) {
    const [email, setEmail] = useState("");
    const[emails,setEmails] = useState([]);
    const[bookings,setBookings] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/book?email=${email}`)
            .then(res => {
                setBookings(res.data);
                console.log('Success:', res.data); // Imposta i dati della risposta direttamente su response
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [email]);
    useEffect(() => {
        axios.get('http://localhost:8080/book/emails')
            .then(res => {
                console.log('Success:', res.data);
                setEmails(res.data); // Imposta i dati della risposta direttamente su response
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    return (
        <>


            <FormControl style={{minWidth: 120}}>
                <InputLabel id="email_label">Email</InputLabel>
                <Select
                    labelId="email"
                    id="email"
                    label="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                >
                    {emails && emails.map((item) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid2 container spacing={2}>
                {bookings.map((booking) => (
                    <Grid2 item xs key={booking.id}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    {booking.date}
                                </Typography>
                            <div>Lido: {booking.company.companyName}</div>
                            <div>Numero ombrellone : {booking.realNumber}</div>
                            <div>Fila n. {booking.row}</div>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>

        </>
    )
}
export default SearchBookings;