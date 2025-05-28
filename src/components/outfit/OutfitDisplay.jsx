import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiStar, FiShare2, FiDownload, FiHeart } from 'react-icons/fi';
import { useCloset } from '../../context/ClosetContext';

const OutfitContainer = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  margin-bottom: var(--spacing-xl);
`;

const OutfitHeader = styled.div`
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-gray-200);
`;

const OutfitTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xs);
`;

const OutfitMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-sm);
`;

const OutfitTag = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  background-color: var(--color-gray-200);
  color: var(--color-secondary);
  
  &.accent {
    background-color: var(--color-accent);
    color: var(--color-white);
  }
`;

const OutfitContent = styled.div`
  padding: var(--spacing-lg);
`;

const OutfitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const OutfitItem = styled.div`
  position: relative;
`;

const ItemImageContainer = styled.div`
  position: relative;
  padding-top: 133%; /* 3:4 aspect ratio */
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  margin-bottom: var(--spacing-xs);
`;

const ItemImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemCategory = styled.div`
  position: absolute;
  top: var(--spacing-xs);
  left: var(--spacing-xs);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--color-white);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  text-transform: uppercase;
`;

const ItemInfo = styled.div``;

const ItemName = styled.h4`
  font-size: 0.875rem;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemBrand = styled.p`
  font-size: 0.75rem;
  color: var(--color-gray-500);
  margin: 0;
`;

const OutfitFooter = styled.div`
  padding: var(--spacing-lg);
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
`;

const OutfitRating = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const RatingLabel = styled.span`
  font-size: 0.875rem;
  color: var(--color-gray-600);
`;

const RatingStars = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled(FiStar)`
  cursor: pointer;
  color: ${props => props.filled ? 'var(--color-accent)' : 'var(--color-gray-300)'};
  stroke-width: ${props => props.filled ? 1 : 2};
  fill: ${props => props.filled ? 'var(--color-accent)' : 'transparent'};
`;

const OutfitActions = styled.div`
  display: flex;
  gap: var(--spacing-md);
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    color: var(--color-accent);
  }
`;

const OutfitDisplay = ({ outfit, editable = false }) => {
  const { rateOutfit } = useCloset();
  
  const handleRating = (rating) => {
    rateOutfit(outfit.id, rating);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  return (
    <OutfitContainer>
      <OutfitHeader>
        <OutfitTitle>{outfit.name}</OutfitTitle>
        <div>Created on {formatDate(outfit.created)}</div>
        
        <OutfitMeta>
          <OutfitTag className="accent">{outfit.occasion}</OutfitTag>
          <OutfitTag>{outfit.weather.season}</OutfitTag>
          <OutfitTag>{outfit.weather.temperature}°F</OutfitTag>
          <OutfitTag>{outfit.weather.condition}</OutfitTag>
          {outfit.suggested && <OutfitTag className="accent">Suggested</OutfitTag>}
        </OutfitMeta>
      </OutfitHeader>
      
      <OutfitContent>
        <OutfitGrid>
          {outfit.items.map(item => (
            <OutfitItem key={item.id}>
              <ItemImageContainer>
                <ItemImage src={item.imageUrl} alt={item.name} />
                <ItemCategory>{item.category}</ItemCategory>
              </ItemImageContainer>
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemBrand>{item.brand}</ItemBrand>
              </ItemInfo>
            </OutfitItem>
          ))}
        </OutfitGrid>
      </OutfitContent>
      
      <OutfitFooter>
        <OutfitRating>
          <RatingLabel>Rate this outfit:</RatingLabel>
          <RatingStars>
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                filled={star <= outfit.rating} 
                onClick={() => handleRating(star)}
              />
            ))}
          </RatingStars>
        </OutfitRating>
        
        <OutfitActions>
          <ActionButton>
            <FiHeart /> Save to Favorites
          </ActionButton>
          <ActionButton>
            <FiShare2 /> Share
          </ActionButton>
          <ActionButton>
            <FiDownload /> Export
          </ActionButton>
        </OutfitActions>
      </OutfitFooter>
    </OutfitContainer>
  );
};

export default OutfitDisplay;
