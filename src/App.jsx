import { useState } from 'react'
import classes from './app.module.css'

function App() {
  const initState = {
    value: '',
    list: [],
    error: '',
  }

  const [state, setState] = useState(initState)

  function onInputButtonClick() {
    const promptValue = prompt('Введите значение:')
    const hasError = promptValue?.trim().length >= 3

    if (!hasError) {
      setState({
        ...state,
        error: 'Введеное сообщение должно содержать минимум 3 символа'
      })
    } else {
      setState({
        ...state, 
        value: promptValue,
        error: '',
      })
    }
  }

  function onAddButtonClick(newState) {
    if (newState.value) {
      const timestamp = new Date().toLocaleString('ru-RU');
      setState({
        ...state,
        list: [...state.list, {
          id: Date.now(),
          value: newState.value,
          timestamp
        }],
        value: '',
        error: ''
      })
    }
  }

  const errorMessage = <div className={classes.error}>{state.error}</div>
  const isValueValid = state.value.length >= 3

  return (
    <div className={classes.app}>
      <h1 className={classes.pageHeading}>Ввод значения</h1>
      <p className={classes.noMarginText}>
        Текущее значение <code>value</code>: "<output className={classes.currentValue}>{state.value}</output>"
      </p>
      {!isValueValid && errorMessage}
      <div className={classes.buttonsContainer}>
        <button onClick={onInputButtonClick} className={classes.button}>Ввести новое</button>
        <button onClick={() => onAddButtonClick(state)} className={classes.button} disabled={!isValueValid}>Добавить в список</button>
      </div>
      <div className={classes.listContainer}>
        <h2 className={classes.listHeading}>Список:</h2>
          {state.list.length > 0
            ? <ul className={classes.list}>
                { state.list.map(item => 
                  <li key={item.id} className={classes.listItem}>{item.timestamp} - {item.value}</li>
                )}
              </ul>
            : <p className={classes.noMarginText}>Нет добавленных элементов</p>
          }
      </div>
    </div>
  )
}

export default App
