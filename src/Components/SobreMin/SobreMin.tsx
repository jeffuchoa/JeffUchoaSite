import './SobreMinCSS.css';
import foto from '../../assets/Images/Minha Foto.png';

function App() {

  return (
        <div className='SobreMin'>
            <img className="smfoto" src={foto} alt="Foto do designer e desenvolvedor Jeff Uchoa " />
            <div className="smdescricao">
                <h1>Sobre Min</h1>
                <p>Olá eu sou Jeff Uchoa, sou Designer e Desenvolvedor formado pela UFC Campus Quixadá, sou um designer multimídia que trabalha em diversas áreas como modelagem tridimensional, edição de vídeo, motion design, identidade visual, social media e UI/UX. Já em desenvolvimento trabalho com front-end/back-end e banco de dados.</p>
            </div>
        </div>
    )
}


export default App