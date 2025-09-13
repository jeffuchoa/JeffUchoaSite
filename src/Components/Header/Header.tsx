import './Header.css';
import Logo from '../../assets/Images/Logo.png';
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import Menu from '../../assets/Images/MenuItem.png';
import Close from '../../assets/Images/Close.png';

function App() {
    const [color, setColor] = useState(false);
    const [MobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const changeColor = () => {
            const scrolled = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            // Se passou de 90px e ainda não chegou no final
            if (scrolled >= 90 && scrolled + windowHeight < fullHeight) {
                setColor(true);
            } else {
                setColor(false);
            }
        };

        window.addEventListener('scroll', changeColor);

        // Executa logo de cara (caso a página já esteja rolada ao carregar)
        changeColor();

        return () => {
            window.removeEventListener('scroll', changeColor);
        };
    }, []);

    const changeMobileMenu = () => {
        setMobileMenu(!MobileMenu);
    };

    return (
        <div className={color ? 'header header-bg' : 'header'}>
            <div className="InsideHeader">
                <Link to="Banner" smooth={true} duration={500}>
                    <img
                        className="LogoFeira"
                        src={Logo}
                        alt="Logo da Feira da Pechincha "
                    />
                </Link>

                <img
                    src={MobileMenu ? Close : Menu}
                    onClick={changeMobileMenu}
                    className="BotaoMenuHeader"
                    alt=""
                />

                <div className={MobileMenu ? 'OpcoesHeader active' : 'OpcoesHeader'}>
                    <h2 className="MenuNavegacao">Menu de Navegação</h2>
                    <Link to="SobreMin" offset={-200} smooth={true} duration={500} className="OpcaoHeader">
                        Sobre Min
                    </Link>
                    <Link to="Transformacoes" offset={-200} smooth={true} duration={500} className="OpcaoHeader">
                        Portfólio
                    </Link>
                    <Link to="Precos" offset={-200} smooth={true} duration={500} className="OpcaoHeader">
                        Softwares utilizados
                    </Link>
                    <Link to="Contato" offset={-200} smooth={true} duration={500} className="OpcaoHeader">
                        Contato
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default App;