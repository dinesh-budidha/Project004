import React from 'react';

interface TranslationStatusProps {
  progress: number;
}

const TranslationStatus: React.FC<TranslationStatusProps> = ({ progress }) => {
  const steps = [
    { name: 'Extracting audio', percentage: 20 },
    { name: 'Transcribing', percentage: 40 },
    { name: 'Translating', percentage: 60 },
    { name: 'Generating speech', percentage: 80 },
    { name: 'Merging with video', percentage: 100 }
  ];

  const currentStep = steps.findIndex(step => progress < step.percentage) - 1;
  const activeStep = currentStep >= 0 ? currentStep : steps.length - 1;

  return (
    <div className="mt-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-indigo-600">Translation in progress</span>
        <span className="text-sm font-medium text-indigo-600">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-4">
        <ul className="space-y-2">
          {steps.map((step, index) => (
            <li key={index} className="flex items-center">
              <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                index <= activeStep ? 'bg-indigo-600' : 'bg-gray-200'
              }`}>
                {index < activeStep ? (
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : index === activeStep ? (
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                ) : null}
              </div>
              <span className={`ml-3 text-sm ${
                index <= activeStep ? 'font-medium text-gray-900' : 'text-gray-500'
              }`}>
                {step.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TranslationStatus;