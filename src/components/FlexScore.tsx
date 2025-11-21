import React from 'react';
interface FlexScoreProps {
  score: number;
  size?: 'small' | 'large';
  showLabel?: boolean;
}
export function FlexScore({
  score,
  size = 'small',
  showLabel = true
}: FlexScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Alta Flexibilidade';
    if (score >= 60) return 'Flexibilidade Moderada';
    return 'Flexibilidade Limitada';
  };
  const sizeClasses = size === 'large' ? 'text-4xl w-24 h-24' : 'text-xl w-16 h-16';
  return <div className="flex items-center space-x-3">
      <div className={`${sizeClasses} ${getScoreColor(score)} rounded-full flex items-center justify-center font-bold`}>
        {score}
      </div>
      {showLabel && <div>
          <div className="text-sm font-semibold text-gray-900">Flex-Score</div>
          <div className={`text-xs ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-orange-600'}`}>
            {getScoreLabel(score)}
          </div>
        </div>}
    </div>;
}