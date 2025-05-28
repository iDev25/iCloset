import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const History = () => {
  const [expandedMonth, setExpandedMonth] = useState('June 2023');
  
  // Mock history data - in a real app, you would fetch this from your context or API
  const historyData = {
    'June 2023': [
      {
        id: '1',
        date: 'June 15, 2023',
        outfit: 'Business Casual',
        items: [
          {
            id: '1',
            name: 'White Button-Down Shirt',
            image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
          },
          {
            id: '2',
            name: 'Blue Jeans',
            image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
          },
          {
            id: '6',
            name: 'Navy Blazer',
            image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
          },
        ],
        occasion: 'Work',
        notes: 'Comfortable outfit for a busy day at the office.'
      },
      {
        id: '2',
        date: 'June 10, 2023',
        outfit: 'Weekend Casual',
        items: [
          {
            id: '2',
            name: 'Blue Jeans',
            image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
          },
          {
            id: '3',
            name: 'Black Leather Jacket',
            image: 'https://images.pexels.com/photos/16170/pexels-photo.jpg',
          },
        ],
        occasion: 'Casual Outing',
        notes: 'Perfect for a casual day out with friends.'
      }
    ],
    'May 2023': [
      {
        id: '3',
        date: 'May 25, 2023',
        outfit: 'Formal Meeting',
        items: [
          {
            id: '1',
            name: 'White Button-Down Shirt',
            image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
          },
          {
            id: '6',
            name: 'Navy Blazer',
            image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
          },
        ],
        occasion: 'Business Meeting',
        notes: 'Wore this for the quarterly business review.'
      }
    ]
  };

  const toggleMonth = (month) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  return (
    <HistoryContainer>
      <HistoryHeader>
        <h1>Outfit History</h1>
        <HeaderDescription>
          Track when and where you've worn your outfits
        </HeaderDescription>
      </HistoryHeader>

      <HistoryContent>
        {Object.keys(historyData).length > 0 ? (
          Object.keys(historyData).map((month) => (
            <MonthSection key={month}>
              <MonthHeader onClick={() => toggleMonth(month)}>
                <MonthTitle>
                  <FiCalendar size={18} />
                  <span>{month}</span>
                </MonthTitle>
                <ExpandButton>
                  {expandedMonth === month ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </ExpandButton>
              </MonthHeader>

              {expandedMonth === month && (
                <OutfitsList>
                  {historyData[month].map((entry) => (
                    <OutfitEntry
                      key={entry.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <OutfitDate>{entry.date}</OutfitDate>
                      <OutfitCard>
                        <OutfitInfo>
                          <OutfitName>{entry.outfit}</OutfitName>
                          <OutfitOccasion>{entry.occasion}</OutfitOccasion>
                          <OutfitNotes>{entry.notes}</OutfitNotes>
                          <ViewOutfitButton to={`/outfit/${entry.id}`}>
                            View Outfit
                          </ViewOutfitButton>
                        </OutfitInfo>
                        <OutfitItems>
                          {entry.items.map((item) => (
                            <OutfitItemImage key={item.id} src={item.image} alt={item.name} />
                          ))}
                        </OutfitItems>
                      </OutfitCard>
                    </OutfitEntry>
                  ))}
                </OutfitsList>
              )}
            </MonthSection>
          ))
        ) : (
          <EmptyState>
            <EmptyIcon>📅</EmptyIcon>
            <EmptyTitle>No outfit history yet</EmptyTitle>
            <EmptyDescription>
              Start logging your outfits to keep track of what you wear and when.
            </EmptyDescription>
            <CreateButton to="/outfit-creator">Create an Outfit</CreateButton>
          </EmptyState>
        )}
      </HistoryContent>
    </HistoryContainer>
  );
};

const HistoryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const HistoryHeader = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }
`;

const HeaderDescription = styled.p`
  font-size: 1rem;
  color: var(--color-dark-gray);
`;

const HistoryContent = styled.div``;

const MonthSection = styled.div`
  margin-bottom: 1.5rem;
  background-color: var(--color-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--color-light);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-gray);
  }
`;

const MonthTitle = styled.h2`
  font-size: 1.2rem;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: var(--color-dark-gray);
  cursor: pointer;
`;

const OutfitsList = styled.div`
  padding: 0 1.5rem 1.5rem;
`;

const OutfitEntry = styled(motion.div)`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const OutfitDate = styled.div`
  font-size: 0.9rem;
  color: var(--color-dark-gray);
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
  border-left: 2px solid var(--color-accent);
`;

const OutfitCard = styled.div`
  display: flex;
  background-color: var(--color-light);
  border: 1px solid var(--color-gray);
  border-radius: var(--border-radius);
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const OutfitInfo = styled.div`
  flex: 1;
  padding: 1.5rem;
`;

const OutfitName = styled.h3`
  font-size: 1.2rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
`;

const OutfitOccasion = styled.div`
  font-size: 0.9rem;
  color: var(--color-dark-gray);
  margin-bottom: 1rem;
`;

const OutfitNotes = styled.p`
  font-size: 0.95rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ViewOutfitButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-light);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000;
  }
`;

const OutfitItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.02);
  min-width: 200px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const OutfitItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--border-radius);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--color-light);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
`;

const EmptyDescription = styled.p`
  font-size: 1rem;
  color: var(--color-dark-gray);
  max-width: 500px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const CreateButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-light);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000;
  }
`;

export default History;
