import styled from "styled-components";

const ContentInfo = styled.footer`
  position: fixed;
  bottom:0;
  width:100%;
`;

function Footer() {
  return (
    <ContentInfo>
      Footer
    </ContentInfo>
  )
}

export default Footer;