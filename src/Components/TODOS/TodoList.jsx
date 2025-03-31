import { useState } from "react";
import { useTodo } from "../../Context/TodoContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";


const TAGS = ["work", "health", "personal", "shopping", "family"];

const TodoList = () => {
  const { tasks, dispatch } = useTodo();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const updateTask = (id, updates) => {
    dispatch({ type: "UPDATE_TASK", payload: { id, ...updates } });
  };

  const deleteTask = (id) => {    
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const toggleTagFilter = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.isCompleted) ||
      (statusFilter === "pending" && !task.isCompleted);

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    const matchesSearch =
      searchText === "" ||
      task.taskName.toLowerCase().includes(searchText.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 || selectedTags.every((tag) => task.tags.includes(tag));

    return matchesStatus && matchesPriority && matchesSearch && matchesTags;
  });

  return (
<div className="max-w-6xl mx-auto px-6 py-10 text-gray-900 dark:text-white mt-10">
<div className="flex flex-col md:flex-row justify-between items-center pb-3 border-b border-gray-300 dark:border-gray-700 gap-4">
        <h2 className="text-2xl font-bold">📋 Your Todos</h2>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 w-full md:w-40 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="p-2 bg-gray-300 dark:bg-gray-600 rounded-lg text-gray-800 dark:text-white"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter size={20} />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 mb-6 flex flex-col md:flex-row gap-4 bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
          <select
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTagFilter(tag)}
                className={`px-3 py-1 rounded-lg font-semibold text-sm transition-all
                ${
                  selectedTags.includes(tag)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white hover:opacity-80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center text-lg mt-6">
          No matching todos found.
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {filteredTasks.map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 transition-all"
            >
              <p
                className={`text-lg font-semibold w-full md:w-auto px-3 py-2 rounded-lg ${
                  todo.isCompleted
                    ? "line-through text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                    : "text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-900"
                }`}
              >
                {todo.taskName}
              </p>

              <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full md:w-auto mt-2 md:mt-0">
                <div className="flex flex-wrap gap-1">
                  {todo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm font-semibold bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="relative">
                  <select
                    value={todo.priority}
                    onChange={(e) => updateTask(todo.id, { priority: e.target.value })}
                    className={`appearance-none border-2 py-2 px-4 rounded-lg text-sm font-bold cursor-pointer shadow-md focus:ring-2 focus:ring-opacity-50 transition-all
                    ${
                      todo.priority === "low"
                        ? "border-green-500 bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-300"
                        : todo.priority === "medium"
                        ? "border-yellow-500 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-300"
                        : "border-red-500 bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-300"
                    }`}
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                </div>

                <button
                  className={`px-4 py-2 rounded-lg font-semibold text-white transition-all transform hover:scale-105 shadow-md
                    ${todo.isCompleted ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"}`}
                  onClick={() => updateTask(todo.id, { isCompleted: !todo.isCompleted })}
                >
                  {todo.isCompleted ? "Undo" : "Mark Complete"}
                </button>

                <Link
                  to={`/view/${todo.id}`}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-md transform transition-transform hover:scale-105"
                >
                  View
                </Link>

                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow-md transform transition-transform hover:scale-105"
                  onClick={() => deleteTask(todo.id)}
                >
                  🗑 
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
