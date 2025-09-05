import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

// ---------- styled ----------
const Carousel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 18px;
`;

const Track = styled.div`
  display: flex;
  transition: ${p => (p.anim ? "transform .45s ease" : "none")};
  transform: translateX(${p => `-${p.offset}%`});
  will-change: transform;
`;

const Slide = styled.article`
  min-width: 100%;
  padding: 10px;

  /* grid com 1 ou 2 colunas conforme perView */
  .grid{
    display: grid;
    grid-template-columns: repeat(${p => p.perView}, 1fr);
    gap: 20px;
  }

  @media (max-width: 980px){
    .grid{ grid-template-columns: 1fr; }
  }

  .card{
    background:#fff; border:1px solid #e9efee; border-radius:18px; padding:18px;
    display:grid; grid-template-columns: 80px 1fr; gap:16px; align-items:center;
    height:100%;
    p{ margin:0; color:var(--muted) }
    small{ color:#7a8c90 }
    img{ width:80px; height:80px; border-radius:50%; object-fit:cover }
  }
`;

const Arrow = styled.button`
  position:absolute; top:50%; transform:translateY(-50%);
  ${p => p.left ? 'left: -6px' : 'right: -6px'};
  border:0; background:#fff; width:40px; height:40px; border-radius:999px;
  box-shadow:0 8px 20px rgba(0,0,0,.12);
  display:grid; place-items:center; cursor:pointer;
  &:disabled{ opacity:.5; cursor:not-allowed }
  @media (max-width:980px){ ${p => p.left ? 'left: 6px' : 'right: 6px'}; }
`;

const Dots = styled.div`
  display:flex; gap:8px; justify-content:center; margin-top:12px;
  button{
    width:8px; height:8px; border-radius:999px; border:0; background:#c7d6d9; cursor:pointer;
  }
  button[aria-current="true"]{ background:var(--teal); width:22px; border-radius:999px; }
`;

// ---------- helpers ----------
function usePerView() {
  const get = () => (window.matchMedia('(max-width: 980px)').matches ? 1 : 2);
  const [perView, setPerView] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 980px)');
    const onChange = () => setPerView(get());
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return perView;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// ---------- componente ----------
export default function ReviewCarousel({ items, interval = 4000, autoplay = true }) {
  const perView = usePerView();

  // páginas reais (grupos de perView)
  const pages = useMemo(() => {
    const groups = chunk(items, perView);
    if (groups.length === 0) return [];
    // páginas virtuais = [last] + reais + [first]
    const first = groups[0];
    const last  = groups[groups.length - 1];
    return [last, ...groups, first];
  }, [items, perView]);

  const realPageCount = Math.max(1, Math.ceil(items.length / perView));

  // começa na página 1 (primeira real). 0 é clone do final; last é clone do começo
  const [page, setPage] = useState(1);
  const [anim, setAnim] = useState(true);     // controla transição para "teleporte"
  const [hover, setHover] = useState(false);
  const [touching, setTouching] = useState(false);
  const startX = useRef(0);
  const deltaX = useRef(0);

  // atualiza se perView mudar (ex: resize)
  useEffect(() => { setPage(1); setAnim(false); requestAnimationFrame(()=>setAnim(true)); }, [perView]);

  // offset: cada página ocupa 100%
  const offset = page * 100;

  // ajuste ao fim/início (loop infinito sem "tranco")
  const onTransitionEnd = () => {
    if (page === pages.length - 1) { // passou do último (clone do first)
      setAnim(false);
      setPage(1);
      requestAnimationFrame(() => setAnim(true));
    }
    if (page === 0) { // foi antes do primeiro (clone do last)
      setAnim(false);
      setPage(pages.length - 2);
      requestAnimationFrame(() => setAnim(true));
    }
  };

  // setas
  const next = () => setPage(p => p + 1);
  const prev = () => setPage(p => p - 1);

  // autoplay
  useEffect(() => {
    if (!autoplay || hover || touching || realPageCount <= 1) return;
    const id = setInterval(() => setPage(p => p + 1), interval);
    return () => clearInterval(id);
  }, [autoplay, hover, touching, interval, realPageCount]);

  // touch
  const onTouchStart = e => { setTouching(true); startX.current = e.touches[0].clientX; deltaX.current = 0; };
  const onTouchMove  = e => { deltaX.current = e.touches[0].clientX - startX.current; };
  const onTouchEnd   = () => {
    const thresh = 50;
    if (deltaX.current < -thresh) next();
    if (deltaX.current >  thresh) prev();
    setTouching(false);
  };

  // dots: página real atual (0..realPageCount-1)
  const realIndex = ((page - 1) % realPageCount + realPageCount) % realPageCount;

  return (
    <>
      <Carousel
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Track offset={offset} anim={anim} onTransitionEnd={onTransitionEnd}>
          {pages.map((group, i) => (
            <Slide key={i} perView={perView}>
              <div className="grid">
                {group.map((t, idx) => (
                  <div key={idx} className="card">
                    <img src={t.photo} alt={`Foto de ${t.name}`} />
                    <div>
                      <p>“{t.text}”</p>
                      <div style={{marginTop:10, fontWeight:700}}>{t.name}</div>
                      <small>{t.role}</small>
                    </div>
                  </div>
                ))}
              </div>
            </Slide>
          ))}
        </Track>

        <Arrow left onClick={prev} aria-label="Anterior">‹</Arrow>
        <Arrow onClick={next} aria-label="Próximo">›</Arrow>
      </Carousel>

      <Dots>
        {Array.from({ length: realPageCount }).map((_, i) => (
          <button key={i} aria-current={i === realIndex} onClick={() => setPage(i + 1)} />
        ))}
      </Dots>
    </>
  );
}
