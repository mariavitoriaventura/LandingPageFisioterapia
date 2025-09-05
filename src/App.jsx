import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import hero from './assets/hero.png'
import collage from './assets/collage.png'
import p1 from './assets/person-1.png'
import p2 from './assets/person-2.png'
import p3 from './assets/person-3.png'
import icExam from './assets/icon-exam.png'
import icTreat from './assets/icon-treatment.png'
import icEmerg from './assets/icon-emergency.png'
import bgHero from './assets/background.jpg'

import ReviewCarousel from "./components/ReviewCarousel/ReviewCarousel"

const Global = createGlobalStyle`
  :root{
    --teal:#0b9d8a;
    --teal-700:#087c6d;
    --ink:#0f1e21;
    --muted:#5b6b6f;
    --bg:#ffffff;
    --surface:#f2f7f6;
  }
  *{box-sizing:border-box}
  html,body,#root{height:100%}
  body{margin:0;font-family:Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell}
  a{color:inherit}
`

const Container = styled.div`
  display:flex;
  flex-direction:column;
  min-height:100%;
`

const Header = styled.header`
  position:fixed; inset:0 0 auto 0;
  height:68px; display:flex; align-items:center; justify-content:center;
  background:rgba(255,255,255,.8); backdrop-filter:saturate(140%) blur(8px);
  border-bottom:1px solid #e9efee; z-index:40;
`

const HeaderInner = styled.div`
  width:min(1120px, 92vw);
  display:flex; align-items:center; justify-content:space-between;
  gap:16px;
`

const Brand = styled.a`
  display:flex; align-items:center; gap:10px; text-decoration:none; font-weight:700;
  span{color:var(--teal)}
`

const Nav = styled.nav`
  display:flex; align-items:center; gap:16px;
  a{ text-decoration:none; font-weight:600; color:var(--ink); opacity:.9; }
  @media (max-width: 720px){ display:none }
`

const Cta = styled.a`
  background:var(--teal); color:white; text-decoration:none;
  padding:12px 16px; border-radius:14px; font-weight:700; box-shadow:0 6px 16px rgba(2, 124, 110,.2);
  transition:transform .15s ease, filter .15s ease;
  &:hover{ transform:translateY(-1px); filter:brightness(1.05) }
`

const Hero = styled.section`
  padding-top: 92px;
  position: relative;
  min-height: 560px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute; inset: 0;
    background: url(${bgHero}) center / cover no-repeat; /* imagem */
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute; inset: 0;
    /* gradiente COM TRANSPARÊNCIA */
    background: linear-gradient(
      180deg,
      rgba(7,135,121, .90) 0%,
      rgba(9,163,145, .78) 30%,
      rgba(140,216,240, .55) 55%
    );
    /* OU: remova transparências acima e use opacity global */
    /* opacity: .85; */
    z-index: 1;
    pointer-events: none; /* evita capturar cliques */
  }
`;

const HeroInner = styled.div`
  width: min(1120px, 92vw);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  align-items: center;
  gap: 24px;
  position: relative;
  z-index: 2;  /* acima do bg/gradient */

  @media (max-width: 980px){
    grid-template-columns: 1fr;
    text-align: center;
  }
`;


const HeroCopy = styled.div`
  color:white; padding:16px 0 48px;
  h1{ font-size: clamp(28px, 5vw, 44px); line-height: 1.05; margin:0 0 16px; }
  p{ font-size: clamp(16px, 2.6vw, 18px); max-width: 52ch; opacity:.95 }
  @media (max-width:980px){ p{margin-inline:auto} }
`

const HeroImage = styled.div`
  position:relative; min-height: 320px;
  img{ width:80%; height:80%; object-fit:cover; border-radius:20px;}
`

const Section = styled.section`
  padding: 48px 0;
  background:${p=>p.surface? 'var(--surface)':'var(--bg)'};
`

const SectionInner = styled.div`
  width:min(1120px, 92vw);
  margin:0 auto;
`

const H2 = styled.h2`
  font-size: clamp(24px, 4.6vw, 34px); margin:0 0 12px; text-align:center;
`

const Lead = styled.p`
  margin: 0 auto 24px; text-align:center; color:var(--muted); max-width: 62ch;
`

const Features = styled.div`
  display:grid; grid-template-columns:repeat(3, 1fr); gap:18px;
  @media (max-width: 880px){ grid-template-columns:1fr }
`

const Card = styled.article`
  background: #fff;
  border: 1px solid #e9efee;
  border-radius: 18px;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  transition: transform .15s ease, box-shadow .15s ease;
  will-change: transform;

  img{
    width: 64px;
    height: 64px;
    object-fit: contain;
    display: block;
  }

  h3{
    margin: 6px 0 4px;
    font-size: 20px;
    line-height: 1.15;
  }

  p{
    margin: 0;
    color: var(--muted);
    max-width: 42ch;
  }

  &:hover{
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(1, 90, 78, .10);
  }
`;


const AboutGrid = styled.div`
  display:grid; grid-template-columns: .95fr 1.05fr; gap:22px; align-items:center;
  @media (max-width: 980px){ grid-template-columns:1fr }
`

const Bullet = styled.div`
  margin:10px 0; padding-left:16px; border-left:3px solid var(--teal);
  color:var(--muted)
`

const Play = styled.button`
  margin-top:12px; border:0; background:transparent; color:var(--teal); font-weight:700; cursor:pointer;
`

const TestiGrid = styled.div`
  display:grid; grid-template-columns:1fr 1fr; gap:20px;
  @media (max-width: 980px){ grid-template-columns:1fr }
`

const Testi = styled.div`
  background:white; border:1px solid #e9efee; border-radius:18px; padding:18px;
  display:grid; grid-template-columns: 80px 1fr; gap:16px; align-items:center;
  p{ margin:0; color:var(--muted) }
  small{ color:#7a8c90 }
  img{ width:80px; height:80px; border-radius:50%; object-fit:cover }
`

const CTA = styled.div`
  background: white;
  border: 1px solid #e9efee; border-radius:22px; padding:24px; text-align:center;
  box-shadow: 0 10px 24px rgba(1, 90, 78,.08);
  a{ display:inline-block; margin-top:8px; }
`

const Footer = styled.footer`
  padding:24px 0; color:#779193; text-align:center;
`
const Actions = styled.div`
  display: flex;
  align-items: center;   /* centraliza verticalmente */
  gap: 12px;
  flex-wrap: wrap;
  @media (max-width: 980px){ justify-content: center; }
`;

const GhostLink = styled.a`
  display: inline-flex;          /* evita desalinhamento de baseline */
  align-items: center;           /* alinha o texto no meio */
  font-weight: 700;
  text-decoration: none;
  color: white;
  height: 44px;                  /* aprox. altura do botão */
  line-height: 1;
  padding: 0 4px;                /* um respiro lateral */
  gap: 6px;
`;

export default function App(){
  return (
    <Container>
      <Global />
      <Header>
        <HeaderInner>
          <Brand href="#"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" stroke="#0b9d8a" strokeWidth="2"/><path d="M6 14c2 0 2-4 6-4s4 6 6 6" stroke="#0b9d8a" strokeWidth="2" fill="none"/></svg> Ana <span>Prates</span></Brand>
          <Nav>
            <a href="#servicos">Serviços</a>
            <a href="#sobre">Sobre</a>
            <a href="#avaliacoes">Avaliações</a>
          </Nav>
          <Cta href="https://wa.me/5599999999999" aria-label="Solicitar orçamento pelo WhatsApp">Solicite um Orçamento</Cta>
        </HeaderInner>
      </Header>

      <Hero>
        <HeroInner>
          <HeroCopy>
            <p>Tenha Mais Qualidade de Vida</p>
            <h1>Fisioterapia Domiciliar e Acompanhamento</h1>
            <p>Meu objetivo é mostrar que sua dor ou incapacidade tem uma solução, e mostrar um caminho para ser seguido — e eu utilizo isso através da <b>Fisioterapia</b>.</p>
           <Actions>
              <Cta href="https://wa.me/5599999999999">Solicite o seu Orçamento</Cta>
              <GhostLink href="#sobre">
                Saiba mais <span aria-hidden>↓</span>
              </GhostLink>
            </Actions>
          </HeroCopy>
          <HeroImage aria-hidden="true">
            <img src={hero} alt="Fisioterapeuta sorrindo" />
          </HeroImage>
        </HeroInner>
      </Hero>

      <Section id="servicos" surface>
        <SectionInner>
          <H2>Atendimento Especializado</H2>
          <Lead>Independente de onde seja sua lesão, tratar agora vai fazer você viver sem dor e sem limitação física. Nosso método já fez mais de 30 mil pacientes retornarem às atividades e à rotina que amam.</Lead>
          <Features>
            <Card><img src={icExam} alt="" /><div><h3>Examinação</h3><p>Analisamos cada um individualmente para que possamos passar o melhor tratamento.</p></div></Card>
            <Card><img src={icTreat} alt="" /><div><h3>Tratamento Especializado</h3><p>Após a examinação iremos ajudar da melhor maneira.</p></div></Card>
            <Card><img src={icEmerg} alt="" /><div><h3>Serviço Emergencial</h3><p>Temos foco especializado em situações que exigem cuidado rápido e preciso.</p></div></Card>
          </Features>
        </SectionInner>
      </Section>

      <Section id="sobre">
        <SectionInner>
          <H2>Fisioterapia com a eficiência Máxima</H2>
          <Lead>Através de muito estudo e dedicação, desenvolvi um método especial em que é possível acelerar a recuperação dos meus pacientes.</Lead>
          <AboutGrid>
            <img src={collage} alt="Pacientes em sessões de fisioterapia" style={{width:'100%', borderRadius:18}} />
            <div>
              <Bullet>Planos de tratamento claros e objetivos.</Bullet>
              <Bullet>Acompanhamento contínuo por WhatsApp.</Bullet>
              <Bullet>Protocolos baseados em evidências.</Bullet>
              <Play aria-label="Assistir vídeo de demonstração">▶ Assistir Agora</Play>
            </div>
          </AboutGrid>
        </SectionInner>
      </Section>
      <Section id="avaliacoes" surface>
        <SectionInner>
          <H2>Nossas Avaliações</H2>
          <Lead>O que nossos pacientes dizem</Lead>

          <ReviewCarousel
            items={[
              { photo: p1, name: "Nilza L.", role: "Paciente", text: "Tá sendo uma experiência muito boa..." },
              { photo: p2, name: "Marcos R.", role: "Paciente", text: "Profissional atencioso, responsável..." },
              { photo: p3, name: "Patrícia A.", role: "Paciente", text: "Ganhamos autonomia de volta com o tratamento. Recomendo!" },
              { photo: p1, name: "Nilza L.", role: "Paciente", text: "Tá sendo uma experiência muito boa..." },
              { photo: p2, name: "Marcos R.", role: "Paciente", text: "Profissional atencioso, responsável..." },
              { photo: p3, name: "Patrícia A.", role: "Paciente", text: "Ganhamos autonomia de volta com o tratamento. Recomendo!" }
            ]}
          />
        </SectionInner>
      </Section>

      <Section>
        <SectionInner style={{display:'grid', placeItems:'center'}}>
          <CTA>
            <H2 style={{margin:'0 0 6px'}}>Ganhe uma avaliação gratuita.</H2>
            <Lead style={{margin:'0 0 12px'}}>Você tem direito a uma avaliação gratuita e a um atendimento personalizado para que você tenha o melhor tratamento possível.</Lead>
            <Cta href="https://wa.me/5599999999999">Chamar no WhatsApp</Cta>
          </CTA>
        </SectionInner>
      </Section>

      <Footer>© {new Date().getFullYear()} Ana Prates — Fisioterapia</Footer>
    </Container>
  )
}
