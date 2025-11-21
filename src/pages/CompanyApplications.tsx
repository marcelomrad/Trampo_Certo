import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, MailIcon } from 'lucide-react';
import { useJobs } from '../contexts/JobContext';
export function CompanyApplications() {
  const {
    jobId
  } = useParams();
  const { getApplicationsByJob, getJobById } = useJobs();
  const [filter, setFilter] = useState('all');
  
  const job = getJobById(jobId || '');
  const applications = getApplicationsByJob(jobId || '');
  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });
  const updateStatus = (id: string, status: string) => {
    alert(`Candidatura ${status === 'approved' ? 'aprovada' : 'rejeitada'}`);
  };
  return <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Link to="/empresa/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Voltar para dashboard
        </Link>
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Candidaturas - {job?.title || 'Vaga'}
          </h1>
          <p className="text-gray-600">
            {applications.length} candidaturas recebidas
          </p>
        </div>
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-x-auto">
          <div className="flex border-b border-gray-200 min-w-max">
            <button onClick={() => setFilter('all')} className={`flex-1 py-4 px-4 sm:px-6 font-medium whitespace-nowrap ${filter === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
              Todas ({applications.length})
            </button>
            <button onClick={() => setFilter('pending')} className={`flex-1 py-4 px-4 sm:px-6 font-medium whitespace-nowrap ${filter === 'pending' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
              Pendentes (
              {applications.filter(a => a.status === 'pending').length})
            </button>
            <button onClick={() => setFilter('approved')} className={`flex-1 py-4 px-4 sm:px-6 font-medium whitespace-nowrap ${filter === 'approved' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
              Aprovados (
              {applications.filter(a => a.status === 'approved').length})
            </button>
            <button onClick={() => setFilter('rejected')} className={`flex-1 py-4 px-4 sm:px-6 font-medium whitespace-nowrap ${filter === 'rejected' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
              Rejeitados (
              {applications.filter(a => a.status === 'rejected').length})
            </button>
          </div>
        </div>
        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map(application => <div key={application.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {application.studentName}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {application.course} - {application.semester} Semestre
                  </p>
                  <p className="text-sm text-gray-500">
                    {application.university}
                  </p>
                </div>
                <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2">
                  <p className="text-sm text-gray-600">
                    {application.appliedDate}
                  </p>
                  {application.status === 'pending' && <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium whitespace-nowrap">
                      Pendente
                    </span>}
                  {application.status === 'approved' && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium whitespace-nowrap">
                      Aprovado
                    </span>}
                  {application.status === 'rejected' && <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium whitespace-nowrap">
                      Rejeitado
                    </span>}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-4 border-t border-gray-200">
                <a href={`mailto:${application.email}`} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm sm:text-base break-all">
                  <MailIcon className="w-4 h-4 flex-shrink-0" />
                  <span>{application.email}</span>
                </a>
                {application.status === 'pending' && <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <button onClick={() => updateStatus(application.id, 'rejected')} className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium w-full sm:w-auto">
                      <XCircleIcon className="w-4 h-4" />
                      <span>Rejeitar</span>
                    </button>
                    <button onClick={() => updateStatus(application.id, 'approved')} className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium w-full sm:w-auto">
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>Aprovar</span>
                    </button>
                  </div>}
              </div>
            </div>)}
        </div>
        {filteredApplications.length === 0 && <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">
              Nenhuma candidatura{' '}
              {filter !== 'all' && `${filter === 'pending' ? 'pendente' : filter === 'approved' ? 'aprovada' : 'rejeitada'}`}{' '}
              encontrada.
            </p>
          </div>}
      </div>
    </div>;
}