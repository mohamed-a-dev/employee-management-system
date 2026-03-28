import { use, Suspense } from "react";

const fetchUser = fetch("https://jsonplaceholder.typicode.com/users/1").then(res => res.json());

 function User() {
  const user = use(fetchUser);
  return <p>User: {user.name}</p>;
}

export default function App() {
  return (
    <>
      <Suspense fallback={<p>Loading user...</p>}>
        <User />
      </Suspense>
      {/* 44 appear مباشرة قبل ال fetch */}
      44 
    </>

  );
}

//----------------------------------------------
import { use, Suspense } from "react";

const fetchUser = fetch("https://jsonplaceholder.typicode.com/users/1").then(res => res.json());

function User() {
  const user = use(fetchUser);
  return <p>User: {user.name}</p>;
}

export default function App() {
  return (
    <>
      <User />
      {/* 44 appear after fetch end */}
      44
    </>

  );
}