import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { JobSearch } from './pages/JobSearch';
import { JobDetail } from './pages/JobDetail';
import { Login } from './pages/Login';
import { StudentRegister } from './pages/StudentRegister';
import { CompanyRegister } from './pages/CompanyRegister';
import { StudentApplications } from './pages/StudentApplications';
import { CompanyDashboard } from './pages/CompanyDashboard';
import { PostJob } from './pages/PostJob';
import { JobPreview } from './pages/JobPreview';
import { CompanyApplications } from './pages/CompanyApplications';
import { StudentProfile } from './pages/StudentProfile';
import { CompanyProfile } from './pages/CompanyProfile';
import { StudentPublicProfile } from './pages/StudentPublicProfile';
import { EditJob } from './pages/EditJob';
export function App() {
  return <BrowserRouter>
      <AuthProvider>
        <JobProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vagas" element={<JobSearch />} />
              <Route path="/vaga/:id" element={<JobDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro/estudante" element={<StudentRegister />} />
              <Route path="/cadastro/empresa" element={<CompanyRegister />} />
              <Route path="/minhas-candidaturas" element={<StudentApplications />} />
              <Route path="/perfil" element={<StudentProfile />} />
              <Route path="/estudante/:studentId" element={<StudentPublicProfile />} />
              <Route path="/empresa/dashboard" element={<CompanyDashboard />} />
              <Route path="/empresa/perfil" element={<CompanyProfile />} />
              <Route path="/empresa/postar-vaga" element={<PostJob />} />
              <Route path="/empresa/editar-vaga/:id" element={<EditJob />} />
              <Route path="/empresa/preview-vaga" element={<JobPreview />} />
              <Route path="/empresa/candidatos/:jobId" element={<CompanyApplications />} />
            </Routes>
          </div>
        </JobProvider>
      </AuthProvider>
    </BrowserRouter>;
}