import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Components/Header/Header.tsx'
import B3d from './Components/Banner/B3d.tsx'
import SobreMin from './Components/SobreMin/SobreMin.tsx'
import AreaTrabalho from './Components/AreasTrabalho/AreasTrabalho.tsx'
import Softwares from './Components/Softwares/Softwares.tsx'
import Contatos from './Components/Contatos/Index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <B3d />
    <SobreMin />
    <AreaTrabalho />
    <Softwares />
    <Contatos />
  </StrictMode>,
)
