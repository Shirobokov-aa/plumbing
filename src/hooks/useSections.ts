import React, { useState, useEffect } from 'react';

export const useSections = () => {
  const [sections, setSections] = useState(null);
  
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch('/api/sections');
        const data = await response.json();
        console.log('API Response:', data); // Отладочный вывод
        setSections(data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  return { sections };
}; 