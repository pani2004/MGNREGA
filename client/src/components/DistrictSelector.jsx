import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DistrictSelector = ({ 
  states, 
  districts, 
  selectedState, 
  selectedDistrict, 
  onStateChange, 
  onDistrictChange, 
  loading 
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <MapPin className="w-8 h-8 text-green-600" />
        {t('Select Your District', 'अपना जिला चुनें')}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* State Selection */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            {t('State', 'राज्य')}
          </label>
          <select
            value={selectedState || ''}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
          >
            <option value="">{t('-- Select State --', '-- राज्य चुनें --')}</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* District Selection */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            {t('District', 'जिला')}
          </label>
          <select
            value={selectedDistrict || ''}
            onChange={(e) => onDistrictChange(e.target.value)}
            disabled={!selectedState || loading}
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-100"
          >
            <option value="">{t('-- Select District --', '-- जिला चुनें --')}</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DistrictSelector;
