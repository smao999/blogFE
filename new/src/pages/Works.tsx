import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/reactbits';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'React Server Components 深度解析',
    category: 'React',
    date: '2024.03',
    excerpt: '从架构层面理解 RSC 的设计哲学与实现原理',
    tags: ['React', 'Next.js', '性能优化'],
  },
  {
    id: 2,
    title: 'WebGL 着色器艺术',
    category: 'Creative',
    date: '2024.02',
    excerpt: '用代码创造视觉奇迹，探索 GPU 编程的无限可能',
    tags: ['WebGL', 'GLSL', 'Three.js'],
  },
  {
    id: 3,
    title: '构建设计系统的方法论',
    category: 'Design',
    date: '2024.01',
    excerpt: '从零到一搭建可扩展的组件库与设计语言',
    tags: ['Design System', 'Figma', 'Token'],
  },
  {
    id: 4,
    title: '微前端架构实践',
    category: 'Architecture',
    date: '2023.12',
    excerpt: '大型项目的模块化解决方案与工程化思考',
    tags: ['Micro Frontend', 'Module Federation'],
  },
  {
    id: 5,
    title: 'CSS Houdini 与自定义布局',
    category: 'CSS',
    date: '2023.11',
    excerpt: '突破浏览器限制，实现前所未有的布局效果',
    tags: ['CSS', 'Houdini', 'Paint API'],
  },
  {
    id: 6,
    title: '动效设计的工程化',
    category: 'Animation',
    date: '2023.10',
    excerpt: '让动画不再只是装饰，而是用户体验的核心',
    tags: ['GSAP', 'Framer Motion', 'Lottie'],
  },
];

const Works = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-ink/10">
        <Link to="/" className="font-mono text-sm tracking-widest text-muted hover:text-ink transition-colors">
          ← 返回
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/" className="font-mono text-sm text-muted hover:text-ink transition-colors">首页</Link>
          <Link to="/works" className="font-mono text-sm text-ink">作品</Link>
          <Link to="/about" className="font-mono text-sm text-muted hover:text-ink transition-colors">关于</Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        <div className="mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-muted uppercase block mb-4">
            Selected Works
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold">
            精选文章
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group p-8 border border-ink/10 hover:border-accent/50 transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-mono text-xs tracking-wider text-muted">{post.category}</span>
                </div>
                <span className="font-mono text-xs text-muted">{post.date}</span>
              </div>

              <ScrollReveal
                enableBlur={true}
                baseOpacity={0.1}
                blurStrength={4}
                containerClassName="mb-0"
              >
                {post.title}
              </ScrollReveal>

              <p className="font-mono text-sm text-muted leading-relaxed mt-4 mb-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono border border-ink/10 group-hover:border-accent/30 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Works;
