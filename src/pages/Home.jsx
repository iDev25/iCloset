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
  // Make sure items exists and has length before trying to sort it
  const featuredItems = items && items.length > 0
    ? [...items].sort(() => 0.5 - Math.random()).slice(0, 3)
    : [];

  // Use the first outfit from the outfits data as the featured outfit
  const featuredOutfit = outfits && outfits.length > 0 ? outfits[0] : null;

  return (
    <HomeContainer>
      <HeroBanner>
        <HeroOverlay />
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>Elevate Your Style</HeroTitle>
            <HeroSubtitle>
              Curate, organize, and create stunning outfits with your personal virtual wardrobe
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryButton to="/closet">Explore My Closet</PrimaryButton>
              <SecondaryButton to="/outfit-creator">Create Outfit</SecondaryButton>
            </HeroButtons>
          </motion.div>
        </HeroContent>
      </HeroBanner>

      <MainContent>
        {featuredOutfit && (
          <FeaturedOutfit outfit={featuredOutfit} />
        )}

        <RecentOutfits />

        <FeaturesSection>
          <SectionTitle>Discover StyleSync</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🧥</FeatureIcon>
              <FeatureTitle>Virtual Closet</FeatureTitle>
              <FeatureDescription>
                Digitize your entire wardrobe and access it from anywhere, anytime
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

        {featuredItems.length > 0 && (
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
        )}

        <CTASection>
          <CTAContent>
            <CTATitle>Ready to transform your wardrobe experience?</CTATitle>
            <CTADescription>
              Join StyleSync today and discover a new way to organize, plan, and enjoy your clothing collection
            </CTADescription>
            <CTAButton to="/closet">Get Started</CTAButton>
          </CTAContent>
        </CTASection>
      </MainContent>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  width: 100%;
`;

const HeroBanner = styled.section`
  position: relative;
  height: 80vh;
  min-height: 600px;
  max-height: 800px;
  width: 100%;
  background-image: url('https://images.pexels.com/photos/5705506/pexels-photo-5705506.jpeg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  @media (max-width: 768px) {
    height: 70vh;
    min-height: 500px;
  }
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
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: var(--accent-color);
  color: white;
  padding: 0.9rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;

  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: white;
  padding: 0.9rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  border: 1px solid white;
  transition: all 0.3s ease;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;

  &:hover {
    background-color: white;
    color: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  color: var(--primary-color);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: var(--accent-color);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius-md);
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  line-height: 1.6;
`;

const FeaturedSection = styled.section`
  padding: 5rem 0;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedItemCard = styled.div`
  position: relative;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  height: 450px;
  box-shadow: var(--shadow-md);
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const FeaturedItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;

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
  padding: 2rem;
  color: white;
  transform: translateY(0);
  transition: transform 0.3s ease;
`;

const FeaturedItemName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
`;

const FeaturedItemCategory = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
  text-transform: capitalize;
`;

const ViewItemButton = styled(Link)`
  display: inline-block;
  background-color: var(--accent-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
  }
`;

const CTASection = styled.section`
  background-color: var(--primary-color);
  border-radius: var(--border-radius-lg);
  padding: 5rem 3rem;
  margin: 4rem 0 2rem;
  text-align: center;
  color: white;
  background-image: linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(26, 26, 26, 0.8)), 
                    url('https://images.pexels.com/photos/5705506/pexels-photo-5705506.jpeg');
  background-size: cover;
  background-position: center;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: var(--accent-color);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: var(--border-radius);
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

export default Home;
