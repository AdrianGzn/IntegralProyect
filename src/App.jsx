import { useState } from 'react';
import Login from './pages/Login';

function App() {
  const [personal, setPersonal] = useState({})
  
  return (<>
    <Login></Login>
  </>)
}

export default App;