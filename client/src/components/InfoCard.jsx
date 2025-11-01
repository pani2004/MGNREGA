import { useLanguage } from '../context/LanguageContext';

const InfoCard = ({ icon: Icon, title, titleHindi, items, bgColor }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Icon className={`w-8 h-8 ${bgColor}`} />
        {t(title, titleHindi)}
      </h3>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className={`flex justify-between items-center p-4 ${item.bgColor} rounded-lg`}>
            <span className="font-semibold text-gray-700">{item.label}</span>
            <span className={`text-2xl font-bold ${item.textColor}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
