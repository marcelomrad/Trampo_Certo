import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon, UploadIcon, FileTextIcon, XIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { useJobs } from '../contexts/JobContext';
import { useAuth } from '../contexts/AuthContext';

interface AccessibilityDoc {
  name: string;
  size: string;
  verified: boolean;
}

export function PostJob() {
  const navigate = useNavigate();
  const { addJob } = useJobs();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    modality: 'remote' as 'remote' | 'hybrid' | 'onsite',
    workload: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    accessibility: '',
    schedule: [] as string[]
  });
  const [accessibilityDocs, setAccessibilityDocs] = useState<AccessibilityDoc[]>([]);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newDocs: AccessibilityDoc[] = Array.from(files).map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      verified: false
    }));

    setAccessibilityDocs([...accessibilityDocs, ...newDocs]);
  };

  const removeDoc = (index: number) => {
    setAccessibilityDocs(accessibilityDocs.filter((_, i) => i !== index));
  };

  const verifyDocuments = () => {
    setShowValidationError(false);
    setValidationMessage('');

    // PONTO-CHAVE 4: Validação de documentos
    if (accessibilityDocs.length === 0) {
      setValidationMessage('Por favor, anexe pelo menos um documento de acessibilidade (laudo médico, fotos das instalações, certificados, etc.)');
      setShowValidationError(true);
      return false;
    }

    // Simular verificação (em produção, seria feita no backend)
    // Para o MVP, vamos aceitar qualquer documento anexado
    const updatedDocs = accessibilityDocs.map(doc => ({
      ...doc,
      verified: true
    }));
    setAccessibilityDocs(updatedDocs);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // PONTO-CHAVE 4: Verificar documentos antes de continuar
    if (!verifyDocuments()) {
      // RUPTURA: Permanece na mesma página com mensagem de erro
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // PONTO-CHAVE 5: SUCESSO - Calcular Flex-Score
    let flexScore = 50;
    if (formData.modality === 'remote') flexScore += 20;
    if (formData.modality === 'hybrid') flexScore += 10;
    if (formData.schedule.includes('Horários flexíveis')) flexScore += 15;
    const workloadHours = parseInt(formData.workload);
    if (workloadHours <= 20) flexScore += 15;
    
    // Adicionar bônus por documentação de acessibilidade
    if (accessibilityDocs.length > 0) flexScore += 10;
    
    // Determinar selos de acessibilidade baseado nos recursos
    const accessibilityBadges: string[] = [];
    if (formData.modality === 'remote') accessibilityBadges.push('Trabalho Remoto');
    if (formData.schedule.includes('Horários flexíveis')) accessibilityBadges.push('Horários Flexíveis');
    if (formData.accessibility.toLowerCase().includes('cadeirante')) accessibilityBadges.push('Acessível para Cadeirantes');
    if (formData.accessibility.toLowerCase().includes('visual') || formData.accessibility.toLowerCase().includes('cego')) accessibilityBadges.push('Acessível para Deficientes Visuais');
    
    // PONTO-CHAVE 5: Navegar para pré-visualização com todos os dados
    navigate('/empresa/preview-vaga', {
      state: {
        title: formData.title,
        company: user?.companyName || user?.name || 'Empresa',
        location: formData.location,
        modality: formData.modality,
        workload: formData.workload,
        flexScore: Math.min(flexScore, 100),
        salary: formData.salary,
        description: formData.description,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        benefits: formData.benefits.split('\n').filter(b => b.trim()),
        accessibility: formData.accessibility.split('\n').filter(a => a.trim()),
        schedule: formData.schedule,
        accessibilityDocs: accessibilityDocs,
        accessibilityBadges: accessibilityBadges
      }
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const scheduleOptions = ['Manhã', 'Tarde', 'Noite', 'Horários flexíveis'];
  const toggleSchedule = (schedule: string) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.includes(schedule) ? prev.schedule.filter(s => s !== schedule) : [...prev.schedule, schedule]
    }));
  };
  return <div className="w-full bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Postar Nova Vaga
            </h1>
            <p className="text-gray-600">
              Preencha os detalhes da oportunidade
            </p>
          </div>

          {/* PONTO-CHAVE 4: Mensagem de erro de validação */}
          {showValidationError && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start">
              <AlertCircleIcon className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Documentação Incompleta</h3>
                <p className="text-red-700 text-sm">{validationMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título da Vaga *
              </label>
              <input type="text" name="title" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex: Estágio em Desenvolvimento Web" value={formData.title} onChange={handleChange} />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização *
                </label>
                <input type="text" name="location" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex: São Paulo, SP" value={formData.location} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modalidade *
                </label>
                <select name="modality" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData.modality} onChange={handleChange}>
                  <option value="remote">Remoto</option>
                  <option value="hybrid">Híbrido</option>
                  <option value="onsite">Presencial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jornada Semanal *
                </label>
                <input type="text" name="workload" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex: 20h/semana" value={formData.workload} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bolsa/Salário
                </label>
                <input type="text" name="salary" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex: R$ 1.500/mês" value={formData.salary} onChange={handleChange} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horários Disponíveis *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {scheduleOptions.map(schedule => <button key={schedule} type="button" onClick={() => toggleSchedule(schedule)} className={`py-2 px-4 rounded-lg border-2 font-medium transition-colors ${formData.schedule.includes(schedule) ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}>
                    {schedule}
                  </button>)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição da Vaga *
              </label>
              <textarea name="description" required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Descreva as responsabilidades e o que o candidato fará..." value={formData.description} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requisitos *
              </label>
              <textarea name="requirements" required rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Liste os requisitos, um por linha..." value={formData.requirements} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefícios
              </label>
              <textarea name="benefits" rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Liste os benefícios oferecidos..." value={formData.benefits} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recursos de Acessibilidade
              </label>
              <textarea name="accessibility" rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Liste os recursos de acessibilidade disponíveis..." value={formData.accessibility} onChange={handleChange} />
            </div>

            {/* PONTO-CHAVE 2 e 3: Seção de Upload de Documentos de Acessibilidade */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Documentação de Acessibilidade *
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Anexe laudos médicos, fotos das instalações acessíveis, certificados ou outros documentos que comprovem os recursos de acessibilidade oferecidos.
              </p>
              
              <div className="mb-4">
                <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <div className="text-center">
                    <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Clique para fazer upload
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, JPG, PNG até 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Lista de documentos anexados */}
              {accessibilityDocs.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Documentos Anexados:
                  </p>
                  {accessibilityDocs.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center flex-1">
                        <FileTextIcon className="w-5 h-5 text-blue-600 mr-3" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.size}</p>
                        </div>
                        {doc.verified && (
                          <span className="flex items-center text-green-600 text-sm font-medium mr-3">
                            <CheckCircleIcon className="w-4 h-4 mr-1" />
                            Verificado
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDoc(index)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <XIcon className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <button type="button" onClick={() => navigate('/empresa/dashboard')} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">
                Cancelar
              </button>
              <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center space-x-2">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Verificar e Pré-visualizar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
}