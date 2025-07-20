// src/components/TaskDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TaskDetails.css';

const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTaskDetail = async () => {
            try {
                const response = await axios.get(`/${id}`);
                setTask(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchTaskDetail();
    }, [id]);

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
                        <td>{task.status}</td>
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
        </div>
    );
};

export default TaskDetail;
