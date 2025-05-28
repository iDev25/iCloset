import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiMenu, FiX, FiSearch, FiUser } from 'react-icons/fi';

const Header = () => {
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
      <HeaderContent>
        <LogoContainer>
          <Link to="/">
            <Logo>iCloset</Logo>
          </Link>
        </LogoContainer>

        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </MobileMenuButton>

        <NavContainer $isOpen={isMenuOpen}>
          <NavLinks>
            <NavItem $isActive={location.pathname === '/'}>
              <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            </NavItem>
            <NavItem $isActive={location.pathname === '/closet'}>
              <NavLink to="/closet" onClick={closeMenu}>My Closet</NavLink>
            </NavItem>
            <NavItem $isActive={location.pathname === '/outfit-creator'}>
              <NavLink to="/outfit-creator" onClick={closeMenu}>Create Outfit</NavLink>
            </NavItem>
            <NavItem $isActive={location.pathname === '/favorites'}>
              <NavLink to="/favorites" onClick={closeMenu}>Favorites</NavLink>
            </NavItem>
            <NavItem $isActive={location.pathname === '/style-quiz'}>
              <NavLink to="/style-quiz" onClick={closeMenu}>Style Quiz</NavLink>
            </NavItem>
          </NavLinks>
        </NavContainer>

        <HeaderActions>
          <ActionButton>
            <FiSearch size={20} />
          </ActionButton>
          <ActionButton>
            <FiUser size={20} />
          </ActionButton>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: var(--color-light);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  flex: 1;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-primary);

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: var(--color-light);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    height: ${props => (props.$isOpen ? 'auto' : '0')};
    overflow: hidden;
    transition: height 0.3s ease;
    display: ${props => (props.$isOpen ? 'flex' : 'none')};
    flex-direction: column;
    padding: ${props => (props.$isOpen ? '1rem 0' : '0')};
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const NavItem = styled.li`
  margin: 0 1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-accent);
    transform: scaleX(${props => (props.$isActive ? '1' : '0')});
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
    text-align: center;
    padding: 0.75rem 0;

    &::after {
      bottom: 0;
    }
  }
`;

const NavLink = styled(Link)`
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }
`;

export default Header;
