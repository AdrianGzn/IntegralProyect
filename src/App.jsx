import { useState } from 'react'
import Login from './pages/Login'
import personalUseContext from './context/userContext'

function App() {
  const [personal, setPersonal] = useState({})
  
  return (
    <personalUseContext.Provider value={{personal, setPersonal}}>
      <Login></Login>
    </personalUseContext.Provider>
    )
}

export default App
