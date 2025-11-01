export const formatNumber = (num, language = 'en') => {
  if (!num) return '0';
  
  if (language === 'hi') {
    // Hindi format with Indian number words
    if (num >= 10000000) return `${(num / 10000000).toFixed(2)} करोड़`; 
    if (num >= 100000) return `${(num / 100000).toFixed(2)} लाख`; 
    if (num >= 1000) return `${(num / 1000).toFixed(2)} हजार`; 
    return num?.toLocaleString('en-IN');
  }
  
  return num?.toLocaleString('en-IN');
};

export const formatCurrency = (amount, language = 'en') => {
  return `₹${formatNumber(amount, language)}`;
};
