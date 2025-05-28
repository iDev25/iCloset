import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useCloset } from '../context/ClosetContext';
import FeaturedOutfit from '../components/home/FeaturedOutfit';
import RecentOutfits from '../components/home/RecentOutfits';
import { outfits } from '../data/outfits';

const Home = () => {
  const { items } = useCloset();
  
  // Get a few random items for the featured section
  // Make sure items exists before trying to sort it
  const featuredItems = items && items.length > 0
    ? [...items].sort(() => 0.5 - Math.random()).slice(0, 3)
    : [];

  // Use the first outfit from the outfits data as the featured outfit
  const featuredOutfit = outfits[0];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HeroTitle>Organize Your Wardrobe</HeroTitle>
            <HeroSubtitle>
              Discover new outfit combinations and manage your clothing collection with ease
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryButton to="/closet">View My Closet</PrimaryButton>
              <SecondaryButton to="/outfit-creator">Create Outfit</SecondaryButton>
            </HeroButtons>
          </motion.div>
        </HeroContent>
        <HeroImageContainer>
          <HeroImage 
            src="https://images.pexels.com/photos/5705506/pexels-photo-5705506.jpeg" 
            alt="Organized wardrobe" 
          />
        </HeroImageContainer>
      </HeroSection>

      {featuredOutfit && (
        <FeaturedOutfit outfit={featuredOutfit} />
      )}

      <RecentOutfits />

      <FeaturesSection>
        <SectionTitle>Features</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🧥</FeatureIcon>
            <FeatureTitle>Virtual Closet</FeatureTitle>
            <FeatureDescription>
              Digitize your entire wardrobe and access it from anywhere
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>👔</FeatureIcon>
            <FeatureTitle>Outfit Creator</FeatureTitle>
            <FeatureDescription>
              Mix and match items to create and save your favorite outfits
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>Style Analytics</FeatureTitle>
            <FeatureDescription>
              Get insights about your style preferences and wearing habits
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureTitle>Smart Search</FeatureTitle>
            <FeatureDescription>
              Find items by color, season, occasion, or any other attribute
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <FeaturedSection>
        <SectionTitle>Featured Items</SectionTitle>
        <FeaturedGrid>
          {featuredItems.map((item) => (
            <FeaturedItemCard key={item.id}>
              <FeaturedItemImage src={item.image} alt={item.name} />
              <FeaturedItemOverlay>
                <FeaturedItemName>{item.name}</FeaturedItemName>
                <FeaturedItemCategory>{item.category}</FeaturedItemCategory>
                <ViewItemButton to={`/closet?item=${item.id}`}>View Item</ViewItemButton>
              </FeaturedItemOverlay>
            </FeaturedItemCard>
          ))}
        </FeaturedGrid>
      </FeaturedSection>

      <CTASection>
        <CTAContent>
          <CTATitle>Ready to organize your wardrobe?</CTATitle>
          <CTADescription>
            Start adding your clothing items and create stylish outfits today
          </CTADescription>
          <CTAButton to="/closet">Get Started</CTAButton>
        </CTAContent>
      </CTASection>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  padding: 4rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  @media (max-width: 768px) {
    order: 2;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-primary);
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--color-text);
  line-height: 1.6;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: var(--color-primary);
  color: var(--color-light);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: var(--color-primary);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  border: 2px solid var(--color-primary);
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-light);
  }
`;

const HeroImageContainer = styled.div`
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    order: 1;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const FeaturesSection = styled.section`
  padding: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  text-align: center;
  color: var(--color-primary);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: var(--color-light);
  border-radius: var(--border-radius);
  padding: 2rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--color-primary);
`;

const FeatureDescription = styled.p`
  font-size: 0.95rem;
  color: var(--color-text);
  line-height: 1.6;
`;

const FeaturedSection = styled.section`
  padding: 4rem 0;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeaturedItemCard = styled.div`
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  height: 350px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const FeaturedItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${FeaturedItemCard}:hover & {
    transform: scale(1.05);
  }
`;

const FeaturedItemOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 1.5rem;
  color: var(--color-light);
  transform: translateY(0);
  transition: transform 0.3s ease;
`;

const FeaturedItemName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const FeaturedItemCategory = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const ViewItemButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-accent);
  color: var(--color-light);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e67e22;
  }
`;

const CTASection = styled.section`
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  padding: 4rem 2rem;
  margin: 4rem 0;
  text-align: center;
  color: var(--color-light);
`;

const CTAContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-light);
  color: var(--color-primary);
  padding: 0.75rem 2rem;
  border-radius: var(--border-radius);
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

export default Home;
