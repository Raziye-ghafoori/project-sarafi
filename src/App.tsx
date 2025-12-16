import { useState ,useEffect } from 'react'
import './App.css'
import './index.css'
import { 
  Text,
  Box,
  Button,
  Card,
  CardBody,
  Image,
  Heading,
  Stack,
  InputGroup,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode
 } from '@chakra-ui/react'
 import { IoMoonOutline} from "react-icons/io5";
 import { FaAngleDown } from "react-icons/fa";
 import { IoIosSearch } from "react-icons/io";
 import data from '../public/data.json'



function App(props:{handleCountryClick:any}) {

  const [inputSearch,setInputSaerch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { toggleColorMode } = useColorMode();
  const [mode ,setMode]=useState('light_mode');

  const currentTheme = document.documentElement.getAttribute('data-theme') ;

  const handleToggleColorMode = () => {
    toggleColorMode();
    console.log(currentTheme) 
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      setMode('light_mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      setMode('dark_mode');
    }
  };
  
  const handlerInputSearch = (event:any)=>{
    setInputSaerch(event.target.value);
  }

  const handlerRegionSelect = (region: string) => {
    setSelectedRegion(region);
  }

  const setCountrys = () => {
    const filteredCountries = data.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(inputSearch.toLowerCase());
      const matchesRegion = selectedRegion ? country.region === selectedRegion : true; 
      return matchesSearch && matchesRegion;
    }
    );
    
    const countries = filteredCountries.map((country) => {
      return (
        <div key={country.name} >
          <Card maxW='sm' onClick={()=>props.handleCountryClick(country)} m={'20px'}  cursor={'pointer'}  w={300} className={mode} boxShadow={'.1px .1px 10px rgba(128, 128, 128, 0.329)'}>
            <CardBody padding={0}>
              <Image
                src={country.flag}
                alt={`flag of ${country.name}`}
                borderRadius='lg'
                w={'100%'}
                h={200}
              />
              <Stack mt='6' spacing='3'>
                <Heading size='lg' textAlign={'left'} paddingLeft={'20px'}>{country.name}</Heading>
                <Box textAlign={'left'} paddingLeft={'20px'} mb={'50px'}>
                  <Text>
                    <strong>Population:</strong> {country.population}
                  </Text>
                  <Text>
                    <strong>Region:</strong> {country.region}
                  </Text>
                  <Text>
                    <strong>Capital:</strong> {country.capital}
                  </Text>
                </Box>
              </Stack>
            </CardBody>  
          </Card>
        </div>
      )
    });
    return countries;       
  }

  const showCountrys = setCountrys();

  useEffect(() => {
    if (currentTheme === 'dark') {
      setMode('dark_mode');
    } else {
      setMode('light_mode');
    }
  
  }, [currentTheme])

  return (
    <>
    <header>
      <Box padding={'20px'} className={mode} boxShadow={'.1px .1px 10px rgba(128, 128, 128, 0.329)'} display={'flex'} justifyContent={'space-between'}>
        <Text cursor={'default'} fontWeight={'bold'} fontSize={{base:'20px',md:'30px'}} >Where in the world?</Text>
        <Button onClick={()=>handleToggleColorMode()}  background={'transparent'}><IoMoonOutline fontSize={'17px'}  /> Dark Mode</Button>
      </Box>
    </header>
    <section style={{width:'90%',margin:'30px auto'}}>
      <Box display={'flex'} flexDirection={{base:'column',md:'row'}} justifyContent={'space-between'} alignItems={{base:'flex-start',md:'center'}} >
      <InputGroup m={{base:'0 0 20px',md:'0'}} boxShadow={'.1px .1px 10px rgba(128, 128, 128, 0.329)'} w={{base:'100%',md:'40%'}} h={'60px'} className={mode} display={'flex'}  alignItems={'center'} >
      <IoIosSearch style={{fontSize:'30px',paddingLeft:'10px'}}/>
      <Input onChange={handlerInputSearch} placeholder='search for a country...' style={{border:'0',height:'100%'}} />
      </InputGroup>
      <Box>
          <Menu >
            <MenuButton boxShadow={'.1px .1px 10px rgba(128, 128, 128, 0.329)'} as={Button} rightIcon={<FaAngleDown className={mode}/>} className={mode} >
              filter by Regian
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handlerRegionSelect('Africa')}>Africa</MenuItem>
              <MenuItem onClick={() => handlerRegionSelect('Americas')}>Americas</MenuItem>
              <MenuItem onClick={() => handlerRegionSelect('Asia')}>Asia</MenuItem>
              <MenuItem onClick={() => handlerRegionSelect('Europe')}>Europe</MenuItem>
              <MenuItem onClick={() => handlerRegionSelect('Oceania')}>Oceania</MenuItem>
              <MenuItem onClick={() => handlerRegionSelect('')}>All Regions</MenuItem>
            </MenuList>
          </Menu>
      </Box>
      </Box>
    </section>
    <section style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',width:'90%',margin:'0 auto'}}>
      {showCountrys}
    </section>
    </>
  )
}

export default App
