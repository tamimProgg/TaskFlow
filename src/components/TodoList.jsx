import { Sparkle } from "lucide-react";
import TodoItems from "./TodoItems";

const TodoList = () => {
  let todos = [];
  let editingID;
  let editingText;
  let onToggle;
  let onStartEdit;
  let onSaveEdit;
  let onCancelEdit;
  let onDelete;
  let onEditTextChange;
  let onEditKeyPress;

  if(todos.length === 0) {
    return (
      <div className="text-center py-16 backdrop-blur-2xl bg-white/5 rounded-2xl border border-white/10 ">
        <div className="w-16 h-16 bg-linear-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Sparkle size={32} className="text-violet-300"/>
        </div>
          <p className="text-white/90 text-base font-semibold mb-1">No Task yet</p>
          <p className="text-white/50 text-sm">Create your first task to get started</p>

      </div>
    )
  }
  return(
   <>
    <div>
      {todos.map((todo, index) => (
        <TodoItems
         key={index}
         todo = {todo}
         index = {index}
         editingID = {editingID}
         editingText = {editingText}
         onToggle = {onToggle}
         onStartEdit = {onStartEdit}
         onSaveEdit = {onSaveEdit}
         onCancelEdit = {onCancelEdit}
         onDelete = {onDelete}
         onEditTextChange = {onEditTextChange}
         onEditKeyPress = {onEditKeyPress}
         />

      )

      )}
    </div>
   </>
)};
export default TodoList;
