import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleIcon, BriefcaseIcon, UsersIcon, EyeIcon, SlidersHorizontalIcon } from 'lucide-react';
import { useJobs } from '../contexts/JobContext';
export function CompanyDashboard() {
  const { jobs: allJobs, getApplicationsByJob } = useJobs();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    schedule: [] as string[],
    minFlexScore: 0,
    accessibility: [] as string[]
  });
  
  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const currentArray = prev[category] as string[];
      const newArray = currentArray.includes(value) ? currentArray.filter(item => item !== value) : [...currentArray, value];
      return {
        ...prev,
        [category]: newArray
      };
    });
  };
  
  // Transformar as vagas para o formato do dashboard
  const jobs = useMemo(() => {
    let result = allJobs;
    
    if (filters.schedule.length > 0) {
      result = result.filter(job => filters.schedule.some(s => job.schedule.some(js => js.toLowerCase().includes(s.toLowerCase()))));
    }
    if (filters.minFlexScore > 0) {
      result = result.filter(job => job.flexScore >= filters.minFlexScore);
    }
    if (filters.accessibility.length > 0) {
      result = result.filter(job => filters.accessibility.some(a => job.accessibility.some(ja => ja.toLowerCase().includes(a.toLowerCase()))));
    }
    
    return result.map(job => ({
      id: job.id,
      title: job.title,
      postedDate: job.postedDate,
      applications: getApplicationsByJob(job.id).length,
      status: 'active'
    }));
  }, [allJobs, filters, getApplicationsByJob]);
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
        {/* Filter Button */}
        <div className="mb-6">
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <SlidersHorizontalIcon className="w-5 h-5" />
            <span className="font-medium">Filtros</span>
          </button>
        </div>
        {/* Filters */}
        {showFilters && <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Filtros</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Horário</h3>
                <div className="space-y-2">
                  {['Manhã', 'Tarde', 'Noite', 'Horários flexíveis'].map(option => <label key={option} className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600 mr-2" checked={filters.schedule.includes(option)} onChange={() => toggleFilter('schedule', option)} />
                      <span className="text-gray-700">{option}</span>
                    </label>)}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Flex-Score Mínimo</h3>
                <input type="range" min="0" max="100" step="10" className="w-full" value={filters.minFlexScore} onChange={e => setFilters({
              ...filters,
              minFlexScore: parseInt(e.target.value)
            })} />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>0</span>
                  <span className="font-medium text-blue-600">{filters.minFlexScore}</span>
                  <span>100</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Acessibilidade</h3>
                <div className="space-y-2">
                  {['Rampas de acesso', 'Banheiros adaptados', 'Software de leitura', 'Equipamento fornecido'].map(option => <label key={option} className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600 mr-2" checked={filters.accessibility.includes(option)} onChange={() => toggleFilter('accessibility', option)} />
                      <span className="text-gray-700 text-sm">{option}</span>
                    </label>)}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setFilters({
            schedule: [],
            minFlexScore: 0,
            accessibility: []
          })} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                Limpar Filtros
              </button>
            </div>
          </div>}
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