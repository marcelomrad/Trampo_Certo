import React, { useState } from 'react';
import { UserIcon, MailIcon, PhoneIcon, GraduationCapIcon, BookOpenIcon, CalendarIcon, FileTextIcon, EditIcon, SaveIcon, XIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
export function StudentProfile() {
  const {
    user
  } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(11) 98765-4321',
    university: 'Universidade de São Paulo',
    course: 'Ciência da Computação',
    semester: '5º Semestre',
    bio: 'Estudante apaixonado por tecnologia e inovação, buscando oportunidades de estágio na área de desenvolvimento web.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Git'],
    interests: ['Desenvolvimento Web', 'Inteligência Artificial', 'UX/UI Design'],
    accessibility: ['Horários flexíveis', 'Trabalho remoto']
  });
  const handleSave = () => {
    setIsEditing(false);
    // In production, save to API
  };
  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
  };
  return <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Meu Perfil
            </h1>
            <p className="text-gray-600">
              Gerencie suas informações pessoais e acadêmicas
            </p>
          </div>
          {!isEditing ? <button onClick={() => setIsEditing(true)} className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium w-full sm:w-auto">
              <EditIcon className="w-5 h-5" />
              <span>Editar Perfil</span>
            </button> : <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button onClick={handleCancel} className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                <XIcon className="w-5 h-5" />
                <span>Cancelar</span>
              </button>
              <button onClick={handleSave} className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                <SaveIcon className="w-5 h-5" />
                <span>Salvar</span>
              </button>
            </div>}
        </div>
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <UserIcon className="w-6 h-6 mr-2 text-blue-600" />
              Informações Pessoais
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                {isEditing ? <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={profileData.name} onChange={e => setProfileData({
                ...profileData,
                name: e.target.value
              })} /> : <p className="text-gray-900">{profileData.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="flex items-center space-x-2">
                  <MailIcon className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-900 break-all">{profileData.email}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                {isEditing ? <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={profileData.phone} onChange={e => setProfileData({
                ...profileData,
                phone: e.target.value
              })} /> : <div className="flex items-center space-x-2">
                    <PhoneIcon className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900">{profileData.phone}</p>
                  </div>}
              </div>
            </div>
          </div>
          {/* Academic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <GraduationCapIcon className="w-6 h-6 mr-2 text-blue-600" />
              Informações Acadêmicas
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Universidade
                </label>
                {isEditing ? <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={profileData.university} onChange={e => setProfileData({
                ...profileData,
                university: e.target.value
              })} /> : <div className="flex items-center space-x-2">
                    <BookOpenIcon className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900">{profileData.university}</p>
                  </div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Curso
                </label>
                {isEditing ? <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={profileData.course} onChange={e => setProfileData({
                ...profileData,
                course: e.target.value
              })} /> : <p className="text-gray-900">{profileData.course}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semestre
                </label>
                {isEditing ? <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={profileData.semester} onChange={e => setProfileData({
                ...profileData,
                semester: e.target.value
              })} /> : <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900">{profileData.semester}</p>
                  </div>}
              </div>
            </div>
          </div>
          {/* Bio */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Sobre Mim
            </h2>
            {isEditing ? <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={profileData.bio} onChange={e => setProfileData({
            ...profileData,
            bio: e.target.value
          })} /> : <p className="text-gray-700">{profileData.bio}</p>}
          </div>
          {/* Skills */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Habilidades
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {skill}
                </span>)}
              {isEditing && <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-600 rounded-full text-sm font-medium hover:border-blue-400 hover:text-blue-600">
                  + Adicionar
                </button>}
            </div>
          </div>
          {/* Interests */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Áreas de Interesse
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileData.interests.map((interest, index) => <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {interest}
                </span>)}
              {isEditing && <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-600 rounded-full text-sm font-medium hover:border-green-400 hover:text-green-600">
                  + Adicionar
                </button>}
            </div>
          </div>
          {/* Accessibility */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Necessidades de Acessibilidade
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileData.accessibility.map((item, index) => <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {item}
                </span>)}
              {isEditing && <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-600 rounded-full text-sm font-medium hover:border-purple-400 hover:text-purple-600">
                  + Adicionar
                </button>}
            </div>
          </div>
          {/* Resume */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileTextIcon className="w-6 h-6 mr-2 text-blue-600" />
              Currículo
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-gray-700 mb-1">curriculo_joao_silva.pdf</p>
                <p className="text-sm text-gray-500">
                  Atualizado em 15/01/2024
                </p>
              </div>
              <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium w-full sm:w-auto">
                Atualizar Currículo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}