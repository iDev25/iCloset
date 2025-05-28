import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import { useCloset } from '../../context/ClosetContext';

const PanelContainer = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const PanelTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin: 0;
`;

const ItemCount = styled.span`
  font-size: 0.875rem;
  color: var(--color-gray-500);
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: var(--color-accent);
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-lg) 0;
  color: var(--color-gray-500);
`;

const EmptyStateText = styled.p`
  margin-bottom: var(--spacing-md);
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

const ItemCard = styled(motion.div)`
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

const RemoveButton = styled.button`
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-white);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  color: var(--color-secondary);
  
  &:hover {
    color: var(--color-accent);
  }
`;

const ItemName = styled.div`
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CreateButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: var(--color-accent);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  cursor: pointer;
  margin-top: var(--spacing-lg);
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--color-accent-hover);
  }
  
  &:disabled {
    background-color: var(--color-gray-300);
    cursor: not-allowed;
  }
`;

const SelectedItemsPanel = ({ onCreateOutfit }) => {
  const { selectedItems, deselectItem, clearSelectedItems } = useCloset();
  
  const handleCreateOutfit = () => {
    if (onCreateOutfit) {
      onCreateOutfit();
    }
  };
  
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelTitle>
          <FiShoppingBag /> Selected Items
          <ItemCount>({selectedItems.length})</ItemCount>
        </PanelTitle>
        
        {selectedItems.length > 0 && (
          <ClearButton onClick={clearSelectedItems}>
            Clear All
          </ClearButton>
        )}
      </PanelHeader>
      
      {selectedItems.length === 0 ? (
        <EmptyState>
          <EmptyStateText>
            Select items from your closet to create an outfit.
          </EmptyStateText>
        </EmptyState>
      ) : (
        <AnimatePresence>
          <ItemsGrid>
            {selectedItems.map(item => (
              <ItemCard
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <ItemImageContainer>
                  <ItemImage src={item.imageUrl} alt={item.name} />
                  <ItemCategory>{item.category}</ItemCategory>
                  <RemoveButton onClick={() => deselectItem(item.id)}>
                    <FiX size={14} />
                  </RemoveButton>
                </ItemImageContainer>
                <ItemName>{item.name}</ItemName>
              </ItemCard>
            ))}
          </ItemsGrid>
          
          <CreateButton 
            onClick={handleCreateOutfit}
            disabled={selectedItems.length < 2}
          >
            Create Outfit
          </CreateButton>
        </AnimatePresence>
      )}
    </PanelContainer>
  );
};

export default SelectedItemsPanel;
