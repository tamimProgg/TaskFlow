import { useState } from "react";
import AnimatedBG from "./components/AnimatedBG";
import ClearButton from "./components/ClearButton";
import Header from "./components/Header";
import Input from "./components/Input";
import Notification from "./components/Notification";
import StatsGrid from "./components/StatsGrid";
import TodoList from "./components/TodoList";

const playSound = (data) => {};

const App = () => {
  const STORAGE_KEY = "todos";

  //Declaring useState variables
  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [notification, setNotification] = useState(null);
  const [editingID, setEditingID] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  //get from localStorage

  //save to localStorage

  //show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // add todos
  const handleAddTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodo([newTodo, ...todos]);
    setInput("");
    playSound("add");
    showNotification("✨ Task added successfully");
  };

  //handle key press
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleAddTodo()
    }
  }



  // update todos

  // delete todos
  const handleDeleteTodo = (id) => {
    setTodo(todos.filter((todo) => todo.id !== id))
    playSound('delete')
    showNotification('🗑️ Task deleted', 'info')
  }
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 p-3 sm:p-6 relative overflow-hidden">
        <AnimatedBG />
        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <Header />
          <StatsGrid />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onAdd={handleAddTodo}
            onKeyPress={handleKeyPress}
          />
          <TodoList todos = {todos}
            onDelete = {handleDeleteTodo}
          />
          <ClearButton />
        </div>
        <style>
          {`
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
`}
        </style>
      </div>
    </>
  );
};
export default App;
