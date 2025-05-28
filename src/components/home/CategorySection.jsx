import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
`;

const ViewAllLink = styled(Link)`
  color: var(--color-accent);
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  height: 200px;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${CategoryCard}:hover & {
    transform: scale(1.05);
  }
`;

const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--spacing-md);
`;

const CategoryName = styled.h3`
  color: var(--color-white);
  margin: 0;
  font-size: 1.25rem;
`;

const CategoryCount = styled.span`
  color: var(--color-gray-200);
  font-size: 0.875rem;
`;

const CategoryLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const CategorySection = () => {
  const { categories, items } = useCloset();
  
  // Get a representative image for each category
  const getCategoryImage = (category) => {
    const categoryItems = items.filter(item => item.category === category);
    return categoryItems.length > 0 ? categoryItems[0].imageUrl : '';
  };
  
  // Count items in each category
  const getCategoryCount = (category) => {
    return items.filter(item => item.category === category).length;
  };
  
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Browse by Category</SectionTitle>
        <ViewAllLink to="/closet">View All</ViewAllLink>
      </SectionHeader>
      
      <CategoriesGrid>
        {categories.map(category => (
          <CategoryCard
            key={category}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <CategoryImage src={getCategoryImage(category)} alt={category} />
            <CategoryOverlay>
              <CategoryName>{category.charAt(0).toUpperCase() + category.slice(1)}</CategoryName>
              <CategoryCount>{getCategoryCount(category)} items</CategoryCount>
            </CategoryOverlay>
            <CategoryLink to={`/closet?category=${category}`} />
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </SectionContainer>
  );
};

export default CategorySection;
