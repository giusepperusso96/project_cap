import { useEffect, useState } from "react";
import axios from "axios";
import {Badge, FormControl, Grid2, InputLabel, MenuItem, Select} from "@mui/material";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

function Booking() {
    const [response, setResponse] = useState(null);
    const [companyDetails, setCompanyDetails] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/companies/all')
            .then(res => {
                console.log('Success:', res.data);
                setResponse(res.data); // Imposta i dati della risposta direttamente su response
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    useEffect(() => {
        if(selectedBooking){
            console.log(selectedBooking);
            axios.get(`http://localhost:8080/companies/?id=${selectedBooking}`).then(res => {
                setCompanyDetails(res.data);
            }).catch(error => {
                console.error('There was an error!', error);
            })
        }
    }, [selectedBooking]);
    const handleChange = (event) => {
        console.log(event);
        setSelectedBooking(event.target.value);
    };

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="select_lido-label">Lido</InputLabel>
                <Select
                    labelId="select_lido-label"
                    id="select_lido"
                    label="Lido"
                    value={selectedBooking}
                    onChange={handleChange}
                    variant="outlined"
                >
                    {response && response.list && response.list.map((booking) => (
                        <MenuItem key={booking.id} value={booking.id}>
                            {booking.companyName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedBooking && companyDetails && companyDetails.availableUmbrellas && (
                Object.entries(companyDetails.availableUmbrellas).map(([key, values]) => (
                    <div key={key} style={{ marginBottom: '16px' }}>
                        <Grid2 container spacing={2}>
                            {values.map((value) => (
                                <Grid2 item xs={1} key={`${key}-${value}`}>
                                    <Badge
                                        max={999}
                                        color="secondary"
                                        badgeContent={(parseInt(companyDetails.umbrellasPerRow) * (parseInt(key)-1) + value)}>
                                        <BeachAccessIcon>

                                        </BeachAccessIcon>
                                    </Badge>

                                </Grid2>
                            ))}
                        </Grid2>
                    </div>
                ))
            )}
        </>
    );
}

export default Booking;