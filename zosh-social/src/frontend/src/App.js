
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import HomePage from './pages/HomePage/HomePage';
import Message from './components/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './Redux/store';
import { getProfileAction } from './Redux/Auth/auth.action';
import { useEffect } from 'react';

function App() {

  const {auth}= useSelector(store=>store)
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getProfileAction(jwt))
    },[jwt])
  return (

    <div className="">
      <Routes>
        <Route path="/*" element={auth.user?<HomePage />:<Authentication/>} />
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={<Authentication />} />

      </Routes>
    </div>
  );
}

export default App;
