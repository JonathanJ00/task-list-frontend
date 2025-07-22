import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from "./components/TaskList";
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Task Manager</h1>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/:id" element={<TaskDetail />} />
                    <Route path="/create" element={<TaskForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;