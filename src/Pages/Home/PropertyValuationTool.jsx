import { useState } from 'react';
import {
  Home,
  TrendingUp,
  Building2,
  ArrowRight,
  
} from 'lucide-react';

const PropertyValuationTool = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    type: 'residential',
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    location: '',
    yearBuilt: 2010
  });

  const [valuation, setValuation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulated similar properties data
  const similarProperties = [
    { address: "123 Park Avenue", price: 850000, area: 1950 },
    { address: "456 Lake Street", price: 875000, area: 2100 },
    { address: "789 Forest Road", price: 825000, area: 1900 }
  ];

  // Simulated market trends
  const marketTrends = {
    priceChange: "+5.2%",
    avgDaysOnMarket: 28,
    inventoryLevel: "Low",
    buyerDemand: "High"
  };

  const handleInputChange = (e) => {
    setPropertyDetails({
      ...propertyDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate AI calculation
    setTimeout(() => {
      setValuation({
        estimatedValue: 855000,
        confidenceScore: 92,
        priceRange: {
          min: 825000,
          max: 885000
        }
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-9/12 mx-auto py-10 md:my-10 bg-gray-50 dark:bg-[#0B0716]  overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0D0A1F]">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/10 p-2 rounded-lg">
            <Building2 className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI Property Valuation</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Get an instant AI-powered property valuation</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Input Form */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Property Type</label>
              <select
                name="type"
                value={propertyDetails.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={propertyDetails.bedrooms}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={propertyDetails.bathrooms}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Square Footage</label>
              <input
                type="number"
                name="area"
                value={propertyDetails.area}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input
                type="text"
                name="location"
                value={propertyDetails.location}
                onChange={handleInputChange}
                placeholder="Enter address or neighborhood"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Calculate Valuation
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {valuation && (
            <div className="space-y-6">
              {/* Valuation Result */}
              <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">Estimated Value</h3>
                  <span className="px-2 py-1 text-sm bg-green-500/10 text-green-500 rounded-full">
                    {valuation.confidenceScore}% Confidence
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  ${valuation.estimatedValue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Range: ${valuation.priceRange.min.toLocaleString()} - ${valuation.priceRange.max.toLocaleString()}
                </div>
              </div>

              {/* Similar Properties */}
              <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Similar Properties</h3>
                <div className="space-y-3">
                  {similarProperties.map((property, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div className="text-sm text-gray-600 dark:text-gray-300">{property.address}</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">${property.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Trends */}
              <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Market Insights</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Price Trend</div>
                    <div className="text-base font-medium text-gray-900 dark:text-white flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      {marketTrends.priceChange}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Avg. Days on Market</div>
                    <div className="text-base font-medium text-gray-900 dark:text-white">
                      {marketTrends.avgDaysOnMarket} days
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Inventory Level</div>
                    <div className="text-base font-medium text-gray-900 dark:text-white">
                      {marketTrends.inventoryLevel}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Buyer Demand</div>
                    <div className="text-base font-medium text-gray-900 dark:text-white">
                      {marketTrends.buyerDemand}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!valuation && !loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <div className="bg-blue-500/10 p-3 rounded-full inline-block">
                  <Home className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your property details to get an instant AI-powered valuation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyValuationTool;