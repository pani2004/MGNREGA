import { ArrowRight, Users, TrendingUp, MapPin, Languages, BarChart3, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function LandingPage() {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  const features = [
    {
      icon: MapPin,
      title: t('District-wise Data', 'जिला-वार डेटा'),
      description: t(
        'Access detailed MGNREGA performance data for every district across India',
        'भारत के हर जिले के लिए विस्तृत मनरेगा प्रदर्शन डेटा देखें'
      )
    },
    {
      icon: Users,
      title: t('Employment Statistics', 'रोजगार आंकड़े'),
      description: t(
        'Track job cards issued, active workers, and employment generated in your district',
        'जॉब कार्ड, सक्रिय मजदूर और आपके जिले में रोजगार की जानकारी पाएं'
      )
    },
    {
      icon: TrendingUp,
      title: t('Financial Insights', 'वित्तीय जानकारी'),
      description: t(
        'Monitor wages, expenditure, and budget utilization with easy-to-understand visuals',
        'मजदूरी, खर्च और बजट उपयोग को आसान चित्रों के साथ देखें'
      )
    },
    {
      icon: BarChart3,
      title: t('Visual Charts', 'चित्र रिपोर्ट'),
      description: t(
        'Simple graphs and charts that make understanding data easy for everyone',
        'सरल ग्राफ और चार्ट जो सभी के लिए डेटा को समझना आसान बनाते हैं'
      )
    },
    {
      icon: Languages,
      title: t('Bilingual Support', 'द्विभाषी सहायता'),
      description: t(
        'Switch between English and Hindi with a single click for your convenience',
        'अपनी सुविधा के लिए एक क्लिक में अंग्रेजी और हिंदी के बीच स्विच करें'
      )
    },
    {
      icon: Shield,
      title: t('Official Data', 'आधिकारिक डेटा'),
      description: t(
        'All data is sourced from official government APIs ensuring accuracy and reliability',
        'सभी डेटा सरकारी एपीआई से प्राप्त है जो सटीकता सुनिश्चित करता है'
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <span className="text-3xl">🏛️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {t('MGNREGA Dashboard', 'मनरेगा डैशबोर्ड')}
              </h1>
              <p className="text-sm text-green-100">
                {t('Our Voice, Our Rights', 'हमारी आवाज, हमारे अधिकार')}
              </p>
            </div>
          </div>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors font-medium"
          >
            <Languages className="w-5 h-5" />
            <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            {t(
              'Track MGNREGA Performance in Your District',
              'अपने जिले में मनरेगा प्रदर्शन देखें'
            )}
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {t(
              'Get transparent access to employment data, wages, and works completed under MGNREGA. Empowering rural citizens with information about their rights and entitlements.',
              'मनरेगा के तहत रोजगार डेटा, मजदूरी और पूर्ण कार्यों तक पारदर्शी पहुंच प्राप्त करें। ग्रामीण नागरिकों को उनके अधिकारों और हकों की जानकारी से सशक्त बनाना।'
            )}
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            {t('View Dashboard', 'डैशबोर्ड देखें')}
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">
          {t('Key Features', 'मुख्य विशेषताएं')}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About MGNREGA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-6">
              {t('About MGNREGA', 'मनरेगा के बारे में')}
            </h3>
            <p className="text-lg leading-relaxed text-green-50 mb-4">
              {t(
                'The Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) is an Indian labor law and social security measure that aims to guarantee the "right to work" and ensure livelihood security in rural areas.',
                'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (मनरेगा) एक भारतीय श्रम कानून और सामाजिक सुरक्षा उपाय है जो "काम करने के अधिकार" की गारंटी देता है और ग्रामीण क्षेत्रों में आजीविका सुरक्षा सुनिश्चित करता है।'
              )}
            </p>
            <p className="text-lg leading-relaxed text-green-50">
              {t(
                'This platform provides transparency by making district-wise performance data accessible to all citizens, helping them understand how the scheme is performing in their area.',
                'यह मंच जिला-वार प्रदर्शन डेटा को सभी नागरिकों के लिए सुलभ बनाकर पारदर्शिता प्रदान करता है, जिससे उन्हें यह समझने में मदद मिलती है कि उनके क्षेत्र में योजना कैसा प्रदर्शन कर रही है।'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-green-500 to-green-600 text-white p-12 rounded-3xl shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">
            {t('Ready to Explore?', 'तैयार हैं?')}
          </h3>
          <p className="text-xl mb-8 text-green-50">
            {t(
              'Start viewing MGNREGA data for your district now',
              'अभी अपने जिले के लिए मनरेगा डेटा देखना शुरू करें'
            )}
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
          >
            {t('Go to Dashboard', 'डैशबोर्ड पर जाएं')}
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">
              {t(
                '© 2025 MGNREGA Dashboard. Data sourced from data.gov.in',
                '© 2025 मनरेगा डैशबोर्ड। डेटा data.gov.in से प्राप्त'
              )}
            </p>
            <button
              onClick={() => navigate('/admin')}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {t('Admin Panel', 'एडमिन पैनल')}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
