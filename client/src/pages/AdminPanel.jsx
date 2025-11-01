import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, RefreshCw, Database, CheckCircle, XCircle } from 'lucide-react';
import * as api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

function AdminPanel() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [selectedState, setSelectedState] = useState('');

  const states = [
    'ANDHRA PRADESH', 'ARUNACHAL PRADESH', 'ASSAM', 'BIHAR', 'CHHATTISGARH',
    'GOA', 'GUJARAT', 'HARYANA', 'HIMACHAL PRADESH', 'JHARKHAND', 'KARNATAKA',
    'KERALA', 'MADHYA PRADESH', 'MAHARASHTRA', 'MANIPUR', 'MEGHALAYA',
    'MIZORAM', 'NAGALAND', 'ODISHA', 'PUNJAB', 'RAJASTHAN', 'SIKKIM',
    'TAMIL NADU', 'TELANGANA', 'TRIPURA', 'UTTAR PRADESH', 'UTTARAKHAND',
    'WEST BENGAL'
  ];

  const handleSyncData = async () => {
    if (!selectedState) {
      alert(t('Please select a state first', 'कृपया पहले एक राज्य चुनें'));
      return;
    }

    setSyncing(true);
    setSyncResult(null);

    try {
      const response = await api.triggerSync(selectedState);
      setSyncResult({
        success: true,
        message: response.message,
        recordsProcessed: response.recordsProcessed
      });
    } catch (error) {
      setSyncResult({
        success: false,
        message: error.response?.data?.error || error.message
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">
                  {t('Admin Panel', 'एडमिन पैनल')}
                </h1>
                <p className="text-sm text-purple-100">
                  {t('Data Management', 'डेटा प्रबंधन')}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              <span>{t('Back to Home', 'होम पर वापस जाएं')}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Sync Data Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {t('Sync MGNREGA Data', 'मनरेगा डेटा सिंक करें')}
                </h2>
                <p className="text-gray-600">
                  {t('Fetch latest data from data.gov.in API', 'data.gov.in API से नवीनतम डेटा प्राप्त करें')}
                </p>
              </div>
            </div>

            {/* State Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('Select State to Sync', 'सिंक करने के लिए राज्य चुनें')}
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={syncing}
              >
                <option value="">
                  {t('-- Choose a state --', '-- एक राज्य चुनें --')}
                </option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Sync Button */}
            <button
              onClick={handleSyncData}
              disabled={syncing || !selectedState}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-lg font-semibold transition-all ${
                syncing || !selectedState
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 shadow-lg'
              }`}
            >
              <RefreshCw className={`w-6 h-6 ${syncing ? 'animate-spin' : ''}`} />
              {syncing
                ? t('Syncing Data...', 'डेटा सिंक हो रहा है...')
                : t('Start Data Sync', 'डेटा सिंक शुरू करें')}
            </button>

            {/* Sync Result */}
            {syncResult && (
              <div
                className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${
                  syncResult.success
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                {syncResult.success ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <h3
                    className={`font-semibold mb-1 ${
                      syncResult.success ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
                    {syncResult.success
                      ? t('Sync Successful!', 'सिंक सफल!')
                      : t('Sync Failed', 'सिंक विफल')}
                  </h3>
                  <p
                    className={
                      syncResult.success ? 'text-green-700' : 'text-red-700'
                    }
                  >
                    {syncResult.message}
                  </p>
                  {syncResult.recordsProcessed && (
                    <p className="text-green-600 font-medium mt-2">
                      {t('Records Processed:', 'रिकॉर्ड संसाधित:')} {syncResult.recordsProcessed}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Warning */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ {t(
                  'Note: Data sync may take 1-2 minutes depending on the number of districts in the state.',
                  'नोट: राज्य में जिलों की संख्या के आधार पर डेटा सिंक में 1-2 मिनट लग सकते हैं।'
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminPanel;
