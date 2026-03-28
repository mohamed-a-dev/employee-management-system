import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from "react-router-dom";
import { links } from "./constants/nav-links";
import App from './App';
import { SidebarProvider } from './context/SidebarContext';
import { ThemeProvider } from './context/ThemeContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { TaskProvider } from './context/TaskContext';
import { RoleProvider } from './context/RoleContext';
import { ToastContainer } from "react-toastify";
import Employee from './pages/Employee';
import Task from './pages/Task';
import { DashboardProvider } from './context/DashboardContext';
import Login from './pages/Login';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SidebarProvider>
      <ThemeProvider>
        <EmployeeProvider>
          <TaskProvider>
            <RoleProvider>
              <DashboardProvider>
                <AuthProvider>
                  <ToastContainer />
                  <Routes>
                    <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>}>
                      {
                        links.map((link, i) => <Route path={link.path} element={link.element} />)
                      }
                      <Route path="/employees/:id" element={<Employee />} />
                      <Route path="/tasks/:taskId" element={<Task />} />
                    </Route>
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                  </Routes>
                </AuthProvider>
              </DashboardProvider>
            </RoleProvider>
          </TaskProvider>
        </EmployeeProvider>
      </ThemeProvider>
    </SidebarProvider>
  </BrowserRouter>
)
