import { Link } from 'react-router-dom';
import { BlurText, ScrollReveal } from '../components/reactbits';

const About = () => {
  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'CSS/SCSS', level: 92 },
    { name: 'WebGL', level: 75 },
    { name: 'Figma', level: 80 },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-ink/10">
        <Link to="/" className="font-mono text-sm tracking-widest text-muted hover:text-ink transition-colors">
          ← 返回
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/" className="font-mono text-sm text-muted hover:text-ink transition-colors">首页</Link>
          <Link to="/works" className="font-mono text-sm text-muted hover:text-ink transition-colors">作品</Link>
          <Link to="/about" className="font-mono text-sm text-ink">关于</Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-muted uppercase block mb-4">
              About Me
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-8">
              <BlurText
                text="关于我"
                animateBy="characters"
                direction="top"
                delay={100}
              />
            </h1>

            <div className="space-y-6 font-mono text-sm text-muted leading-relaxed">
              <ScrollReveal enableBlur blurStrength={2}>
                三年前端开发经验，专注于构建高性能、高质量的用户界面。
              </ScrollReveal>
              <ScrollReveal enableBlur blurStrength={2}>
                相信好的代码应该像好的设计一样——简洁、优雅、有意义。
              </ScrollReveal>
              <ScrollReveal enableBlur blurStrength={2}>
                热衷于探索前端技术的边界，从 WebGL 可视化到动画系统，从组件库设计到工程化实践。
              </ScrollReveal>
            </div>

            <div className="mt-12 flex items-center gap-8">
              {['GitHub', 'LinkedIn', 'Twitter'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-mono text-xs tracking-wider text-muted hover:text-accent transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-muted uppercase block mb-8">
              Technical Skills
            </span>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <ScrollReveal enableBlur blurStrength={1}>
                      {skill.name}
                    </ScrollReveal>
                    <span className="font-mono text-xs text-muted">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-px bg-ink/10 relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-accent transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        transitionDelay: `${index * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8">
              {[
                { number: '50+', label: '个项目' },
                { number: '3', label: '年经验' },
                { number: '10+', label: '个开源' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-3xl font-bold text-accent mb-1">
                    {stat.number}
                  </div>
                  <div className="font-mono text-xs text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
