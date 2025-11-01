import { useLanguage } from '../context/LanguageContext';

const LoadingSpinner = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
      <p className="mt-4 text-xl text-gray-600">{t('Loading data...', 'डेटा लोड हो रहा है...')}</p>
    </div>
  );
};

export default LoadingSpinner;
