import './Softwares.css';
import capcut from "../../assets/Images/Group 32.png"
import sonyvegas from "../../assets/Images/Group 33.png"
import ilustrator from "../../assets/Images/Group 34.png"
import photoshop from "../../assets/Images/Group 35.png"
import after from "../../assets/Images/Group 36.png"
import premiere from "../../assets/Images/Group 37.png"
import notion from "../../assets/Images/Group 7.png"
import figma from "../../assets/Images/Group 8.png"
import blender from "../../assets/Images/Group 9.png"


function Softwares() {

  return (
        <div className='softwares'>
            <h1>Softwares que eu utilizo</h1>
            <p>Para projetos de design</p>
            <div className="iconessoftware">
                    <img className="iconeSoftwares" src={photoshop} alt=" Ícone de seta " />
                    <img className="iconeSoftwares" src={premiere} alt=" Ícone de seta " />
                    <img className="iconeSoftwares" src={after} alt=" Ícone de seta " />
                    <img className="iconeSoftwares" src={ilustrator} alt=" Ícone de seta " />
                    <img className="iconeSoftwares" src={figma} alt=" Ícone de seta " />
                    <img className="iconeSoftwares" src={notion} alt=" Ícone de seta " />
                    <img className="iconeSoftwares" src={blender} alt=" Ícone de seta " />
                    <img className="iconeSoftwares" src={sonyvegas} alt=" Ícone de seta " />
                    <img className="iconeSoftwares" src={capcut} alt=" Ícone de seta " />
            </div>
        </div>
    )
}


export default Softwares