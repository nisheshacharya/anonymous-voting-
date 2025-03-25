
import AppRouter from './router/Router';
import './App.css'
import { RoleProvider } from './context/RoleContext';
import { BrowserRouter } from 'react-router-dom';


function App() {


  return (

    <RoleProvider>
      <AppRouter />
    </RoleProvider>


  )
}

export default App
