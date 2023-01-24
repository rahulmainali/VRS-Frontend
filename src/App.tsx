import React, { useState, useEffect, createContext, useReducer } from 'react';
import './App.css';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Navbar from './component/navbar/Navbar'
import Dashboard from './component/Dashboard'
import SignInSide from './component/admin/SignInSide'
import Sidebar from './component/dashboard/Sidebar'
import Profile from './component/dashboard/Profile'
import Vehicles from './component/dashboard/Vehicles'
import ForgotPasswordEmail from './component/user/ForgotPasswordEmail'
import ForgotPassword from './component/user/ForgotPassword'
import ChangePassword from './component/user/ChangePassword'

import axios from 'axios'
import { useAuth } from './hooks/auth'
import { initialState, reducer } from './reducer/UseReducer'


interface userInfo {
    name: string,
    isLoggedIn: boolean,
}

const ProtectedRoute = ({ redirect, children }: any) => {
    if (redirect) return <Navigate to="/" replace />
    return children
}

type initialStateType = {
    login: boolean
}

export const UserContext = createContext<{
    state: boolean;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => false
});
const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [googleUser, setGoogleUser] = useState();
    const userData = useAuth().user;
    const { user, isAuthenticated } = useAuth();

    const getUsers = () => {
        fetch("http://localhost:5000/api/login/success", {
            method: "GET",
            credentials: "include",
        },
        )
            .then((response) => {
                if (response.status === 200) {

                    return response.json()
                };
                throw new Error("authentication has been failed!");
            })
            .then((resObject) => {

                setGoogleUser(resObject.user)
                localStorage.setItem('user', JSON.stringify(resObject.user))

            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getUsers();
    }, []);

    return (

 
        <UserContext.Provider value={{ state, dispatch }}>

            <div className="App">
                <Router>
                    <Routes>

                        <Route path='/dashboard' element={
                            <ProtectedRoute redirect={!isAuthenticated}>
                                <Sidebar />
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                        <Route path='/dashboard/profile' element={
                            <ProtectedRoute redirect={!isAuthenticated}>
                                <Sidebar />
                                <Profile />
                            </ProtectedRoute>
                        } />
                        <Route path='/dashboard/vehicles' element={
                            <ProtectedRoute redirect={!isAuthenticated}>
                                <Sidebar />
                                <Vehicles />
                            </ProtectedRoute>
                        } />


                        <Route path='/dashboard/change-password' element={
                            <ProtectedRoute redirect={!isAuthenticated}>
                                <Sidebar />
                                <ChangePassword user= {userData}/>
                            </ProtectedRoute>
                        } />

                        <Route path='/' element={<><Navbar user={googleUser} /> <Home /></>} />
                        <Route path='/forgot-password-email' element={<><ForgotPasswordEmail /></>} />
                        <Route path='/api/user/forgotPassword/:id/:token' element={<><ForgotPassword /></>} />

                        <Route path='/admin/login' element={<SignInSide />} />
                    </Routes>
                </Router>
            </div>
        </UserContext.Provider>

    );
}

export default App;
