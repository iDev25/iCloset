import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const FeaturedContainer = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-xl);
  
  @media (min-width: 768px) {
    display: flex;
    height: 400px;
  }
`;

const FeaturedImage = styled.div`
  position: relative;
  height: 300px;
  
  @media (min-width: 768px) {
    flex: 1;
    height: auto;
  }
`;

const OutfitImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  background-color: var(--color-accent);
  color: var(--color-white);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FeaturedContent = styled.div`
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (min-width: 768px) {
    flex: 1;
  }
`;

const FeaturedTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: var(--spacing-md);
`;

const FeaturedDescription = styled.p`
  margin-bottom: var(--spacing-lg);
  color: var(--color-gray-600);
  line-height: 1.6;
`;

const FeaturedItems = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
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

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 0.75rem 1.5rem;
  background-color: var(--color-accent);
  color: var(--color-white);
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
  align-self: flex-start;
  
  &:hover {
    background-color: var(--color-accent-hover);
  }
`;

const FeaturedOutfit = ({ outfit }) => {
  // Use the first item's image as the featured image
  const featuredImage = outfit.items[0]?.imageUrl;
  
  return (
    <FeaturedContainer>
      <FeaturedImage>
        <OutfitImage src={featuredImage} alt={outfit.name} />
        <FeaturedBadge>Trending Today</FeaturedBadge>
      </FeaturedImage>
      
      <FeaturedContent>
        <FeaturedTitle>{outfit.name}</FeaturedTitle>
        
        <FeaturedDescription>
          Perfect for {outfit.occasion} occasions during {outfit.weather.season}. 
          This outfit combines elegance and comfort, suitable for temperatures 
          around {outfit.weather.temperature}°F.
        </FeaturedDescription>
        
        <FeaturedItems>
          {outfit.items.map(item => (
            <ItemPreview key={item.id}>
              <ItemImage src={item.imageUrl} alt={item.name} />
              <ItemCategory>{item.category}</ItemCategory>
            </ItemPreview>
          ))}
        </FeaturedItems>
        
        <ViewButton to={`/outfit/${outfit.id}`}>
          View Outfit <FiArrowRight />
        </ViewButton>
      </FeaturedContent>
    </FeaturedContainer>
  );
};

export default FeaturedOutfit;
