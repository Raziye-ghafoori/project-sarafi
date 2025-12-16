import '../App.css'
import{
    Text,
    Box,
    Button,
    Image,
    useColorMode
}from '@chakra-ui/react';
import { IoMoonOutline} from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState ,useEffect } from 'react';
import '../App.css'

interface Country {
    name: string;
    topLevelDomain: string[];
    capital: string;
    subregion: string;
    region: string;
    population: number;
    borders: string[];
    nativeName: string;
    currencies: Currency[];
    languages: Language[];
    flag: string;
}

interface Currency {
    code: string;
    name: string;
    symbol: string;
}

interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}


const ShowCountryInfo = (props:{country:Country,handleCountryClick:any}) => {
    let languages: string ='';
    const { toggleColorMode } = useColorMode();
    const [mode , setMode] = useState('light_mode');

    const currentTheme = document.documentElement.getAttribute('data-theme');

    const handleToggleColorMode = () => {
        toggleColorMode(); 
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            setMode('light_mode');
          } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            setMode('dark_mode');
          }
      };

    props.country.languages?.forEach(lag=>{
        languages +=`${lag.name}, `
    })


    const borderCountries = props.country.borders?.map(border=>
    <Box m={'0 10px 5px'} display={'flex'} justifyContent={'center'} alignItems={'center'} textAlign={'center'} w={{base:'70px', md:'100px'}} h={'30px'} className={mode} borderRadius={'5'} boxShadow={'.1px .1px 10px rgba(128, 128, 128, 0.329)'}>{border}</Box>
    )

    useEffect(() => {
        if (currentTheme === 'dark') {
          setMode('dark_mode');
        } else {
          setMode('light_mode');
        }
      
      }, [currentTheme])

    return <div>
        <header>
      <Box padding={'20px'} className={mode} display={'flex'} boxShadow={'.1px .1px 10px rgba(128, 128, 128, 0.329)'} justifyContent={'space-between'}>
        <Text cursor={'default'} fontWeight={'bold'} fontSize={{base:'20px',md:'30px'}} >Where in the world?</Text>
        <Button onClick={()=>handleToggleColorMode()} background={'transparent'}><IoMoonOutline fontSize={'17px'}  /> Dark Mode</Button>
      </Box>
    </header>
    <section style={{width:'90%',margin:'70px auto 20px',display:'flex',alignItems:'left'}}>
        <Button cursor={'pointer'} onClick={()=>props.handleCountryClick(null)} w={'120px'} className={mode}  boxShadow={'.01px .01px 10px rgba(128, 128, 128, 0.329)'}><IoIosArrowRoundBack style={{fontSize:'20px'}} />Back</Button>
    </section>
    <section style={{width:'90%',margin:'40px auto'}}>
        <Box display={'flex'} flexDirection={{base:'column',md:'row'}}>
            <Image src={props.country.flag}  alt={`falg of $`} w={{base:'100%',md:'40%'}} />
            <Box ml={'50px'} textAlign={'left'} w={'60%'}>
                <Text fontSize={{base:'30px',md:'50px'}} m={'20px 0'} fontWeight={'bold'}>{props.country?.name}</Text>
                <Box display={'flex'} flexDirection={{base:'column',md:'row'}}>
                    <Box w={'50%'} m={'0 0 30px'}>
                        <Text fontSize={{base:'14px'}}><strong style={{marginRight:'10px'}}>Native Name:</strong>{props.country?.nativeName}</Text>
                        <Text><strong style={{marginRight:'10px'}}>Population:</strong>{props.country?.population}</Text>
                        <Text><strong style={{marginRight:'10px'}}>Region:</strong>{props.country?.region}</Text>
                        <Text><strong style={{marginRight:'10px'}}>Sub Region:</strong>{props.country?.subregion}</Text>
                        <Text><strong style={{marginRight:'10px'}}>Capital:</strong>{props.country?.capital}</Text>
                    </Box>
                    <Box w={'50%'} m={'0 0 30px'}>
                        <Text><strong style={{marginRight:'10px'}}>Top Level Domin:</strong>{props.country?.topLevelDomain[0]}</Text>
                        <Text><strong style={{marginRight:'10px'}}>Currencies:</strong>{props.country?.currencies[0].code}</Text>
                        <Text><strong style={{marginRight:'10px'}}>Languages:</strong>{languages}</Text>
                    </Box>
                </Box>
                <Box display={'flex'}  flexDirection={{base:'column',md:'row'}} alignItems={{base:'flex-start',md:'center'}} >
                    <Text fontWeight={'bold'} m={'0 20px 10px 0 '}>Border Countires:</Text>
                    <Box display={'flex'} flexWrap={'wrap'}>
                    {borderCountries}
                    </Box>
                </Box>
            </Box>
        </Box>
    </section>
    </div>;
}

export default ShowCountryInfo;