import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHeart, FiPlus, FiInfo, FiX } from 'react-icons/fi';
import { useCloset } from '../../context/ClosetContext';

const ItemCard = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ItemImageContainer = styled.div`
  position: relative;
  padding-top: 133%; /* 3:4 aspect ratio */
  overflow: hidden;
  background-color: var(--color-gray-100);
`;

const ItemImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ItemCard}:hover & {
    transform: scale(1.05);
  }
`;

const ItemInfo = styled.div`
  padding: var(--spacing-md);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.h3`
  font-size: 1rem;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
  color: var(--color-secondary);
`;

const ItemBrand = styled.p`
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-xs);
`;

const ItemPrice = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent);
  margin-top: auto;
`;

const ItemActions = styled.div`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--color-white);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  color: ${props => props.active ? 'var(--color-accent)' : 'var(--color-secondary)'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    background-color: ${props => props.active ? 'var(--color-white)' : 'var(--color-accent)'};
    color: ${props => props.active ? 'var(--color-accent)' : 'var(--color-white)'};
  }
`;

const ItemBadges = styled.div`
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
`;

const ItemBadge = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background-color: var(--color-accent);
  color: var(--color-white);
  font-weight: 500;
`;

const DetailsOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
`;

const DetailsContent = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const DetailsImageContainer = styled.div`
  flex: 1;
  min-height: 300px;
  position: relative;
  
  @media (min-width: 768px) {
    max-width: 50%;
  }
`;

const DetailsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailsInfo = styled.div`
  flex: 1;
  padding: var(--spacing-xl);
  position: relative;
`;

const DetailsCloseButton = styled.button`
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-secondary);
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    color: var(--color-accent);
  }
`;

const DetailsTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
`;

const DetailsBrand = styled.p`
  font-size: 1rem;
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-md);
`;

const DetailsDescription = styled.p`
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
`;

const DetailsSection = styled.div`
  margin-bottom: var(--spacing-lg);
`;

const DetailsSectionTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
`;

const DetailsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
`;

const DetailsTag = styled.span`
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  background-color: var(--color-gray-200);
  color: var(--color-secondary);
`;

const DetailsPrice = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-accent);
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
`;

const DetailsActions = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
`;

const DetailsButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  
  &.primary {
    background-color: var(--color-accent);
    color: var(--color-white);
    border: none;
    
    &:hover {
      background-color: var(--color-accent-hover);
    }
  }
  
  &.secondary {
    background-color: transparent;
    border: 1px solid var(--color-accent);
    color: var(--color-accent);
    
    &:hover {
      background-color: var(--color-accent);
      color: var(--color-white);
    }
  }
`;

const ClothingItem = ({ item, isSelected = false }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { selectItem, deselectItem, toggleFavorite, isFavorite, addToRecentlyViewed } = useCloset();
  
  const handleSelectToggle = () => {
    if (isSelected) {
      deselectItem(item.id);
    } else {
      selectItem(item);
    }
  };
  
  const handleShowDetails = () => {
    setShowDetails(true);
    addToRecentlyViewed(item);
  };
  
  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  
  const favorite = isFavorite(item.id);
  
  return (
    <>
      <ItemCard
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <ItemImageContainer>
          <ItemImage src={item.imageUrl} alt={item.name} />
          <ItemBadges>
            {item.seasons.includes('summer') && (
              <ItemBadge>Summer</ItemBadge>
            )}
          </ItemBadges>
        </ItemImageContainer>
        
        <ItemInfo>
          <ItemName>{item.name}</ItemName>
          <ItemBrand>{item.brand}</ItemBrand>
          <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
        </ItemInfo>
        
        <ItemActions>
          <ActionButton 
            onClick={() => toggleFavorite(item)}
            active={favorite}
          >
            <FiHeart />
          </ActionButton>
          
          <ActionButton onClick={handleSelectToggle} active={isSelected}>
            {isSelected ? <FiX /> : <FiPlus />}
          </ActionButton>
          
          <ActionButton onClick={handleShowDetails}>
            <FiInfo />
          </ActionButton>
        </ItemActions>
      </ItemCard>
      
      {showDetails && (
        <DetailsOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseDetails}
        >
          <DetailsContent
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <DetailsImageContainer>
              <DetailsImage src={item.imageUrl} alt={item.name} />
            </DetailsImageContainer>
            
            <DetailsInfo>
              <DetailsCloseButton onClick={handleCloseDetails}>
                <FiX />
              </DetailsCloseButton>
              
              <DetailsTitle>{item.name}</DetailsTitle>
              <DetailsBrand>{item.brand}</DetailsBrand>
              <DetailsDescription>{item.description}</DetailsDescription>
              
              <DetailsSection>
                <DetailsSectionTitle>Category</DetailsSectionTitle>
                <DetailsList>
                  <DetailsTag>{item.category}</DetailsTag>
                </DetailsList>
              </DetailsSection>
              
              <DetailsSection>
                <DetailsSectionTitle>Colors</DetailsSectionTitle>
                <DetailsList>
                  {item.colors.map(color => (
                    <DetailsTag key={color}>{color}</DetailsTag>
                  ))}
                </DetailsList>
              </DetailsSection>
              
              <DetailsSection>
                <DetailsSectionTitle>Seasons</DetailsSectionTitle>
                <DetailsList>
                  {item.seasons.map(season => (
                    <DetailsTag key={season}>{season}</DetailsTag>
                  ))}
                </DetailsList>
              </DetailsSection>
              
              <DetailsSection>
                <DetailsSectionTitle>Occasions</DetailsSectionTitle>
                <DetailsList>
                  {item.occasions.map(occasion => (
                    <DetailsTag key={occasion}>{occasion}</DetailsTag>
                  ))}
                </DetailsList>
              </DetailsSection>
              
              <DetailsPrice>${item.price.toFixed(2)}</DetailsPrice>
              
              <DetailsActions>
                <DetailsButton 
                  className="primary"
                  onClick={handleSelectToggle}
                >
                  {isSelected ? <><FiX /> Remove from Selection</> : <><FiPlus /> Add to Selection</>}
                </DetailsButton>
                
                <DetailsButton 
                  className="secondary"
                  onClick={() => toggleFavorite(item)}
                >
                  <FiHeart /> {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </DetailsButton>
              </DetailsActions>
            </DetailsInfo>
          </DetailsContent>
        </DetailsOverlay>
      )}
    </>
  );
};

export default ClothingItem;
