import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, MailIcon, GraduationCapIcon, BookOpenIcon, CalendarIcon, FileTextIcon } from 'lucide-react';
import { useJobs } from '../contexts/JobContext';

export function StudentPublicProfile() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { getStudentById } = useJobs();

  const student = getStudentById(studentId || '');

  if (!student) {
    return (
      <div className="w-full bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">Estudante não encontrado.</p>
            <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Voltar
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">{student.name.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{student.name}</h1>
                <p className="text-blue-100">{student.course} - {student.semester} semestre</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Bio */}
            {student.bio && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Sobre</h2>
                <p className="text-gray-600">{student.bio}</p>
              </div>
            )}

            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contato</h2>
              <div className="flex items-center space-x-3">
                <MailIcon className="w-5 h-5 text-gray-400" />
                <a href={`mailto:${student.email}`} className="text-blue-600 hover:text-blue-700">
                  {student.email}
                </a>
              </div>
            </div>

            {/* Academic Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Acadêmicas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <GraduationCapIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Universidade</p>
                    <p className="text-gray-900">{student.university}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpenIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Curso</p>
                    <p className="text-gray-900">{student.course}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Semestre</p>
                    <p className="text-gray-900">{student.semester}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume */}
            {student.resumeUrl && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Currículo</h2>
                <div className="flex items-center space-x-3">
                  <FileTextIcon className="w-5 h-5 text-gray-400" />
                  <a href={student.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">
                    Visualizar Currículo (PDF)
                  </a>
                </div>
              </div>
            )}          </div>
        </div>
      </div>
    </div>
  );
}
