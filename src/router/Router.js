import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import SignIn from '../pages/signin/SignIn'
import SignUp from '../pages/signup/SignUp';
import Home from '../pages/home/Home';
import CargoTypeMaster from '../pages/cargotype/CargoTypeMaster';
import VehicleInfo from '../pages/vehicleinfo/VehicleInfo';
import UserManagement from '../pages/usermanagement/UserManagement';
import Profile from '../pages/profile/Profile';
import Layout from '../layouts/Layout';
import { useSelector } from 'react-redux';
import { RequireAuth } from '../components/RequireAuth';

const Router = () => {
    const signInResult = useSelector((state) => state.auth)
    const userData = JSON.parse(localStorage.getItem('userData'))
    // console.log(userData)
    return (
        (signInResult.signInSuccess || userData) ?
            <Layout>
                <Routes>
                    {/* <Route
                        path="/"
                        element={<Navigate to="usermanagement" replace />}
                    /> */}
                    <Route path="cargotype" element={<CargoTypeMaster />} />
                    <Route path="vehicleinfo" element={<VehicleInfo />} />
                    <Route path="usermanagement" element={<UserManagement />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </Layout> :
            <Routes>
                {/* <Route
                    path="/"
                    element={<Navigate to="signin" replace />}
                /> */}
                <Route path="signup" element={<SignUp />} />
                <Route path="signin" element={<SignIn />} />
            </Routes>
    )
}

export default Router