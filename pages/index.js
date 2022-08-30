import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Home.module.css'

export default function Home() {

  let [todoItem, setTodoItem] = useState("");
  let [items, setItems] = useState([{
    id: "test",
    content: "",
    status: true,

    // "Complete todo-app by EOD",
    // "Learn React",
    // "Complete tutorials",

  }]);


  const handleAdd = (id) => {
    if (todoItem) {
      setItems([
        {
          id: uuidv4(),
          content: todoItem,
          status: true,
        },
        ...items,
      ]);
    }
    setTodoItem("");
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  }


  const handleToggle = (id) => {
    const _items = items.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          status: !item.status,
        };
      }
      return item;
    });

    setItems(_items);
  }

  return (
    <div className={styles.Home}>
      <h1>TODO APP</h1>
      <div>
        <input type="text" className={styles.inputField}
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
          onKeyDown={handleEnter}
        ></input>
      </div>

      <div className={styles.ulList}>
        <ul className={styles.itemListActive}>
          {
            items.filter(({ status, id }) => status == true && id != "test")
              .map(({ id, content }) => (
                <li className={styles.eachItem} key={id} onClick={() => handleToggle(id)}>{content}</li>
              ))
          }
        </ul>
        <ul className={styles.itemListInActive}>
          {
            items.filter(({ status, id }) => status == false && id != "test")
              .map(({ id, content }) => (
                <li className={styles.eachItem} key={id} onClick={() => handleToggle(id)}>{content}</li>
              ))
          }
        </ul>
      </div>
    </div>
  )
}
