import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--primary-color);
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 70%;
    height: 100vh;
    background-color: white;
    flex-direction: column;
    padding: 2rem;
    z-index: 100;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
  }
`;

const NavLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '400'};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: var(--secondary-color);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
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
  cursor: pointer;
  
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

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">StyleSync</Logo>
        
        <MenuButton onClick={toggleMenu}>
          <FaBars />
        </MenuButton>
        
        <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
        
        <NavLinks isOpen={isMenuOpen}>
          <CloseButton onClick={closeMenu}>
            <FaTimes />
          </CloseButton>
          
          <NavLink to="/" active={location.pathname === '/'} onClick={closeMenu}>
            Home
          </NavLink>
          
          <NavLink to="/closet" active={location.pathname === '/closet'} onClick={closeMenu}>
            My Closet
          </NavLink>
          
          <NavLink to="/outfit-creator" active={location.pathname === '/outfit-creator'} onClick={closeMenu}>
            Create Outfit
          </NavLink>
          
          <NavLink to="/favorites" active={location.pathname === '/favorites'} onClick={closeMenu}>
            Favorites
          </NavLink>
          
          <NavLink to="/history" active={location.pathname === '/history'} onClick={closeMenu}>
            History
          </NavLink>
          
          <NavLink to="/style-quiz" active={location.pathname === '/style-quiz'} onClick={closeMenu}>
            Style Quiz
          </NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
