import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../utils/firebase/firebase";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-height: 100vh;
  padding: 1.5625rem 7.1875rem;
`;

const Title = styled.p`
  font-family: 'Pretendard';
  font-size: 2.25rem;
  font-weight: 600;
  color: #002;
`

function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
     
    <Container>
      <div>test</div>
      <Title>동아리</Title>
      <button onClick={handleLogout}>Logout</button>
      {user && <p>User: {user.email}</p>}
      {user && <p>UID: {user.uid}</p>}
    </Container>
  );
}

export default HomePage;
