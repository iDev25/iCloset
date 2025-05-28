import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const StyleQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizSteps = [
    {
      id: 'colors',
      question: 'Which colors do you prefer to wear?',
      options: [
        { id: 'neutrals', label: 'Neutrals (Black, White, Gray, Beige)', image: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg' },
        { id: 'earth-tones', label: 'Earth Tones (Brown, Olive, Rust)', image: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg' },
        { id: 'pastels', label: 'Pastels (Light Blue, Pink, Lavender)', image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg' },
        { id: 'bold', label: 'Bold Colors (Red, Blue, Yellow)', image: 'https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg' },
      ],
      multiSelect: true,
    },
    {
      id: 'style',
      question: 'Which style resonates with you the most?',
      options: [
        { id: 'classic', label: 'Classic & Timeless', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg' },
        { id: 'casual', label: 'Casual & Comfortable', image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg' },
        { id: 'trendy', label: 'Trendy & Fashion-Forward', image: 'https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg' },
        { id: 'minimalist', label: 'Minimalist & Clean', image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg' },
      ],
      multiSelect: false,
    },
    {
      id: 'occasions',
      question: 'What occasions do you dress for most often?',
      options: [
        { id: 'work', label: 'Work/Office', image: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg' },
        { id: 'casual', label: 'Casual Outings', image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg' },
        { id: 'formal', label: 'Formal Events', image: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg' },
        { id: 'active', label: 'Active/Fitness', image: 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg' },
      ],
      multiSelect: true,
    },
    {
      id: 'priorities',
      question: 'What matters most to you when choosing clothes?',
      options: [
        { id: 'comfort', label: 'Comfort', image: 'https://images.pexels.com/photos/6311166/pexels-photo-6311166.jpeg' },
        { id: 'style', label: 'Style & Appearance', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg' },
        { id: 'versatility', label: 'Versatility', image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg' },
        { id: 'quality', label: 'Quality & Durability', image: 'https://images.pexels.com/photos/6311601/pexels-photo-6311601.jpeg' },
      ],
      multiSelect: false,
    },
  ];

  const handleOptionSelect = (optionId) => {
    const currentQuestion = quizSteps[currentStep];
    
    if (currentQuestion.multiSelect) {
      // For multi-select questions
      setAnswers(prev => {
        const currentSelections = prev[currentQuestion.id] || [];
        
        if (currentSelections.includes(optionId)) {
          // Remove if already selected
          return {
            ...prev,
            [currentQuestion.id]: currentSelections.filter(id => id !== optionId)
          };
        } else {
          // Add if not selected
          return {
            ...prev,
            [currentQuestion.id]: [...currentSelections, optionId]
          };
        }
      });
    } else {
      // For single-select questions
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: optionId
      }));
    }
  };

  const isOptionSelected = (optionId) => {
    const currentQuestion = quizSteps[currentStep];
    const currentAnswer = answers[currentQuestion.id];
    
    if (currentQuestion.multiSelect) {
      return currentAnswer && currentAnswer.includes(optionId);
    } else {
      return currentAnswer === optionId;
    }
  };

  const canProceed = () => {
    const currentQuestion = quizSteps[currentStep];
    const currentAnswer = answers[currentQuestion.id];
    
    if (currentQuestion.multiSelect) {
      return currentAnswer && currentAnswer.length > 0;
    } else {
      return !!currentAnswer;
    }
  };

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Quiz completed
      setQuizCompleted(true);
    }
  };

  // Determine style profile based on answers
  const getStyleProfile = () => {
    // This is a simplified example - in a real app, you'd have more sophisticated logic
    const styleAnswer = answers.style;
    
    const profiles = {
      'classic': {
        title: 'Classic Elegance',
        description: 'You appreciate timeless pieces that never go out of style. Your wardrobe likely consists of well-tailored items in neutral colors that can be mixed and matched effortlessly.',
        recommendations: [
          'Invest in quality basics like white button-downs and well-fitted jeans',
          'Focus on tailoring and fit rather than trends',
          'Add interest with accessories rather than bold patterns',
          'Consider a capsule wardrobe approach'
        ]
      },
      'casual': {
        title: 'Casual Comfort',
        description: 'Comfort is key for you, but you still want to look put-together. Your style is relaxed and approachable, perfect for everyday life.',
        recommendations: [
          'Elevated basics like quality t-shirts and well-fitted jeans',
          'Comfortable yet stylish footwear',
          'Layering pieces for versatility',
          'Casual accessories to complete your look'
        ]
      },
      'trendy': {
        title: 'Fashion Forward',
        description: 'You love staying on top of the latest trends and expressing yourself through fashion. Your wardrobe is likely colorful and diverse.',
        recommendations: [
          'Follow fashion influencers for inspiration',
          'Invest in statement pieces each season',
          'Mix trends with basics for balance',
          'Experiment with bold colors and patterns'
        ]
      },
      'minimalist': {
        title: 'Minimalist Chic',
        description: 'You value simplicity and clean lines. Your wardrobe likely consists of high-quality pieces in a limited color palette that work perfectly together.',
        recommendations: [
          'Focus on quality over quantity',
          'Stick to a cohesive color palette',
          'Invest in versatile pieces that can be styled multiple ways',
          'Pay attention to subtle details and textures'
        ]
      }
    };
    
    return profiles[styleAnswer] || {
      title: 'Eclectic Mix',
      description: 'You have a diverse style that draws from multiple influences. You\'re not afraid to experiment and express yourself through your clothing choices.',
      recommendations: [
        'Continue to experiment with different styles',
        'Focus on pieces that make you feel confident',
        'Consider the versatility of new additions',
        'Don\'t be afraid to mix unexpected elements'
      ]
    };
  };

  return (
    <QuizContainer>
      {!quizCompleted ? (
        <>
          <QuizHeader>
            <h1>Style Quiz</h1>
            <QuizProgress>
              <ProgressText>Question {currentStep + 1} of {quizSteps.length}</ProgressText>
              <ProgressBar>
                <ProgressFill style={{ width: `${((currentStep + 1) / quizSteps.length) * 100}%` }} />
              </ProgressBar>
            </QuizProgress>
          </QuizHeader>

          <QuizContent>
            <QuizQuestion>{quizSteps[currentStep].question}</QuizQuestion>
            <OptionsGrid>
              {quizSteps[currentStep].options.map((option) => (
                <OptionCard
                  key={option.id}
                  $isSelected={isOptionSelected(option.id)}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  <OptionImage src={option.image} alt={option.label} />
                  <OptionLabel>{option.label}</OptionLabel>
                  {isOptionSelected(option.id) && (
                    <SelectedIndicator>
                      <FiCheck size={16} />
                    </SelectedIndicator>
                  )}
                </OptionCard>
              ))}
            </OptionsGrid>
          </QuizContent>

          <QuizActions>
            <NextButton 
              onClick={handleNext} 
              disabled={!canProceed()}
              $isActive={canProceed()}
            >
              {currentStep < quizSteps.length - 1 ? 'Next Question' : 'See Results'}
              <FiArrowRight size={18} />
            </NextButton>
          </QuizActions>
        </>
      ) : (
        <ResultsContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResultsHeader>
            <h1>Your Style Profile</h1>
          </ResultsHeader>
          
          <ProfileCard>
            <ProfileTitle>{getStyleProfile().title}</ProfileTitle>
            <ProfileDescription>{getStyleProfile().description}</ProfileDescription>
            
            <RecommendationsSection>
              <h3>Recommendations for Your Style</h3>
              <RecommendationsList>
                {getStyleProfile().recommendations.map((rec, index) => (
                  <RecommendationItem key={index}>
                    <RecommendationIcon>✓</RecommendationIcon>
                    <span>{rec}</span>
                  </RecommendationItem>
                ))}
              </RecommendationsList>
            </RecommendationsSection>
            
            <ActionButtons>
              <PrimaryButton to="/outfit-creator">Create an Outfit</PrimaryButton>
              <SecondaryButton onClick={() => setQuizCompleted(false)}>Retake Quiz</SecondaryButton>
            </ActionButtons>
          </ProfileCard>
        </ResultsContainer>
      )}
    </QuizContainer>
  );
};

const QuizContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const QuizHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h1 {
    font-size: 2rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
`;

const QuizProgress = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const ProgressText = styled.p`
  font-size: 0.9rem;
  color: var(--color-dark-gray);
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  height: 6px;
  background-color: var(--color-gray);
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: var(--color-accent);
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const QuizContent = styled.div`
  margin-bottom: 2rem;
`;

const QuizQuestion = styled.h2`
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const OptionCard = styled.div`
  background-color: var(--color-light);
  border: 2px solid ${props => props.$isSelected ? 'var(--color-accent)' : 'var(--color-gray)'};
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: ${props => props.$isSelected ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none'};
  transform: ${props => props.$isSelected ? 'translateY(-2px)' : 'none'};

  &:hover {
    border-color: ${props => props.$isSelected ? 'var(--color-accent)' : 'var(--color-primary)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const OptionImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const OptionLabel = styled.div`
  padding: 1rem;
  font-size: 1rem;
  text-align: center;
`;

const SelectedIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--color-accent);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuizActions = styled.div`
  display: flex;
  justify-content: center;
`;

const NextButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.$isActive ? 'var(--color-primary)' : 'var(--color-gray)'};
  color: var(--color-light);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.$isActive ? 'pointer' : 'not-allowed'};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.$isActive ? '#000' : 'var(--color-gray)'};
  }
`;

const ResultsContainer = styled(motion.div)`
  text-align: center;
`;

const ResultsHeader = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: var(--color-primary);
  }
`;

const ProfileCard = styled.div`
  background-color: var(--color-light);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const ProfileTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  text-align: center;
`;

const ProfileDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: 2rem;
`;

const RecommendationsSection = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.3rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
`;

const RecommendationsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RecommendationItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1.05rem;
  line-height: 1.5;
`;

const RecommendationIcon = styled.span`
  color: var(--color-accent);
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 576px) {
    flex-direction: column;
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
  text-align: center;

  &:hover {
    background-color: #000;
  }
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  color: var(--color-primary);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  border: 2px solid var(--color-primary);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-light);
  }
`;

export default StyleQuiz;
