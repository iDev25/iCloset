import styled from 'styled-components';
import { FaInstagram, FaPinterest, FaTwitter, FaFacebook } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: white;
  padding: 2rem 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-family: var(--font-heading);
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const FooterLink = styled.a`
  color: var(--light-color);
  margin-bottom: 0.5rem;
  text-decoration: none;
  transition: var(--transition);
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--secondary-color);
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>StyleSync</FooterTitle>
          <p>Your personal virtual wardrobe assistant. Mix, match, and create stunning outfits with ease.</p>
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
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/closet">My Closet</FooterLink>
          <FooterLink href="/outfit-creator">Create Outfit</FooterLink>
          <FooterLink href="/favorites">Favorites</FooterLink>
          <FooterLink href="/style-quiz">Style Quiz</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Help & Support</FooterTitle>
          <FooterLink href="#">FAQ</FooterLink>
          <FooterLink href="#">Contact Us</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {new Date().getFullYear()} StyleSync. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;
