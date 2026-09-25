import { motion } from 'framer-motion';
import { memo } from 'react';

interface AstronautProps {
  className?: string;
}

/**
 * A refined, professional astronaut mascot with soft gradient shading and
 * smooth, subtle motion. Premium palette: platinum suit, champagne-gold and
 * indigo accents, obsidian visor. Reduced-motion safe via CSS.
 */
function Astronaut({ className }: AstronautProps): React.ReactElement {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      aria-hidden='true'
    >
      <div className='astronaut-float'>
        <svg
          viewBox='0 0 240 260'
          className='h-40 w-40 sm:h-52 sm:w-52'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            {/* Suit body — soft platinum with depth */}
            <linearGradient id='suit' x1='0.2' y1='0' x2='0.8' y2='1'>
              <stop offset='0%' stopColor='#ffffff' />
              <stop offset='45%' stopColor='#eef0f6' />
              <stop offset='100%' stopColor='#c3c7d6' />
            </linearGradient>
            {/* Limb shading */}
            <linearGradient id='limb' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0%' stopColor='#d9dce8' />
              <stop offset='50%' stopColor='#f4f6fb' />
              <stop offset='100%' stopColor='#c3c7d6' />
            </linearGradient>
            {/* Helmet glass — obsidian with indigo sheen */}
            <radialGradient id='visor' cx='38%' cy='32%' r='75%'>
              <stop offset='0%' stopColor='#3a3f66' />
              <stop offset='45%' stopColor='#1a1b2b' />
              <stop offset='100%' stopColor='#0a0a12' />
            </radialGradient>
            {/* Helmet rim */}
            <linearGradient id='rim' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#ffffff' />
              <stop offset='100%' stopColor='#c3c7d6' />
            </linearGradient>
            {/* Champagne gold accent */}
            <linearGradient id='gold' x1='0' y1='0' x2='1' y2='1'>
              <stop offset='0%' stopColor='#e8c988' />
              <stop offset='100%' stopColor='#c99b52' />
            </linearGradient>
            {/* Backpack */}
            <linearGradient id='pack' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#b8bccb' />
              <stop offset='100%' stopColor='#8b8fa3' />
            </linearGradient>
            {/* Soft drop shadow */}
            <filter id='soft' x='-30%' y='-30%' width='160%' height='160%'>
              <feDropShadow
                dx='0'
                dy='4'
                stdDeviation='5'
                floodColor='#000000'
                floodOpacity='0.25'
              />
            </filter>
          </defs>

          <g filter='url(#soft)'>
            {/* Backpack */}
            <rect
              x='84'
              y='96'
              width='72'
              height='72'
              rx='22'
              fill='url(#pack)'
            />
            <rect
              x='96'
              y='108'
              width='48'
              height='10'
              rx='5'
              fill='url(#gold)'
            />

            {/* Left arm */}
            <rect
              x='58'
              y='108'
              width='26'
              height='58'
              rx='13'
              fill='url(#limb)'
            />
            <circle cx='71' cy='168' r='15' fill='url(#suit)' />

            {/* Right arm — subtle wave */}
            <g
              className='astronaut-wave'
              style={{ transformOrigin: '162px 116px' }}
            >
              <rect
                x='156'
                y='86'
                width='26'
                height='56'
                rx='13'
                fill='url(#limb)'
              />
              <circle cx='169' cy='84' r='15' fill='url(#suit)' />
            </g>

            {/* Legs */}
            <rect
              x='96'
              y='182'
              width='22'
              height='50'
              rx='11'
              fill='url(#limb)'
            />
            <rect
              x='122'
              y='182'
              width='22'
              height='50'
              rx='11'
              fill='url(#limb)'
            />
            {/* Boots */}
            <path
              d='M94 224 h26 a6 6 0 0 1 6 6 v6 a6 6 0 0 1 -6 6 h-32 a4 4 0 0 1 -4 -4 v-6 z'
              fill='url(#gold)'
            />
            <path
              d='M120 224 h26 a4 4 0 0 1 4 4 v8 a6 6 0 0 1 -6 6 h-24 a6 6 0 0 1 -6 -6 v-6 a6 6 0 0 1 6 -6 z'
              fill='url(#gold)'
            />

            {/* Torso */}
            <rect
              x='86'
              y='104'
              width='68'
              height='86'
              rx='30'
              fill='url(#suit)'
            />
            {/* Chest panel */}
            <rect
              x='102'
              y='126'
              width='36'
              height='26'
              rx='8'
              fill='#12121a'
            />
            <circle cx='111' cy='139' r='3.5' fill='#d4af6a' />
            <circle cx='123' cy='139' r='3.5' fill='#818cf8' />
            <rect
              x='102'
              y='158'
              width='36'
              height='6'
              rx='3'
              fill='url(#gold)'
            />

            {/* Helmet outer rim */}
            <circle cx='120' cy='66' r='50' fill='url(#rim)' />
            {/* Visor glass */}
            <circle cx='120' cy='66' r='40' fill='url(#visor)' />
            {/* Visor primary reflection (twinkle) */}
            <ellipse
              cx='104'
              cy='50'
              rx='13'
              ry='9'
              fill='#ffffff'
              opacity='0.9'
              className='astronaut-glint'
            />
            {/* Secondary reflection */}
            <ellipse
              cx='134'
              cy='80'
              rx='5'
              ry='4'
              fill='#818cf8'
              opacity='0.55'
            />
            {/* Gold brow accent */}
            <path
              d='M78 58 A50 50 0 0 1 162 58'
              fill='none'
              stroke='url(#gold)'
              strokeWidth='5'
              strokeLinecap='round'
            />
          </g>
        </svg>

        {/* Orbiting accent star */}
        <span className='astronaut-orbit' aria-hidden='true'>
          <span className='astronaut-orbit-star' />
        </span>
      </div>
    </motion.div>
  );
}

export default memo(Astronaut);
