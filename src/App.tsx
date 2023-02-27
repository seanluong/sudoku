import './App.css'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { ValidationSnackbar } from './components/ValidationSnackbar'

function App() {

  return (
    <div className="App">
      <Header />
      <Main />
      <ValidationSnackbar />
    </div>
  )
}

export default App
