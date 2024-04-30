import React, { useState, useEffect } from "react";

interface Task {
    task: string;
    priority: number;
}

const UserInput: React.FC = () => {
    const [taskInput, setTaskInput] = useState<string>("");
    const [taskPriority, setTaskPriority] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleTaskInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTaskInput(e.target.value);
    };

    const handleTaskPriorityChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTaskPriority(e.target.value);
    };

    const handleAddTask = () => {
        setTaskInput("");
        setTaskPriority("");
        setErrorMessage("");

        if (
            taskInput.trim() === "" ||
            taskPriority.trim() === "" ||
            isNaN(Number(taskPriority))
        ) {
            setErrorMessage("Please make sure you entered proper details.");
            return;
        }

        // Adding task
        const newPriority = parseInt(taskPriority);
        const newTask: Task = {
            task: taskInput,
            priority: newPriority,
        };

        let updatedTasks = [...tasks];
        const existingTask = tasks.find((task) => task.priority === newPriority);
        if (existingTask) {
            updatedTasks = updatedTasks.map((task) => {
                if (task.priority >= newPriority) {
                    task.priority++;
                }
                return task;
            });
        }

        // For the Rearangment of task
        updatedTasks.push(newTask);
        updatedTasks.sort((a, b) => a.priority - b.priority);
        setTasks(updatedTasks);
    };


    //   Handle delete
    const handleDeleteTask = (index: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (confirmed) {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            updatedTasks.forEach((task, i) => {
                task.priority = i + 1;
            });
            setTasks(updatedTasks);
        }
    };


    return (
        <>
            <div className="mx-auto py-5">
                <div className="flex flex-col md:flex-row items-center justify-center md:items-start space-y-4 md:space-y-0 md:space-x-4 my-3">
                    <input
                        id="taskPriority"
                        type="number"
                        className="border rounded px-4 py-2 w-full md:w-auto"
                        placeholder="Enter task priority..."
                        value={taskPriority}
                        onChange={handleTaskPriorityChange}
                    />
                    <input
                        id="taskInput"
                        type="text"
                        className="border rounded px-4 py-2 w-full md:w-auto"
                        placeholder="Enter task..."
                        value={taskInput}
                        onChange={handleTaskInputChange}
                    />
                    <button
                        id="addTaskBtn"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleAddTask}
                    >
                        Add Task
                    </button>
                </div>
                <br />
                <p
                    id="errorMessage"
                    className="text-sm text-red-500  text-center md:block"
                >
                    {errorMessage}
                </p>
            </div>

            <div id="todoList" className="mx-auto py-5">
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className="flex items-center border border-2 justify-between max-w-screen-lg my-3 mx-auto rounded-lg px-4 py-2 shadow-md md:shadow-2xl"
                    >
                        <div className="flex flex-col md:flex-row md:items-center item-left  w-full">
                            <div className="md:mr-auto mb-2 md:mb-0 md:pr-4 max-w-full">
                                <div className="my-2">
                                    <span className="font-bold">Task -</span> {task.priority}
                                </div>
                                <div className="whitespace-normal break-all">
                                    <span className="font-bold">Description -</span> {task.task}
                                </div>
                            </div>
                            <div className="flex justify-center md:justify-end">
                                <button
                                    className="text-blue-500 text-sm mr-2 bg-green-200 rounded p-2"
                                //   onClick={() => handleEditTask(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500 bg-red-200 text-sm rounded p-2"
                                    onClick={() => handleDeleteTask(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UserInput;
