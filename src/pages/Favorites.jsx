import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCloset } from '../context/ClosetContext';
import { FiHeart, FiGrid, FiList } from 'react-icons/fi';

const Favorites = () => {
  const { getFavoriteItems } = useCloset();
  const [viewMode, setViewMode] = useState('grid');
  
  const favoriteItems = getFavoriteItems();

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  return (
    <FavoritesContainer>
      <FavoritesHeader>
        <h1>My Favorites</h1>
        <HeaderActions>
          <ViewToggle onClick={toggleViewMode}>
            {viewMode === 'grid' ? <FiList size={20} /> : <FiGrid size={20} />}
          </ViewToggle>
        </HeaderActions>
      </FavoritesHeader>

      {favoriteItems.length > 0 ? (
        <ItemsContainer $viewMode={viewMode}>
          {favoriteItems.map((item) => (
            <ItemCard 
              key={item.id} 
              $viewMode={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ItemImage src={item.image} alt={item.name} $viewMode={viewMode} />
              <ItemDetails $viewMode={viewMode}>
                <ItemName>{item.name}</ItemName>
                <ItemMeta>
                  <ItemBrand>{item.brand}</ItemBrand>
                  <ItemCategory>{item.subcategory}</ItemCategory>
                </ItemMeta>
                {viewMode === 'list' && (
                  <ItemDescription>
                    <p>Color: {item.color}</p>
                    <p>Occasions: {item.occasions.join(', ')}</p>
                    <p>Seasons: {item.seasons.join(', ')}</p>
                  </ItemDescription>
                )}
                <FavoriteButton>
                  <FiHeart size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                </FavoriteButton>
              </ItemDetails>
            </ItemCard>
          ))}
        </ItemsContainer>
      ) : (
        <EmptyState>
          <EmptyIcon>❤️</EmptyIcon>
          <EmptyTitle>No favorites yet</EmptyTitle>
          <EmptyDescription>
            Items you mark as favorites will appear here for quick access.
          </EmptyDescription>
          <BrowseButton to="/closet">Browse My Closet</BrowseButton>
        </EmptyState>
      )}
    </FavoritesContainer>
  );
};

const FavoritesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const FavoritesHeader = styled.div`
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
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ViewToggle = styled.button`
  background-color: var(--color-light);
  border: 1px solid var(--color-gray);
  border-radius: var(--border-radius);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--color-gray);
  }
`;

const ItemsContainer = styled.div`
  display: ${(props) => (props.$viewMode === 'grid' ? 'grid' : 'flex')};
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  flex-direction: ${(props) => (props.$viewMode === 'list' ? 'column' : 'row')};
`;

const ItemCard = styled(motion.div)`
  background-color: var(--color-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
  display: ${(props) => (props.$viewMode === 'list' ? 'flex' : 'block')};
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  position: relative;
`;

const ItemName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
`;

const ItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--color-dark-gray);
`;

const ItemBrand = styled.span``;

const ItemCategory = styled.span`
  text-transform: capitalize;
`;

const ItemDescription = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--color-text);

  p {
    margin-bottom: 0.25rem;
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--color-light);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
`;

const EmptyDescription = styled.p`
  font-size: 1rem;
  color: var(--color-dark-gray);
  max-width: 500px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const BrowseButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-light);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000;
  }
`;

export default Favorites;
