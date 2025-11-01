import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg mb-2">
          {t(
            'MGNREGA - Mahatma Gandhi National Rural Employment Guarantee Act',
            'मनरेगा - महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम'
          )}
        </p>
        <p className="text-xs text-gray-500 mt-4">Data source: data.gov.in</p>
      </div>
    </footer>
  );
};

export default Footer;
