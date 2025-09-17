import styles from './style.module.scss';
import Rounded from '../../common/RoundedButton';
import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Magnetic from '../../common/Magnetic/Magnetic';
import behance from '../../assets/Images/mage_behance.png';
import linkedin from '../../assets/Images/mdi_linkedin.png';
import instagram from '../../assets/Images/ri_instagram-fill.png';
import gmail from '../../assets/Images/simple-icons_gmail.png';
import foto from '../../assets/Images/Minha Foto.png';
import zap from '../../assets/Images/basil_whatsapp-solid.png';

export default function index() {

    return (
        <motion.div className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <img src={foto} alt="Foto do designer e desenvolvedor Jeff Uchoa " />
                        </div>
                        <h2>Trabalhe Comigo!</h2>
                    </span>
                </div>
                <div className={styles.nav}>
                        <Rounded>
                            <img className='navicon' src={linkedin} alt="Ícone do Linkedin" />
                            <p>Perfil LinkedIn</p>
                        </Rounded>
                          <Rounded>
                            <img className='navicon' src={zap} alt="Ícone do Whatsap" />
                            <p>Me chame pelo WhatsApp</p>
                        </Rounded>
                        <Rounded >
                            <img className='navicon' src={gmail} alt="Ícone do Behance" />
                            <p>E-mail</p>
                        </Rounded>
                      
                        <Rounded>
                            <img className='navicon' src={instagram} alt="Ícone do Instagram" />
                            <p>Perfil Instagram</p>
                        </Rounded>
                         <Rounded>
                            <img className='navicon' src={behance} alt="Ícone do Behance" />
                            <p>Perfil Behance</p>
                        </Rounded>
                </div>
            </div>
        </motion.div>
    )
}