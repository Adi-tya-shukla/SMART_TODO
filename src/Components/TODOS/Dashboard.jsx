import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../../Context/TodoContext";
import { SAMPLE_TODOS } from "../../Utilites/SampleTodos";

const TAGS = ["Work", "Health", "Personal", "Shopping", "Family"];

const Dashboard = () => {
  const { tasks, dispatch } = useTodo();
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("medium");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const addTask = () => {
    if (taskName.trim() === "") return;
    dispatch({ type: "ADD_TASK", payload: { taskName, priority, tags: selectedTags } });
    setTaskName("");
    setPriority("medium");
    setSelectedTags([]);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-6 text-gray-900 dark:text-white transition-all">
      <h2 className="text-xl font-bold text-center border-b pb-3 mb-6 border-gray-300 dark:border-gray-700">
        🚀 Task Dashboard
      </h2>

      <div className="mb-5">
        <label className="block text-base mb-2 font-semibold">Task Name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
            setFilteredSuggestions(
              SAMPLE_TODOS.filter((todo) =>
                todo.taskName.toLowerCase().includes(e.target.value.toLowerCase())
              )
            );
          }}
          className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Enter your task..."
        />
        {filteredSuggestions.length > 0 && (
          <ul className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 mt-2 rounded-lg shadow-md max-h-40 overflow-y-auto transition-all">
            {filteredSuggestions.map((todo, index) => (
              <li
                key={index}
                onClick={() => setTaskName(todo.taskName)}
                className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-all"
              >
                {todo.taskName}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-5">
        <label className="block text-base mb-2 font-semibold">Priority</label>
        <div className="flex space-x-3">
          {["low", "medium", "high"].map((level) => (
            <button
              key={level}
              onClick={() => setPriority(level)}
              className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all
              ${
                priority === level
                  ? level === "low"
                    ? "bg-green-500 text-white"
                    : level === "medium"
                    ? "bg-yellow-500 text-black"
                    : "bg-red-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white hover:opacity-80"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-base mb-2 font-semibold">Tags</label>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all text-sm 
              ${
                selectedTags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white hover:opacity-80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={addTask}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        Add Task
      </button>

      <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-center">📊 Progress Overview</h3>
        {tasks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">No tasks added yet.</p>
        ) : (
          <div className="mt-3">
            <div className="flex justify-between text-sm font-semibold">
              <span>Completed</span>
              <span>
                {tasks.filter((t) => t.isCompleted).length} / {tasks.length}
              </span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 rounded-full mt-2">
              <div
                className="h-3 bg-blue-500 rounded-full transition-all"
                style={{
                  width: `${
                    (tasks.filter((t) => t.isCompleted).length / tasks.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div
        className="mt-6 text-center text-lg cursor-pointer text-blue-500 hover:text-blue-700 transition-all"
        onClick={() => navigate("/todos")}
      >
        📋 View All Tasks
      </div>
    </div>
  );
};

export default Dashboard;
