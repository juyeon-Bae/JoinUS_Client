import { styled } from "styled-components";
import { useEffect, useState } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../locales/i18n";
import { useLanguageStore } from "../utils/store/languageStore";
import { 
  browserLocalPersistence,
  // browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword, 
  signInWithPopup
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from "../utils/firebase/firebase";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #F5F6FA;
`;

const MainCard = styled.main`
  width: 100%;
  max-width: 926px;
  height: 696px;
  background-color: white;
  border-radius: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
`;

const LanguageToggle = styled.div`
  position: relative;
  width: 100%;
  max-width: 344px;
  height: 30px;
  border-radius: 6px;
  background-color: rgba(172, 205, 255, 0.57);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
  margin-bottom: 16px;
`;

const SlidingBackground = styled.div<{ $position: 'ko' | 'en' }>`
  position: absolute;
  left: 4px;
  width: 156px;
  height: 22px;
  background-color: white;
  border-radius: 3px;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${props => props.$position === 'ko' ? '0' : '180px'});
`;

const ButtonGroup = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LanguageButton = styled.button`
  width: 156px;
  height: 22px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #0047FF;
  padding: 0;
`;

const Divider = styled.span`
  color: #82B4FF;
`;

const InputContainer = styled.form`
  width: 100%;
  max-width: 348px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 52px;
  border-radius: 6px;
  border: 1.8px solid #ACCDFF;
  margin-bottom: 16px;
  padding-left: 22px;
  font-family: 'Pretendard';
  font-size: 1rem;
  font-weight: 600;
  caret-color: black;

  &::placeholder {
    color: #D2CFCF;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const FindPasswordButton = styled.button`
  color: #CBCBCB;
  font-family: 'Pretendard';
  font-size: .75rem;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 46px;
`;

const LoginButton = styled.button`
  width: 100%;
  max-width: 167px;
  height: 48px;
  background-color: #0047FF;
  color: white;
  font-family: 'Pretendard';
  font-size: 1rem;
  font-weight: 600;
  border-radius: 2.0625rem;
  margin-bottom: 51px;
  filter: drop-shadow(0px 6px 20px rgba(199, 172, 255, 0.30));

  &:hover {
    background: #0047DD;
  }
`;

const Lines = styled.div`
  display: flex;
  column-gap: 27.04px;
`;

const Line = styled.hr`
  width: 164px;
  height: 1.8px;
  background: #ECECEC;
`;

const GuideMessage = styled.div`
  color: #CBCBCB;
  font-family: 'Pretendard';
  font-size: 14;
  font-weight: 600;
  margin-top: -0.5625rem;
  white-space: nowrap;
`;

const GoogleLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 39.04px;
  column-gap: 52.32px;
  padding: .9375rem .625rem;
  width: 348px;
  height: 52px;
  border-radius: 8px;
  box-shadow: 0rem 0rem .625rem 0rem rgba(0, 0, 0, 0.06);
  cursor: pointer;
`;

const GoogleLogo = styled.img`
  width: 100%;
  max-width: 17.681px;
  height: 18px;
  margin-top: .125rem;
`;

const GoogleLogin = styled.div`
  width: 9.375rem;
  height: 1.375rem;
  background: #fff;
  border: none;
  color: #AAA;
  font-family: 'Pretendard';
  font-size: 18;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
`;

const ErrorModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ErrorMessageBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  background-color: #FF4D4D;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Pretendard';
  font-weight: bold;

  &:hover {
    background-color: #FF2D2D;
  }
`;

const LoginPage = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const languages = [
    { code: 'ko' as const, label: '한국어' },
    { code: 'en' as const, label: 'English' },
  ];

  function changeLanguage(code: 'ko' | 'en') {
    setLanguage(code);
    i18n.changeLanguage(code);
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;

        // 백엔드 요청

        navigate('/');
      })
      .catch((error) => {
        setError("로그인 실패");
      });
    });
  };

  const handleGoogleLogin = async () => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithPopup(auth, googleProvider)
      .then((result) => {
        // const user = result.user;
        
        navigate('/');
      })
      .catch((error) => {
        setError("로그인 실패");
      });
    });
  };

  return (
    <Container>
      <MainCard>
        <Logo src="svgs/logo-with-text.svg" alt="로고" />

        <LanguageToggle>
          <SlidingBackground $position={language} />
          <ButtonGroup>
            {languages.map((lang, index) => (
              <React.Fragment key={lang.code}>
                <LanguageButton onClick={() => changeLanguage(lang.code)}>
                  {lang.label}
                </LanguageButton>
                {index < languages.length - 1 && <Divider>|</Divider>}
              </React.Fragment>
            ))}
          </ButtonGroup>
        </LanguageToggle>

        <InputContainer onSubmit={handleEmailLogin}>
          <Input 
            placeholder={t("authentication.emailPlaceholder")} 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            placeholder={t("authentication.passwordPlaceholder")} 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonContainer>
            <Link to="/find-password">
              <FindPasswordButton>{t("authentication.passwordRecovery")}</FindPasswordButton>
            </Link>
          </ButtonContainer>
          <LoginButton type="submit">{t("authentication.signIn")}</LoginButton>
        </InputContainer>

        <Lines>
          <Line />
          <GuideMessage>{t("authentication.authenticationOptions")}</GuideMessage>
          <Line />
        </Lines>

        <GoogleLoginContainer onClick={handleGoogleLogin}>
          <GoogleLogo src="svgs/google-logo.svg" alt="google" />
          <GoogleLogin>{t("authentication.googleSignIn")}</GoogleLogin>
        </GoogleLoginContainer>
      </MainCard>

      {error && (
        <ErrorModal>
          <ErrorMessageBox>
            <p>로그인 실패</p>
            <CloseButton onClick={() => setError("")}>Close</CloseButton>
          </ErrorMessageBox>
        </ErrorModal>
      )}
    </Container>
  );
};

export default LoginPage;