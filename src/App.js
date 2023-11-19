import { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file

function useLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function App() {
  const [list, setList] = useLocalStorage('groceryList', []);
  const [inputData, setInputData] = useState('');

  const handleAddItem = () => {
    const newList = [...list, { title: inputData, completed: false }];
    setList(newList);
    setInputData('');
  }

  const handleRemoveItem = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  

  return (
    <div className="center-container">
      <h1>Grocery List</h1>
      <div className="input">
        <input type='text' value={inputData} onChange={(e) => setInputData(e.target.value)} />
        <input type='button' value='add' onClick={handleAddItem} />
      </div>
      <div className="list">
        {list.map((item, index) => (
          <div key={index} className="list-item">
            <p
              onClick={() => handleRemoveItem(index)}
              style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
