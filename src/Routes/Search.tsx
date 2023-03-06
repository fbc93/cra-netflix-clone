import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getSearch, ISearch } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  margin-top:80px;
`;

const SearchSection = styled.section`
  margin-bottom:100px;
`;

const Title = styled.p`
  font-size:30px;
  font-weight: bold;
  margin-bottom:20px;
`;

const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;

const Item = styled.li``;

const ImgBox = styled.div<{ bgphoto: string }>`
  background-image:url(${props => props.bgphoto});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 200px;
  height:200px;
`;

function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const { data, isLoading } = useQuery(
    ["search", keyword],
    () => getSearch(keyword as string)
  )

  //console.log(data?.results);

  return (
    <Wrapper>
      {isLoading ? "Loading" :
        <>
          <SearchSection>
            <Title>
              배우 / 감독
              &#40;{data?.results.filter((item: any) => item.media_type === "person").length}&#41;
            </Title>

            <ItemList>
              {data?.results.map((item: any) => (

                item.media_type === "person" ? (
                  <Item key={item.id}>
                    <ImgBox bgphoto={makeImagePath(item.profile_path, "w500")} />
                    <strong>{item.title ? item.title : item.name}</strong>
                    <p>{item.known_for_department}</p>
                  </Item>
                ) : null

              ))}
            </ItemList>
          </SearchSection>

          <SearchSection>
            <Title>
              영화
              &#40;{data?.results.filter((item: any) => item.media_type === "movie").length}&#41;
            </Title>

            <ItemList>
              {data?.results.map((item: any) => (

                item.media_type === "movie" ? (
                  <Item key={item.id}>
                    <ImgBox bgphoto={makeImagePath(item.poster_path, "w500")} />
                    <strong>{item.title ? item.title : item.name}</strong>
                  </Item>
                ) : null

              ))}
            </ItemList>
          </SearchSection>
          <SearchSection>
            <Title>
              TV 프로그램
              &#40;{data?.results.filter((item: any) => item.media_type === "tv").length}&#41;
            </Title>

            <ItemList>
              {data?.results.map((item: any) => (

                item.media_type === "tv" ? (
                  <Item key={item.id}>
                    <ImgBox bgphoto={makeImagePath(item.poster_path, "w500")} />
                    <strong>{item.title ? item.title : item.name}</strong>
                  </Item>
                ) : null

              ))}
            </ItemList>
          </SearchSection>
        </>
      }
    </Wrapper>
  )
}

export default Search;