import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const doneList = (name: string) => {
    dispatch({ type: "DONE_LIST", payload: name });
  }
  const deleteList = (name: string) => {
    dispatch({ type: "DELETE_LIST", payload: name });
  }
  const addList = () => {
    if (!name) return;

    setComplete(false);

    dispatch({
      type: "ADD_LIST",
      payload: {
        name,
        complete,
      },
    });
    setName("");
  }

  const [name, setName] = useState("");
  const [complete, setComplete] = useState(false);

  const lists = useSelector((state: any) => state.lists);
  return (
    <div className="App">
      <h1>ReduxでTodoリスト作成</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={addList}>追加</button>
      <h2>未完了のTodoリスト</h2>
      <ul>
        {lists
          .filter((list: any) => list.complete === false)
          .map((list: any, index: number) => (
          <div key={index}>
            {list.name}
            <button onClick={() => doneList(list.name)}>完了</button>
            <button onClick={() => deleteList(list.name)}>削除</button>
          </div>
        ))}
      </ul>
      <h2>完了したTodoリスト</h2>
      <ul>
        {lists
          .filter((list: any) => list.complete === true)
          .map((list: any, index: number) => (
          <li key={index}>{list.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
