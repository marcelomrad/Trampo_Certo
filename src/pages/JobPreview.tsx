import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, ShieldCheckIcon, MapPinIcon, ClockIcon, BriefcaseIcon } from 'lucide-react';
import { FlexScore } from '../components/FlexScore';
import { useJobs } from '../contexts/JobContext';

interface JobPreviewData {
  title: string;
  company: string;
  location: string;
  modality: 'remote' | 'hybrid' | 'onsite';
  workload: string;
  flexScore: number;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  accessibility: string[];
  schedule: string[];
  accessibilityDocs: { name: string; verified: boolean }[];
  accessibilityBadges: string[];
}

export function JobPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addJob } = useJobs();
  const jobData = location.state as JobPreviewData;

  if (!jobData) {
    navigate('/empresa/postar-vaga');
    return null;
  }

  const modalityLabels: { [key: string]: string } = {
    remote: 'Remoto',
    hybrid: 'Híbrido',
    onsite: 'Presencial'
  };

  const handlePublish = () => {
    // Publicar a vaga
    const newJob = {
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      modality: jobData.modality,
      workload: jobData.workload,
      flexScore: jobData.flexScore,
      salary: jobData.salary,
      description: jobData.description,
      requirements: jobData.requirements,
      benefits: jobData.benefits,
      accessibility: jobData.accessibility,
      schedule: jobData.schedule,
      category: 'Geral'
    };
    
    addJob(newJob);
    alert('Vaga publicada com sucesso!');
    navigate('/empresa/dashboard');
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/empresa/postar-vaga')}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Voltar e editar
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                Pré-visualização
              </span>
              <FlexScore score={jobData.flexScore} size="large" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{jobData.title}</h1>
            <p className="text-xl opacity-90">{jobData.company}</p>
          </div>

          {/* Job Info */}
          <div className="p-8 border-b border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
                <span>{jobData.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BriefcaseIcon className="w-5 h-5 mr-2 text-blue-600" />
                <span>{modalityLabels[jobData.modality]}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ClockIcon className="w-5 h-5 mr-2 text-blue-600" />
                <span>{jobData.workload}</span>
              </div>
              {jobData.salary && (
                <div className="text-gray-900 font-semibold">
                  {jobData.salary}
                </div>
              )}
            </div>
          </div>

          {/* Accessibility Badges */}
          {jobData.accessibilityBadges.length > 0 && (
            <div className="p-8 bg-purple-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ShieldCheckIcon className="w-6 h-6 mr-2 text-purple-600" />
                Selos de Acessibilidade Verificados
              </h2>
              <div className="flex flex-wrap gap-3">
                {jobData.accessibilityBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-purple-600 text-white rounded-full font-medium flex items-center space-x-2"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Flex-Score Details */}
          <div className="p-8 bg-blue-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Por que este Flex-Score de {jobData.flexScore}?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {jobData.modality === 'remote' && (
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Trabalho 100% Remoto</p>
                    <p className="text-sm text-gray-600">+20 pontos</p>
                  </div>
                </div>
              )}
              {jobData.schedule.includes('Horários flexíveis') && (
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Horários Flexíveis</p>
                    <p className="text-sm text-gray-600">+15 pontos</p>
                  </div>
                </div>
              )}
              {parseInt(jobData.workload) <= 20 && (
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Jornada Reduzida</p>
                    <p className="text-sm text-gray-600">+15 pontos</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Sobre a Vaga
            </h2>
            <p className="text-gray-700 leading-relaxed">{jobData.description}</p>
          </div>

          {/* Requirements */}
          {jobData.requirements.length > 0 && (
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Requisitos
              </h2>
              <ul className="space-y-2">
                {jobData.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {jobData.benefits.length > 0 && (
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Benefícios
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {jobData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accessibility Features */}
          {jobData.accessibility.length > 0 && (
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recursos de Acessibilidade
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {jobData.accessibility.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accessibility Documentation */}
          {jobData.accessibilityDocs.length > 0 && (
            <div className="p-8 bg-green-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Documentação de Acessibilidade
              </h2>
              <div className="space-y-2">
                {jobData.accessibilityDocs.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                  >
                    <span className="text-gray-700">{doc.name}</span>
                    {doc.verified && (
                      <span className="flex items-center text-green-600 font-medium">
                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                        Verificado
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Observações */}
          <div className="p-8 bg-yellow-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Observações Importantes
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Esta vaga foi verificada e atende aos critérios de acessibilidade da plataforma</li>
              <li>• Os recursos de acessibilidade foram documentados e aprovados</li>
              <li>• Candidatos com necessidades especiais terão suporte adequado</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="p-8 bg-gray-50 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/empresa/postar-vaga')}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100"
            >
              Voltar e Editar
            </button>
            <button
              onClick={handlePublish}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Confirmar e Publicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
