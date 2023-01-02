import { API } from "aws-amplify";

import * as queries from "./graphql/queries"
import * as mutations from "./graphql/mutations"
import './App.css';


function App() {

  const fetchTodos = async () => {

    const response = await API.graphql({
      query: queries.listTodos
    })

    console.log("fetching todos")
    console.log(response)
  }


  const createTodo = async () => {

    let myTodo = {
      name: "todo 1",
      description: "todo 1 description",
    }

    const response = await API.graphql({
      query: mutations.createTodo,
      variables: {
        input: myTodo
      }
    })
    console.log("creating todo")
    console.log(response)
  }
  


  return (
    <div className="App">
      <h1>
        Hello World
      </h1>

      <button onClick={fetchTodos}> Fetch Todos </button>
      <button onClick={createTodo}> Create Todo </button>
    </div>
  );
}

export default App;
