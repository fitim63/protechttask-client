import './App.css';
import {Routes, Route} from "react-router-dom"
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./components/Main";
import Register from "./components/Register";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProtectedRoute><Main/></ProtectedRoute>}/>
                <Route path="/products" element={<ProtectedRoute><Main/></ProtectedRoute>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </div>
    );
}

export default App;
