import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaBars, FaTimes, FaUser, FaHeart } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: var(--color-white);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: box-shadow 0.3s ease;
  
  &.scrolled {
    box-shadow: var(--shadow-md);
  }
`;

const HeaderInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  letter-spacing: 1px;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--primary-color);
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 80%;
    height: 100vh;
    background-color: white;
    flex-direction: column;
    padding: 5rem 2rem 2rem;
    z-index: 100;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    gap: 1.5rem;
    align-items: flex-start;
  }
`;

const NavLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '400'};
  position: relative;
  padding: 0.5rem 0;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  &:after {
    content: '';
    position: absolute;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--accent-color);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    width: 100%;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--color-gray-200);
  }
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--primary-color);
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const IconsGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
    justify-content: space-around;
    padding-top: 1rem;
    border-top: 1px solid var(--color-gray-200);
  }
`;

const IconLink = styled(Link)`
  color: var(--primary-color);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--accent-color);
  }
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // Add scroll event listener
  useState(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <HeaderContainer className={isScrolled ? 'scrolled' : ''}>
      <HeaderInner>
        <Nav>
          <Logo to="/">StyleSync</Logo>
          
          <MenuButton onClick={toggleMenu} aria-label="Menu">
            <FaBars />
          </MenuButton>
          
          <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
          
          <NavLinks isOpen={isMenuOpen}>
            <CloseButton onClick={closeMenu} aria-label="Close menu">
              <FaTimes />
            </CloseButton>
            
            <NavLink to="/" active={location.pathname === '/' ? 1 : 0} onClick={closeMenu}>
              Home
            </NavLink>
            
            <NavLink to="/closet" active={location.pathname === '/closet' ? 1 : 0} onClick={closeMenu}>
              My Closet
            </NavLink>
            
            <NavLink to="/outfit-creator" active={location.pathname === '/outfit-creator' ? 1 : 0} onClick={closeMenu}>
              Create Outfit
            </NavLink>
            
            <NavLink to="/favorites" active={location.pathname === '/favorites' ? 1 : 0} onClick={closeMenu}>
              Favorites
            </NavLink>
            
            <NavLink to="/history" active={location.pathname === '/history' ? 1 : 0} onClick={closeMenu}>
              History
            </NavLink>
            
            <NavLink to="/style-quiz" active={location.pathname === '/style-quiz' ? 1 : 0} onClick={closeMenu}>
              Style Quiz
            </NavLink>
            
            <IconsGroup>
              <IconLink to="/search" aria-label="Search">
                <FaSearch />
              </IconLink>
              
              <IconLink to="/favorites" aria-label="Favorites">
                <FaHeart />
              </IconLink>
              
              <IconLink to="/profile" aria-label="Profile">
                <FaUser />
              </IconLink>
            </IconsGroup>
          </NavLinks>
          
          <IconsGroup>
            <IconLink to="/search" aria-label="Search">
              <FaSearch />
            </IconLink>
            
            <IconLink to="/favorites" aria-label="Favorites">
              <FaHeart />
            </IconLink>
            
            <IconLink to="/profile" aria-label="Profile">
              <FaUser />
            </IconLink>
          </IconsGroup>
        </Nav>
      </HeaderInner>
    </HeaderContainer>
  );
}

export default Header;
