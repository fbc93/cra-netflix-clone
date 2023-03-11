import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IPopularPerson } from "../../api";
import { makeImagePath } from "../../utils";

const Wrapper = styled(motion.section)`
  margin: 0px 4vw 3vw;
  position: relative;
  aspect-ratio: 7/2;

  &:hover{
    span{
      opacity:1;
      right:-1vw;
    }
  }
`;

const SliderTitle = styled(motion(Link))`
  margin-bottom:2.5vh;
  font-size:1.6vw;
  letter-spacing: -1px;
  font-weight: 500;
  display: inline-block;
  display: flex;
  align-items: center;

  span {
    display: inline-block;
    margin-left:0.6vw;
    color: rgb(84, 185, 197);
    opacity:0;
    transition: all ease-in-out 0.5s;
    position: relative;
    right:1vw;
    font-size:1.4vw;
  }
`;

const ViewAll = styled.div`
  display:flex;
  align-items: center;
`;

const PopularList = styled.ul`
  display: flex;

  li {
    img {
   width:10vw;

  }
  }
`;


function PopularPeopleSlider({
  popularPeopleData
}: {
  popularPeopleData: IPopularPerson[]
}) {

  return (
    <Wrapper>
      <SliderTitle to={"/"}>
        👨‍👩‍👧‍👧 지금 가장 핫한 배우들의 작품을 만나보세요!
        <ViewAll>
          <span>모두보기</span>
          <span className="material-symbols-rounded">arrow_forward_ios</span>
        </ViewAll>
      </SliderTitle>
      <PopularList>
        {popularPeopleData?.map((person: IPopularPerson) => (
          <li key={person.id}>
            <img src={makeImagePath(String(person.profile_path))} alt={person.name} />
            <strong>{person.name}</strong>
            <div>{person.popularity}</div>
            {person.known_for.map((movie: any) => <span key={movie.id}>{movie.title}</span>)}
          </li>
        ))}
      </PopularList>
    </Wrapper>
  );
}

export default PopularPeopleSlider;