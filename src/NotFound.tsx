import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLanguageStore } from './utils/store/languageStore';
import i18n from './locales/i18n';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Logo = styled.img`
  width: 6rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  width: 8.25rem;
  height: 2.5rem;
  position: relative;
  background: #0047FF;
  border-radius: 33px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  filter: drop-shadow(0rem .375rem 1.25rem rgba(199, 172, 255, 0.30));

  &:hover {
    background: #0047DD;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #4b5563;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

function NotFound() {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);
  
  return (
    <>
      <title>{t('notFound.title')}</title>
      <Container>
        <Logo src="svgs/logo.svg" alt="logo" />
        <br />
        <TitleContainer>
          <Title>{t('notFound.title')}</Title>
          <SubTitle>{t('notFound.description.primary')}</SubTitle>
          <SubTitle>{t('notFound.description.secondary')}</SubTitle>
        </TitleContainer>
        <Link to="/"><Button>{t('notFound.backToHome')}</Button></Link>
      </Container>
    </>
  )
}

export default NotFound;