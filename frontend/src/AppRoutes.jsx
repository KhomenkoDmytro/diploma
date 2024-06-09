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
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import CompetitionsPage from './pages/CompetitionsPage/CompetitionsPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ComplaintsPage from './pages/ComplaintsPage/ComplaintsPage';
import CertificationLettersPage from './pages/CertificationLetterPage/CertificationLetterPage';
import LettersPage from './pages/LettersPage/LettersPage';
import StudentPerformancesPage from './pages/StudentPerformancesPage/StudentPerformancesPage';
import SchoolEventsPage from './pages/SchoolEventsPage/SchoolEventsPage';

function AppRoutes() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="employees" element={<ProtectedRoute content={<EmployeesPage/>} />} />
            <Route path="" element={<UserProfilePage />} index />
            <Route path="employee/:id" element={<EmployeeDetailPage />}/>
            <Route path="analytics" element={<ProtectedRoute content={<TopsisResultsPage/>}/>} />
            <Route path="students" element={<ProtectedRoute content={<StudentsPage/>} />} />
            <Route path="subject-assignment" element={<ProtectedRoute content={<SubjectAssignmentsPage/>}/>}/>
            <Route path="student/:id" element={<StudentDetailPage/> } />
            <Route path="events" element={<ProtectedRoute content={<SchoolEventsPage/>} />} />
            <Route path="decrees" element={<ProtectedRoute content={<DecreesPage />} />} />
            <Route path="competitions" element={<ProtectedRoute content={<CompetitionsPage />} />} />
            <Route path="concerts" element={<ProtectedRoute content={<StudentPerformancesPage />} />} />
            <Route path="complaints" element={<ProtectedRoute content={<ComplaintsPage/>}/>}/>
            <Route path="certification-letters" element={<ProtectedRoute content={<CertificationLettersPage/>}/>}/>
            <Route path="letters" element={<ProtectedRoute content={<LettersPage/>} />}/>
            <Route path="prices" element={<SchoolEventsPage/>} />
             <Route path={'*'} element={<PageNotFound />} />
 
          </Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/registration" element={<Register/>}></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default AppRoutes;
