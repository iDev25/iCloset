import styled from 'styled-components';
import { FiInstagram, FiTwitter, FiYoutube, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>iCloset</FooterLogo>
          <FooterTagline>Your personal style assistant</FooterTagline>
          <SocialLinks>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FiInstagram size={18} />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter size={18} />
            </SocialLink>
            <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FiYoutube size={18} />
            </SocialLink>
            <SocialLink href="mailto:info@icloset.com">
              <FiMail size={18} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Navigation</FooterHeading>
          <FooterLinks>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/closet">My Closet</FooterLink>
            <FooterLink to="/outfit-creator">Create Outfit</FooterLink>
            <FooterLink to="/favorites">Favorites</FooterLink>
            <FooterLink to="/style-quiz">Style Quiz</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Support</FooterHeading>
          <FooterLinks>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Subscribe</FooterHeading>
          <FooterText>Get style tips and updates delivered to your inbox</FooterText>
          <SubscribeForm>
            <SubscribeInput type="email" placeholder="Your email address" />
            <SubscribeButton>Subscribe</SubscribeButton>
          </SubscribeForm>
        </FooterSection>
      </FooterContent>
      <FooterBottom>
        <Copyright>&copy; {new Date().getFullYear()} iCloset. All rights reserved.</Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: var(--color-primary);
  color: var(--color-light);
  padding: 3rem 2rem 1.5rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
`;

const FooterTagline = styled.p`
  font-size: 0.9rem;
  margin: 0 0 1.5rem;
  opacity: 0.8;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: var(--color-light);
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const FooterHeading = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1.25rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: var(--color-light);
  text-decoration: none;
  font-size: 0.9rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  margin: 0 0 1rem;
  opacity: 0.8;
`;

const SubscribeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SubscribeInput = styled.input`
  padding: 0.75rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
`;

const SubscribeButton = styled.button`
  background-color: var(--color-accent);
  color: var(--color-light);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e67e22;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Copyright = styled.p`
  font-size: 0.8rem;
  opacity: 0.7;
  text-align: center;
  margin: 0;
`;

export default Footer;
