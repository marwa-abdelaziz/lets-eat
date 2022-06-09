import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Business from './components/Business';
import Error from './Error';
import './App.css';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
         <Route path='view/:id' element={<Business />} />  
        <Route path='*' element={<Error />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
