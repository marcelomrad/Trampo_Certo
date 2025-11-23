import React from 'react';
import { Link } from 'react-router-dom';
import { FileTextIcon, ClockIcon, CheckCircleIcon, XCircleIcon, EyeIcon, XIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobContext';
export function StudentApplications() {
  const { user } = useAuth();
  const { getApplicationsByStudent, getJobById, cancelApplication } = useJobs();
  
  const studentApplications = user ? getApplicationsByStudent(user.id) : [];
  
  // Transformar para o formato esperado pela tela
  const applications = studentApplications.map(app => {
    const job = getJobById(app.jobId);
    return {
      id: app.id,
      jobId: app.jobId,
      jobTitle: job?.title || 'Vaga não encontrada',
      company: job?.company || '',
      appliedDate: app.appliedDate,
      status: app.status,
      statusLabel: app.status === 'pending' ? 'Em análise' : 
                   app.status === 'approved' ? 'Aprovado' : 'Não selecionado'
    };
  });
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      case 'approved':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Minhas Candidaturas
          </h1>
          <p className="text-gray-600">
            Acompanhe o status das suas candidaturas
          </p>
        </div>
        {applications.length === 0 ? <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <FileTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma candidatura ainda
            </h3>
            <p className="text-gray-600 mb-6">
              Comece a se candidatar para vagas que combinam com você
            </p>
            <Link to="/vagas" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Buscar Vagas
            </Link>
          </div> : <div className="space-y-4">
            {applications.map(application => <div key={application.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {application.jobTitle}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      {application.company}
                    </p>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span className="font-medium text-sm">
                      {application.statusLabel}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <p className="text-sm text-gray-600">
                    Candidatura enviada em {application.appliedDate}
                  </p>
                  <div className="flex space-x-4">
                    <Link to={`/vaga/${application.jobId}`} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                      <EyeIcon className="w-4 h-4" />
                      <span>Ver vaga</span>
                    </Link>
                    {application.status === 'pending' && (
                      <button onClick={() => cancelApplication(application.id)} className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium">
                        <XIcon className="w-4 h-4" />
                        <span>Cancelar</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>)}
          </div>}
      </div>
    </div>;
}