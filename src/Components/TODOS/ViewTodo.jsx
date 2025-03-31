import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../../Context/TodoContext";
import { motion } from "framer-motion";

const ViewTodo = () => {
  const { id } = useParams();
  const { tasks } = useTodo();
  const navigate = useNavigate();

  const todo = tasks.find((task) => task.id === id);

  if (!todo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-red-500 text-lg font-semibold mt-10"
      >
        🚨 Todo not found!
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl mt-10 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
    >
      <h2 className="text-2xl font-extrabold text-center border-b pb-3 mb-6 border-gray-300 dark:border-gray-700">
        📄 Task Details
      </h2>

      <div className="mb-6 space-y-4">
        <p className="text-lg">
          <strong className="text-gray-600 dark:text-gray-400">Task:</strong>{" "}
          {todo.taskName}
        </p>
        <p className="text-lg">
          <strong className="text-gray-600 dark:text-gray-400">Priority:</strong>{" "}
          <span
            className={`ml-2 px-3 py-1 rounded-lg text-sm font-semibold text-white ${
              todo.priority === "high"
                ? "bg-red-500"
                : todo.priority === "medium"
                ? "bg-yellow-500 text-black"
                : "bg-green-500"
            }`}
          >
            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
          </span>
        </p>
        <p className="text-lg">
          <strong className="text-gray-600 dark:text-gray-400">Created Time:</strong>{" "}
          {new Date(todo.createdTime).toLocaleString()}
        </p>
        <p className="text-lg">
          <strong className="text-gray-600 dark:text-gray-400">Updated Time:</strong>{" "}
          {new Date(todo.updatedTime).toLocaleString()}
        </p>
        <p className="text-lg flex items-center">
          <strong className="text-gray-600 dark:text-gray-400">Status:</strong>
          <span
            className={`ml-2 px-3 py-1 rounded-lg text-sm font-semibold text-white ${
              todo.isCompleted ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            {todo.isCompleted ? "✅ Completed" : "⏳ Pending"}
          </span>
        </p>

        {/* Tags Display */}
        <p className="text-lg">
          <strong className="text-gray-600 dark:text-gray-400">Tags:</strong>{" "}
          {todo.tags.length > 0 ? (
            <span className="flex flex-wrap gap-2 mt-2">
              {todo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-semibold bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </span>
          ) : (
            <span className="text-gray-500">No tags</span>
          )}
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate("/todos")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition-all transform hover:scale-105"
        >
          🔙 Back to List
        </button>
      </div>
    </motion.div>
  );
};

export default ViewTodo;
