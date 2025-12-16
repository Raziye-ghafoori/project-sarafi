import { createRoot } from 'react-dom/client'
import { ChakraProvider,ColorModeScript } from '@chakra-ui/react'
import Home from './Home'
import theme from'./Theme'



createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Home/>
  </ChakraProvider>
)
