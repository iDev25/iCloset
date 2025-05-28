import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useCloset } from '../../context/ClosetContext';

const FilterContainer = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const FilterTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const FilterActions = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  color: var(--color-accent);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  
  &:hover {
    text-decoration: underline;
  }
`;

const FilterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterSection = styled.div``;

const FilterSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  cursor: pointer;
`;

const FilterSectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`;

const FilterSectionContent = styled(motion.div)`
  margin-bottom: var(--spacing-md);
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-xs);
`;

const FilterCheckbox = styled.input`
  margin-right: var(--spacing-sm);
  cursor: pointer;
  accent-color: var(--color-accent);
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  cursor: pointer;
`;

const FilterCount = styled.span`
  font-size: 0.75rem;
  color: var(--color-gray-500);
  margin-left: var(--spacing-xs);
`;

const MobileFilterToggle = styled.button`
  display: none;
  width: 100%;
  padding: var(--spacing-md);
  background-color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  font-weight: 500;
  cursor: pointer;
  margin-bottom: var(--spacing-md);
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileFilterContainer = styled(motion.div)`
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const FilterPanel = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    color: true,
    season: true,
    occasion: true,
    brand: false,
  });
  
  const { 
    filters, 
    updateFilters, 
    resetFilters, 
    categories, 
    colors, 
    seasons, 
    occasions, 
    brands,
    items
  } = useCloset();
  
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };
  
  // Count items for each filter option
  const getCategoryCount = (category) => {
    return items.filter(item => item.category === category).length;
  };
  
  const getColorCount = (color) => {
    return items.filter(item => item.colors.includes(color)).length;
  };
  
  const getSeasonCount = (season) => {
    return items.filter(item => item.seasons.includes(season)).length;
  };
  
  const getOccasionCount = (occasion) => {
    return items.filter(item => item.occasions.includes(occasion)).length;
  };
  
  const getBrandCount = (brand) => {
    return items.filter(item => item.brand === brand).length;
  };
  
  return (
    <>
      <MobileFilterToggle onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}>
        <span>Filters</span>
        {mobileFiltersOpen ? <FiChevronUp /> : <FiChevronDown />}
      </MobileFilterToggle>
      
      <MobileFilterContainer isOpen={mobileFiltersOpen}>
        <FilterContainer>
          <FilterHeader>
            <FilterTitle>
              <FiFilter /> Filters
            </FilterTitle>
            <FilterActions>
              <FilterButton onClick={resetFilters}>
                <FiX /> Reset All
              </FilterButton>
            </FilterActions>
          </FilterHeader>
          
          <FilterContent>
            <FilterSection>
              <FilterSectionHeader onClick={() => toggleSection('category')}>
                <FilterSectionTitle>Category</FilterSectionTitle>
                {expandedSections.category ? <FiChevronUp /> : <FiChevronDown />}
              </FilterSectionHeader>
              
              {expandedSections.category && (
                <FilterSectionContent
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <FilterOption>
                    <FilterCheckbox 
                      type="radio" 
                      id="category-all" 
                      name="category" 
                      checked={filters.category === 'all'} 
                      onChange={() => updateFilters({ category: 'all' })}
                    />
                    <FilterLabel htmlFor="category-all">
                      All Categories
                    </FilterLabel>
                  </FilterOption>
                  
                  {categories.map(category => (
                    <FilterOption key={category}>
                      <FilterCheckbox 
                        type="radio" 
                        id={`category-${category}`} 
                        name="category" 
                        checked={filters.category === category} 
                        onChange={() => updateFilters({ category })}
                      />
                      <FilterLabel htmlFor={`category-${category}`}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                        <FilterCount>({getCategoryCount(category)})</FilterCount>
                      </FilterLabel>
                    </FilterOption>
                  ))}
                </FilterSectionContent>
              )}
            </FilterSection>
            
            <FilterSection>
              <FilterSectionHeader onClick={() => toggleSection('color')}>
                <FilterSectionTitle>Color</FilterSectionTitle>
                {expandedSections.color ? <FiChevronUp /> : <FiChevronDown />}
              </FilterSectionHeader>
              
              {expandedSections.color && (
                <FilterSectionContent
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <FilterOption>
                    <FilterCheckbox 
                      type="radio" 
                      id="color-all" 
                      name="color" 
                      checked={filters.color === 'all'} 
                      onChange={() => updateFilters({ color: 'all' })}
                    />
                    <FilterLabel htmlFor="color-all">
                      All Colors
                    </FilterLabel>
                  </FilterOption>
                  
                  {colors.map(color => (
                    <FilterOption key={color}>
                      <FilterCheckbox 
                        type="radio" 
                        id={`color-${color}`} 
                        name="color" 
                        checked={filters.color === color} 
                        onChange={() => updateFilters({ color })}
                      />
                      <FilterLabel htmlFor={`color-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                        <FilterCount>({getColorCount(color)})</FilterCount>
                      </FilterLabel>
                    </FilterOption>
                  ))}
                </FilterSectionContent>
              )}
            </FilterSection>
            
            <FilterSection>
              <FilterSectionHeader onClick={() => toggleSection('season')}>
                <FilterSectionTitle>Season</FilterSectionTitle>
                {expandedSections.season ? <FiChevronUp /> : <FiChevronDown />}
              </FilterSectionHeader>
              
              {expandedSections.season && (
                <FilterSectionContent
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <FilterOption>
                    <FilterCheckbox 
                      type="radio" 
                      id="season-all" 
                      name="season" 
                      checked={filters.season === 'all'} 
                      onChange={() => updateFilters({ season: 'all' })}
                    />
                    <FilterLabel htmlFor="season-all">
                      All Seasons
                    </FilterLabel>
                  </FilterOption>
                  
                  {seasons.map(season => (
                    <FilterOption key={season}>
                      <FilterCheckbox 
                        type="radio" 
                        id={`season-${season}`} 
                        name="season" 
                        checked={filters.season === season} 
                        onChange={() => updateFilters({ season })}
                      />
                      <FilterLabel htmlFor={`season-${season}`}>
                        {season.charAt(0).toUpperCase() + season.slice(1)}
                        <FilterCount>({getSeasonCount(season)})</FilterCount>
                      </FilterLabel>
                    </FilterOption>
                  ))}
                </FilterSectionContent>
              )}
            </FilterSection>
            
            <FilterSection>
              <FilterSectionHeader onClick={() => toggleSection('occasion')}>
                <FilterSectionTitle>Occasion</FilterSectionTitle>
                {expandedSections.occasion ? <FiChevronUp /> : <FiChevronDown />}
              </FilterSectionHeader>
              
              {expandedSections.occasion && (
                <FilterSectionContent
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <FilterOption>
                    <FilterCheckbox 
                      type="radio" 
                      id="occasion-all" 
                      name="occasion" 
                      checked={filters.occasion === 'all'} 
                      onChange={() => updateFilters({ occasion: 'all' })}
                    />
                    <FilterLabel htmlFor="occasion-all">
                      All Occasions
                    </FilterLabel>
                  </FilterOption>
                  
                  {occasions.map(occasion => (
                    <FilterOption key={occasion}>
                      <FilterCheckbox 
                        type="radio" 
                        id={`occasion-${occasion}`} 
                        name="occasion" 
                        checked={filters.occasion === occasion} 
                        onChange={() => updateFilters({ occasion })}
                      />
                      <FilterLabel htmlFor={`occasion-${occasion}`}>
                        {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                        <FilterCount>({getOccasionCount(occasion)})</FilterCount>
                      </FilterLabel>
                    </FilterOption>
                  ))}
                </FilterSectionContent>
              )}
            </FilterSection>
            
            <FilterSection>
              <FilterSectionHeader onClick={() => toggleSection('brand')}>
                <FilterSectionTitle>Brand</FilterSectionTitle>
                {expandedSections.brand ? <FiChevronUp /> : <FiChevronDown />}
              </FilterSectionHeader>
              
              {expandedSections.brand && (
                <FilterSectionContent
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <FilterOption>
                    <FilterCheckbox 
                      type="radio" 
                      id="brand-all" 
                      name="brand" 
                      checked={filters.brand === 'all'} 
                      onChange={() => updateFilters({ brand: 'all' })}
                    />
                    <FilterLabel htmlFor="brand-all">
                      All Brands
                    </FilterLabel>
                  </FilterOption>
                  
                  {brands.map(brand => (
                    <FilterOption key={brand}>
                      <FilterCheckbox 
                        type="radio" 
                        id={`brand-${brand}`} 
                        name="brand" 
                        checked={filters.brand === brand} 
                        onChange={() => updateFilters({ brand })}
                      />
                      <FilterLabel htmlFor={`brand-${brand}`}>
                        {brand}
                        <FilterCount>({getBrandCount(brand)})</FilterCount>
                      </FilterLabel>
                    </FilterOption>
                  ))}
                </FilterSectionContent>
              )}
            </FilterSection>
          </FilterContent>
        </FilterContainer>
      </MobileFilterContainer>
    </>
  );
};

export default FilterPanel;
