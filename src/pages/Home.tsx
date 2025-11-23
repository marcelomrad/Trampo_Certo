import React from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, TrendingUpIcon, UsersIcon, HeartIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
export function Home() {
  const { isAuthenticated, user } = useAuth();
  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Encontre o Estágio que se Adapta à Sua Realidade
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              A primeira plataforma de estágios e bolsas focada em flexibilidade
              e inclusão. Conectamos estudantes com empresas que valorizam a
              diversidade.
            </p>
            {(!isAuthenticated || user?.type === 'student') && (
              <Link to="/vagas" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                <SearchIcon className="w-5 h-5 mr-2" />
                Buscar Vagas Agora
              </Link>
            )}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Por que o Trampo Certo é Diferente?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUpIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Flex-Score
              </h3>
              <p className="text-gray-600">
                Cada vaga tem uma pontuação de flexibilidade, para você
                encontrar oportunidades que realmente se encaixam na sua rotina.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Filtros Avançados
              </h3>
              <p className="text-gray-600">
                Busque por jornada, modalidade, horários flexíveis e recursos de
                acessibilidade específicos para suas necessidades.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Inclusão Real
              </h3>
              <p className="text-gray-600">
                Empresas comprometidas com diversidade e dispostas a oferecer
                condições adaptadas às diferentes realidades dos estudantes.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Encontrar Sua Oportunidade?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Junte-se a centenas de estudantes que já encontraram estágios
              flexíveis e inclusivos.
            </p>
            {!isAuthenticated && (
              <div className="flex justify-center space-x-4">
                <Link to="/vagas" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Sou Estudante
                </Link>
                <button className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white">
                  Sou Empresa
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>;
}