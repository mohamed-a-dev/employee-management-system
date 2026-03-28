import { useState, useTransition } from "react";

const bigArray = Array.from({ length: 50000 }, (_, i) => `Item ${i}`);

export default function App() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(bigArray);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value); // urgent لها الاولويه ريال تايم 
    startTransition(() => { // تنتظر لما ال فوق تترندر الاول براحتها
      setFiltered(
        bigArray.filter((item) =>
          item.toLowerCase().includes(e.target.value.toLowerCase())
        )
      ); // non-urgent
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} placeholder="Search..." />
      {isPending && <p>Filtering...</p>}
      <ul>
        {filtered.slice(0, 20).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
// ----------------------------------
// ----------------------------------
// ----------------------------------

import { useState, useTransition } from "react";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState(Array.from({ length: 1000 }, (_, i) => i));

  const toggleTheme = () => {
    startTransition(() => {
      setTheme(theme === "light" ? "dark" : "light");
      setItems([...items]); // simulate heavy rerender
    });
  };

  return (
    <div className={theme}>
      <button onClick={toggleTheme}>
        Toggle Theme {isPending && "(updating...)"}
      </button>
      <ul>
        {items.map((i) => (
          <li key={i}>Item {i}</li>
        ))}
      </ul>
    </div>
  );
}
// ----------------------------------
// ----------------------------------
// ----------------------------------
import { useState, useTransition } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isPending, startTransition] = useTransition();

  const addTodo = async (text) => {
    // optimistic update
    setTodos((prev) => [...prev, { text, temp: true }]); // rendered before rendereing startTransition contents

    startTransition(async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "GET",
      });
      setTodos(await res.json());
    });
  };

  return (
    <>
      <button onClick={() => addTodo("Learn useTransition")}>
        Add Todo {isPending && "(Saving...)"}
      </button>
      <ul>
        {todos.map((t, i) => (
          <li key={i}>{t.title} </li>
        ))}
      </ul>
    </>
  );
}
// ----------------------------------
// ----------------------------------
// ----------------------------------