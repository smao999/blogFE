// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplashCursor from '../components/reactbits/animations/SplashCursor';
import TargetCursor from '../components/reactbits/animations/TargetCursor';
import GooeyNav from '../components/reactbits/components/GooeyNav';
import GlassSurface from '../components/reactbits/components/GlassSurface';
import LightPillar from '../components/reactbits/backgrounds/LightPillar';
import ShapeBlur from '../components/reactbits/animations/ShapeBlur';
import LaserFlow from '../components/reactbits/animations/LaserFlow';
import BlurText from '../components/reactbits/text-animations/BlurText';
import ScrollReveal from '../components/reactbits/text-animations/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: '首页', href: '#hero' },
  { label: '作品', href: '#works' },
  { label: '技术', href: '#tech' },
  { label: '关于', href: '#about' },
];

const blogPosts = [
  { id: 1, title: 'React Server Components 深度解析', category: 'React', date: '2024.03', excerpt: '从架构层面理解 RSC 的设计哲学与实现原理，探索服务端渲染的新范式', tags: ['React', 'Next.js', 'RSC'], color: '#d4a574' },
  { id: 2, title: 'WebGL 着色器艺术', category: 'Creative', date: '2024.02', excerpt: '用代码创造视觉奇迹，探索 GPU 编程的无限可能与实时渲染技术', tags: ['WebGL', 'GLSL', 'Three.js'], color: '#8b7355' },
  { id: 3, title: '构建设计系统的方法论', category: 'Design', date: '2024.01', excerpt: '从零到一搭建可扩展的组件库与设计语言，打造一致的用户体验', tags: ['Design System', 'Figma', 'Token'], color: '#a0845c' },
  { id: 4, title: '微前端架构实践', category: 'Architecture', date: '2023.12', excerpt: '大型项目的模块化解决方案与工程化思考，应对复杂业务场景', tags: ['Micro Frontend', 'Module Federation'], color: '#c4956a' },
  { id: 5, title: 'CSS Houdini 与自定义布局', category: 'CSS', date: '2023.11', excerpt: '突破浏览器限制，实现前所未有的布局效果与自定义渲染', tags: ['CSS', 'Houdini', 'Paint API'], color: '#9e8462' },
  { id: 6, title: '动效设计的工程化', category: 'Animation', date: '2023.10', excerpt: '让动画不再只是装饰，而是用户体验的核心驱动力', tags: ['GSAP', 'Framer Motion', 'Lottie'], color: '#b89070' },
  { id: 7, title: 'TypeScript 高级类型体操', category: 'TypeScript', date: '2023.09', excerpt: '深入条件类型、映射类型与模板字面量类型的实战应用', tags: ['TypeScript', '泛型', '类型系统'], color: '#d4a574' },
  { id: 8, title: '性能优化完全指南', category: 'Performance', date: '2023.08', excerpt: '从加载速度到运行时性能，全面提升用户体验的关键策略', tags: ['Core Web Vitals', 'Lighthouse', '优化'], color: '#8b7355' },
];

const skills = [
  { name: 'React / Next.js', level: 95, desc: '组件架构、状态管理、SSR/SSG' },
  { name: 'TypeScript', level: 92, desc: '高级类型、类型体操、工程化' },
  { name: 'CSS / Tailwind', level: 90, desc: '响应式设计、动画、设计系统' },
  { name: 'Node.js', level: 85, desc: 'API 设计、数据库、部署' },
  { name: 'WebGL / Three.js', level: 78, desc: '3D 可视化、着色器、GPU 编程' },
  { name: 'DevOps', level: 75, desc: 'CI/CD、Docker、云服务' },
];

const techStack = [
  { name: 'React', icon: '⚛️', desc: '用户界面库' },
  { name: 'TypeScript', icon: '📘', desc: '类型安全' },
  { name: 'Next.js', icon: '▲', desc: '全栈框架' },
  { name: 'Tailwind', icon: '🎨', desc: '原子化 CSS' },
  { name: 'GSAP', icon: '🎬', desc: '动画引擎' },
  { name: 'Three.js', icon: '🧊', desc: '3D 渲染' },
  { name: 'Node.js', icon: '🟢', desc: '运行时' },
  { name: 'PostgreSQL', icon: '🐘', desc: '数据库' },
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e4de] overflow-x-hidden">
      <SplashCursor RAINBOW_MODE={false} COLOR="#d4a574" SHADING={true} SPLAT_FORCE={6000} />
      <TargetCursor targetSelector=".cursor-target" />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100]">
        <div className="h-full bg-[#d4a574] transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
        <GooeyNav items={navItems} initialActiveIndex={0} onNavigate={handleNav} />
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <LightPillar
          topColor="#d4a574"
          bottomColor="#8b7355"
          intensity={0.8}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={15}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        />

        <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="font-mono text-xs tracking-[0.4em] text-[#6b6560] uppercase">Frontend Developer & Creative Coder</span>
          </div>

          <h1 className="font-serif text-7xl md:text-9xl font-bold leading-[0.85] tracking-tight mb-8">
            <BlurText text="创造" animateBy="characters" direction="top" delay={150} className="inline-block" />
            <br />
            <BlurText text="数字体验" animateBy="characters" direction="top" delay={150} className="inline-block text-[#d4a574] italic" />
          </h1>

          <div className="max-w-xl mx-auto mb-12">
            <ScrollReveal enableBlur blurStrength={3} baseOpacity={0.2}>
              探索代码与设计的交汇处，构建有温度的用户界面。三年前端开发经验，专注于高性能、高质量的交互体验。
            </ScrollReveal>
          </div>

          <div className="flex items-center justify-center gap-8">
            <a href="#works" className="group relative px-8 py-4 border border-[#e8e4de]/20 hover:border-[#d4a574] transition-all duration-500 overflow-hidden">
              <span className="relative z-10 font-mono text-sm tracking-wider">探索作品</span>
              <div className="absolute inset-0 bg-[#d4a574] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </a>
            <a href="#about" className="font-mono text-sm text-[#6b6560] hover:text-[#e8e4de] transition-colors duration-300">
              了解更多 →
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] text-[#6b6560] tracking-[0.3em]">SCROLL</span>
          <div className="w-px h-16 bg-gradient-to-b from-[#d4a574]/50 to-transparent" />
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-32 px-8 relative">
        <LaserFlow color="#d4a574" speed={0.3} lineCount={15} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16">
            <span className="font-mono text-xs tracking-[0.4em] text-[#6b6560] uppercase block mb-4">Selected Works</span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold">
              <ScrollReveal enableBlur blurStrength={2}>精选文章</ScrollReveal>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <ShapeBlur key={post.id} blurAmount={6} className="group">
                <GlassSurface width="100%" height="auto" borderRadius={16} brightness={15} opacity={0.8} blur={8} backgroundOpacity={0.05} className="!w-full !h-auto">
                  <div className="p-8 text-left w-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: post.color }} />
                        <span className="font-mono text-xs tracking-wider text-[#6b6560]">{post.category}</span>
                      </div>
                      <span className="font-mono text-xs text-[#6b6560]">{post.date}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-3 group-hover:text-[#d4a574] transition-colors">{post.title}</h3>
                    <p className="font-mono text-sm text-[#6b6560] leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-[10px] font-mono border border-[#e8e4de]/10 text-[#6b6560]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </GlassSurface>
              </ShapeBlur>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-32 px-8 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="font-mono text-xs tracking-[0.4em] text-[#6b6560] uppercase block mb-4">Tech Stack</span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold">
              <ScrollReveal enableBlur blurStrength={2}>技术栈</ScrollReveal>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <GlassSurface key={tech.name} width="100%" height={120} borderRadius={12} brightness={12} opacity={0.7} blur={6} backgroundOpacity={0.03} className="!w-full cursor-target">
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <div className="font-mono text-sm font-medium">{tech.name}</div>
                  <div className="font-mono text-[10px] text-[#6b6560] mt-1">{tech.desc}</div>
                </div>
              </GlassSurface>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-xs tracking-[0.4em] text-[#6b6560] uppercase block mb-4">About Me</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8">
                <ScrollReveal enableBlur blurStrength={2}>关于我</ScrollReveal>
              </h2>
              <div className="space-y-4 font-mono text-sm text-[#6b6560] leading-relaxed">
                <ScrollReveal enableBlur blurStrength={2}>三年前端开发经验，专注于构建高性能、高质量的用户界面。</ScrollReveal>
                <ScrollReveal enableBlur blurStrength={2}>相信好的代码应该像好的设计一样——简洁、优雅、有意义。</ScrollReveal>
                <ScrollReveal enableBlur blurStrength={2}>热衷于探索前端技术的边界，从 WebGL 可视化到动画系统，从组件库设计到工程化实践。</ScrollReveal>
              </div>
              <div className="mt-8 flex items-center gap-6">
                {['GitHub', 'LinkedIn', 'Twitter'].map((item) => (
                  <a key={item} href="#" className="font-mono text-xs tracking-wider text-[#6b6560] hover:text-[#d4a574] transition-colors duration-300">{item}</a>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-xs tracking-[0.4em] text-[#6b6560] uppercase block mb-8">Skills</span>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-mono text-sm">{skill.name}</span>
                        <span className="font-mono text-[10px] text-[#6b6560] ml-2">{skill.desc}</span>
                      </div>
                      <span className="font-mono text-xs text-[#d4a574]">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] bg-[#e8e4de]/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#d4a574] to-[#8b7355] rounded-full"
                        style={{ width: `${skill.level}%`, transition: `width 1s ease ${index * 0.1}s` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6">
                {[
                  { number: '50+', label: '个项目' },
                  { number: '3', label: '年经验' },
                  { number: '10+', label: '个开源' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-serif text-3xl font-bold text-[#d4a574] mb-1">{stat.number}</div>
                    <div className="font-mono text-[10px] text-[#6b6560]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-[#e8e4de]/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-mono text-xs text-[#6b6560]">© 2024 前端工程师</span>
          <div className="flex items-center gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a574] animate-pulse" />
            <span className="font-mono text-xs text-[#6b6560]">Built with React & ReactBits</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
