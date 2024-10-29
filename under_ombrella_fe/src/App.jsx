import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import InsertNew from "./InsertNew";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import Booking from "./components/Booking";

function App() {
    return (
        <Router>
            <AppBar position="static" sx={{ width: '100%' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/lidi">Cerca</Button>
                </Toolbar>
            </AppBar>

            <div className="app-container">
                <Routes>
                    <Route path="/" element={<InsertNew />} />
                    <Route path="/lidi" element={<Booking />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; // Corretto l'export