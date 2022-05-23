import './App.css';
import Header from'./components/Header/Header'
import Footer from'./components/Footer/Footer'
import Home from './Pages/Home/Home'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Authentication/Signup';
import Login from './Pages/Authentication/Login';
import Purchase from './Pages/Purchase/Purchase';
import RequireAuth from './components/RequireAuth/RequireAuth'
import NotFound from './components/NotFound/NotFound';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/purchase/:id' element={
          <RequireAuth>
            <Purchase/>
          </RequireAuth>
        }/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
