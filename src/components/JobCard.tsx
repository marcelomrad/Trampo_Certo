import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, ClockIcon, BriefcaseIcon, CalendarIcon } from 'lucide-react';
import { Job } from '../types/Job';
import { FlexScore } from './FlexScore';
interface JobCardProps {
  job: Job;
}
export function JobCard({
  job
}: JobCardProps) {
  const modalityLabels = {
    remote: 'Remoto',
    hybrid: 'Híbrido',
    onsite: 'Presencial'
  };
  return <Link to={`/vaga/${job.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 break-words">
              {job.title}
            </h3>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              {job.company}
            </p>
          </div>
          <div className="flex-shrink-0">
            <FlexScore score={job.flexScore} size="small" showLabel={false} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <BriefcaseIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate">{modalityLabels[job.modality]}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate">{job.workload}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate">{job.postedDate}</span>
          </div>
        </div>
        {job.salary && <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
              {job.salary}
            </span>
          </div>}
        {job.accessibility.length > 0 && <div className="flex flex-wrap gap-2">
            {job.accessibility.slice(0, 3).map((item, index) => <span key={index} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs truncate max-w-full">
                {item}
              </span>)}
            {job.accessibility.length > 3 && <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                +{job.accessibility.length - 3}
              </span>}
          </div>}
      </div>
    </Link>;
}