import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job } from '../types/Job';

interface Application {
  id: string;
  jobId: string;
  studentId: string;
  studentName: string;
  email: string;
  university?: string;
  course?: string;
  semester?: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Student {
  id: string;
  name: string;
  email: string;
  university?: string;
  course?: string;
  semester?: string;
  bio?: string;
}

interface JobContextType {
  jobs: Job[];
  applications: Application[];
  students: Student[];
  addJob: (job: Omit<Job, 'id' | 'postedDate'>) => void;
  applyToJob: (jobId: string, studentData: { id: string; name: string; email: string }) => boolean;
  getJobById: (id: string) => Job | undefined;
  getApplicationsByJob: (jobId: string) => Application[];
  getApplicationsByStudent: (studentId: string) => Application[];
  hasApplied: (jobId: string, studentId: string) => boolean;
  getStudentById: (id: string) => Student | undefined;
  updateApplicationStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const STORAGE_KEY_JOBS = 'trampo_certo_jobs';
const STORAGE_KEY_APPLICATIONS = 'trampo_certo_applications';
const STORAGE_KEY_STUDENTS = 'trampo_certo_students';

// Candidaturas fictícias iniciais
const initialApplications: Application[] = [
  {
    id: 'app1',
    jobId: '1',
    studentId: 'student1',
    studentName: 'Ana Clara Silva',
    email: 'ana.silva@email.com',
    university: 'USP',
    course: 'Ciência da Computação',
    semester: '5º',
    appliedDate: '10/11/2025',
    status: 'pending'
  },
  {
    id: 'app2',
    jobId: '1',
    studentId: 'student2',
    studentName: 'Lucas Oliveira',
    email: 'lucas.oliveira@email.com',
    university: 'UNICAMP',
    course: 'Sistemas de Informação',
    semester: '6º',
    appliedDate: '11/11/2025',
    status: 'pending'
  },
  {
    id: 'app3',
    jobId: '1',
    studentId: 'student3',
    studentName: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    university: 'UFRJ',
    course: 'Engenharia de Software',
    semester: '4º',
    appliedDate: '12/11/2025',
    status: 'approved'
  },
  {
    id: 'app4',
    jobId: '2',
    studentId: 'student4',
    studentName: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    university: 'UFMG',
    course: 'Biologia',
    semester: '3º',
    appliedDate: '09/11/2025',
    status: 'pending'
  },
  {
    id: 'app5',
    jobId: '3',
    studentId: 'student5',
    studentName: 'Pedro Almeida',
    email: 'pedro.almeida@email.com',
    university: 'PUC-MG',
    course: 'Marketing',
    semester: '7º',
    appliedDate: '13/11/2025',
    status: 'pending'
  }
];

// Estudantes fictícios iniciais
const initialStudents: Student[] = [
  {
    id: 'student1',
    name: 'Ana Clara Silva',
    email: 'ana.silva@email.com',
    university: 'USP',
    course: 'Ciência da Computação',
    semester: '5º',
    bio: 'Estudante apaixonada por desenvolvimento web e inteligência artificial.'
  },
  {
    id: 'student2',
    name: 'Lucas Oliveira',
    email: 'lucas.oliveira@email.com',
    university: 'UNICAMP',
    course: 'Sistemas de Informação',
    semester: '6º',
    bio: 'Interessado em desenvolvimento de software e análise de dados.'
  },
  {
    id: 'student3',
    name: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    university: 'UFRJ',
    course: 'Engenharia de Software',
    semester: '4º',
    bio: 'Focado em engenharia de software e metodologias ágeis.'
  },
  {
    id: 'student4',
    name: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    university: 'UFMG',
    course: 'Biologia',
    semester: '3º',
    bio: 'Entusiasta da pesquisa em microbiologia e biotecnologia.'
  },
  {
    id: 'student5',
    name: 'Pedro Almeida',
    email: 'pedro.almeida@email.com',
    university: 'PUC-MG',
    course: 'Marketing',
    semester: '7º',
    bio: 'Criativo e apaixonado por marketing digital e branding.'
  }
];

// Dados mockados iniciais
const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Estágio em Desenvolvimento Web',
    company: 'TechCorp Inovação',
    location: 'São Paulo, SP',
    modality: 'remote',
    workload: '20h/semana',
    flexScore: 92,
    salary: 'R$ 1.500/mês',
    description: 'Buscamos estudante de TI para desenvolvimento web.',
    requirements: ['Cursando TI', 'HTML, CSS, JavaScript'],
    benefits: ['Vale transporte', 'Vale refeição', 'Plano de saúde'],
    accessibility: ['Trabalho remoto', 'Horários flexíveis', 'Equipamento fornecido'],
    schedule: ['Horários negociáveis'],
    postedDate: 'Há 2 dias',
    category: 'Tecnologia',
  },
  {
    id: '2',
    title: 'Bolsa de Pesquisa em Biologia',
    company: 'Universidade Federal',
    location: 'Rio de Janeiro, RJ',
    modality: 'hybrid',
    workload: '15h/semana',
    flexScore: 78,
    salary: 'R$ 800/mês',
    description: 'Pesquisa em microbiologia aplicada.',
    requirements: ['Cursando Biologia', 'Interesse em pesquisa'],
    benefits: ['Bolsa de estudos', 'Certificado'],
    accessibility: ['Rampas de acesso', 'Banheiros adaptados'],
    schedule: ['Manhã', 'Tarde'],
    postedDate: 'Há 5 dias',
    category: 'Pesquisa',
  },
  {
    id: '3',
    title: 'Estágio em Marketing Digital',
    company: 'Agência Criativa',
    location: 'Belo Horizonte, MG',
    modality: 'hybrid',
    workload: '30h/semana',
    flexScore: 85,
    salary: 'R$ 1.200/mês',
    description: 'Apoio em campanhas de marketing digital.',
    requirements: ['Cursando Marketing ou Comunicação', 'Conhecimento em redes sociais'],
    benefits: ['Vale transporte', 'Vale refeição'],
    accessibility: ['Trabalho remoto parcial', 'Horários flexíveis'],
    schedule: ['Tarde', 'Noite'],
    postedDate: 'Há 1 dia',
    category: 'Marketing',
  },
];

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_JOBS);
    return stored ? JSON.parse(stored) : initialJobs;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
    return stored ? JSON.parse(stored) : initialApplications;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_STUDENTS);
    return stored ? JSON.parse(stored) : initialStudents;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  }, [students]);

  const addJob = (jobData: Omit<Job, 'id' | 'postedDate'>) => {
    const newJob: Job = {
      ...jobData,
      id: Math.random().toString(36).substr(2, 9),
      postedDate: 'Há poucos minutos',
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const applyToJob = (jobId: string, studentData: { id: string; name: string; email: string }) => {
    // Verificar se já se candidatou
    if (hasApplied(jobId, studentData.id)) {
      return false;
    }

    const newApplication: Application = {
      id: Math.random().toString(36).substr(2, 9),
      jobId,
      studentId: studentData.id,
      studentName: studentData.name,
      email: studentData.email,
      appliedDate: new Date().toLocaleDateString('pt-BR'),
      status: 'pending',
    };

    setApplications((prev) => [...prev, newApplication]);
    return true;
  };

  const getJobById = (id: string) => {
    return jobs.find((job) => job.id === id);
  };

  const getApplicationsByJob = (jobId: string) => {
    return applications.filter((app) => app.jobId === jobId);
  };

  const getApplicationsByStudent = (studentId: string) => {
    return applications.filter((app) => app.studentId === studentId);
  };

  const hasApplied = (jobId: string, studentId: string) => {
    return applications.some((app) => app.jobId === jobId && app.studentId === studentId);
  };

  const getStudentById = (id: string) => {
    return students.find((student) => student.id === id);
  };

  const updateApplicationStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        applications,
        students,
        addJob,
        applyToJob,
        getJobById,
        getApplicationsByJob,
        getApplicationsByStudent,
        hasApplied,
        getStudentById,
        updateApplicationStatus,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}
