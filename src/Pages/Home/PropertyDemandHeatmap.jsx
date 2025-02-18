import { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Search, 
  Home, 
  Users, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  MapPin
} from 'lucide-react';

const PropertyDemandHeatmap = () => {
  const [demandData] = useState([
    { 
      area: "Downtown", 
      demand: 0.9, 
      searches: 1200, 
      listings: 45,
      trend: 'up',
      type: 'commercial',
      location: 'Central District'
    },
    { 
      area: "Suburbs", 
      demand: 0.5, 
      searches: 800, 
      listings: 120,
      trend: 'down',
      type: 'residential',
      location: 'North Zone'
    },
    { 
      area: "Beachfront", 
      demand: 0.8, 
      searches: 950, 
      listings: 30,
      trend: 'up',
      type: 'luxury',
      location: 'Coastal Area'
    },
    { 
      area: "Industrial", 
      demand: 0.3, 
      searches: 400, 
      listings: 85,
      trend: 'down',
      type: 'industrial',
      location: 'South District'
    },
    { 
      area: "University", 
      demand: 0.7, 
      searches: 850, 
      listings: 60,
      trend: 'up',
      type: 'residential',
      location: 'East Campus'
    }
  ]);

  const getPropertyIcon = (type) => {
    switch(type) {
      case 'commercial':
        return <Building2 className="h-6 w-6" />;
      case 'residential':
        return <Home className="h-6 w-6" />;
      case 'industrial':
        return <TrendingUp className="h-6 w-6" />;
      default:
        return <Building2 className="h-6 w-6" />;
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto py-10 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-[#0B0716] overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white exo2">Property Demand Heatmap</h2>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Real-time market analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Live Updates</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {demandData.map((item) => (
            <div
              key={item.area}
              className="relative group rounded-xl transition-all duration-500 hover:bg-blue-50 dark:bg-gray-800 border dark:border-white"
            >
              {/* Glowing effect */}
              <div className="absolute rounded-xl" />
              
              <div className="p-5 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg dark:text-white">
                      {getPropertyIcon(item.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg md:text-xl text-gray-800 dark:text-white">{item.area}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full ${
                    item.trend === 'up' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {item.trend === 'up' ? (
                      <ArrowUpRight className="h-5 w-5" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5" />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Users className="h-4 w-4 text-blue-500" />
                    <p>Demand: {(item.demand * 100).toFixed(0)}%</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Search className="h-4 w-4 text-blue-500" />
                    <p>Searches: {item.searches.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Home className="h-4 w-4 text-blue-500" />
                    <p>Available: {item.listings} listings</p>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mt-4">
                    <div 
                      className="h-full rounded-full transition-all duration-500 relative"
                      style={{ 
                        width: `${item.demand * 100}%`,
                        background: 'linear-gradient(90deg, #3B82F6, #60A5FA)'
                      }}
                    >
                      <div className="absolute inset-0 rounded-full animate-pulse-light bg-blue-400/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
<div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 border-t border-gray-200 dark:border-gray-800 pt-6">
  <div className="flex items-center px-3 py-1.5 bg-blue-500/5 rounded-lg">
    <div className="w-4 h-4 rounded mr-2 bg-blue-500/30"></div>
    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Low Demand</span>
  </div>
  <div className="flex items-center px-3 py-1.5 bg-blue-500/5 rounded-lg">
    <div className="w-4 h-4 rounded mr-2 bg-blue-500/60"></div>
    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Medium Demand</span>
  </div>
  <div className="flex items-center px-3 py-1.5 bg-blue-500/5 rounded-lg">
    <div className="w-4 h-4 rounded mr-2 bg-blue-500"></div>
    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">High Demand</span>
  </div>
</div>


      </div>
    </div>
  );
};

export default PropertyDemandHeatmap;
