import React, { useMemo, useState } from 'react';
import { SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { JobCard } from '../components/JobCard';
import { useJobs } from '../contexts/JobContext';
export function JobSearch() {
  const { jobs: allJobs } = useJobs();
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    modality: [] as string[],
    workload: [] as string[],
    schedule: [] as string[],
    minFlexScore: 0,
    accessibility: [] as string[]
  });
  const [sortBy, setSortBy] = useState('recent');
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
  const filteredJobs = useMemo(() => {
    let result = allJobs;
    if (searchTerm) {
      result = result.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase()) || job.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filters.modality.length > 0) {
      result = result.filter(job => {
        const modalityMap: {
          [key: string]: string;
        } = {
          Remoto: 'remote',
          Híbrido: 'hybrid',
          Presencial: 'onsite'
        };
        return filters.modality.some(m => modalityMap[m] === job.modality);
      });
    }
    if (filters.workload.length > 0) {
      result = result.filter(job => {
        const hours = parseInt(job.workload);
        return filters.workload.some(w => {
          if (w === 'Até 20h/semana') return hours <= 20;
          if (w === '20-30h/semana') return hours > 20 && hours <= 30;
          if (w === 'Acima de 30h/semana') return hours > 30;
          return false;
        });
      });
    }
    if (filters.schedule.length > 0) {
      result = result.filter(job => filters.schedule.some(s => job.schedule.some(js => js.toLowerCase().includes(s.toLowerCase()))));
    }
    if (filters.minFlexScore > 0) {
      result = result.filter(job => job.flexScore >= filters.minFlexScore);
    }
    if (filters.accessibility.length > 0) {
      result = result.filter(job => filters.accessibility.some(a => job.accessibility.some(ja => ja.toLowerCase().includes(a.toLowerCase()))));
    }
    if (sortBy === 'flexScore') {
      result = [...result].sort((a, b) => b.flexScore - a.flexScore);
    } else if (sortBy === 'workload') {
      result = [...result].sort((a, b) => parseInt(a.workload) - parseInt(b.workload));
    }
    return result;
  }, [searchTerm, filters, sortBy, allJobs]);
  return <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Buscar Vagas
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 sm:gap-0">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Buscar por cargo, empresa..." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2 w-full sm:w-auto">
              <SlidersHorizontalIcon className="w-5 h-5" />
              <span className="font-medium">Filtros</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Modal */}
          {showFilters && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={() => setShowFilters(false)}>
              <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Filtros Avançados
                  </h2>
                  <button onClick={() => setShowFilters(false)}>
                    <XIcon className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Modalidade
                    </h3>
                    <div className="space-y-2">
                      {['Remoto', 'Híbrido', 'Presencial'].map(option => <label key={option} className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-600 mr-2" checked={filters.modality.includes(option)} onChange={() => toggleFilter('modality', option)} />
                          <span className="text-gray-700">{option}</span>
                        </label>)}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Jornada</h3>
                    <div className="space-y-2">
                      {['Até 20h/semana', '20-30h/semana', 'Acima de 30h/semana'].map(option => <label key={option} className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-600 mr-2" checked={filters.workload.includes(option)} onChange={() => toggleFilter('workload', option)} />
                          <span className="text-gray-700">{option}</span>
                        </label>)}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Horário</h3>
                    <div className="space-y-2">
                      {['Manhã', 'Tarde', 'Noite', 'Horários flexíveis'].map(option => <label key={option} className="flex items-center">
                            <input type="checkbox" className="rounded text-blue-600 mr-2" checked={filters.schedule.includes(option)} onChange={() => toggleFilter('schedule', option)} />
                            <span className="text-gray-700">{option}</span>
                          </label>)}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Flex-Score Mínimo
                    </h3>
                    <input type="range" min="0" max="100" step="10" className="w-full" value={filters.minFlexScore} onChange={e => setFilters({
                  ...filters,
                  minFlexScore: parseInt(e.target.value)
                })} />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>0</span>
                      <span className="font-medium text-blue-600">
                        {filters.minFlexScore}
                      </span>
                      <span>100</span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Acessibilidade
                    </h3>
                    <div className="space-y-2">
                      {['Rampas de acesso', 'Banheiros adaptados', 'Software de leitura', 'Equipamento fornecido'].map(option => <label key={option} className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-600 mr-2" checked={filters.accessibility.includes(option)} onChange={() => toggleFilter('accessibility', option)} />
                          <span className="text-gray-700 text-sm">
                            {option}
                          </span>
                        </label>)}
                    </div>
                  </div>
                  <button onClick={() => setFilters({
                modality: [],
                workload: [],
                schedule: [],
                minFlexScore: 0,
                accessibility: []
              })} className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium mb-2">
                    Limpar Filtros
                  </button>
                  <button onClick={() => setShowFilters(false)} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            </div>}
          {/* Desktop Filters */}
          {showFilters && <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                  Filtros Avançados
                </h2>
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Modalidade</h3>
                  <div className="space-y-2">
                    {['Remoto', 'Híbrido', 'Presencial'].map(option => <label key={option} className="flex items-center">
                        <input type="checkbox" className="rounded text-blue-600 mr-2" checked={filters.modality.includes(option)} onChange={() => toggleFilter('modality', option)} />
                        <span className="text-gray-700">{option}</span>
                      </label>)}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Jornada</h3>
                  <div className="space-y-2">
                    {['Até 20h/semana', '20-30h/semana', 'Acima de 30h/semana'].map(option => <label key={option} className="flex items-center">
                        <input type="checkbox" className="rounded text-blue-600 mr-2" checked={filters.workload.includes(option)} onChange={() => toggleFilter('workload', option)} />
                        <span className="text-gray-700">{option}</span>
                      </label>)}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Horário</h3>
                  <div className="space-y-2">
                    {['Manhã', 'Tarde', 'Noite', 'Horários flexíveis'].map(option => <label key={option} className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-600 mr-2" checked={filters.schedule.includes(option)} onChange={() => toggleFilter('schedule', option)} />
                          <span className="text-gray-700">{option}</span>
                        </label>)}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Flex-Score Mínimo
                  </h3>
                  <input type="range" min="0" max="100" step="10" className="w-full" value={filters.minFlexScore} onChange={e => setFilters({
                ...filters,
                minFlexScore: parseInt(e.target.value)
              })} />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>0</span>
                    <span className="font-medium text-blue-600">
                      {filters.minFlexScore}
                    </span>
                    <span>100</span>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Acessibilidade
                  </h3>
                  <div className="space-y-2">
                    {['Rampas de acesso', 'Banheiros adaptados', 'Software de leitura', 'Equipamento fornecido'].map(option => <label key={option} className="flex items-center">
                        <input type="checkbox" className="rounded text-blue-600 mr-2" checked={filters.accessibility.includes(option)} onChange={() => toggleFilter('accessibility', option)} />
                        <span className="text-gray-700 text-sm">{option}</span>
                      </label>)}
                  </div>
                </div>
                <button onClick={() => setFilters({
              modality: [],
              workload: [],
              schedule: [],
              minFlexScore: 0,
              accessibility: []
            })} className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium mb-2">
                  Limpar Filtros
                </button>
              </div>
            </div>}
          <div className="flex-1 min-w-0">
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  {filteredJobs.length}
                </span>{' '}
                vagas encontradas
              </p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="recent">Mais recentes</option>
                <option value="flexScore">Maior Flex-Score</option>
                <option value="workload">Menor jornada</option>
              </select>
            </div>
            <div className="space-y-4">
              {filteredJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
            {filteredJobs.length === 0 && <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Nenhuma vaga encontrada com os filtros selecionados.
                </p>
                <button onClick={() => {
              setFilters({
                modality: [],
                workload: [],
                schedule: [],
                minFlexScore: 0,
                accessibility: []
              });
              setSearchTerm('');
            }} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Limpar todos os filtros
                </button>
              </div>}
          </div>
        </div>
      </div>
    </div>;
}