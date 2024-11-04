import { useEffect, useState } from "react";
import axios from "axios";
import {Badge, Button, Dialog, DialogActions, FormControl, Grid2, InputLabel, MenuItem, Select} from "@mui/material";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import {Form, Formik} from "formik";
import TextField from "@mui/material/TextField";
function Booking() {

    const [response, setResponse] = useState(null);
    const [companyDetails, setCompanyDetails] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUmbrella, setSelectedUmbrella] = useState(null);

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
                setDialogOpen(false)
            }).catch(error => {
                console.error('There was an error!', error);

            })
        }
    }, [selectedBooking]);
    const handleChange = (event) => {
        console.log(event);
        setSelectedBooking(event.target.value);
    };

    function handleClick(row, number,realNumber) {
        setDialogOpen(true)
        setSelectedUmbrella({
            row:row,
            number:number,
            realNumber:realNumber
        })
        console.log(selectedUmbrella)
    }

    function handleSubmit(values) {
        axios.post('http://localhost:8080/book',values)
            .then(res => {
                console.log('Success:', res.data);
                setDialogOpen(false)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    return (
        <div style={{width: '100%', padding: '20px'}}>
            <FormControl style={{minWidth: 120}}>
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
            <div style={{width: '100%', padding: '20px'}}></div>
            {selectedBooking && companyDetails && companyDetails.availableUmbrellas && (
                Object.entries(companyDetails.availableUmbrellas).map(([key, values]) => (
                    <div key={key} style={{marginBottom: '16px'}}>
                        <Grid2 container spacing={2}>
                            {values.map((value) => (
                                <Grid2 item xs={4} key={`${key}-${value}`} className={`p-1`}>
                                    <Button
                                        color="white"
                                        onClick={() => handleClick(key,value, (parseInt(companyDetails.umbrellasPerRow) * (parseInt(key) - 1) + value))}>
                                        <Badge
                                            color="success"
                                            max={999}
                                            badgeContent={(parseInt(companyDetails.umbrellasPerRow) * (parseInt(key) - 1) + value)}>
                                            <BeachAccessIcon className={`w-full p-0`} fontSize="large">

                                            </BeachAccessIcon >
                                        </Badge>
                                    </Button>
                                </Grid2>
                            ))}
                        </Grid2>
                    </div>
                ))
            )}
            <Dialog open={dialogOpen}>
                <Formik
                    initialValues={{ lido: selectedBooking ? response.list.filter(companyDetails => companyDetails.id === selectedBooking)[0].companyName : "",
                        email: "",
                        row: selectedUmbrella != null ? selectedUmbrella.row : "",
                        realNumber: selectedUmbrella ? selectedUmbrella.realNumber : "",
                        number: selectedUmbrella ? selectedUmbrella.number : "",
                        companyId: selectedBooking? selectedBooking : ""
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className="p-2">
                                <TextField
                                    name="lido"
                                    value={selectedBooking ? response.list.filter(companyDetails => companyDetails.id === selectedBooking)[0].companyName : ""}
                                    disabled={true}
                                />
                            </div>
                            <div className="p-2">
                                <TextField
                                    className={`p-2`}
                                    name="email"// Utilizza Field di Formik per il controllo di stato
                                    onChange={(e) => setFieldValue("email", e.target.value)}
                                />
                            </div>
                            <div className="p-2">
                                <TextField
                                    name="row"
                                    disabled={true}
                                    value={selectedUmbrella != null ? selectedUmbrella.row : ""}
                                    onChange={() => setFieldValue("row", selectedUmbrella?.row || "")}
                                />
                            </div>
                            <div className="p-2">
                                <TextField
                                    name="number"
                                    disabled={true}
                                    value={selectedUmbrella ? selectedUmbrella.number : ""}
                                    onChange={() => setFieldValue("number", selectedUmbrella?.number || "")}
                                />
                            </div>
                            <div className="p-2">
                                <TextField
                                    name="realNumber"
                                    disabled={true}
                                    value={selectedUmbrella ? selectedUmbrella.realNumber : ""}
                                    onChange={() => setFieldValue("realNumber", selectedUmbrella?.realNumber || "")}
                                />
                            </div>
                                <DialogActions>
                                    <Button onClick={() => setDialogOpen(false)}>
                                        Chiudi
                                    </Button>
                                    <Button type="submit">
                                        Invia
                                    </Button>
                                </DialogActions>
                        </Form>
                        )}
                </Formik>
            </Dialog>
        </div>
    );
}




export default Booking;

