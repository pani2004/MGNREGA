import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const HistoricalChart = ({ data }) => {
  const { t } = useLanguage();

  if (!data || data.length === 0) return null;

  const chartData = [...data].reverse();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <TrendingUp className="w-8 h-8 text-blue-600" />
        {t('Historical Trend', 'ऐतिहासिक प्रवृत्ति')}
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="financialYear" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="totalExpenditure" 
            stroke="#10b981" 
            name={t('Expenditure', 'खर्च')}
            strokeWidth={3} 
          />
          <Line 
            type="monotone" 
            dataKey="totalWorksCompleted" 
            stroke="#3b82f6" 
            name={t('Completed Works', 'पूर्ण काम')}
            strokeWidth={3} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalChart;
