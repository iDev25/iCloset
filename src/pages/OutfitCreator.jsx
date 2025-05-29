import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useCloset } from '../context/ClosetContext';
import { FiSave, FiShare, FiHeart, FiTrash2 } from 'react-icons/fi';
import { clothingItems } from '../data/clothingItems';

const OutfitCreator = () => {
  // Use clothingItems from imported data instead of from context
  const { getItemsByCategory } = useCloset();
  const [selectedCategory, setSelectedCategory] = useState('tops');
  const [currentOutfit, setCurrentOutfit] = useState({
    tops: null,
    bottoms: null,
    outerwear: null,
    shoes: null,
    accessories: null
  });
  const [outfitName, setOutfitName] = useState('');

  const categories = [
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    // If dragging from the item list to an outfit slot
    if (source.droppableId === 'items-list' && destination.droppableId.startsWith('outfit-')) {
      const category = destination.droppableId.replace('outfit-', '');
      const item = clothingItems.find(item => item.id === draggableId);
      
      setCurrentOutfit({
        ...currentOutfit,
        [category]: item
      });
    }
    
    // If removing an item from an outfit slot
    if (source.droppableId.startsWith('outfit-') && destination.droppableId === 'items-list') {
      const category = source.droppableId.replace('outfit-', '');
      
      setCurrentOutfit({
        ...currentOutfit,
        [category]: null
      });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const removeItemFromOutfit = (category) => {
    setCurrentOutfit({
      ...currentOutfit,
      [category]: null
    });
  };

  const saveOutfit = () => {
    // Implement saving outfit functionality
    console.log('Saving outfit:', { name: outfitName, items: currentOutfit });
    alert('Outfit saved successfully!');
  };

  const shareOutfit = () => {
    // Implement sharing functionality
    alert('Sharing is not implemented yet');
  };

  const clearOutfit = () => {
    setCurrentOutfit({
      tops: null,
      bottoms: null,
      outerwear: null,
      shoes: null,
      accessories: null
    });
    setOutfitName('');
  };

  // Get items by category function to replace context function
  const getItemsByCategoryLocal = (category) => {
    return clothingItems.filter(item => item.category === category);
  };

  return (
    <CreatorContainer>
      <CreatorHeader>
        <h1>Outfit Creator</h1>
        <OutfitActions>
          <OutfitNameInput
            type="text"
            placeholder="Name your outfit"
            value={outfitName}
            onChange={(e) => setOutfitName(e.target.value)}
          />
          <ActionButton onClick={saveOutfit}>
            <FiSave size={18} />
            <span>Save</span>
          </ActionButton>
          <ActionButton onClick={shareOutfit}>
            <FiShare size={18} />
            <span>Share</span>
          </ActionButton>
          <ActionButton onClick={clearOutfit}>
            <FiTrash2 size={18} />
            <span>Clear</span>
          </ActionButton>
        </OutfitActions>
      </CreatorHeader>

      <DragDropContext onDragEnd={handleDragEnd}>
        <CreatorContent>
          <OutfitPreviewSection>
            <OutfitPreviewTitle>Your Outfit</OutfitPreviewTitle>
            <OutfitPreview>
              {categories.map((category) => (
                <OutfitSlot key={category.id}>
                  <SlotLabel>{category.label}</SlotLabel>
                  <Droppable droppableId={`outfit-${category.id}`}>
                    {(provided, snapshot) => (
                      <SlotDropArea
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        $isDraggingOver={snapshot.isDraggingOver}
                        $hasItem={!!currentOutfit[category.id]}
                      >
                        {currentOutfit[category.id] ? (
                          <OutfitItem>
                            <OutfitItemImage src={currentOutfit[category.id].imageUrl} alt={currentOutfit[category.id].name} />
                            <OutfitItemName>{currentOutfit[category.id].name}</OutfitItemName>
                            <RemoveButton onClick={() => removeItemFromOutfit(category.id)}>
                              <FiTrash2 size={16} />
                            </RemoveButton>
                          </OutfitItem>
                        ) : (
                          <EmptySlotText>Drop {category.label.toLowerCase()} here</EmptySlotText>
                        )}
                        {provided.placeholder}
                      </SlotDropArea>
                    )}
                  </Droppable>
                </OutfitSlot>
              ))}
            </OutfitPreview>
          </OutfitPreviewSection>

          <ItemsSection>
            <CategoryTabs>
              {categories.map((category) => (
                <CategoryTab
                  key={category.id}
                  $isActive={selectedCategory === category.id}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.label}
                  {selectedCategory === category.id && <ActiveIndicator layoutId="activeCategory" />}
                </CategoryTab>
              ))}
            </CategoryTabs>

            <Droppable droppableId="items-list" direction="horizontal">
              {(provided) => (
                <ItemsGrid
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {getItemsByCategoryLocal(selectedCategory).map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <ItemCard
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          $isDragging={snapshot.isDragging}
                          style={provided.draggableProps.style}
                        >
                          <ItemImage src={item.imageUrl} alt={item.name} />
                          <ItemDetails>
                            <ItemName>{item.name}</ItemName>
                            <ItemBrand>{item.brand}</ItemBrand>
                          </ItemDetails>
                          <FavoriteButton>
                            <FiHeart size={16} />
                          </FavoriteButton>
                        </ItemCard>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ItemsGrid>
              )}
            </Droppable>
          </ItemsSection>
        </CreatorContent>
      </DragDropContext>
    </CreatorContainer>
  );
};

const CreatorContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const CreatorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  h1 {
    font-size: 2rem;
    color: var(--color-primary);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const OutfitActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const OutfitNameInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-gray);
  border-radius: var(--border-radius);
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-light);
  border: 1px solid var(--color-gray);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--color-gray);
  }

  &:first-of-type {
    background-color: var(--color-primary);
    color: var(--color-light);
    border: none;

    &:hover {
      background-color: #000;
    }
  }
`;

const CreatorContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const OutfitPreviewSection = styled.div`
  background-color: var(--color-light);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const OutfitPreviewTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
`;

const OutfitPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OutfitSlot = styled.div``;

const SlotLabel = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--color-text);
`;

const SlotDropArea = styled.div`
  min-height: 100px;
  border: 2px dashed ${props => props.$isDraggingOver ? 'var(--color-primary)' : 'var(--color-gray)'};
  border-radius: var(--border-radius);
  background-color: ${props => props.$isDraggingOver ? 'rgba(0, 0, 0, 0.02)' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.$hasItem ? '0.75rem' : '1.5rem'};
  transition: all 0.2s ease;
`;

const EmptySlotText = styled.p`
  color: var(--color-dark-gray);
  font-size: 0.9rem;
  text-align: center;
`;

const OutfitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  position: relative;
`;

const OutfitItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--border-radius);
`;

const OutfitItemName = styled.p`
  font-size: 0.9rem;
  color: var(--color-text);
`;

const RemoveButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-dark-gray);
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-error);
  }
`;

const ItemsSection = styled.div`
  background-color: var(--color-light);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-gray);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-dark-gray);
    border-radius: 10px;
  }
`;

const CategoryTab = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  color: ${(props) => (props.$isActive ? 'var(--color-primary)' : 'var(--color-text)')};
  cursor: pointer;
  position: relative;
  white-space: nowrap;
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-accent);
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

const ItemCard = styled.div`
  background-color: ${props => props.$isDragging ? 'rgba(0, 0, 0, 0.02)' : 'var(--color-light)'};
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: ${props => props.$isDragging ? '0 8px 16px rgba(0, 0, 0, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  cursor: grab;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: ${props => props.$isDragging ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.$isDragging ? '0 8px 16px rgba(0, 0, 0, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  padding: 0.75rem;
`;

const ItemName = styled.h3`
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  color: var(--color-primary);
`;

const ItemBrand = styled.p`
  font-size: 0.8rem;
  color: var(--color-dark-gray);
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

export default OutfitCreator;
