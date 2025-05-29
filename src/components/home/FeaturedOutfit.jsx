import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const FeaturedContainer = styled.div`
  background-color: white;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-bottom: 5rem;
  
  @media (min-width: 768px) {
    display: flex;
    height: 500px;
  }
`;

const FeaturedImage = styled.div`
  position: relative;
  height: 350px;
  
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
  background-color: var(--accent-color);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: var(--shadow-sm);
`;

const FeaturedContent = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (min-width: 768px) {
    flex: 1;
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FeaturedTitle = styled.h2`
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const FeaturedDescription = styled.p`
  margin-bottom: 2rem;
  color: var(--color-gray-600);
  line-height: 1.8;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeaturedItems = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-gray-200);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 4px;
  }
`;

const ItemPreview = styled.div`
  flex: 0 0 100px;
  height: 100px;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
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
  color: white;
  padding: 0.25rem;
  font-size: 0.75rem;
  text-align: center;
  text-transform: uppercase;
`;

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  background-color: var(--accent-color);
  color: white;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  align-self: flex-start;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  
  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

const FeaturedOutfit = ({ outfit }) => {
  // Use the first item's image as the featured image
  const featuredImage = outfit.items[0]?.imageUrl;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
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
    </motion.div>
  );
};

export default FeaturedOutfit;
