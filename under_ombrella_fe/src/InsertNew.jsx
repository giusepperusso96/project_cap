import * as Yup from "yup";
import axios from "axios";
import logo from "./assets/335c130b-0727-417a-92a5-73e7d83e8efd.jpg";
import {ErrorMessage, Form, Formik} from "formik";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import RangePrice from "./components/RangePrice";

const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('Il nome dell\'azienda è obbligatorio'),
    location: Yup.string().required('La posizione è obbligatoria'),
    rowsNumber: Yup.number().required('Il numero di righe è obbligatorio').min(1, 'Deve essere maggiore di zero'),
    umbrellasPerRow: Yup.number().required('Il numero di ombrelloni per riga è obbligatorio').min(1, 'Deve essere maggiore di zero'),
    defaultPrice: Yup.number().required('Il prezzo è obbligatorio').min(1, 'Deve essere maggiore di zero'),
    geoPosition: Yup.string().required('La posizione geografica è obbligatoria'),
});



function callApi(payload) {
    axios.post('http://localhost:8080/companies', payload)
        .then(response => {
            console.log('Success:', response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}

function InsertNew() {


    return (
        <>
            <div className="flex items-center justify-center">
                <img src={logo} alt="logo" className="w-80 h-auto" />
            </div>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    companyName: '',
                    location: '',
                    rowsNumber: 0, // Inizializza a 0
                    umbrellasPerRow: 0, // Inizializza a 0
                    defaultPrice: 0, // Inizializza a 0
                    geoPosition: '',
                    prices: []
                }}
                onSubmit={(values) => {
                    callApi(values);  // Invia i dati al backend
                }}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                    <div className="flex items-center justify-center">
                        <Form>
                            <div className='p-1'>
                                <TextField
                                    label="Nome Azienda"
                                    name="companyName"
                                    value={values.companyName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.companyName && touched.companyName ? 'input-error' : ''}
                                />
                                <ErrorMessage name="companyName" component="div" className="error-message"/>
                            </div>

                            <div className='p-1'>
                                <TextField
                                    label="Indirizzo"
                                    name="location"
                                    value={values.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.location && touched.location ? 'input-error' : ''}
                                />
                                <ErrorMessage name="location" component="div" className="error-message"/>
                            </div>

                            <div className='p-1'>
                                <TextField
                                    label="Numero di file di ombrelloni"
                                    name="rowsNumber"
                                    type="number"
                                    value={values.rows}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.rowsNumber && touched.rowsNumber ? 'input-error' : ''}
                                />
                                <ErrorMessage name="rowsNumber" component="div" className="error-message"/>
                            </div>

                            <div className='p-1'>
                                <TextField
                                    label="N. Ombrelloni per fila"
                                    name="umbrellasPerRow"
                                    type="number"
                                    value={values.umbrellasperrow}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.umbrellasPerRow && touched.umbrellasPerRow ? 'input-error' : ''}
                                />
                                <ErrorMessage name="umbrellasPerRow" component="div" className="error-message"/>
                            </div>

                            <div className='p-1'>
                                <TextField
                                    label="Prezzo default"
                                    name="defaultPrice"
                                    type="number"
                                    value={values.defaultPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.defaultPrice && touched.defaultPrice ? 'input-error' : ''}
                                />
                                <ErrorMessage name="defaultPrice" component="div" className="error-message"/>
                            </div>

                            <div className='p-1'>
                                <TextField
                                    label="Coordinate"
                                    name="geoPosition"
                                    value={values.geoPosition}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.geoPosition && touched.geoPosition ? 'input-error' : ''}
                                />
                                <ErrorMessage name="geoPosition" component="div" className="error-message"/>
                            </div>


                            <RangePrice
                                values={values} setFieldValue={setFieldValue}
                            />

                            <Button type="submit">Invia</Button>
                        </Form>
                    </div>

                )}
            </Formik>
        </>
    );
}

export default InsertNew;