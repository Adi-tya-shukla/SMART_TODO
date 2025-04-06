import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import { TodoProvider } from "./Context/TodoContext";
import { ThemeProvider } from "./Context/ThemeContext";
import Dashboard from "./Components/TODOS/Dashboard";
import TodoList from "./Components/TODOS/TodoList";
import ViewTodo from "./Components/TODOS/ViewTodo";

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="todos" element={<TodoList />} />
              <Route path="view/:id" element={<ViewTodo />} />
            </Route>
          </Routes>
        </Router>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
