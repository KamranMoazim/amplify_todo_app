import {useEffect, useState} from "react"
import { API } from "aws-amplify";

import * as queries from "./graphql/queries"
import * as mutations from "./graphql/mutations"
import './App.css';

const initialFormState = {name: "", description: ""};

function App() {

  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchTodos();
  }, [])


  const fetchTodos = async () => {

    const response = await API.graphql({
      query: queries.listTodos
    })

    // console.log("fetching todos")
    // console.log(response)
    setTodos(response.data.listTodos.items)
  }


  const createTodo = async () => {

    if(!formData.name) return alert("Please Enter Name");

    const response = await API.graphql({
      query: mutations.createTodo,
      variables: {
        input: formData
      }
    })

    setTodos([...todos, response.data.createTodo]);
    setFormData(initialFormState);

    // console.log("creating todo")
    // console.log(response)
  }


  const deleteTodo = async ({id}) => {
    if(!window.confirm("Do you wants to delete this Todo ? ")) return;
    const newTodosArray = todos.filter(todo => todo.id !== id);
    setTodos(newTodosArray);
    await API.graphql({
      query: mutations.deleteTodo,
      variables: {
        input: {
          id
        }
      }
    })
  }
  


  return (
    <div className="App">
      <div className="todos_top">
        <h1>Todos</h1>
        <div className="todos_input">
          <input 
            onChange={e => setFormData({...formData, "name":e.target.value})} 
            placeholder="Todo Name"
            value={formData.name}
          />
          <input 
            onChange={e => setFormData({...formData, "description":e.target.value})} 
            placeholder="Todo Description"
            value={formData.description}
          />
        </div>
        <button className="button_create" onClick={createTodo}>Create Todo</button>
      </div>

      <div className="container">
        {
          todos.map(todo => (
            <div className="todoItems" key={todo.id}>
              <div>
                <h1>{todo.name}</h1>
                <p>{todo.description}</p>
              </div>
              <button className="button_delete" onClick={() => deleteTodo(todo)}>Delete Todo</button>
            </div>
          ))
        }
      </div>

    </div>
  );
}

export default App;
