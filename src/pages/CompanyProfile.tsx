import React, { useState, useEffect } from 'react';
import { BuildingIcon, MailIcon, PhoneIcon, GlobeIcon, FileTextIcon, EditIcon, SaveIcon, XIcon, UsersIcon, TargetIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
export function CompanyProfile() {
  const {
    user,
    updateProfile
  } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    companyName: user?.companyName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    website: user?.website || '',
    cnpj: user?.cnpj || '',
    description: user?.description || '',
    mission: 'Transformar negócios através da tecnologia, criando soluções que impactam positivamente a sociedade.',
    values: ['Inovação', 'Diversidade', 'Inclusão', 'Excelência', 'Colaboração'],
    benefits: ['Vale transporte', 'Vale refeição', 'Plano de saúde', 'Horário flexível', 'Home office', 'Auxílio educação'],
    culture: 'Valorizamos a diversidade e a inclusão, oferecendo um ambiente acolhedor onde todos podem crescer e se desenvolver profissionalmente.'
  });
  
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        companyName: user.companyName || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || '',
        cnpj: user.cnpj || '',
        description: user.description || ''
      }));
    }
  }, [user]);
  const handleSave = () => {
    updateProfile({
      companyName: profileData.companyName,
      phone: profileData.phone,
      website: profileData.website,
      description: profileData.description
    });
    setIsEditing(false);
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
              Perfil da Empresa
            </h1>
            <p className="text-gray-600">
              Gerencie as informações da sua empresa
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
          {/* Company Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <BuildingIcon className="w-6 h-6 mr-2 text-blue-600" />
              Informações da Empresa
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Empresa
                </label>
                {isEditing ? <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={profileData.companyName} onChange={e => setProfileData({
                ...profileData,
                companyName: e.target.value
              })} /> : <p className="text-gray-900">{profileData.companyName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNPJ
                </label>
                <p className="text-gray-900">{profileData.cnpj}</p>
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
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                {isEditing ? <input type="url" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={profileData.website} onChange={e => setProfileData({
                ...profileData,
                website: e.target.value
              })} /> : <div className="flex items-center space-x-2">
                    <GlobeIcon className="w-5 h-5 text-gray-400" />
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 break-all">
                      {profileData.website}
                    </a>
                  </div>}
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileTextIcon className="w-6 h-6 mr-2 text-blue-600" />
              Descrição da Empresa
            </h2>
            {isEditing ? <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={profileData.description} onChange={e => setProfileData({
            ...profileData,
            description: e.target.value
          })} /> : <p className="text-gray-700">{profileData.description}</p>}
          </div>
          {/* Mission */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <TargetIcon className="w-6 h-6 mr-2 text-blue-600" />
              Missão
            </h2>
            {isEditing ? <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={profileData.mission} onChange={e => setProfileData({
            ...profileData,
            mission: e.target.value
          })} /> : <p className="text-gray-700">{profileData.mission}</p>}
          </div>
          {/* Values */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Valores
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileData.values.map((value, index) => <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {value}
                </span>)}
              {isEditing && <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-600 rounded-full text-sm font-medium hover:border-blue-400 hover:text-blue-600">
                  + Adicionar
                </button>}
            </div>
          </div>
          {/* Benefits */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Benefícios Oferecidos
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileData.benefits.map((benefit, index) => <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {benefit}
                </span>)}
              {isEditing && <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-600 rounded-full text-sm font-medium hover:border-green-400 hover:text-green-600">
                  + Adicionar
                </button>}
            </div>
          </div>
          {/* Culture */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <UsersIcon className="w-6 h-6 mr-2 text-blue-600" />
              Cultura e Ambiente
            </h2>
            {isEditing ? <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={profileData.culture} onChange={e => setProfileData({
            ...profileData,
            culture: e.target.value
          })} /> : <p className="text-gray-700">{profileData.culture}</p>}
          </div>
        </div>
      </div>
    </div>;
}