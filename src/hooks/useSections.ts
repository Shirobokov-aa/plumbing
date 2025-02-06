import React, { useState, useEffect } from 'react';

export const useSections = () => {
  const [sections, setSections] = useState(null);
  
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch('/api/sections');
        console.log("API Response status:", response.status); // Проверяем статус
        
        const data = await response.json();
        console.log("Fetched sections data:", data); // Проверяем данные
        
        setSections(data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  return { sections };
}; 