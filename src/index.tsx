import './index.css'

import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { rootReducer } from './reducers/reducer'
import { ShowErrorsProvider } from './context/ShowErrorsContext'

const store = configureStore({
  reducer: rootReducer
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ShowErrorsProvider>
        <App />
      </ShowErrorsProvider>
    </Provider>
  </React.StrictMode>,
)
