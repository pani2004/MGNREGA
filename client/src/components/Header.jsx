import { Briefcase, MapPin, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Header = ({ userLocation }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Briefcase className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">
                {t('MGNREGA Dashboard', 'मनरेगा डैशबोर्ड')}
              </h1>
              <p className="text-green-100 text-sm">
                {t('Our Voice, Our Rights', 'हमारी आवाज, हमारे अधिकार')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {userLocation && (
              <div className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-lg">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">{t('Location detected', 'आपका स्थान मिला')}</span>
              </div>
            )}
            
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              <Languages className="w-5 h-5" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
