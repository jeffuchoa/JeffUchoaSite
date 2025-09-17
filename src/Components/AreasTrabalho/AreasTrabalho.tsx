import './AreaTrabalho.css';
import seta from "../../assets/Images/arrow.png"
import setaDireita from "../../assets/Images/ayia.jpg"
import setaEsquerda from "../../assets/Images/Vectooor 1.png"
import slides from './SliderData.json';
import { useState } from 'react';
import React, { useRef,useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {  Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Environment } from "@react-three/drei";


type AnimatedMeshProps = {
    node: THREE.Mesh;
    speed?: number;
    float?: number;
    dirX?: number;
    dirY?: number;
};

function AnimatedMesh({
    node,
    speed = 1,
    float = 0.5,
}: AnimatedMeshProps) {
    const ref = useRef<THREE.Mesh>(null);
    const direction = useRef(1);
    const opacity = useRef(0);

    
    const baseRotation = 18025; 
    const amplitude = Math.PI / 20; 

    useFrame((state, delta) => {

        if (ref.current && ref.current.material) {
            const mat = ref.current.material as THREE.MeshStandardMaterial;

            
            mat.transparent = true;

           
            opacity.current = Math.min(opacity.current + delta * 0.7, 1);
            mat.opacity = opacity.current;
        }

        if (ref.current) {
            ref.current.rotation.y += delta * speed * 1 * direction.current;

            
            const maxAngle = baseRotation + amplitude;
            const minAngle = baseRotation - amplitude;

            if (ref.current.rotation.y > maxAngle) {
                ref.current.rotation.y = maxAngle;
                direction.current = -1;
            }
            if (ref.current.rotation.y < minAngle) {
                ref.current.rotation.y = minAngle;
                direction.current = 1;
            }

            
            ref.current.position.y =
                node.position.y + Math.sin(state.clock.elapsedTime * speed) * float;
        }


    });

    return (
        <mesh
            ref={ref}
            geometry={node.geometry}
            material={node.material}
            position={[0, 1, 1]}
            scale={node.scale}

        >
        </mesh>

    );
}

const BlenderModel: React.FC = () => {
    const { nodes, materials  } = useGLTF("./models/greg2c.glb") as any;
    
    materials["Material.008"].roughness = 0;
    materials["Material.008"].metalness = 0.5;
    materials["Material.002"].metalness = 1;
    materials["Material.002"].roughness = 0.25;

    return (
        <group position={[0, -5, 0]}>
            {Object.values(nodes)
                .filter((n: any): n is THREE.Mesh => n instanceof THREE.Mesh)
                .map((mesh, i) => (
                    <AnimatedMesh
                        key={i}
                        node={mesh}
                        speed={0.1}       
                        float={0.2}         
                            
                    />
                ))}
        </group>
    );
};

function App() {

    const [current, setCurrent] = useState(0);
    const length = slides.length;


    function centralizarControles() {
        const faixa = document.querySelector<HTMLDivElement>(".modelagemfaixa.active");
        const controles = document.querySelector<HTMLDivElement>(".controles");
        const container = document.querySelector<HTMLDivElement>(".slidesimageslider");

        if (!faixa || !controles || !container) return;

        container.style.position = "relative";

        const faixaRect = faixa.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const faixaCenterX = faixaRect.left - containerRect.left + faixaRect.width / 2;
        const faixaCenterY = faixaRect.top - containerRect.top + faixaRect.height / 2;

        const controlesRect = controles.getBoundingClientRect();

        const left = faixaCenterX - controlesRect.width / 2;
        const top = faixaCenterY - controlesRect.height / 2;

        controles.style.position = "absolute";
        controles.style.left = `${left}px`;
        controles.style.top = `${top}px`;
    }

    window.addEventListener("load", centralizarControles);

    window.addEventListener("resize", centralizarControles);


    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }
    const bolinhaCreator = () => {
        let bolinhas = []
        for (let i = 0; i < length; i++) {
            bolinhas.push(<div className={i === current ? 'bolinha active' : 'bolinha'} ></div>)
        }
        return (bolinhas)
    }

      const videoRef = useRef<HTMLVideoElement>(null);
    const bgRef = useRef<HTMLVideoElement>(null);

 useEffect(() => {
    if (videoRef.current && bgRef.current) {
      const mainVideo = videoRef.current as HTMLVideoElement & {
        captureStream?: () => MediaStream;
        mozCaptureStream?: () => MediaStream; // Firefox fallback
      };

      let stream: MediaStream | undefined;

      if (mainVideo.captureStream) {
        stream = mainVideo.captureStream();
      } else if (mainVideo.mozCaptureStream) {
        stream = mainVideo.mozCaptureStream();
      }

      if (stream) {
        bgRef.current.srcObject = stream;
        bgRef.current.play().catch((err) => {
          console.error("Erro ao reproduzir vídeo espelho:", err);
        });
      }
    }
  }, [current]); // roda sempre que o slide muda

    return (
        <div className='AreaTrabalho'>
            <h1>Precisando de Designer?</h1>
            <p>Confira minhas áreas de trabalho e portfólio</p>
            <div className="slidesimageslider">
                <div className="controles">
                    <div className="pra-traz"><img src={setaEsquerda} alt="Slide anterior do carrosel de imagens" height="40px" onClick={prevSlide} /></div>
                    <div className="pra-frente"><img src={setaDireita} alt="Próximo slide do carrosel de imagens" height="40px" onClick={nextSlide} /></div>
                </div>
                {slides.map((slide, index) => {
                    return (
                        <>

                            <div className={index === current ? 'modelagem  conteudo active' : 'modelagem conteudo '}
                                key={index}>
                                <div className={index === current ? 'modelagemfaixa active' : 'modelagemfaixa  '}
                                    key={index}>
                                            <video ref={bgRef} className='videofaixa' autoPlay muted loop />        
                                    </div>
                                <div  className={index === current ? 'modelagemimg active' : 'modelagemimg  '}
                                    key={index}>
                                    <div className={index === current ? 'modelageminformacoes active' : 'modelageminformacoes  '}
                                        key={index}>
                                        <img src={slide.icon} className="icone2" alt={slide.titulo} />
                                        <h1 className={slide.type == "motion" ? 'content video2' : 'content'}>{slide.titulo}</h1>
                                        <p className={slide.type == "motion" ? 'content video2' : 'content'}>{slide.descrisao}</p>
                                        <button className='botaoTrabalho'>
                                            <p style={{ margin: 0 }}>Ver Portfólio</p>
                                            <img className="seta" src={seta} alt=" Ícone de seta " />
                                        </button>
                                    </div>
                                    {index === current && (
                                        <>
                                        
                                            {slide.type === "img" && <div className="Canva3DModelagem"><img className='video' src={slide.image} alt={slide.titulo} /> </div>}
                                            {slide.type === "motion" && (
                                                <div className="caixavideo">
                                                    <video ref={videoRef} className='video' autoPlay muted loop>
                                                        <source className='videosource'  src={slide.image} type="video/mp4" />
                                                    </video>
                                                </div>
                                             
                                            )}
                                            {slide.type === "canva" && <div className="plataforma">

                                            
                                            
                                                <Canvas
                                                    className={'Canva3DModelagem'}
                                                    camera={{ position: [0, 0, 40], fov: 20 }}
                                                    shadows
                                                >
                                                
                                                    <ambientLight intensity={0} /> {/* luz suave global */}

                                                
                                                        <BlenderModel />
                                                
                                                    

                                                    <Environment preset="lobby" background={false} />
                                                </Canvas>
                                            </div>
                                            }
                                            
                                        </>
                                    )}

                                </div>

                            </div>
                        </>

                    );
                })}

            </div>
            <div className="bolinhas">
                {bolinhaCreator()}
            </div>


        </div>
    )
}


export default App