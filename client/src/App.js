import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import {Provider} from "react-redux"
import store from "./redux/store"
import Admin from './pages/Admin';
import Partner from './pages/Partner';
import SingleMovie from './pages/Home/SingleMovie';
import BookShow from './pages/Home/BookShow';
import Profile from './pages/User';
import Forget from './pages/User/ForgetPassword';
import Reset from './pages/User/ResetPassword';

function App() {
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/partner" element={<Partner/>} />
        <Route path="/movie/:id" element={<SingleMovie/>} />
        <Route path="/book-show/:id" element={<BookShow/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/forget" element={<Forget/>} />
        <Route path="/reset/:email" element={<Reset/>} />

      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
