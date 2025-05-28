import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHeart, FiShare2, FiEdit2, FiTrash2 } from 'react-icons/fi';

const OutfitDetails = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Mock outfit data - in a real app, you would fetch this from your context or API
  const outfit = {
    id,
    name: 'Business Casual',
    date: 'June 15, 2023',
    description: 'Perfect for office days or casual meetings. Comfortable yet professional look.',
    items: [
      {
        id: '1',
        name: 'White Button-Down Shirt',
        category: 'tops',
        brand: 'Brooks Brothers',
        image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      },
      {
        id: '2',
        name: 'Blue Jeans',
        category: 'bottoms',
        brand: "Levi's",
        image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      },
      {
        id: '6',
        name: 'Navy Blazer',
        category: 'outerwear',
        brand: 'Ralph Lauren',
        image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
      },
      {
        id: '4',
        name: 'Brown Leather Boots',
        category: 'shoes',
        brand: 'Red Wing',
        image: 'https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg',
      },
    ],
    occasions: ['Work', 'Casual Meeting', 'Dinner'],
    seasons: ['Spring', 'Fall'],
    tags: ['business casual', 'professional', 'comfortable'],
    notes: 'This outfit works well with both the brown and black belt. For colder days, add the gray scarf.'
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const shareOutfit = () => {
    // Implement sharing functionality
    alert('Sharing functionality not implemented yet');
  };

  const deleteOutfit = () => {
    // Implement delete functionality
    if (window.confirm('Are you sure you want to delete this outfit?')) {
      alert('Outfit deleted successfully');
      // Redirect to outfits page
    }
  };

  return (
    <OutfitDetailsContainer>
      <OutfitHeader>
        <BackLink to="/closet">← Back to Closet</BackLink>
        <OutfitTitle>{outfit.name}</OutfitTitle>
        <OutfitDate>Created on {outfit.date}</OutfitDate>
        <OutfitActions>
          <ActionButton onClick={toggleFavorite} $isFavorite={isFavorite}>
            <FiHeart size={18} />
            <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
          </ActionButton>
          <ActionButton onClick={shareOutfit}>
            <FiShare2 size={18} />
            <span>Share</span>
          </ActionButton>
          <ActionButton as={Link} to={`/outfit-creator?edit=${id}`}>
            <FiEdit2 size={18} />
            <span>Edit</span>
          </ActionButton>
          <ActionButton onClick={deleteOutfit} $isDelete>
            <FiTrash2 size={18} />
            <span>Delete</span>
          </ActionButton>
        </OutfitActions>
      </OutfitHeader>

      <OutfitContent>
        <OutfitVisual>
          <OutfitItemsGrid>
            {outfit.items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <OutfitItemCard>
                  <OutfitItemImage src={item.image} alt={item.name} />
                  <OutfitItemDetails>
                    <OutfitItemName>{item.name}</OutfitItemName>
                    <OutfitItemCategory>{item.category}</OutfitItemCategory>
                    <OutfitItemBrand>{item.brand}</OutfitItemBrand>
                  </OutfitItemDetails>
                </OutfitItemCard>
              </motion.div>
            ))}
          </OutfitItemsGrid>
        </OutfitVisual>

        <OutfitInfo>
          <OutfitSection>
            <SectionTitle>Description</SectionTitle>
            <OutfitDescription>{outfit.description}</OutfitDescription>
          </OutfitSection>

          <OutfitSection>
            <SectionTitle>Occasions</SectionTitle>
            <TagsContainer>
              {outfit.occasions.map((occasion, index) => (
                <Tag key={index}>{occasion}</Tag>
              ))}
            </TagsContainer>
          </OutfitSection>

          <OutfitSection>
            <SectionTitle>Seasons</SectionTitle>
            <TagsContainer>
              {outfit.seasons.map((season, index) => (
                <Tag key={index}>{season}</Tag>
              ))}
            </TagsContainer>
          </OutfitSection>

          <OutfitSection>
            <SectionTitle>Tags</SectionTitle>
            <TagsContainer>
              {outfit.tags.map((tag, index) => (
                <Tag key={index}>#{tag}</Tag>
              ))}
            </TagsContainer>
          </OutfitSection>

          <OutfitSection>
            <SectionTitle>Notes</SectionTitle>
            <OutfitNotes>{outfit.notes}</OutfitNotes>
          </OutfitSection>
        </OutfitInfo>
      </OutfitContent>

      <SimilarOutfits>
        <SectionTitle>Similar Outfits</SectionTitle>
        <SimilarOutfitsGrid>
          <SimilarOutfitCard>
            <SimilarOutfitImage src="https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg" alt="Similar outfit" />
            <SimilarOutfitName>Casual Friday</SimilarOutfitName>
          </SimilarOutfitCard>
          <SimilarOutfitCard>
            <SimilarOutfitImage src="https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg" alt="Similar outfit" />
            <SimilarOutfitName>Weekend Brunch</SimilarOutfitName>
          </SimilarOutfitCard>
          <SimilarOutfitCard>
            <SimilarOutfitImage src="https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg" alt="Similar outfit" />
            <SimilarOutfitName>Smart Casual</SimilarOutfitName>
          </SimilarOutfitCard>
        </SimilarOutfitsGrid>
      </SimilarOutfits>
    </OutfitDetailsContainer>
  );
};

const OutfitDetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const OutfitHeader = styled.div`
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }
`;

const OutfitTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
`;

const OutfitDate = styled.p`
  font-size: 0.9rem;
  color: var(--color-dark-gray);
  margin-bottom: 1.5rem;
`;

const OutfitActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-light);
  border: 1px solid var(--color-gray);
  border-radius: var(--border-radius);
  color: ${props => {
    if (props.$isFavorite) return 'var(--color-accent)';
    if (props.$isDelete) return 'var(--color-error)';
    return 'var(--color-text)';
  }};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => {
      if (props.$isFavorite) return 'rgba(231, 76, 60, 0.1)';
      if (props.$isDelete) return 'rgba(231, 76, 60, 0.1)';
      return 'var(--color-gray)';
    }};
  }

  svg {
    fill: ${props => props.$isFavorite ? 'var(--color-accent)' : 'none'};
  }
`;

const OutfitContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const OutfitVisual = styled.div`
  background-color: var(--color-light);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const OutfitItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const OutfitItemCard = styled.div`
  background-color: var(--color-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const OutfitItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const OutfitItemDetails = styled.div`
  padding: 1rem;
`;

const OutfitItemName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: var(--color-primary);
`;

const OutfitItemCategory = styled.p`
  font-size: 0.8rem;
  color: var(--color-dark-gray);
  text-transform: capitalize;
  margin-bottom: 0.25rem;
`;

const OutfitItemBrand = styled.p`
  font-size: 0.8rem;
  color: var(--color-dark-gray);
`;

const OutfitInfo = styled.div`
  background-color: var(--color-light);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const OutfitSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
`;

const OutfitDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: var(--color-gray);
  color: var(--color-text);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const OutfitNotes = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  font-style: italic;
`;

const SimilarOutfits = styled.div`
  margin-top: 3rem;
`;

const SimilarOutfitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const SimilarOutfitCard = styled.div`
  background-color: var(--color-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SimilarOutfitImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const SimilarOutfitName = styled.h3`
  font-size: 1rem;
  padding: 1rem;
  color: var(--color-primary);
`;

export default OutfitDetails;
