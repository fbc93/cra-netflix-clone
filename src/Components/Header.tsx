import { Link, useMatch, useNavigate } from 'react-router-dom';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const PinHeader = styled(motion.header)`
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 1;
  top:0;
  padding: 0 4%;
  font-size:14px;
`;

const Logo = styled(motion(Link))`
  display: block;
  width:110px;
  height:30px;
  margin-right:50px;
`;

const Svg = styled.svg`
  path {
    stroke: ${props => props.theme.red};
    stroke-width: 5;
  }
`;

const LeftNav = styled.ul`
  display: flex;
  flex:auto;
  height: 30px;
`;

const Item = styled.li`
  position: relative;
  margin-right:20px;
  &:hover{
    a {
      color:${(props) => props.theme.white.lighter};
    }
  }

  a {
    color:${(props) => props.theme.white.darker};
    transition: color 0.3s ease-in-out;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width:5px;
  height: 5px;
  border-radius: 50%;
  bottom:0px;
  left:0;
  right:0;
  margin:0 auto;
  background-color: ${(props) => props.theme.red};
`;

const RightNav = styled(motion.div)``;

const SearchForm = styled(motion.form)`
  display: flex;
    width: 220px; //45px
    padding: 5px 10px;
    align-items: center;
    justify-content: left;
`;

const SearchIcon = styled(motion.button)`
  margin-right:5px;
  background: transparent;
  color:${props => props.theme.white.lighter};
  padding:0;
  border:0;
  cursor:pointer;
`;

const SearchInput = styled(motion.input)`
  width: calc(100% - 29px);
  outline:none;
  border:none;
  background-color: transparent;
  transform-origin: right center;
  color:${(props) => props.theme.white.lighter};

  &::placeholder{
    color:${(props) => props.theme.white.lighter};
  }
`;

const navVariants = {
  top: {
    backgroundImage: "linear-gradient(180deg,rgba(0,0,0,0.7) 10%,rgba(0,0,0,0))",
  },
  scroll: {
    backgroundImage: "linear-gradient(180deg,rgba(0,0,0,1) 10%,rgba(0,0,0,1))",
    transition: {
      duration: 0.5
    }
  }
}
interface IForm {
  keyword: string,
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(true);
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const movieMatch = useMatch("/movie");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();

  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0
      })
    } else {
      inputAnimation.start({
        scaleX: 1
      })
    }

    setSearchOpen(!searchOpen);
  }

  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() > 68) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    //console.log(data);
    navigate(`search?keyword=${data.keyword}`);
  };

  const logoSVGVar = {
    start: {
      pathLength: 0,
      fill: "rgba(229,9,29,0)",
      scale: 1.3
    },
    end: {
      pathLength: 1,
      fill: "rgba(299,9,29,1)",
      scale: 1,
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 8
      }
    },
    hover: {
      fill: "rgba(255,255,255,1)",
      pathLength: 0
    }
  }

  return (
    <PinHeader
      variants={navVariants}
      initial="top"
      animate={navAnimation}
    >
      <Logo to={"/"}>
        <Svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 276.742">
          <motion.path
            variants={logoSVGVar}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
          ></motion.path>
        </Svg>
      </Logo>

      <LeftNav>
        <Item>
          <Link to={"/"}>홈</Link>
          {homeMatch && <Circle layoutId="circle" />}
        </Item>
        <Item>
          <Link to={"movie"}>영화</Link>
          {movieMatch && <Circle layoutId="circle" />}
        </Item>
        <Item>
          <Link to={"tv"}>TV 프로그램</Link>
          {tvMatch && <Circle layoutId="circle" />}
        </Item>
      </LeftNav>

      <RightNav>
        <SearchForm
          initial={{ width: 45, border: "1px solid rgba(255,255,255,1)" }}
          animate={{ width: searchOpen ? 220 : 45, border: searchOpen ? "1px solid rgba(255,255,255,1)" : "1px solid rgba(255,255,255,0)" }}
          transition={{ type: "linear" }}
          onSubmit={handleSubmit(onValid)}
        >

          <SearchIcon
            onClick={toggleSearch}
            className="material-symbols-rounded">
            search
          </SearchIcon>
          <SearchInput
            {...register("keyword", { required: true, minLength: 2 })}
            initial={{ width: 100 + "%" }}
            animate={inputAnimation}
            transition={{ type: "linear" }}
            placeholder='제목,배우,감독을 검색해보세요.'
            autoFocus={true}
          />

        </SearchForm>
      </RightNav>
    </PinHeader>
  )
}

export default Header;