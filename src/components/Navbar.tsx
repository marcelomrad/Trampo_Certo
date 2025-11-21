import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BriefcaseIcon, UserIcon, BuildingIcon, LogOutIcon, FileTextIcon, MenuIcon, XIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
export function Navbar() {
  const {
    user,
    logout,
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };
  return <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <BriefcaseIcon className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Trampo Certo
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/vagas" className="text-gray-700 hover:text-blue-600 font-medium">
              Buscar Vagas
            </Link>
            {isAuthenticated ? <>
                {user?.type === 'student' && <>
                    <Link to="/minhas-candidaturas" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                      <FileTextIcon className="w-5 h-5" />
                      <span className="font-medium">Minhas Candidaturas</span>
                    </Link>
                    <Link to="/perfil" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                      <UserIcon className="w-5 h-5" />
                      <span className="font-medium">Meu Perfil</span>
                    </Link>
                  </>}
                {user?.type === 'company' && <>
                    <Link to="/empresa/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                      <BuildingIcon className="w-5 h-5" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link to="/empresa/perfil" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                      <BuildingIcon className="w-5 h-5" />
                      <span className="font-medium">Perfil da Empresa</span>
                    </Link>
                  </>}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">
                    {user?.name}
                  </span>
                  <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600">
                    <LogOutIcon className="w-5 h-5" />
                    <span className="font-medium">Sair</span>
                  </button>
                </div>
              </> : <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Entrar
                </Link>
                <Link to="/cadastro/estudante" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                  <UserIcon className="w-5 h-5" />
                  <span className="font-medium">Estudante</span>
                </Link>
                <Link to="/cadastro/empresa" className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <BuildingIcon className="w-5 h-5" />
                  <span className="font-medium">Empresa</span>
                </Link>
              </>}
          </div>
          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            {mobileMenuOpen ? <XIcon className="w-6 h-6 text-gray-700" /> : <MenuIcon className="w-6 h-6 text-gray-700" />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {mobileMenuOpen && <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/vagas" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Buscar Vagas
              </Link>
              {isAuthenticated ? <>
                  {user?.type === 'student' && <>
                      <Link to="/minhas-candidaturas" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2">
                        <FileTextIcon className="w-5 h-5" />
                        <span className="font-medium">Minhas Candidaturas</span>
                      </Link>
                      <Link to="/perfil" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2">
                        <UserIcon className="w-5 h-5" />
                        <span className="font-medium">Meu Perfil</span>
                      </Link>
                    </>}
                  {user?.type === 'company' && <>
                      <Link to="/empresa/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2">
                        <BuildingIcon className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <Link to="/empresa/perfil" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2">
                        <BuildingIcon className="w-5 h-5" />
                        <span className="font-medium">Perfil da Empresa</span>
                      </Link>
                    </>}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-700 font-medium mb-4">
                      {user?.name}
                    </p>
                    <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium">
                      <LogOutIcon className="w-5 h-5" />
                      <span>Sair</span>
                    </button>
                  </div>
                </> : <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2">
                    Entrar
                  </Link>
                  <Link to="/cadastro/estudante" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2">
                    <UserIcon className="w-5 h-5" />
                    <span className="font-medium">Cadastro Estudante</span>
                  </Link>
                  <Link to="/cadastro/empresa" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-fit">
                    <BuildingIcon className="w-5 h-5" />
                    <span className="font-medium">Cadastro Empresa</span>
                  </Link>
                </>}
            </div>
          </div>}
      </div>
    </nav>;
}