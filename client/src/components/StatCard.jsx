import { useLanguage } from '../context/LanguageContext';

const StatCard = ({ icon: Icon, title, titleHindi, value, bgColor, emoji }) => {
  const { t } = useLanguage();

  return (
    <div className={`bg-gradient-to-br ${bgColor} text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform`}>
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-12 h-12 opacity-80" />
        <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-3xl">{emoji}</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-1">{t(title, titleHindi)}</h3>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default StatCard;
