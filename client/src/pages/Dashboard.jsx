import { useState, useEffect } from 'react';
import { Users, IndianRupee, CheckCircle, Briefcase, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import { formatNumber, formatCurrency } from '../utils/formatters';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/Header';
import Footer from '../components/Footer';
import DistrictSelector from '../components/DistrictSelector';
import StatCard from '../components/StatCard';
import InfoCard from '../components/InfoCard';
import WorksProgress from '../components/WorksProgress';
import HistoricalChart from '../components/HistoricalChart';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

function Dashboard() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtData, setDistrictData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStates();
    getUserLocation();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await api.getAllStates();
      if (response.success) {
        setStates(response.data);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  };

  const handleStateChange = async (stateId) => {
    setSelectedState(stateId);
    setSelectedDistrict(null);
    setDistrictData(null);
    setLoading(true);

    try {
      const response = await api.getDistrictsByState(stateId);
      if (response.success) {
        setDistricts(response.data);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictChange = async (districtId) => {
    setSelectedDistrict(districtId);
    setLoading(true);

    try {
      const [currentDataRes, historicalRes] = await Promise.all([
        api.getCurrentData(districtId),
        api.getHistoricalData(districtId, 6)
      ]);

      if (currentDataRes.success) {
        setDistrictData(currentDataRes.data);
      }

      if (historicalRes.success) {
        setHistoricalData(historicalRes.data);
      }
    } catch (error) {
      console.error('Error fetching district data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare employment details
  const employmentItems = districtData ? [
    {
      label: t('Households Worked', 'परिवार काम किए'),
      value: formatNumber(districtData.totalHouseholdsWorked, language),
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: t('Women Workers', 'महिला मजदूर'),
      value: formatNumber(districtData.womenPersonDaysGenerated, language),
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      label: t('SC Workers', 'SC मजदूर'),
      value: formatNumber(districtData.scPersonDaysGenerated, language),
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      label: t('ST Workers', 'ST मजदूर'),
      value: formatNumber(districtData.stPersonDaysGenerated, language),
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ] : [];

  // Prepare financial details
  const financialItems = districtData ? [
    {
      label: t('Wages', 'मजदूरी'),
      value: formatCurrency(districtData.wageExpenditure, language),
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: t('Material Cost', 'सामग्री खर्च'),
      value: formatCurrency(districtData.materialExpenditure, language),
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: t('Avg Wage/Day', 'प्रति दिन औसत मजदूरी'),
      value: formatCurrency(districtData.averageWagePerDay, language),
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      label: t('Approved Budget', 'स्वीकृत बजट'),
      value: formatCurrency(districtData.approvedLabourBudget, language),
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back to Home Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>{t('Back to Home', 'होم पर वापस जाएं')}</span>
          </button>
        </div>

        {/* District Selector */}
        <div className="mb-8">
          <DistrictSelector
            states={states}
            districts={districts}
            selectedState={selectedState}
            selectedDistrict={selectedDistrict}
            onStateChange={handleStateChange}
            onDistrictChange={handleDistrictChange}
          />
        </div>        {loading && <LoadingSpinner />}

        {districtData && !loading && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={Users}
                title="Total Job Cards"
                titleHindi="जॉब कार्ड"
                value={formatNumber(districtData.totalJobCardsIssued, language)}
                bgColor="from-blue-500 to-blue-600"
                emoji="👥"
              />
              <StatCard
                icon={Users}
                title="Active Workers"
                titleHindi="सक्रिय मजदूर"
                value={formatNumber(districtData.activeWorkers, language)}
                bgColor="from-green-500 to-green-600"
                emoji="💼"
              />
              <StatCard
                icon={IndianRupee}
                title="Total Expenditure"
                titleHindi="कुल खर्च"
                value={formatCurrency(districtData.totalExpenditure, language)}
                bgColor="from-purple-500 to-purple-600"
                emoji="💰"
              />
              <StatCard
                icon={CheckCircle}
                title="Works Completed"
                titleHindi="पूरे काम"
                value={formatNumber(districtData.totalWorksCompleted, language)}
                bgColor="from-orange-500 to-orange-600"
                emoji="✅"
              />
            </div>

            {/* Detailed Information */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <InfoCard
                icon={Users}
                title="Employment Details"
                titleHindi="रोजगार विवरण"
                items={employmentItems}
                bgColor="text-blue-600"
              />
              <InfoCard
                icon={IndianRupee}
                title="Financial Details"
                titleHindi="वित्तीय विवरण"
                items={financialItems}
                bgColor="text-green-600"
              />
            </div>

            {/* Works Progress */}
            <WorksProgress
              completed={districtData.totalWorksCompleted}
              ongoing={districtData.totalWorksOngoing}
              formatNumber={(num) => formatNumber(num, language)}
            />

            {/* Historical Chart */}
            <HistoricalChart data={historicalData} />
          </>
        )}

        {!districtData && !loading && <EmptyState />}
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
