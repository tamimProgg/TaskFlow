import { useEffect, useState } from "react";
import AnimatedBG from "./components/AnimatedBG";
import ClearButton from "./components/ClearButton";
import Header from "./components/Header";
import Input from "./components/Input";
import Notification from "./components/Notification";
import StatsGrid from "./components/StatsGrid";
import TodoList from "./components/TodoList";
import { playSound } from "./components/PlaySound";


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
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem(STORAGE_KEY)
      if(savedTodos) {
        setTodo(JSON.parse(savedTodos))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setHasLoaded(true)
    }
  }, [])

  //save to localStorage
  useEffect(() => {
    if(!hasLoaded) return

    try {
      localStorage.setItem(STORAGE_KEY,JSON.stringify(todos))
    } catch (error) {
      console.log(error);
      
    }
  }, [todos, hasLoaded])

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

  //on toggle
  const toggleTodo = (id) => {
    setTodo(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
    const todo = todos.find((t) => t.id === id);
    if (!todo.completed) {
      playSound("complete");
      showNotification("🎉 Great Job! Task Completed");
    }
  };

  //handle key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  //start edit
  const startEdit = (id, text) => {
    setEditingID(id);
    setEditingText(text);
  };

  // update todos
  const saveEdit = (id) => {
    if (!editingText.trim()) return;

    setTodo(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : { todo },
      ),
    );

    setEditingText(null);
    setEditingID(null);
    playSound("update");
    showNotification("Task Updated Successfully");
  };

  //edit keyPress
  const handleEditKeyPress = (e, id) => {
    if (e.key === "Enter") {
      saveEdit(id);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  //cancel edit
  const cancelEdit = () => {
    setEditingText("");
    setEditingID(null);
  };

  // delete todos
  const handleDeleteTodo = (id) => {
    setTodo(todos.filter((todo) => todo.id !== id));
    playSound("delete");
    showNotification("🗑️ Task deleted", "info");
  };

  //clear all completed task
  const clearCompleted = () => {
    setTodo(todos.filter((t) => !t.completed));
    playSound("deleted");
    showNotification("🗑️ Task deleted", "info");
  };

  const activeTodos = todos.filter((t) => !t.completed).length;
  const completedTodos = todos.filter((t) => t.completed).length;
  const progress = todos.length > 0 ? (completedTodos / todos.length) * 100 : 0;

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 p-3 sm:p-6 relative overflow-hidden">
        <AnimatedBG />
        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <Header
            activeTodos={activeTodos}
            progress={progress}
            totalTodos={todos.length}
          />
          <StatsGrid
            activeTodos={activeTodos}
            totalTodos={todos.length}
            completedTodos={completedTodos}
          />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onAdd={handleAddTodo}
            onKeyPress={handleKeyPress}
          />
          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onStartEdit={startEdit}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            editingID={editingID}
            editingText={editingText}
            onEditTextChange={(e) => setEditingText(e.target.value)}
            onEditKeyPress={handleEditKeyPress}
            onToggle={toggleTodo}
          />
          <ClearButton
            completedTodos={completedTodos}
            onClick={clearCompleted}
          />
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
