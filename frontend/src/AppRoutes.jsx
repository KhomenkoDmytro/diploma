import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from "./pages/Layout/Layout";
import DecreesPage from './pages/DecreesPage/DecressPage';
import EmployeeDetailPage from './pages/EmployeeDetailPage/EmployeeDetailPage';
import EmployeesPage from './pages/EmployeesPage/EmployeesPage';
import StudentsPage from './pages/StudentsPage/StudentsPage';
import StudentDetailPage from './pages/StudentDetailPage/StudentDetailPage';
import SubjectAssignmentsPage from './pages/SubjectAssignmentsPage/SubjectAssignmentsPage';
import ActivityPage from './pages/ActivityPage/ActivityPage';
import TopsisResultsPage from './pages/TopsisResultsPage/TopsisResultsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Register from './pages/RegistrationPage/RegistrationPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function AppRoutes() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<ProtectedRoute content={<EmployeesPage/>} />} />
            <Route path="employee/:id" element={<EmployeeDetailPage />}/>
            <Route path="analytics" element={<ProtectedRoute content={<TopsisResultsPage/>}/>} />
            <Route path="students" element={<ProtectedRoute content={<StudentsPage/>} />} />
            <Route path="subject-assignment" element={<ProtectedRoute content={<SubjectAssignmentsPage/>}/>}/>
            <Route path="student/:id" element={<StudentDetailPage/> } />
            <Route path="activities" element={<ProtectedRoute content={<ActivityPage/>} />} />
            <Route path="decrees" element={<ProtectedRoute content={<DecreesPage />} />} />
            <Route path="letters" element={<div>Letters Page</div>} />
            <Route path="prices" element={<div>Prices Page</div>} />
          </Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/registration" element={<Register/>}></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default AppRoutes;
