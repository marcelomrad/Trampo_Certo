import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleIcon, BriefcaseIcon, UsersIcon, EyeIcon } from 'lucide-react';
import { useJobs } from '../contexts/JobContext';
export function CompanyDashboard() {
  const { jobs: allJobs, getApplicationsByJob } = useJobs();
  
  // Transformar as vagas para o formato do dashboard
  const jobs = allJobs.map(job => ({
    id: job.id,
    title: job.title,
    postedDate: job.postedDate,
    applications: getApplicationsByJob(job.id).length,
    status: 'active'
  }));
  return <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard da Empresa
            </h1>
            <p className="text-gray-600">Gerencie suas vagas e candidaturas</p>
          </div>
          <Link to="/empresa/postar-vaga" className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
            <PlusCircleIcon className="w-5 h-5" />
            <span>Postar Nova Vaga</span>
          </Link>
        </div>
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Vagas Ativas</h3>
              <BriefcaseIcon className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">
                Total de Candidaturas
              </h3>
              <UsersIcon className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {jobs.reduce((sum, job) => sum + job.applications, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Visualizações</h3>
              <EyeIcon className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">342</p>
          </div>
        </div>
        {/* Jobs List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Suas Vagas</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {jobs.map(job => <div key={job.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Publicado em {job.postedDate}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Ativa
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <UsersIcon className="w-5 h-5" />
                    <span className="font-medium">
                      {job.applications} candidaturas
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <Link to={`/vaga/${job.id}`} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                      Ver Vaga
                    </Link>
                    <Link to={`/empresa/candidatos/${job.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      Ver Candidatos
                    </Link>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}