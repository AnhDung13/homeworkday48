import { useState } from "react";
import Todo from "./TodoComponent/Todo";
import Loading from "./LoadingComponent/Loading";

function App() {
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      {isLoading && <Loading />}
      <Todo setLoading={setLoading} />
    </>
  );
}

export default App;
