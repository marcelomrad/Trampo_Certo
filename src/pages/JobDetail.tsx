import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPinIcon, ClockIcon, BriefcaseIcon, CalendarIcon, CheckCircleIcon, ArrowLeftIcon } from 'lucide-react';
import { FlexScore } from '../components/FlexScore';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobContext';
export function JobDetail() {
  const {
    id
  } = useParams();
  const {
    user,
    isAuthenticated
  } = useAuth();
  const { getJobById, applyToJob, hasApplied: checkHasApplied } = useJobs();
  const navigate = useNavigate();
  const [hasApplied, setHasApplied] = useState(false);
  
  const job = getJobById(id || '');
  
  useEffect(() => {
    if (user && id) {
      setHasApplied(checkHasApplied(id, user.id));
    }
  }, [id, user, checkHasApplied]);
  
  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.type !== 'student') {
      alert('Apenas estudantes podem se candidatar a vagas');
      return;
    }
    if (!id || !user) return;
    
    const success = applyToJob(id, {
      id: user.id,
      name: user.name,
      email: user.email
    });
    
    if (success) {
      setHasApplied(true);
      alert('Candidatura enviada com sucesso!');
    } else {
      alert('Você já se candidatou a esta vaga!');
    }
  };
  
  if (!job) {
    return (
      <div className="w-full bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vaga não encontrada</h1>
          <Link to="/vagas" className="text-blue-600 hover:text-blue-700">
            Voltar para busca de vagas
          </Link>
        </div>
      </div>
    );
  }
  const modalityLabels: { [key: string]: string } = {
    remote: 'Remoto',
    hybrid: 'Híbrido',
    onsite: 'Presencial'
  };
  return <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to={user?.type === 'company' ? '/empresa/dashboard' : '/vagas'} className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          {user?.type === 'company' ? 'Voltar ao dashboard' : 'Voltar para busca'}
        </Link>
        {user?.type === 'company' && (
          <div className="mb-6">
            <button
              onClick={() => navigate(`/empresa/editar-vaga/${id}`)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Editar Vaga
            </button>
          </div>
        )}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <p className="text-xl text-gray-600 font-medium">
                  {job.company}
                </p>
              </div>
              <FlexScore score={job.flexScore} size="large" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPinIcon className="w-5 h-5 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BriefcaseIcon className="w-5 h-5 mr-2" />
                <span>{modalityLabels[job.modality]}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ClockIcon className="w-5 h-5 mr-2" />
                <span>{job.workload}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="w-5 h-5 mr-2" />
                <span>{job.postedDate}</span>
              </div>
            </div>
            {job.salary && <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-lg font-semibold">
                {job.salary}
              </div>}
          </div>
          {/* Flex Score Details */}
          <div className="p-8 bg-blue-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Detalhes do Flex-Score
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Trabalho Remoto</p>
                  <p className="text-sm text-gray-600">
                    100% remoto, sem necessidade de deslocamento
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    Horários Flexíveis
                  </p>
                  <p className="text-sm text-gray-600">
                    Você escolhe quando trabalhar
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Jornada Reduzida</p>
                  <p className="text-sm text-gray-600">Apenas 20h semanais</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    Equipamento Fornecido
                  </p>
                  <p className="text-sm text-gray-600">
                    Empresa fornece todo o equipamento necessário
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Sobre a Vaga
            </h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>
          {/* Requirements */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Requisitos
            </h2>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => <li key={index} className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </li>)}
            </ul>
          </div>
          {/* Benefits */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Benefícios
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {job.benefits.map((benefit, index) => <div key={index} className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>)}
            </div>
          </div>
          {/* Accessibility */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recursos de Acessibilidade
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {job.accessibility.map((item, index) => <div key={index} className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>)}
            </div>
          </div>
          {/* Apply Section */}
          {user?.type !== 'company' && (
            <div className="p-8 bg-gray-50">
              {hasApplied ? <div className="text-center py-4">
                  <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Candidatura Enviada!
                  </p>
                  <p className="text-gray-600">
                    Você receberá atualizações sobre sua candidatura por email.
                  </p>
                </div> : <>
                  <button onClick={handleApply} className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
                    Candidatar-se a esta Vaga
                  </button>
                  <p className="text-center text-sm text-gray-600 mt-4">
                    {!isAuthenticated ? 'Você precisa estar logado para se candidatar' : 'Ao se candidatar, você concorda com nossos termos de uso'}
                  </p>
                </>}
            </div>
          )}
        </div>
      </div>
    </div>;
}