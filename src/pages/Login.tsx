import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogInIcon } from 'lucide-react';
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'student' | 'company'>('student');
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password, userType);
    if (success) {
      if (userType === 'student') {
        navigate('/vagas');
      } else {
        navigate('/empresa/dashboard');
      }
    }
  };
  return <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <LogInIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Entrar</h1>
            <p className="text-gray-600">Acesse sua conta no Trampo Certo</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Conta
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setUserType('student')} className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${userType === 'student' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}>
                  Estudante
                </button>
                <button type="button" onClick={() => setUserType('company')} className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${userType === 'company' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}>
                  Empresa
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input type="password" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Entrar
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <Link to={userType === 'student' ? '/cadastro/estudante' : '/cadastro/empresa'} className="text-blue-600 hover:text-blue-700 font-medium">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>;
}