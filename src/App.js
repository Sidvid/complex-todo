import React, { useState } from 'react';
import './style.css';
import { UilTrash } from '@iconscout/react-unicons';
import { UilPen } from '@iconscout/react-unicons';
import { UilCornerUpLeftAlt } from '@iconscout/react-unicons';
import { UilCheck } from '@iconscout/react-unicons';
import Error from './Error';

export default function App() {
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState('');
  const [todo, setTodo] = useState([]);
  const [isEdit, setIsEdit] = useState('');
  const [error, setError] = useState('');
  const clickHandle = () => {
    if (!input) {
      setError('Please Enter some Todo!!');
      return;
    }
    setTodo((allTodo) => {
      return [
        ...allTodo,
        {
          value: input,
          isActive: true,
          id: allTodo.length > 0 ? allTodo?.[allTodo.length - 1]?.id + 1 : 1,
        },
      ];
    });
    setInput('');
  };
  const checkBoxHandle = (event, val) => {
    let newVal = todo.filter((t) => {
      if (t.value === val.value) {
        t.isActive = event.target.checked ? false : true;
        return t;
      }
      return t;
    });
    setTodo(newVal);
  };
  const onTrashClick = (val) => {
    let newVal = todo.filter((t) => {
      return t.value != val.value;
    });
    setTodo(newVal);
    setIsEdit('');
  };
  const undoClickHandle = (val) => {
    let newTodo = todo.filter((t) => {
      if (t.value === val.value) {
        t.isActive = true;
        return t;
      }
      return t;
    });
    setTodo(newTodo);
  };
  const editClickHandle = (id) => {
    setEditInput(() => {
      let preInput = todo.find((elem) => {
        return elem.id === id;
      });
      return preInput.value;
    });
    setInput('');
    setIsEdit(id);
  };
  console.log(todo);
  const onTickClick = (item) => {
    let changedTodo = todo.filter((t) => {
      if (t.id === item.id) {
        t.value = editInput;
        return t;
      }
      return t;
    });
    setTodo(changedTodo);
    setIsEdit('');
  };
  return (
    <div className="todo_wrapper">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
      />
      <button disabled={isEdit} onClick={clickHandle}>
        Add
      </button>
      {error && <Error visibleTime={5000} message={error} />}
      <div className="list_wrapper">
        {todo.map((e) => {
          return (
            <div className="list_icons">
              {isEdit != e.id ? (
                <div className="list">
                  <input
                    onChange={(event) => checkBoxHandle(event, e)}
                    className="checkbox"
                    type="checkbox"
                    disabled={!e.isActive}
                    checked={!e.isActive}
                  />
                  <label
                    className={e.isActive ? 'active_label' : 'deactive_label'}
                    htmlFor="checkbox"
                  >
                    {e.value}
                  </label>
                </div>
              ) : (
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
              )}
              <div className="icons">
                {e.isActive ? (
                  isEdit != e.id ? (
                    <UilPen onClick={() => editClickHandle(e.id)} />
                  ) : (
                    <UilCheck onClick={() => onTickClick(e)} />
                  )
                ) : (
                  <UilCornerUpLeftAlt onClick={() => undoClickHandle(e)} />
                )}
                <UilTrash onClick={() => onTrashClick(e)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
