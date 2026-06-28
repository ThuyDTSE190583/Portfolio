import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaJava, FaGitAlt, FaDocker } from 'react-icons/fa';
import { SiPostgresql } from 'react-icons/si';
import avatarImg from '../../assets/avatar/avatar.jpg';

const OrbitingAvatar = () => {
  const icons = [
    { id: 'react', Icon: FaReact, color: '#61DAFB' },
    { id: 'node', Icon: FaNodeJs, color: '#339933' },
    { id: 'java', Icon: FaJava, color: '#007396' },
    { id: 'git', Icon: FaGitAlt, color: '#F05032' },
    { id: 'docker', Icon: FaDocker, color: '#2496ED' },
    { id: 'postgres', Icon: SiPostgresql, color: '#336791' },
  ];

  const radius = 180; // Orbit radius distance

  return (
    <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] flex items-center justify-center">
      
      {/* Outer Orbit Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-white/5 border-t-primary/30"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 rounded-full border border-white/5 border-b-blue-400/30"
      />

      {/* Orbiting Tech Icons */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-20"
      >
        {icons.map((item, index) => {
          const angle = (index * (360 / icons.length)) * (Math.PI / 180);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <motion.div
              key={item.id}
              className="absolute w-14 h-14 bg-card/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              style={{
                left: `calc(50% + ${x}px - 28px)`,
                top: `calc(50% + ${y}px - 28px)`,
              }}
              // Counter-rotate to keep icons upright
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <item.Icon size={26} color={item.color} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Center Avatar with Glow & Floating Animation */}
      <motion.div 
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-64 h-64 md:w-80 md:h-80 z-10"
      >
        {/* Glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-primary via-blue-500 to-purple-600 rounded-full blur-2xl opacity-40 animate-pulse duration-[4000ms]"></div>
        
        {/* Blue glowing border & Soft shadow */}
        <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-b from-blue-400 to-primary shadow-[0_0_30px_rgba(37,99,235,0.4)]">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-background bg-card">
            <img 
              src={avatarImg} 
              alt="Do Thanh Thuy Avatar" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrbitingAvatar;
