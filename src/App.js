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
import Dashboard from './Pages/Dashboard/Dashboard';
import MyProfile from './Pages/Dashboard/MyProfile'
import MyOrders from './Pages/Dashboard/MyOrders'
import AddReview from './Pages/Dashboard/AddReview'
import Payment from './Pages/Dashboard/Payment';
import AddProduct from './Pages/Dashboard/Admin/AddProduct'
import MakeAdmin from './Pages/Dashboard/Admin/MakeAdmin'
import ManageAllOrders from './Pages/Dashboard/Admin/ManageAllOrders'
import ManageProducts from './Pages/Dashboard/Admin/ManageProducts'
import RequireAdmin from './components/RequireAdmin/RequireAdmin';




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
        <Route path='dashboard' element={
          <RequireAuth>
            <Dashboard/>
          </RequireAuth>
        }>
          <Route index element={<MyProfile/>}/>
          <Route path='myprofile' element={<MyProfile/>}/>
          <Route index path='myorders' element={<MyOrders/>}/>
          <Route path='addreview' element={<AddReview/>}/>
          <Route path='myorders/payment/:id' element={<Payment/>}/>
          <Route path='addproduct' element={
            <RequireAdmin>
              <AddProduct/>
            </RequireAdmin>
          }/>
          <Route path='makeadmin' element={
            <RequireAdmin>
              <MakeAdmin/>
            </RequireAdmin>
          }/>
          <Route path='manageallorders' element={
            <RequireAdmin>
              <ManageAllOrders/>
            </RequireAdmin>
          }/>
          <Route path='manageproducts' element={
             <RequireAdmin>
               <ManageProducts/>
             </RequireAdmin>
             }/>

        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
