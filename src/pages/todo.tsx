import { useState, useEffect } from "react";
import { AccountContext } from "../components/account";
import Status from "~/components/status";
import { Account } from "../components/account";

import axios from "axios";

function TodoList({ email }: { email: any }) {
  const [todos, setTodos] = useState<{ text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");


  useEffect(() => {
    fetchTodos();
  }, [email]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://frank-escargot-48.hasura.app/api/rest/getTodos/" + email,
        {
          headers: {
            "x-hasura-admin-secret":
              "7K53r5z1dEm26jYFzTtnqwoJrEUr4mRScaAKDD0kGCx3z8zIaC2dab5LFRoQVANO",
          },
        }
      );
      console.log(response.data.todos);
      if (response.data.todos) {
        setTodos(response.data.todos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = async () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        text: inputValue,
      };

      try {
        console.log(email);
        console.log(newTodo.text);

        const response = await axios({
          method: "put",
          url: `https://frank-escargot-48.hasura.app/api/rest/putTodo/${email}/${newTodo.text}`,
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "7K53r5z1dEm26jYFzTtnqwoJrEUr4mRScaAKDD0kGCx3z8zIaC2dab5LFRoQVANO",
          },
          data: {},
        });

        if (response.data.insert_todos.affected_rows === 1) {
          setTodos([...todos, newTodo]);
          setInputValue("");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteTodo = async (id: any) => {
    try {
      const response = await axios.delete(
        "https://frank-escargot-48.hasura.app/api/rest/deleteTodo/" + id,
        {
          headers: {
            "x-hasura-admin-secret":
              "7K53r5z1dEm26jYFzTtnqwoJrEUr4mRScaAKDD0kGCx3z8zIaC2dab5LFRoQVANO",
          },
        }
      );

      if (response.data.delete_todos.affected_rows === 1) {
        const updatedTodos = todos.filter((todo: any) => todo.id !== id);
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error(error);
      // Handle any error that occurred during the request
    }
  };

  return (
    <Account>
    <div className="flex flex-col items-center  h-screen p-20 gap-y-10">
      <Status/>
      <h1 className="text-3xl">Todo List</h1>
      <div className="space-x-3">
      <input type="text" value={inputValue} className="border-2" onChange={handleInputChange} />
      <button className="bg-blue-200 rounded" onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo: any) => (
          <li className="flex gap-5" key={todo.id}>
            <p className="border-2 rounded">{todo.todo}</p>
            <button className=" bg-red-500 rounded p-1 text-white" onClick={() => handleDeleteTodo(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
    </Account>
  );
}

export default TodoList;
