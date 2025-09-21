import { useEffect, useRef, useState } from "react";
import { Info, X } from "lucide-react";
import { SKILLS_DATA, DOMAINS } from "../data/skills";

const TOOLTIP_MIN_OFFSET = 60;
const HIT_RADIUS = 20;

const Stack = () => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  const nodesRef = useRef([]);
  const animFrameRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const stateRef = useRef({ hoveredSkill: null, activeDomain: null });

  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeDomain, setActiveDomain] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    stateRef.current.hoveredSkill = hoveredSkill;
    stateRef.current.activeDomain = activeDomain;
  }, [hoveredSkill, activeDomain]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initNodes = (width, height) => {
      nodesRef.current = SKILLS_DATA.map((skill) => ({
        ...skill,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseRadius: 1 + (skill.prof / 100) * 3.5,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.01 + Math.random() * 0.03,
      }));
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = wrapper.clientWidth;
      const height = wrapper.clientHeight;

      if (!width || !height) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = { width, height };

      if (nodesRef.current.length === 0) {
        initNodes(width, height);
        return;
      }

      nodesRef.current.forEach((node) => {
        node.x = Math.min(node.x, width);
        node.y = Math.min(node.y, height);
      });
    };

    const render = () => {
      const { width, height } = sizeRef.current;
      if (!width || !height) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(15, 23, 42, 0.4)";
      ctx.fillRect(0, 0, width, height);

      const { activeDomain: currentDomain, hoveredSkill: currentHover } = stateRef.current;
      const nodes = nodesRef.current;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;
        node.twinklePhase += node.twinkleSpeed;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const sharedDomains = n1.domains.filter((domainId) => n2.domains.includes(domainId));

          if (sharedDomains.length === 0) continue;

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let strokeColor = "rgba(255, 255, 255, 0.05)";
          let lineWidth = 0.5;
          let highlighted = false;

          if (currentDomain && sharedDomains.includes(currentDomain.id)) {
            highlighted = true;
            strokeColor = currentDomain.color;
            lineWidth = 1.5;
          } else if (currentHover && (n1.id === currentHover.id || n2.id === currentHover.id)) {
            highlighted = true;
            const domainInfo = DOMAINS.find((domain) => sharedDomains.includes(domain.id));
            strokeColor = domainInfo ? domainInfo.color : "#fff";
            lineWidth = 1.2;
          }

          if (!highlighted && dist >= 120) continue;

          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);

          if (highlighted) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = lineWidth;
            ctx.shadowBlur = 10;
            ctx.shadowColor = strokeColor;
            ctx.stroke();
            ctx.shadowBlur = 0;
          } else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        const isHovered = currentHover?.id === node.id;
        const isActive = currentDomain ? node.domains.includes(currentDomain.id) : false;

        let radius = node.baseRadius;
        let opacity = 0.4 + Math.sin(node.twinklePhase) * 0.3 + node.prof / 200;
        let color = "#ffffff";

        if (isHovered || isActive) {
          radius *= 1.5;
          opacity = 1;
          const domainInfo = DOMAINS.find((domain) => node.domains.includes(domain.id));
          if (domainInfo) color = domainInfo.color;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;

        if (isHovered || isActive) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = color;
        }

        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        if (isHovered || isActive) {
          ctx.fillStyle = "rgba(255,255,255,0.8)";
          ctx.font = "10px sans-serif";
          ctx.fillText(node.name, node.x + radius + 4, node.y + 4);
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    const handleResize = () => resizeCanvas();

    resizeCanvas();
    render();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const getRelativePointerPosition = (clientX, clientY) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return null;

    const rect = wrapper.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handlePointerMove = (e) => {
    const position = getRelativePointerPosition(e.clientX, e.clientY);
    if (!position) return;

    const { x, y } = position;
    setMousePos({ x, y });

    let closestNode = null;
    let minDistance = HIT_RADIUS;

    nodesRef.current.forEach((node) => {
      const dx = node.x - x;
      const dy = node.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDistance) {
        closestNode = node;
        minDistance = dist;
      }
    });

    setHoveredSkill(closestNode);
  };

  const handlePointerLeave = () => {
    setHoveredSkill(null);
  };

  const handlePointerClick = () => {
    if (!hoveredSkill) {
      setActiveDomain(null);
      return;
    }

    const primaryDomainId = hoveredSkill.domains?.[0];
    const domain = DOMAINS.find((item) => item.id === primaryDomainId) || null;

    setActiveDomain((current) => (current?.id === domain?.id ? null : domain));
  };

  return (
    <div className="space-y-6 flex flex-col h-full w-full animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 transition-colors">
          Skills Galaxy
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm transition-colors">
          Interactive constellation of technical expertise. Hover stars or click domains to explore.
        </p>
      </div>

      <div className="w-full flex flex-col gap-6">
        <div
          ref={wrapperRef}
          className="w-full h-[450px] md:h-[550px] lg:h-[650px] bg-slate-900/90 dark:bg-slate-950/80 backdrop-blur-xl rounded-2xl overflow-hidden relative shadow-inner border border-slate-700/50 cursor-crosshair touch-none shrink-0 transition-colors"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerClick}
        >
          <canvas ref={canvasRef} className="block w-full h-full" />

          {hoveredSkill && !activeDomain && (
            <div
              className="absolute pointer-events-none z-10 bg-slate-800/90 border border-slate-700 text-white px-3 py-2 rounded-lg shadow-xl backdrop-blur-sm transform -translate-x-1/2 -translate-y-full mb-4"
              style={{
                left: Math.min(Math.max(mousePos.x, TOOLTIP_MIN_OFFSET), sizeRef.current.width - TOOLTIP_MIN_OFFSET),
                top: Math.max(mousePos.y - 10, 50),
              }}
            >
              <p className="font-bold text-sm">{hoveredSkill.name}</p>
              <p className="text-xs text-slate-300">Proficiency: {hoveredSkill.prof}%</p>
            </div>
          )}

          <div className="absolute bottom-4 left-4 text-slate-400 text-xs flex items-center gap-2 pointer-events-none">
            <Info className="w-4 h-4 opacity-50" />
            <span>Hover to explore. Click a star to view its domain.</span>
          </div>
        </div>

        <div className="w-full">
          {activeDomain ? (
            <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-xl border border-white/50 dark:border-slate-700/50 shadow-lg shadow-black/5 dark:shadow-black/30 relative overflow-hidden transition-colors">
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: activeDomain.color }} />

              <button
                onClick={() => setActiveDomain(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100/50 dark:bg-slate-700/50 p-1.5 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-600/50 transition-colors border border-white/30 dark:border-slate-600/30"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-2 transition-colors">
                {activeDomain.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 max-w-3xl leading-relaxed transition-colors">
                {activeDomain.desc}
              </p>

              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 transition-colors">
                  Constellation Stars
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {SKILLS_DATA.filter((skill) => skill.domains.includes(activeDomain.id))
                    .sort((a, b) => b.prof - a.prof)
                    .map((skill) => (
                      <div
                        key={skill.id}
                        className="flex justify-between items-center p-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-lg border border-white/50 dark:border-slate-700/50 shadow-sm transition-colors"
                      >
                        <span className="text-slate-800 dark:text-slate-200 font-medium text-sm transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400 text-xs font-bold transition-colors">
                          {skill.prof}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-xl border border-white/50 dark:border-slate-700/50 shadow-lg shadow-black/5 dark:shadow-black/30 transition-colors">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 transition-colors">
                Explore Domains
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {DOMAINS.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => setActiveDomain(domain)}
                    className="px-4 py-2 text-sm font-medium rounded-full border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-colors flex items-center gap-2.5 bg-white/60 dark:bg-slate-800/60 hover:bg-white/90 dark:hover:bg-slate-700/60 backdrop-blur-md text-slate-700 dark:text-slate-200 shadow-sm hover:shadow"
                  >
                    <span className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: domain.color }} />
                    {domain.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stack;

