import './App.css';
import Home from './screens/Home';
import Signup from './screens/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import { CartProvider } from './component/ContextReducer';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/myOrder' element={<MyOrder/>} />
        </Routes>
      </div>
    </Router>

    </CartProvider>
  )
}

export default App;
