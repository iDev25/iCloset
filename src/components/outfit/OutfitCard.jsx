import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiStar, FiShare2, FiTrash2 } from 'react-icons/fi';
import { useCloset } from '../../context/ClosetContext';

const Card = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const OutfitHeader = styled.div`
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OutfitTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
`;

const OutfitDate = styled.span`
  font-size: 0.75rem;
  color: var(--color-gray-500);
`;

const OutfitContent = styled.div`
  padding: var(--spacing-md);
  flex-grow: 1;
`;

const OutfitItems = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const OutfitItemCard = styled.div`
  position: relative;
  padding-top: 133%; /* 3:4 aspect ratio */
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
`;

const OutfitItemImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const OutfitItemName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--color-white);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OutfitMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
`;

const OutfitTag = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background-color: var(--color-gray-200);
  color: var(--color-secondary);
`;

const OutfitFooter = styled.div`
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OutfitRating = styled.div`
  display: flex;
  align-items: center;
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
  gap: var(--spacing-sm);
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-500);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xs);
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--color-accent);
    background-color: var(--color-gray-100);
  }
`;

const ViewButton = styled(Link)`
  display: block;
  text-align: center;
  padding: 0.75rem;
  background-color: var(--color-accent);
  color: var(--color-white);
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--color-accent-hover);
  }
`;

const OutfitCard = ({ outfit }) => {
  const { rateOutfit } = useCloset();
  const [rating, setRating] = useState(outfit.rating || 0);
  
  const handleRating = (newRating) => {
    setRating(newRating);
    rateOutfit(outfit.id, newRating);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log('Sharing outfit:', outfit.name);
  };
  
  const handleDelete = () => {
    // In a real app, this would delete the outfit
    console.log('Deleting outfit:', outfit.name);
  };
  
  return (
    <Card
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <OutfitHeader>
        <OutfitTitle>{outfit.name}</OutfitTitle>
        <OutfitDate>{formatDate(outfit.created)}</OutfitDate>
      </OutfitHeader>
      
      <OutfitContent>
        <OutfitItems>
          {outfit.items.slice(0, 4).map(item => (
            <OutfitItemCard key={item.id}>
              <OutfitItemImage src={item.imageUrl} alt={item.name} />
              <OutfitItemName>{item.name}</OutfitItemName>
            </OutfitItemCard>
          ))}
        </OutfitItems>
        
        <OutfitMeta>
          <OutfitTag>{outfit.occasion}</OutfitTag>
          <OutfitTag>{outfit.weather.season}</OutfitTag>
          <OutfitTag>{outfit.weather.temperature}°F</OutfitTag>
          {outfit.suggested && <OutfitTag>Suggested</OutfitTag>}
        </OutfitMeta>
        
        <ViewButton to={`/outfit/${outfit.id}`}>
          View Outfit Details
        </ViewButton>
      </OutfitContent>
      
      <OutfitFooter>
        <OutfitRating>
          <RatingStars>
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                filled={star <= rating} 
                onClick={() => handleRating(star)}
              />
            ))}
          </RatingStars>
        </OutfitRating>
        
        <OutfitActions>
          <ActionButton onClick={handleShare}>
            <FiShare2 />
          </ActionButton>
          <ActionButton onClick={handleDelete}>
            <FiTrash2 />
          </ActionButton>
        </OutfitActions>
      </OutfitFooter>
    </Card>
  );
};

export default OutfitCard;
