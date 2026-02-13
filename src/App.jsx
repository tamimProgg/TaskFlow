import AnimatedBG from "./components/AnimatedBG";
import ClearButton from "./components/ClearButton";
import Header from "./components/Header";
import Input from "./components/Input";
import Notification from "./components/Notification";
import StatsGrid from "./components/StatsGrid";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 p-3 sm:p-6 relative overflow-hidden">
        <AnimatedBG />
        <Notification />

        <div className="max-w-3xl mx-auto relative z-10">
          <Header />
          <StatsGrid />
          <Input />
          <TodoList />
          <ClearButton />
        </div>
      </div>
    </>
  );
};
export default App;
