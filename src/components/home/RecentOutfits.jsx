import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { outfits } from '../../data/outfits';

const RecentOutfitsSection = styled.section`
  margin-bottom: 5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: var(--primary-color);
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-color);
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--secondary-color);
    transform: translateX(5px);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const OutfitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OutfitCard = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
  }
`;

const OutfitImageContainer = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;
`;

const OutfitImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${OutfitCard}:hover & {
    transform: scale(1.05);
  }
`;

const OutfitFavorite = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  color: ${props => props.isFavorite ? 'var(--accent-color)' : 'var(--color-gray-400)'};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: var(--shadow-sm);
`;

const OutfitDetails = styled.div`
  padding: 1.5rem;
`;

const OutfitName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
`;

const OutfitMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--color-gray-600);
  margin-bottom: 1rem;
`;

const OutfitOccasion = styled.span`
  text-transform: capitalize;
`;

const OutfitSeason = styled.span`
  text-transform: capitalize;
`;

const OutfitItemsPreview = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  
  &::-webkit-scrollbar {
    height: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-gray-200);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 3px;
  }
`;

const ItemPreview = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid white;
  box-shadow: var(--shadow-sm);
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const OutfitLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: var(--accent-color);
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--secondary-color);
    transform: translateX(5px);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const RecentOutfits = () => {
  // Get the 3 most recent outfits
  const recentOutfits = [...outfits]
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .slice(0, 3);
  
  return (
    <RecentOutfitsSection>
      <SectionHeader>
        <SectionTitle>Recent Outfits</SectionTitle>
        <ViewAllLink to="/outfits">
          View All <FiArrowRight />
        </ViewAllLink>
      </SectionHeader>
      
      <OutfitsGrid>
        {recentOutfits.map((outfit, index) => (
          <OutfitCard 
            key={outfit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <OutfitImageContainer>
              <OutfitImage 
                src={outfit.items[0].imageUrl} 
                alt={outfit.name} 
              />
              <OutfitFavorite isFavorite={outfit.favorite}>
                ♥
              </OutfitFavorite>
            </OutfitImageContainer>
            
            <OutfitDetails>
              <OutfitName>{outfit.name}</OutfitName>
              
              <OutfitMeta>
                <OutfitOccasion>{outfit.occasion}</OutfitOccasion>
                <OutfitSeason>{outfit.weather.season}</OutfitSeason>
              </OutfitMeta>
              
              <OutfitItemsPreview>
                {outfit.items.map(item => (
                  <ItemPreview key={item.id}>
                    <ItemImage src={item.imageUrl} alt={item.name} />
                  </ItemPreview>
                ))}
              </OutfitItemsPreview>
              
              <OutfitLink to={`/outfit/${outfit.id}`}>
                View Details <FiArrowRight />
              </OutfitLink>
            </OutfitDetails>
          </OutfitCard>
        ))}
      </OutfitsGrid>
    </RecentOutfitsSection>
  );
};

export default RecentOutfits;
