import React, { useState } from 'react';

const UserInput: React.FC = () => {
    const [taskInput, setTaskInput] = useState<string>('');
    const [taskPriority, setTaskPriority] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskInput(e.target.value);
    };

    const handleTaskPriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskPriority(e.target.value);
    };

    const handleAddTask = () => {
        if (taskInput.trim() === '' || taskPriority.trim() === '' || isNaN(Number(taskPriority))) {
            setErrorMessage('Please make sure you entered proper details.');
            return;
        }
        setTaskInput('');
        setTaskPriority('');
        setErrorMessage('');
    };

    return (
        <>
            <div className="mx-auto py-5">
                <div className="flex flex-col md:flex-row items-center justify-center md:items-start space-y-4 md:space-y-0 md:space-x-4 my-3">
                    <input id="taskPriority" type="text" className="border rounded px-4 py-2 w-full md:w-auto" placeholder="Enter task priority..." value={taskPriority} onChange={handleTaskPriorityChange} />
                    <input id="taskInput" type="text" className="border rounded px-4 py-2 w-full md:w-auto" placeholder="Enter task..." value={taskInput} onChange={handleTaskInputChange} />
                    <button id="addTaskBtn" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddTask}>Add Task</button>
                </div>
                <br />
                <p id="errorMessage" className="text-xs text-red-500  text-center md:block">{errorMessage}</p>
            </div>
        </>

    );
};

export default UserInput;
