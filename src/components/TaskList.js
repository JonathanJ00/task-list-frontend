import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("/tasks");
                setTasks(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>Error fetching tasks: {error.message}</p>;

    return (
        <div className="task-list">
            <h2>Task List</h2>
            {tasks.length > 0 ? (
                <table className="task-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.status}</td>
                            <td>{new Date(task.date).toLocaleString('en-GB')}</td>
                            <td><Link to={`/${task.id}`}><button>View Details</button></Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    );
};

export default TaskList;
