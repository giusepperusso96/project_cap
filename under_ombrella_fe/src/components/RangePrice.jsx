import {Button, Grid2} from "@mui/material";
import TextField from "@mui/material/TextField";

function RangePrice({ values, setFieldValue }) {
    const addPriceRange = () => {
        setFieldValue('prices', [...values.prices, { rowFrom: 0, rowTo: 0, price: 0 }]);
    };
    return (

        <div className='p-1'>
            {values.prices.map((range, index) => (
                <div key={index} className='p-1'>
                    <Grid2 container spacing={2}>
                        <Grid2 item xs>
                            <TextField
                                label={`Da Riga`}
                                name={`prices[${index}].rowFrom`}
                                type="number"
                                value={range.rowFrom}
                                onChange={(e) => {
                                    const newPrices = [...values.prices];
                                    newPrices[index].rowFrom = Number(e.target.value);
                                    setFieldValue('prices', newPrices); // Aggiorna i valori di Formik
                                }}
                            />
                        </Grid2>
                        <Grid2 item xs>
                            <TextField
                                label={`A Riga`}
                                name={`prices[${index}].rowTo`}
                                type="number"
                                value={range.rowTo}
                                onChange={(e) => {
                                    const newPrices = [...values.prices];
                                    newPrices[index].rowTo = Number(e.target.value);
                                    setFieldValue('prices', newPrices);
                                }}
                            />

                        </Grid2>
                        <Grid2 item xs>
                            <TextField
                                label={`Prezzo`}
                                name={`prices[${index}].price`}
                                type="number"
                                value={range.price}
                                onChange={(e) => {
                                    const newPrices = [...values.prices];
                                    newPrices[index].price = Number(e.target.value);
                                    setFieldValue('prices', newPrices);
                                }}
                            />
                        </Grid2>
                    </Grid2>
                </div>
            ))}
            <Button type="button" onClick={addPriceRange}>Aggiungi Range di
                Prezzo</Button> {/* Bottone per aggiungere righe */}
        </div>

    )
}

export default  RangePrice