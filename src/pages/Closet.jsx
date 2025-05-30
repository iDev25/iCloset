import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCloset } from '../context/ClosetContext';
import { FiFilter, FiPlus, FiGrid, FiList } from 'react-icons/fi';
import { clothingItems } from '../data/clothingItems';

const Closet = () => {
  // Use clothingItems from imported data instead of from context
  const { getItemsByCategory } = useCloset();
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessories', label: 'Accessories' },
  ];

  // Filter items based on category
  const filteredItems = activeCategory === 'all' 
    ? clothingItems 
    : clothingItems.filter(item => item.category === activeCategory);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  return (
    <ClosetContainer>
      <HeroBanner>
        <HeroOverlay />
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>My Closet</HeroTitle>
            <HeroSubtitle>
              Browse, organize, and manage your wardrobe with ease
            </HeroSubtitle>
          </motion.div>
        </HeroContent>
      </HeroBanner>

      <ClosetContent>
        <ClosetHeader>
          <HeaderActions>
            <ViewToggle onClick={toggleViewMode}>
              {viewMode === 'grid' ? <FiList size={20} /> : <FiGrid size={20} />}
            </ViewToggle>
            <FilterButton onClick={toggleFilters}>
              <FiFilter size={20} />
              <span>Filter</span>
            </FilterButton>
            <AddButton to="/add-item">
              <FiPlus size={20} />
              <span>Add Item</span>
            </AddButton>
          </HeaderActions>
        </ClosetHeader>

        <CategoriesNav>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              $isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
              {activeCategory === category.id && <ActiveIndicator layoutId="activeCategory" />}
            </CategoryButton>
          ))}
        </CategoriesNav>

        {showFilters && (
          <FiltersContainer>
            <FilterSection>
              <FilterTitle>Season</FilterTitle>
              <FilterOptions>
                <FilterOption>
                  <input type="checkbox" id="spring" />
                  <label htmlFor="spring">Spring</label>
                </FilterOption>
                <FilterOption>
                  <input type="checkbox" id="summer" />
                  <label htmlFor="summer">Summer</label>
                </FilterOption>
                <FilterOption>
                  <input type="checkbox" id="fall" />
                  <label htmlFor="fall">Fall</label>
                </FilterOption>
                <FilterOption>
                  <input type="checkbox" id="winter" />
                  <label htmlFor="winter">Winter</label>
                </FilterOption>
              </FilterOptions>
            </FilterSection>

            <FilterSection>
              <FilterTitle>Color</FilterTitle>
              <FilterOptions>
                <FilterOption>
                  <input type="checkbox" id="black" />
                  <label htmlFor="black">Black</label>
                </FilterOption>
                <FilterOption>
                  <input type="checkbox" id="white" />
                  <label htmlFor="white">White</label>
                </FilterOption>
                <FilterOption>
                  <input type="checkbox" id="blue" />
                  <label htmlFor="blue">Blue</label>
                </FilterOption>
                <FilterOption>
                  <input type="checkbox" id="brown" />
                  <label htmlFor="brown">Brown</label>
                </FilterOption>
              </FilterOptions>
            </FilterSection>

            <FilterSection>
              <FilterTitle>Brand</FilterTitle>
              <FilterOptions>
                <FilterOption>
                  <input type="checkbox" id="ralph-lauren" />
                  <label htmlFor="ralph-lauren">Ralph Lauren</label>
                </FilterOption>
                <FilterOption>
                  <input type="checkbox" id="levis" />
                  <label htmlFor="levis">Levi's</label>
                </FilterOption>
                <FilterOption>
                  <input type="checkbox" id="brooks-brothers" />
                  <label htmlFor="brooks-brothers">Brooks Brothers</label>
                </FilterOption>
              </FilterOptions>
            </FilterSection>
          </FiltersContainer>
        )}

        <ItemsContainer $viewMode={viewMode}>
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard 
                key={item.id} 
                $viewMode={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ItemImage src={item.imageUrl} alt={item.name} $viewMode={viewMode} />
                <ItemDetails $viewMode={viewMode}>
                  <ItemName>{item.name}</ItemName>
                  <ItemMeta>
                    <ItemBrand>{item.brand}</ItemBrand>
                    <ItemCategory>{item.category}</ItemCategory>
                  </ItemMeta>
                  {viewMode === 'list' && (
                    <ItemDescription>
                      <p>Color: {Array.isArray(item.colors) ? item.colors.join(', ') : item.color}</p>
                      <p>Occasions: {Array.isArray(item.occasions) ? item.occasions.join(', ') : 'N/A'}</p>
                      <p>Seasons: {Array.isArray(item.seasons) ? item.seasons.join(', ') : item.season.join(', ')}</p>
                    </ItemDescription>
                  )}
                </ItemDetails>
              </ItemCard>
            ))
          ) : (
            <EmptyState>
              <p>No items found in this category.</p>
              <AddButton to="/add-item">
                <FiPlus size={20} />
                <span>Add Item</span>
              </AddButton>
            </EmptyState>
          )}
        </ItemsContainer>
      </ClosetContent>
    </ClosetContainer>
  );
};

const ClosetContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroBanner = styled.section`
  position: relative;
  height: 300px;
  width: 100%;
  background-image: url('https://images.pexels.com/photos/5705506/pexels-photo-5705506.jpeg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 2rem;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(26, 26, 26, 0.8), rgba(26, 26, 26, 0.4));
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ClosetContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem 3rem;
  }
`;

const ClosetHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ViewToggle = styled.button`
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-400);
  }
`;

const FilterButton = styled.button`
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-400);
  }
`;

const AddButton = styled(Link)`
  background-color: var(--accent-color);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const CategoriesNav = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-gray-200);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-gray-600);
    border-radius: 10px;
  }
`;

const CategoryButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  color: ${(props) => (props.$isActive ? 'var(--accent-color)' : 'var(--text-color)')};
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
  background-color: var(--accent-color);
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  background-color: var(--color-white);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
`;

const FilterSection = styled.div``;

const FilterTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--accent-color);
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    cursor: pointer;
    accent-color: var(--accent-color);
  }

  label {
    font-size: 0.9rem;
    cursor: pointer;
  }
`;

const ItemsContainer = styled.div`
  display: ${(props) => (props.$viewMode === 'grid' ? 'grid' : 'flex')};
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  flex-direction: ${(props) => (props.$viewMode === 'list' ? 'column' : 'row')};
`;

const ItemCard = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  display: ${(props) => (props.$viewMode === 'list' ? 'flex' : 'block')};
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }
`;

const ItemImage = styled.img`
  width: ${(props) => (props.$viewMode === 'list' ? '120px' : '100%')};
  height: ${(props) => (props.$viewMode === 'list' ? '120px' : '240px')};
  object-fit: cover;
`;

const ItemDetails = styled.div`
  padding: 1rem;
  flex: ${(props) => (props.$viewMode === 'list' ? '1' : 'none')};
`;

const ItemName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
`;

const ItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--color-gray-600);
`;

const ItemBrand = styled.span``;

const ItemCategory = styled.span`
  text-transform: capitalize;
`;

const ItemDescription = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-color);

  p {
    margin-bottom: 0.25rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  grid-column: 1 / -1;

  p {
    margin-bottom: 1.5rem;
    color: var(--color-gray-600);
  }
`;

export default Closet;
