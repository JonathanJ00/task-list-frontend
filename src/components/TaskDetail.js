import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams, useNavigate, Link} from 'react-router-dom';
import './TaskDetails.css';

const TaskDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchTaskDetail = async () => {
            try {
                const response = await axios.get(`/${id}`);
                setTask(response.data);
                setStatus(response.data.status);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchTaskDetail();
    }, [id]);

    const handleUpdateTask = async () => {
        try {
            const response = await axios.put(`/${id}`, {
                status,
            });
            setTask(response.data);
            setSuccessMessage('Task was updated successfully!');
        } catch (error) {
            setError('Failed to update task: ' + error.message);
        }
    };

    const handleDeleteTask = async () => {
        try {
            const response = await axios.delete(`/${id}`);
            if (response.status === 204) {
                alert('Task deleted successfully!');
                navigate('/');
            }
        } catch (error) {
            setError(error);
            alert('Error deleting task');
        }
    };

    if (loading) return <p>Loading task details...</p>;
    if (error) return <p>Error fetching task details: {error.message}</p>;

    return (
        <div className="task-detail">
            <h2>Task Details</h2>
            {task ? (
                <table className="task-detail-table">
                    <tbody>
                    <tr>
                        <td><strong>ID:</strong></td>
                        <td>{task.id}</td>
                    </tr>
                    <tr>
                        <td><strong>Title:</strong></td>
                        <td>{task.title}</td>
                    </tr>
                    <tr>
                        <td><strong>Description:</strong></td>
                        <td>{task.description}</td>
                    </tr>
                    <tr>
                        <td><strong>Status:</strong></td>
                        <td>
                            <div className="status-container">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)} // Update status value
                                >
                                    <option value="CREATED">Created</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                                <button onClick={handleUpdateTask} className="update-button">
                                    Update Status
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Due Date:</strong></td>
                        <td>{new Date(task.date).toLocaleString('en-GB')}</td>
                    </tr>
                    </tbody>
                </table>
            ) : (
                <p>Task not found.</p>
            )}
            <div className="center-message">
                {successMessage && <div style={{color: 'green'}}>{successMessage}</div>}
                {error && <div style={{color: 'red'}}>{error}</div>}
            </div>
            <div className="center-button">
                <Link to="/create">
                    <button onClick={handleDeleteTask} className="delete-button">
                        Delete Task
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TaskDetail;
