import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Star, Search, Filter, Globe, Camera, Heart } from 'lucide-react';
import { travelGuidesData } from '../data/travelGuidesData';

const TravelGuides = () => {
  const [guides, setGuides] = useState(travelGuidesData);
  const [filteredGuides, setFilteredGuides] = useState(travelGuidesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter guides based on search and continent
  useEffect(() => {
    let filtered = guides;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(guide =>
        guide.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by continent (simplified continent mapping)
    if (selectedContinent !== 'all') {
      const continentCountries = {
        europe: ['France', 'United Kingdom', 'Spain', 'Italy'],
        asia: ['Japan', 'Thailand', 'United Arab Emirates', 'Turkey', 'India'],
        americas: ['United States'],
        africa: ['South Africa'],
        oceania: ['Australia']
      };
      
      filtered = filtered.filter(guide =>
        continentCountries[selectedContinent]?.includes(guide.country)
      );
    }

    setFilteredGuides(filtered);
  }, [searchTerm, selectedContinent, guides]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleContinentFilter = (continent) => {
    setSelectedContinent(continent);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-300 rounded animate-pulse mx-auto w-96"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-pulse">
                <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-3 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Travel Guides
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover amazing destinations around the world with our curated travel guides. 
            From hidden gems to iconic landmarks, find your next adventure.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 animate-fade-in-up">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search destinations, cities, or countries..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Continent Filter */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All', icon: Globe },
                  { key: 'europe', label: 'Europe', icon: MapPin },
                  { key: 'asia', label: 'Asia', icon: MapPin },
                  { key: 'americas', label: 'Americas', icon: MapPin },
                  { key: 'africa', label: 'Africa', icon: MapPin },
                  { key: 'oceania', label: 'Oceania', icon: MapPin }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => handleContinentFilter(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedContinent === key
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 animate-fade-in-up">
          <p className="text-gray-300 text-center">
            Showing <span className="text-pink-400 font-semibold">{filteredGuides.length}</span> travel guides
            {searchTerm && (
              <span> for "<span className="text-purple-400 font-semibold">{searchTerm}</span>"</span>
            )}
          </p>
        </div>

        {/* Guides Grid */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {filteredGuides.map((guide, index) => (
              <div
                key={guide.id}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-pink-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={guide.image}
                    alt={`${guide.city}, ${guide.country}`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{guide.country}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* City Header */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors duration-300">
                      {guide.city}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {guide.description}
                    </p>
                  </div>

                  {/* Top Things To Do */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-pink-400 mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Top 5 Things To Do
                    </h4>
                    <ul className="space-y-2">
                      {guide.topThingsToDo.map((activity, activityIndex) => (
                        <li
                          key={activityIndex}
                          className="flex items-start gap-3 text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300"
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                            {activityIndex + 1}
                          </span>
                          <span className="leading-relaxed">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <span className="flex items-center justify-center gap-2">
                        <Camera className="w-4 h-4" />
                        Explore
                      </span>
                    </button>
                    <button className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300">
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-16 animate-fade-in-up">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No guides found</h3>
              <p className="text-gray-300 mb-6">
                Try adjusting your search terms or filters to find more destinations.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedContinent('all');
                }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="mt-16 text-center animate-fade-in-up">
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Browse our travel packages and start planning your dream vacation to any of these incredible destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                View Travel Packages
              </button>
              <button className="bg-white/10 border border-white/20 text-white py-3 px-8 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                Plan Custom Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelGuides;