import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  lastModified: string;
}

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showFireworks, setShowFireworks] = useState(true);

  // 模拟项目数据
  const projects: Project[] = [
    { id: '1', name: '智能体交互实验', lastModified: '2024-10-08 14:30' },
    { id: '2', name: '群体决策模拟', lastModified: '2024-10-07 09:15' },
    { id: '3', name: '社会网络分析', lastModified: '2024-10-05 16:45' },
  ];

  const handleNewProject = () => {
    navigate('/dashboard');
  };

  const handleOpenProject = (projectId: string) => {
    console.log('打开项目:', projectId);
    navigate('/dashboard');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
    }[] = [];
    const fireworks: {
      x: number;
      y: number;
      targetY: number;
      velocity: number;
      particles: any[];
    }[] = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const targetY = (Math.random() * canvas.height) / 2;
      fireworks.push({ x, y, targetY, velocity: -15, particles: [] });
    };

    const createParticles = (x: number, y: number) => {
      const particleCount = 100;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        fireworks[fireworks.length - 1].particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2 + 1,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
          alpha: 1,
        });
      }
    };

    let fireworkInterval: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1000})`;
            ctx.stroke();
          }
        }
      });

      if (showFireworks) {
        fireworks.forEach((firework, index) => {
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
          ctx.fill();

          firework.y += firework.velocity;
          firework.velocity += 0.2;

          if (firework.y <= firework.targetY) {
            createParticles(firework.x, firework.y);
            fireworks.splice(index, 1);
          }

          firework.particles.forEach((particle: any, particleIndex: number) => {
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.alpha;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1;
            particle.alpha -= 0.01;

            if (particle.alpha <= 0) {
              firework.particles.splice(particleIndex, 1);
            }
          });
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    if (showFireworks) {
      createFirework();
      fireworkInterval = window.setInterval(createFirework, 1000);
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(fireworkInterval);
    };
  }, [showFireworks]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFireworks(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="relative z-10 max-w-4xl mx-auto p-8">
        {showFireworks && (
          <div className="text-center mb-8 text-3xl font-bold text-indigo-400 animate-pulse">
            登录成功！欢迎回来！
          </div>
        )}
        <h1 className="text-3xl font-bold mb-8">项目历史</h1>
        <button
          onClick={handleNewProject}
          className="mb-6 bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          创建新项目
        </button>
        <div className="bg-gray-800 bg-opacity-50 rounded-lg shadow overflow-hidden backdrop-filter backdrop-blur-lg">
          <table className="min-w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  项目名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  最后修改时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.lastModified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenProject(project.id)}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      打开
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
