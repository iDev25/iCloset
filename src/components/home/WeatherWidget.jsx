import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSun, FiCloud, FiCloudRain, FiCloudSnow, FiWind } from 'react-icons/fi';
import { useCloset } from '../../context/ClosetContext';

const WidgetContainer = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  overflow: hidden;
`;

const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const WidgetTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0;
`;

const LocationSelector = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-sm);
  font-family: var(--font-body);
  font-size: 0.875rem;
  background-color: var(--color-white);
  
  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }
`;

const WeatherContent = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const WeatherIcon = styled.div`
  font-size: 3rem;
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: var(--color-gray-100);
  border-radius: 50%;
`;

const WeatherInfo = styled.div`
  flex-grow: 1;
`;

const Temperature = styled.div`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
`;

const Condition = styled.div`
  font-size: 1.125rem;
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-sm);
`;

const WeatherDetails = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  font-size: 0.875rem;
  color: var(--color-gray-500);
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const OutfitSuggestion = styled.div`
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-gray-200);
`;

const SuggestionTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: var(--spacing-md);
`;

const SuggestionContent = styled.div`
  display: flex;
  gap: var(--spacing-md);
  overflow-x: auto;
  padding-bottom: var(--spacing-sm);
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-gray-200);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-accent);
    border-radius: 4px;
  }
`;

const ItemPreview = styled.div`
  flex: 0 0 80px;
  height: 80px;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  position: relative;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemCategory = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--color-white);
  padding: 0.25rem;
  font-size: 0.625rem;
  text-align: center;
  text-transform: uppercase;
`;

const WeatherWidget = () => {
  const { weatherData, updateWeather, getSuggestedOutfit } = useCloset();
  const [suggestedOutfit, setSuggestedOutfit] = useState(null);
  const [location, setLocation] = useState('New York');
  
  // Locations with simulated weather data
  const locations = [
    { name: 'New York', temperature: 72, condition: 'sunny', season: 'summer' },
    { name: 'London', temperature: 65, condition: 'cloudy', season: 'spring' },
    { name: 'Tokyo', temperature: 80, condition: 'partly cloudy', season: 'summer' },
    { name: 'Paris', temperature: 58, condition: 'rainy', season: 'fall' },
    { name: 'Sydney', temperature: 85, condition: 'sunny', season: 'summer' },
  ];
  
  useEffect(() => {
    // Update weather based on selected location
    const selectedLocation = locations.find(loc => loc.name === location);
    if (selectedLocation) {
      updateWeather(selectedLocation);
    }
  }, [location, updateWeather]);
  
  useEffect(() => {
    // Get outfit suggestion based on current weather
    const outfit = getSuggestedOutfit('casual');
    setSuggestedOutfit(outfit);
  }, [weatherData, getSuggestedOutfit]);
  
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return <FiSun />;
      case 'cloudy':
        return <FiCloud />;
      case 'partly cloudy':
        return <FiCloud />;
      case 'rainy':
        return <FiCloudRain />;
      case 'snowy':
        return <FiCloudSnow />;
      case 'windy':
        return <FiWind />;
      default:
        return <FiSun />;
    }
  };
  
  return (
    <WidgetContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WidgetHeader>
        <WidgetTitle>Today's Weather</WidgetTitle>
        <LocationSelector 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {locations.map(loc => (
            <option key={loc.name} value={loc.name}>{loc.name}</option>
          ))}
        </LocationSelector>
      </WidgetHeader>
      
      <WeatherContent>
        <WeatherIcon>
          {getWeatherIcon(weatherData.condition)}
        </WeatherIcon>
        
        <WeatherInfo>
          <Temperature>{weatherData.temperature}°F</Temperature>
          <Condition>
            {weatherData.condition.charAt(0).toUpperCase() + weatherData.condition.slice(1)}
          </Condition>
          
          <WeatherDetails>
            <DetailItem>
              <FiWind /> Light breeze
            </DetailItem>
            <DetailItem>
              Season: {weatherData.season.charAt(0).toUpperCase() + weatherData.season.slice(1)}
            </DetailItem>
          </WeatherDetails>
        </WeatherInfo>
      </WeatherContent>
      
      {suggestedOutfit && (
        <OutfitSuggestion>
          <SuggestionTitle>Outfit Suggestion for Today</SuggestionTitle>
          
          <SuggestionContent>
            {suggestedOutfit.items.map(item => (
              <ItemPreview key={item.id}>
                <ItemImage src={item.imageUrl} alt={item.name} />
                <ItemCategory>{item.category}</ItemCategory>
              </ItemPreview>
            ))}
          </SuggestionContent>
        </OutfitSuggestion>
      )}
    </WidgetContainer>
  );
};

export default WeatherWidget;
