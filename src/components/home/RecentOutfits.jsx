import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { useCloset } from '../../context/ClosetContext';

const SectionContainer = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const ViewAllLink = styled(Link)`
  color: var(--color-accent);
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const OutfitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OutfitCard = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
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
  margin: 0;
`;

const OutfitDate = styled.span`
  font-size: 0.75rem;
  color: var(--color-gray-500);
`;

const OutfitPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 240px;
`;

const ItemPreview = styled.div`
  position: relative;
  overflow: hidden;
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
  font-size: 0.75rem;
  text-align: center;
`;

const OutfitFooter = styled.div`
  padding: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OutfitTags = styled.div`
  display: flex;
  gap: var(--spacing-xs);
`;

const OutfitTag = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background-color: var(--color-gray-200);
  color: var(--color-secondary);
`;

const ViewButton = styled(Link)`
  color: var(--color-accent);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-xl) 0;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const EmptyStateText = styled.p`
  margin-bottom: var(--spacing-md);
  color: var(--color-gray-500);
`;

const CreateButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-accent);
  color: var(--color-white);
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    background-color: var(--color-accent-hover);
  }
`;

const RecentOutfits = () => {
  const { outfitHistory } = useCloset();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Show only the 3 most recent outfits
  const recentOutfits = outfitHistory.slice(0, 3);
  
  if (recentOutfits.length === 0) {
    return (
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>
            <FiClock /> Recent Outfits
          </SectionTitle>
        </SectionHeader>
        
        <EmptyState>
          <EmptyStateText>
            You haven't created any outfits yet.
          </EmptyStateText>
          <CreateButton to="/outfit-creator">
            Create Your First Outfit
          </CreateButton>
        </EmptyState>
      </SectionContainer>
    );
  }
  
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          <FiClock /> Recent Outfits
        </SectionTitle>
        <ViewAllLink to="/history">View All</ViewAllLink>
      </SectionHeader>
      
      <OutfitsGrid>
        {recentOutfits.map(outfit => (
          <OutfitCard
            key={outfit.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <OutfitHeader>
              <OutfitTitle>{outfit.name}</OutfitTitle>
              <OutfitDate>{formatDate(outfit.created)}</OutfitDate>
            </OutfitHeader>
            
            <OutfitPreview>
              {outfit.items.slice(0, 4).map((item, index) => (
                <ItemPreview key={item.id}>
                  <ItemImage src={item.imageUrl} alt={item.name} />
                  <ItemCategory>{item.category}</ItemCategory>
                </ItemPreview>
              ))}
            </OutfitPreview>
            
            <OutfitFooter>
              <OutfitTags>
                <OutfitTag>{outfit.occasion}</OutfitTag>
                <OutfitTag>{outfit.weather.season}</OutfitTag>
              </OutfitTags>
              
              <ViewButton to={`/outfit/${outfit.id}`}>
                View Details
              </ViewButton>
            </OutfitFooter>
          </OutfitCard>
        ))}
      </OutfitsGrid>
    </SectionContainer>
  );
};

export default RecentOutfits;
