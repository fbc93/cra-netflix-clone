import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovie } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding:60px;
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)) ,url( ${props => props.bgPhoto});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Title = styled.h2`
  font-size:60px;
  margin-bottom:20px;
`;
const Overview = styled.p`
  width:50%;
  font-size:25px;
`;

function Home() {
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovie);

  return (
    <Wrapper>
      {isLoading ?
        <Loader>Loading...</Loader> :
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      }
    </Wrapper>
  );
}

export default Home;