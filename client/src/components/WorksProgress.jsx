import { CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WorksProgress = ({ completed, ongoing, formatNumber }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Clock className="w-8 h-8 text-orange-600" />
        {t('Works Progress', 'काम की प्रगति')}
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="text-center p-8 bg-green-50 rounded-xl border-2 border-green-200 hover:shadow-lg transition-shadow">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700 mb-2">{t('Completed', 'पूर्ण काम')}</p>
          <p className="text-5xl font-bold text-green-600">{formatNumber(completed)}</p>
        </div>
        
        <div className="text-center p-8 bg-orange-50 rounded-xl border-2 border-orange-200 hover:shadow-lg transition-shadow">
          <Clock className="w-16 h-16 text-orange-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700 mb-2">{t('Ongoing', 'चल रहे काम')}</p>
          <p className="text-5xl font-bold text-orange-600">{formatNumber(ongoing)}</p>
        </div>
      </div>
    </div>
  );
};

export default WorksProgress;
