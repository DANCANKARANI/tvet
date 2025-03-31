import React, { useState } from 'react';

interface CardProps {
  title: string;
  description: string | string[];
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 150; // Characters to show before truncating

  const renderDescription = () => {
    if (Array.isArray(description)) {
      return (
        <ul className="p-0 list-none">
          {description.map((item, index) => (
            <li key={index} className="break-words">
              {item}
            </li>
          ))}
        </ul>
      );
    } else {
      const displayText = expanded 
        ? description 
        : `${description.substring(0, maxLength)}${description.length > maxLength ? '...' : ''}`;
      
      return <p className="break-words">{displayText}</p>;
    }
  };

  const showReadMore = !Array.isArray(description) && description.length > maxLength;

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden h-full">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="text-gray-600">
          {renderDescription()}
        </div>
      </div>
      
      {showReadMore && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;