import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const EmptyState = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
      <MapPin className="w-24 h-24 text-gray-300 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-gray-600 mb-3">
        {t('Select Your District', 'अपना जिला चुनें')}
      </h3>
      <p className="text-lg text-gray-500">
        {t('Please select your state and district above', 'कृपया ऊपर से अपना राज्य और जिला चुनें')}
      </p>
    </div>
  );
};

export default EmptyState;
