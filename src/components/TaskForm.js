import React, {useState} from 'react';
import { format } from 'date-fns';
import './TaskForm.css';

const TaskForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'CREATED',
        date: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {title, description, status, date} = formData;

        if (!title || !date || !status) {
            setError('Title, Date, and Status are required!');
            return;
        }

        const formattedDate = format(new Date(date), 'yyyy-MM-dd HH:mm');

        try {
            const response = await fetch('/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    status,
                    date: formattedDate
                })
            });

            if (response.ok) {
                setSuccessMessage('Task was created successfully!');
                setError(null); // Reset error
                setFormData({
                    title: '',
                    description: '',
                    status: 'CREATED',
                    date: ''
                });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'An error occurred');
            }
        } catch (err) {
            setError('Failed to create task: ' + err.message);
        }
    };

    return (
        <div>
            <h2>Create Task</h2>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Title (Required):
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Status (Required):
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="CREATED">Created</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Date (Required):
                            <input
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    {successMessage && <div style={{color: 'green'}}>{successMessage}</div>}
                    {error && <div style={{color: 'red'}}>{error}</div>}

                    <div>
                        <button type="submit">Create Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
