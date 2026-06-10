import { useRef, useState } from 'react'

export default function Resume() {
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const experienceRef = useRef(null)
  const portfolioRef = useRef(null)
  const contactRef = useRef(null)

  const [openMenu, setOpenMenu] = useState(false)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    setOpenMenu(false)
  }

  const menuItems = [
    {
      label: 'About Me',
      ref: aboutRef
    },
    {
      label: 'Skills',
      ref: skillsRef
    },
    {
      label: 'Experience',
      ref: experienceRef
    },
    {
      label: 'Portfolio',
      ref: portfolioRef
    },
    {
      label: 'Contact',
      ref: contactRef
    }
  ]

  return (
    <main className='bg-[#0f172a] text-white'>
      <div className='flex flex-col md:flex-row'>
        {/* MOBILE HEADER */}
        <div
          className='
            sticky
            top-0
            z-50
            flex
            items-center
            justify-between
            border-b
            border-white/10
            bg-[#111827]/90
            px-6
            py-4
            backdrop-blur
            md:hidden
          '
        >
          <div>
            <h1 className='text-lg font-bold'>
              ĐÀO MINH TIẾN
            </h1>

            <p className='text-sm text-orange-400'>
              Senior Frontend Developer
            </p>
          </div>

          <button
            onClick={() => setOpenMenu(!openMenu)}
            className='
              rounded-xl
              border
              border-white/10
              p-3
            '
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`
            fixed
            left-0
            top-18.25
            z-40
            w-full
            border-b
            border-white/10
            bg-[#111827]
            transition-all
            duration-500
            md:hidden
            ${
    openMenu
      ? 'translate-y-0 opacity-100'
      : '-translate-y-full opacity-0'
    }
          `}
        >
          <ul className='space-y-2 p-6'>
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => scrollToSection(item.ref)}
                  className='
                    w-full
                    rounded-xl
                    border
                    border-white/5
                    bg-white/5
                    px-5
                    py-4
                    text-left
                    transition-all
                    duration-300
                    hover:border-orange-400
                    hover:bg-orange-500/10
                    hover:text-orange-400
                  '
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* SIDEBAR */}
        <aside
          className='
            hidden
            md:sticky
            md:top-0
            md:flex
            md:h-screen
            md:w-[30%]
            md:flex-col
            md:justify-between
            md:border-r
            md:border-white/10
            md:bg-[#111827]
            md:p-10
          '
        >
          <div>
            {/* AVATAR */}
            <div className='flex flex-col items-center text-center'>
              <div
                className='
                  flex
                  h-44
                  w-44
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-orange-400/20
                  bg-orange-500/10
                  text-7xl
                  shadow-[0_0_80px_rgba(249,115,22,0.2)]
                  transition-all
                  duration-500
                  hover:scale-105
                  hover:shadow-[0_0_100px_rgba(249,115,22,0.4)]
                '
              >
                👨‍💻
              </div>

              <h1 className='mt-8 text-4xl font-bold tracking-wide'>
                ĐÀO MINH TIẾN 1
              </h1>

              <p className='mt-3 text-lg text-orange-400'>
                Senior Frontend Developer
              </p>

              <p className='mt-6 max-w-sm leading-7 text-slate-400'>
                Frontend Developer with 10 years of experience
                building scalable and modern web applications.
              </p>
            </div>

            {/* INFO */}
            <div className='mt-14 space-y-5 text-sm text-slate-300'>
              <div className='flex items-center gap-4'>
                <span className='text-orange-400'>📍</span>
                <span>Ho Chi Minh City, Vietnam</span>
              </div>

              <div className='flex items-center gap-4'>
                <span className='text-orange-400'>📅</span>
                <span>25 Jun 1993</span>
              </div>

              <div className='flex items-center gap-4'>
                <span className='text-orange-400'>💻</span>
                <span>10+ Years Experience</span>
              </div>

              <div className='flex items-center gap-4'>
                <span className='text-orange-400'>🌐</span>
                <span>English Communication</span>
              </div>
            </div>

            {/* MENU */}
            <nav className='mt-16'>
              <ul className='space-y-5'>
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => scrollToSection(item.ref)}
                      className='
                        group
                        relative
                        flex
                        w-full
                        items-center
                        gap-4
                        overflow-hidden
                        rounded-xl
                        px-4
                        py-3
                        text-left
                        text-sm
                        uppercase
                        tracking-[0.25em]
                        text-slate-400
                        transition-all
                        duration-500
                        hover:bg-white/5
                        hover:text-orange-400
                        hover:translate-x-2
                      '
                    >
                      <span
                        className='
                          h-[2px]
                          w-8
                          bg-slate-500
                          transition-all
                          duration-500
                          group-hover:w-16
                          group-hover:bg-orange-400
                        '
                      />

                      {item.label}

                      <span
                        className='
                          absolute
                          inset-0
                          -z-10
                          opacity-0
                          transition-all
                          duration-500
                          group-hover:opacity-100
                          bg-gradient-to-r
                          from-orange-500/10
                          to-transparent
                        '
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* SOCIAL */}
          <div className='flex flex-wrap gap-4'>
            <a
              href='https://github.com/tiendm2506'
              target='_blank'
              className='
                rounded-xl
                border
                border-white/10
                px-5
                py-3
                transition-all
                duration-500
                hover:border-orange-400
                hover:bg-orange-500/10
                hover:text-orange-400
              ' rel='noreferrer'
            >
              GitHub
            </a>

            <a
              href='https://demo.minhtien.com'
              target='_blank'
              className='
                rounded-xl
                border
                border-white/10
                px-5
                py-3
                transition-all
                duration-500
                hover:border-orange-400
                hover:bg-orange-500/10
                hover:text-orange-400
              ' rel='noreferrer'
            >
              Portfolio
            </a>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <section className='w-full md:w-[70%]'>
          {/* HERO MOBILE */}
          <section className='border-b border-white/10 px-6 py-20 md:hidden'>
            <div className='flex flex-col items-center text-center'>
              <div
                className='
                  flex
                  h-32
                  w-32
                  items-center
                  justify-center
                  rounded-full
                  bg-orange-500/10
                  text-6xl
                '
              >
                👨‍💻
              </div>

              <h2 className='mt-6 text-3xl font-bold'>
                ĐÀO MINH TIẾN
              </h2>

              <p className='mt-2 text-orange-400'>
                Senior Frontend Developer
              </p>
            </div>
          </section>

          {/* ABOUT */}
          <section
            ref={aboutRef}
            className='border-b border-white/10 px-6 py-20 md:px-20 md:py-28'
          >
            <p className='mb-3 text-sm uppercase tracking-widest text-orange-400'>
              About Me
            </p>

            <h2 className='text-4xl font-bold leading-tight md:text-6xl'>
              Building scalable and modern web applications.
            </h2>

            <p className='mt-10 max-w-4xl leading-8 text-slate-300'>
              I am working as a Frontend Developer with about 10 years
              of experience building scalable web applications.
              Skilled in modern JavaScript frameworks such as React.js
              and Next.js, with a strong focus on clean,
              maintainable, and reusable code.
            </p>

            <p className='mt-6 max-w-4xl leading-8 text-slate-300'>
              Experienced in developing responsive user interfaces,
              optimizing application performance, and collaborating
              closely with cross-functional teams to deliver
              high-quality products and seamless user experiences.
            </p>
          </section>

          {/* SKILLS */}
          <section
            ref={skillsRef}
            className='border-b border-white/10 px-6 py-20 md:px-20 md:py-28'
          >
            <p className='mb-3 text-sm uppercase tracking-widest text-orange-400'>
              Skills
            </p>

            <h2 className='text-4xl font-bold md:text-6xl'>
              Technologies I Work With
            </h2>

            <div className='mt-14 flex flex-wrap gap-4'>
              {[
                'HTML',
                'CSS',
                'SCSS',
                'TailwindCSS',
                'JavaScript',
                'TypeScript',
                'ReactJS',
                'NextJS',
                'Redux Toolkit',
                'React Hook Form',
                'NodeJS',
                'ExpressJS',
                'MongoDB',
                'REST API',
                'Git'
              ].map((skill) => (
                <div
                  key={skill}
                  className='
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-3
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-orange-400
                    hover:bg-orange-500/10
                    hover:text-orange-400
                  '
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section
            ref={experienceRef}
            className='border-b border-white/10 px-6 py-20 md:px-20 md:py-28'
          >
            <p className='mb-3 text-sm uppercase tracking-widest text-orange-400'>
              Experience
            </p>

            <h2 className='text-4xl font-bold md:text-6xl'>
              Work Experience
            </h2>

            <div className='mt-16 space-y-16 border-l border-white/10 pl-8 md:pl-10'>
              {/* DREAM VIET */}
              <div className='relative'>
                <div
                  className='
                    absolute
                    -left-[39px]
                    top-2
                    h-4
                    w-4
                    rounded-full
                    bg-orange-400
                    shadow-[0_0_20px_rgba(249,115,22,0.7)]
                  '
                />

                <p className='text-sm text-orange-400'>
                  Jan 2018 - Mar 2026
                </p>

                <h3 className='mt-2 text-2xl font-semibold md:text-3xl'>
                  Dream Viet Education
                </h3>

                <p className='mt-2 text-slate-400'>
                  Front End Web Developer
                </p>

                <ul className='mt-6 space-y-3 leading-7 text-slate-300'>
                  <li>
                    • Developed scalable applications using ReactJS
                    and NextJS
                  </li>

                  <li>
                    • Built reusable UI components and maintainable
                    frontend architecture
                  </li>

                  <li>
                    • Optimized application performance and user
                    experience
                  </li>

                  <li>
                    • Collaborated with backend developers and
                    designers
                  </li>
                </ul>
              </div>

              {/* NAMTECH */}
              <div className='relative'>
                <div
                  className='
                    absolute
                    -left-[39px]
                    top-2
                    h-4
                    w-4
                    rounded-full
                    bg-orange-400
                    shadow-[0_0_20px_rgba(249,115,22,0.7)]
                  '
                />

                <p className='text-sm text-orange-400'>
                  Jun 2016 - Sep 2017
                </p>

                <h3 className='mt-2 text-2xl font-semibold md:text-3xl'>
                  NAMTech
                </h3>

                <p className='mt-2 text-slate-400'>
                  Front End Web Developer
                </p>

                <ul className='mt-6 space-y-3 leading-7 text-slate-300'>
                  <li>
                    • Developed responsive web interfaces
                  </li>

                  <li>
                    • Worked closely with backend developers
                  </li>

                  <li>
                    • Improved UI consistency and maintainability
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* PORTFOLIO */}
          <section
            ref={portfolioRef}
            className='border-b border-white/10 px-6 py-20 md:px-20 md:py-28'
          >
            <p className='mb-3 text-sm uppercase tracking-widest text-orange-400'>
              Portfolio
            </p>

            <h2 className='text-4xl font-bold md:text-6xl'>
              Featured Project
            </h2>

            <div
              className='
                mt-16
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-[#111827]
                transition-all
                duration-500
                hover:border-orange-400
                hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)]
              '
            >
              <div className='h-56 bg-gradient-to-br from-orange-500/20 to-slate-900 md:h-72' />

              <div className='p-6 md:p-10'>
                <h3 className='text-3xl font-semibold'>
                  Coffee Shop Website
                </h3>

                <p className='mt-6 leading-8 text-slate-300'>
                  A full-stack web application built independently
                  using Next.js, TailwindCSS, Node.js, Express.js,
                  and MongoDB.
                </p>

                <div className='mt-8 flex flex-wrap gap-3'>
                  {[
                    'NextJS',
                    'TailwindCSS',
                    'NodeJS',
                    'ExpressJS',
                    'MongoDB'
                  ].map((tech) => (
                    <span
                      key={tech}
                      className='
                        rounded-lg
                        bg-orange-500/10
                        px-4
                        py-2
                        text-sm
                        text-orange-400
                      '
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className='mt-10 flex flex-wrap gap-4'>
                  <a
                    href='https://demo.minhtien.com'
                    target='_blank'
                    className='
                      rounded-xl
                      bg-orange-500
                      px-6
                      py-3
                      font-medium
                      transition-all
                      duration-500
                      hover:scale-105
                      hover:bg-orange-400
                    ' rel='noreferrer'
                  >
                    Live Demo
                  </a>

                  <a
                    href='https://github.com/tiendm2506/coffee_shop_FE'
                    target='_blank'
                    className='
                      rounded-xl
                      border
                      border-white/10
                      px-6
                      py-3
                      transition-all
                      duration-500
                      hover:border-orange-400
                      hover:bg-orange-500/10
                      hover:text-orange-400
                    ' rel='noreferrer'
                  >
                    Frontend GitHub
                  </a>

                  <a
                    href='https://github.com/tiendm2506/coffee_shop_BE'
                    target='_blank'
                    className='
                      rounded-xl
                      border
                      border-white/10
                      px-6
                      py-3
                      transition-all
                      duration-500
                      hover:border-orange-400
                      hover:bg-orange-500/10
                      hover:text-orange-400
                    ' rel='noreferrer'
                  >
                    Backend GitHub
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section
            ref={contactRef}
            className='px-6 py-20 md:px-20 md:py-28'
          >
            <p className='mb-3 text-sm uppercase tracking-widest text-orange-400'>
              Contact
            </p>

            <h2 className='text-4xl font-bold md:text-6xl'>
              Let’s Work Together
            </h2>

            <p className='mt-8 max-w-3xl leading-8 text-slate-300'>
              I’m interested in frontend development opportunities,
              collaborations, and building modern web applications.
            </p>

            <div className='mt-10 flex flex-wrap gap-4'>
              <a
                href='mailto:your-email@gmail.com'
                className='
                  rounded-xl
                  bg-orange-500
                  px-6
                  py-4
                  font-medium
                  transition-all
                  duration-500
                  hover:scale-105
                  hover:bg-orange-400
                '
              >
                Email Me
              </a>

              <a
                href='https://github.com/tiendm2506'
                target='_blank'
                className='
                  rounded-xl
                  border
                  border-white/10
                  px-6
                  py-4
                  transition-all
                  duration-500
                  hover:border-orange-400
                  hover:bg-orange-500/10
                  hover:text-orange-400
                ' rel='noreferrer'
              >
                GitHub
              </a>
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}