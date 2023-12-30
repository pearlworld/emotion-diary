import React, { useReducer, useRef } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import New from "./pages/New"
import Edit from "./pages/Edit"
import Diary from "./pages/Diary"

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetid);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 3,
    content: "일기 1번",
    date: 1703834391888,
  },
  {
    id: 2,
    emotion: 1,
    content: "일기 2번",
    date: 1703834391889,
  },
  {
    id: 3,
    emotion: 2,
    content: "일기 3번",
    date: 1703834391900,
  },
  {
    id: 4,
    emotion: 5,
    content: "일기 4번",
    date: 1703834391910,
  },
  {
    id: 5,
    emotion: 4,
    content: "일기 5번",
    date: 1703834391914,
  }
]

function App() {
  // const env = process.env;
  // env.PUBLIC_URL = env.PUBLIC_URL || "";
  const [data, dispatch] = useReducer(reducer, dummyData);

  console.log(new Date().getTime());
  const dataId = useRef(0);

  // CREATE
  const onCreate = (author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current }
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId
    });
  };

  // EDIT
  // const onEdit = (targetId, newContent) => {
  //   dispatch({
  //     type: "EDIT",
  //     data: {
  //       id: targetId,
  //       date: new Date(date).getTime(),
  //       content,
  //       emotion,
  //     }
  //   });
  // };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate,
        // onEdit,
        onRemove,
      }}>
        <BrowserRouter>
          <div className="wrapper">
            {/* 
        <img src={process.env.PUBLIC_URL + './assets/emotion1.png'} /> */}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App
