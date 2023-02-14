import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    const user = { name, email };

    fetch("http://localhost:5000/users", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUser = [...users, data];
        setUsers(newUser);
        
      })
      .catch(error => {
        console.log(error)
      })
    console.log(user);

    e.target.reset();
  };
  return (
    <div className="App">
      <h2>{users.length}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <br />
        <input type="email" name="email" />
        <br />
        <button type="submit">submit</button>
      </form>

      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default App;
