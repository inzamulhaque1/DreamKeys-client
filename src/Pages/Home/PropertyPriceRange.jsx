import { useState } from 'react';
import { HomeIcon } from 'lucide-react';

const PropertyPriceRange = () => {
  const [priceRange, setPriceRange] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculateMonthlyPayment = () => {
    const loanAmount = priceRange - downPayment;
    const interestRate = 0.04;
    const termInYears = 30;
    
    const monthlyRate = interestRate / 12;
    const numberOfPayments = termInYears * 12;
    
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return formatPrice(monthlyPayment);
  };

  return (
    <div className="flex flex-col items-center p-4 w-full dark:bg-[#0B0716]  bg-gray-50">
      {/* Title and subtitle outside the box */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <HomeIcon className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold dark:text-white text-gray-900">Home Mortgage Calculator</h2>
        </div>
        <p className="text-sm text-gray-500">Estimate your monthly mortgage payment based on property price and down payment.</p>
      </div>

      {/* Main calculator box */}
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg dark:bg-gray-800 bg-white dark:text-white text-gray-900 transition-all duration-300">
        <div className="mb-4">
          <label className="text-sm font-medium">Property Price</label>
          <input 
            type="range"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            min={100000}
            max={2000000}
            step={10000}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="text-sm text-gray-400">Selected: {formatPrice(priceRange)}</div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium">Down Payment</label>
          <input 
            type="range"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            min={priceRange * 0.03}
            max={priceRange}
            step={5000}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="text-sm text-gray-400 flex justify-between">
            <span>Selected: {formatPrice(downPayment)}</span>
            <span>{Math.round((downPayment / priceRange) * 100)}% down</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-900 transition-all duration-300">
          <div className="text-sm font-medium text-gray-300">Estimated Monthly Payment</div>
          <div className="text-2xl font-bold text-blue-300">{calculateMonthlyPayment()}</div>
          <div className="text-xs text-gray-400 mt-1">Based on 4% APR, 30-year fixed</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPriceRange;