import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import InsertNew from "./InsertNew";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import Booking from "./components/Booking";
import SearchBookings from "./components/SearchBookings";

function App() {
    return (
        <Router>
            <AppBar position="static" sx={{ width: '100%', backgroundColor: '#50704f' }} >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Under Umbrella
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/lidi">Prenota</Button>
                    <Button color="inherit" component={Link} to="/search">Cerca</Button>
                </Toolbar>
            </AppBar>

            <div className="app-container">
                <Routes>
                    <Route path="/" element={<InsertNew />} />
                    <Route path="/lidi" element={<Booking />} />
                    <Route path="/search" element={<SearchBookings/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; // Corretto l'export