import styled from 'styled-components';
import { FaInstagram, FaPinterest, FaTwitter, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: white;
  padding: 5rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
    padding: 0 1rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-family: var(--font-heading);
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  color: white;
  position: relative;
  padding-bottom: 0.75rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--accent-color);
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.75rem;
  text-decoration: none;
  transition: var(--transition);
  font-size: 0.95rem;
  
  &:hover {
    color: var(--accent-color);
    transform: translateX(5px);
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 0.5rem;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: var(--transition);
  opacity: 0.8;
  
  &:hover {
    color: var(--accent-color);
    transform: translateY(-5px);
    opacity: 1;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;

const NewsletterForm = styled.form`
  display: flex;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  flex: 1;
  
  @media (max-width: 768px) {
    border-radius: var(--border-radius);
    margin-bottom: 0.5rem;
  }
`;

const NewsletterButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
  }
  
  @media (max-width: 768px) {
    border-radius: var(--border-radius);
    padding: 0.75rem 1.5rem;
  }
`;

const Logo = styled.div`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  letter-spacing: 1px;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo>StyleSync</Logo>
          <FooterText>
            Your personal virtual wardrobe assistant. Mix, match, and create stunning outfits with ease.
          </FooterText>
          <SocialLinks>
            <SocialIcon href="#" aria-label="Instagram">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#" aria-label="Pinterest">
              <FaPinterest />
            </SocialIcon>
            <SocialIcon href="#" aria-label="Twitter">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="#" aria-label="Facebook">
              <FaFacebook />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/closet">My Closet</FooterLink>
          <FooterLink to="/outfit-creator">Create Outfit</FooterLink>
          <FooterLink to="/favorites">Favorites</FooterLink>
          <FooterLink to="/style-quiz">Style Quiz</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Help & Support</FooterTitle>
          <FooterLink to="#">FAQ</FooterLink>
          <FooterLink to="#">Contact Us</FooterLink>
          <FooterLink to="#">Privacy Policy</FooterLink>
          <FooterLink to="#">Terms of Service</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Stay Updated</FooterTitle>
          <FooterText>
            Subscribe to our newsletter for style tips, updates, and exclusive offers.
          </FooterText>
          <NewsletterForm>
            <NewsletterInput type="email" placeholder="Your email address" />
            <NewsletterButton type="submit">Subscribe</NewsletterButton>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {new Date().getFullYear()} StyleSync. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;
