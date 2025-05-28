import styled from 'styled-components';
import ClothingItem from './ClothingItem';
import { useCloset } from '../../context/ClosetContext';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--spacing-md);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-xxl) 0;
  color: var(--color-gray-500);
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: var(--spacing-md);
`;

const EmptyStateText = styled.p`
  margin-bottom: var(--spacing-lg);
`;

const ItemGrid = ({ items }) => {
  const { selectedItems } = useCloset();
  
  if (!items || items.length === 0) {
    return (
      <EmptyState>
        <EmptyStateTitle>No items found</EmptyStateTitle>
        <EmptyStateText>
          Try adjusting your filters or search criteria to find what you're looking for.
        </EmptyStateText>
      </EmptyState>
    );
  }
  
  return (
    <GridContainer>
      {items.map(item => (
        <ClothingItem 
          key={item.id} 
          item={item} 
          isSelected={selectedItems.some(selected => selected.id === item.id)}
        />
      ))}
    </GridContainer>
  );
};

export default ItemGrid;
