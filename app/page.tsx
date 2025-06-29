"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight, 
  Mail, 
  MapPin, 
  Phone, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Github,
  Users,
  Code,
  Rocket,
  Heart,
  Star,
  CheckCircle,
  Globe,
  Zap,
  Laptop,
  Handshake,
  Brain
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Logo, LogoIcon } from "@/components/ui/logo"

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none">
            {author.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm text-muted-foreground">
        {text}
      </p>
    </Card>
  )
}

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-12 sm:py-24 md:py-32 px-4",
      className
    )}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  )
}

interface Dot {
  x: number;
  y: number;
  baseColor: string;
  targetOpacity: number;
  currentOpacity: number;
  opacitySpeed: number;
  baseRadius: number;
  currentRadius: number;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

function OpenCompanyLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)
  const dotsRef = useRef<Dot[]>([])
  const gridRef = useRef<Record<string, number[]>>({})
  const canvasSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 })
  const mousePositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })

  const { scrollY: motionScrollY } = useScroll()
  
  useMotionValueEvent(motionScrollY, "change", (latest) => {
    setScrollY(latest)
  })

  const DOT_SPACING = 25
  const BASE_OPACITY_MIN = 0.40
  const BASE_OPACITY_MAX = 0.50
  const BASE_RADIUS = 1
  const INTERACTION_RADIUS = 150
  const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS
  const OPACITY_BOOST = 0.6
  const RADIUS_BOOST = 2.5
  const GRID_CELL_SIZE = Math.max(50, Math.floor(INTERACTION_RADIUS / 1.5))

  const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) {
      mousePositionRef.current = { x: null, y: null }
      return
    }
    const rect = canvas.getBoundingClientRect()
    const canvasX = event.clientX - rect.left
    const canvasY = event.clientY - rect.top
    mousePositionRef.current = { x: canvasX, y: canvasY }
  }, [])

  const createDots = useCallback(() => {
    const { width, height } = canvasSizeRef.current
    if (width === 0 || height === 0) return

    const newDots: Dot[] = []
    const newGrid: Record<string, number[]> = {}
    const cols = Math.ceil(width / DOT_SPACING)
    const rows = Math.ceil(height / DOT_SPACING)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * DOT_SPACING + DOT_SPACING / 2
        const y = j * DOT_SPACING + DOT_SPACING / 2
        const cellX = Math.floor(x / GRID_CELL_SIZE)
        const cellY = Math.floor(y / GRID_CELL_SIZE)
        const cellKey = `${cellX}_${cellY}`

        if (!newGrid[cellKey]) {
          newGrid[cellKey] = []
        }

        const dotIndex = newDots.length
        newGrid[cellKey].push(dotIndex)

        const baseOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN
        newDots.push({
          x,
          y,
          baseColor: `rgba(56, 189, 248, ${BASE_OPACITY_MAX})`,
          targetOpacity: baseOpacity,
          currentOpacity: baseOpacity,
          opacitySpeed: (Math.random() * 0.005) + 0.002,
          baseRadius: BASE_RADIUS,
          currentRadius: BASE_RADIUS,
        })
      }
    }
    dotsRef.current = newDots
    gridRef.current = newGrid
  }, [DOT_SPACING, GRID_CELL_SIZE, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const container = canvas.parentElement
    const width = container ? container.clientWidth : window.innerWidth
    const height = container ? container.clientHeight : window.innerHeight

    if (canvas.width !== width || canvas.height !== height ||
        canvasSizeRef.current.width !== width || canvasSizeRef.current.height !== height)
    {
      canvas.width = width
      canvas.height = height
      canvasSizeRef.current = { width, height }
      createDots()
    }
  }, [createDots])

  const animateDots = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const dots = dotsRef.current
    const grid = gridRef.current
    const { width, height } = canvasSizeRef.current
    const { x: mouseX, y: mouseY } = mousePositionRef.current

    if (!ctx || !dots || !grid || width === 0 || height === 0) {
      animationFrameId.current = requestAnimationFrame(animateDots)
      return
    }

    ctx.clearRect(0, 0, width, height)

    const activeDotIndices = new Set<number>()
    if (mouseX !== null && mouseY !== null) {
      const mouseCellX = Math.floor(mouseX / GRID_CELL_SIZE)
      const mouseCellY = Math.floor(mouseY / GRID_CELL_SIZE)
      const searchRadius = Math.ceil(INTERACTION_RADIUS / GRID_CELL_SIZE)
      for (let i = -searchRadius; i <= searchRadius; i++) {
        for (let j = -searchRadius; j <= searchRadius; j++) {
          const checkCellX = mouseCellX + i
          const checkCellY = mouseCellY + j
          const cellKey = `${checkCellX}_${checkCellY}`
          if (grid[cellKey]) {
            grid[cellKey].forEach(dotIndex => activeDotIndices.add(dotIndex))
          }
        }
      }
    }

    dots.forEach((dot, index) => {
      dot.currentOpacity += dot.opacitySpeed
      if (dot.currentOpacity >= dot.targetOpacity || dot.currentOpacity <= BASE_OPACITY_MIN) {
        dot.opacitySpeed = -dot.opacitySpeed
        dot.currentOpacity = Math.max(BASE_OPACITY_MIN, Math.min(dot.currentOpacity, BASE_OPACITY_MAX))
        dot.targetOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN
      }

      let interactionFactor = 0
      dot.currentRadius = dot.baseRadius

      if (mouseX !== null && mouseY !== null && activeDotIndices.has(index)) {
        const dx = dot.x - mouseX
        const dy = dot.y - mouseY
        const distSq = dx * dx + dy * dy

        if (distSq < INTERACTION_RADIUS_SQ) {
          const distance = Math.sqrt(distSq)
          interactionFactor = Math.max(0, 1 - distance / INTERACTION_RADIUS)
          interactionFactor = interactionFactor * interactionFactor
        }
      }

      const finalOpacity = Math.min(1, dot.currentOpacity + interactionFactor * OPACITY_BOOST)
      dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST

      ctx.beginPath()
      ctx.fillStyle = `rgba(56, 189, 248, ${finalOpacity.toFixed(3)})`
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2)
      ctx.fill()
    })

    animationFrameId.current = requestAnimationFrame(animateDots)
  }, [GRID_CELL_SIZE, INTERACTION_RADIUS, INTERACTION_RADIUS_SQ, OPACITY_BOOST, RADIUS_BOOST, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS])

  useEffect(() => {
    handleResize()
    const handleMouseLeave = () => {
      mousePositionRef.current = { x: null, y: null }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    animationFrameId.current = requestAnimationFrame(animateDots)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [handleResize, handleMouseMove, animateDots])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const testimonials = [
    {
      author: {
        name: "Sarah Chen",
        handle: "@sarahdev",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: "The Open Company connected me with amazing projects. I've learned more in 3 months than in my entire bootcamp!",
      href: "https://twitter.com/sarahdev"
    },
    {
      author: {
        name: "Marcus Johnson",
        handle: "@marcustech",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: "As a student, finding real projects to contribute to was challenging. The Open Company made it seamless and rewarding.",
      href: "https://twitter.com/marcustech"
    },
    {
      author: {
        name: "Priya Patel",
        handle: "@priyacodes",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: "The community at The Open Company is incredibly supportive. Perfect place for developers to grow and make an impact."
    },
    {
      author: {
        name: "Alex Rodriguez",
        handle: "@alexbuilds",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      text: "From fresher to contributor - The Open Company helped me build my portfolio and land my dream job in tech."
    },
    {
      author: {
        name: "Emily Zhang",
        handle: "@emilycode",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      text: "The mentorship and real-world experience I gained through The Open Company was invaluable for my career growth."
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground relative overflow-x-hidden">
      {/* Interactive Background */}
      <div className="fixed inset-0 z-0">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/95 to-background/90" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md",
          scrollY > 50 ? "shadow-md bg-background/95" : ""
        )}
      >
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6">
          <Logo size="md" />

          <nav className="hidden md:flex gap-6">
            <a href="#about" className="text-sm font-medium transition-colors hover:text-cyan-400">
              About
            </a>
            <a href="#projects" className="text-sm font-medium transition-colors hover:text-cyan-400">
              Projects
            </a>
            <a href="#community" className="text-sm font-medium transition-colors hover:text-cyan-400">
              Community
            </a>
            <a href="#contact" className="text-sm font-medium transition-colors hover:text-cyan-400">
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-background">
              Sign In
            </Button>
            <Button size="sm" className="rounded-full bg-cyan-500 hover:bg-cyan-600">
              Get Involved
            </Button>
          </div>

          <button className="flex md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
              <Logo size="sm" />
              <button onClick={toggleMenu}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-7xl grid gap-4 pb-8 pt-6 px-4"
            >
              {["About", "Projects", "Community", "Contact"].map((item, index) => (
                <motion.div key={index} variants={itemFadeIn}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-lg font-medium hover:bg-muted"
                    onClick={toggleMenu}
                  >
                    {item}
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </motion.div>
              ))}
              <motion.div variants={itemFadeIn} className="flex flex-col gap-3 pt-4">
                <Button variant="outline" className="w-full rounded-full border-cyan-400 text-cyan-400">
                  Sign In
                </Button>
                <Button className="w-full rounded-full bg-cyan-500 hover:bg-cyan-600">
                  Get Involved
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col items-center space-y-8 text-center"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 text-sm text-cyan-400"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Empowering Developers Worldwide
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white"
                >
                  Empowering Developers,{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Transforming Communities
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="max-w-[700px] text-muted-foreground md:text-xl mx-auto"
                >
                  Join a community of tech enthusiasts building real-world solutions and creating opportunities for growth. 
                  Unite with developers, students, and freshers to make a meaningful impact through technology.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <Button size="lg" className="rounded-full bg-cyan-500 hover:bg-cyan-600 group">
                  Get Involved
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-background">
                  Explore Projects
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="flex items-center gap-8 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-cyan-400" />
                  <span>200+ Volunteers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-cyan-400" />
                  <span>50+ Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-cyan-400" />
                  <span>Global Impact</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mx-auto max-w-7xl px-4 md:px-6"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-sm text-cyan-400"
                >
                  Who We Are
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white"
                >
                  Building the Future Together
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto max-w-[900px] text-muted-foreground md:text-xl"
                >
                  The Open Company is a nonprofit uniting developers, students, and freshers to work on impactful projects while fostering learning and professional growth.
                </motion.p>
              </div>
            </div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3"
            >
              {[
                {
                  icon: <Laptop className="h-8 w-8 text-cyan-400" />,
                  title: "Real Projects",
                  description: "Work on meaningful projects that make a real difference in communities worldwide."
                },
                {
                  icon: <Handshake className="h-8 w-8 text-cyan-400" />,
                  title: "Networking",
                  description: "Connect with like-minded developers, mentors, and industry professionals."
                },
                {
                  icon: <Brain className="h-8 w-8 text-cyan-400" />,
                  title: "Skill Growth",
                  description: "Develop technical and soft skills through hands-on collaboration and mentorship."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-lg border border-border bg-muted/20 backdrop-blur-sm p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="space-y-4 text-center">
                    <div className="mx-auto w-fit rounded-full bg-cyan-500/20 p-3">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Impact Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mx-auto max-w-7xl px-4 md:px-6"
          >
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-block rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-sm text-cyan-400">
                  Our Impact
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Making a Difference Through Technology
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Our community has achieved remarkable milestones in empowering developers and creating positive change through collaborative technology projects.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-cyan-400" />
                      <span className="font-medium text-white">Open Source Focus</span>
                    </div>
                    <p className="text-sm text-muted-foreground">All projects are open source and community-driven</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-cyan-400" />
                      <span className="font-medium text-white">Mentorship</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Learn from experienced developers and industry experts</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-cyan-400" />
                      <span className="font-medium text-white">Real Impact</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Work on projects that make a difference in the world</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-cyan-400" />
                      <span className="font-medium text-white">Skill Building</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Develop technical and soft skills through collaboration</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-lg"></div>
                  <div className="relative bg-muted/20 backdrop-blur-sm border border-border rounded-lg p-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">200+</div>
                        <div className="text-sm text-muted-foreground">Volunteers Onboarded</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">50+</div>
                        <div className="text-sm text-muted-foreground">Projects Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">25+</div>
                        <div className="text-sm text-muted-foreground">Countries Reached</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">24/7</div>
                        <div className="text-sm text-muted-foreground">Community Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection
          title="Loved by Developers Worldwide"
          description="See what our community members have to say about their experience with The Open Company"
          testimonials={testimonials}
          className="bg-background"
        />

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-cyan-500/20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mx-auto max-w-7xl px-4 md:px-6"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white"
                >
                  Ready to Make a Difference?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mx-auto max-w-[600px] text-muted-foreground md:text-xl"
                >
                  Join our community and contribute to meaningful projects today. Together, we can build a better future through technology.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button size="lg" className="rounded-full bg-cyan-500 hover:bg-cyan-600 text-lg px-8 py-4">
                    Join Now
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mx-auto max-w-7xl grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-sm text-cyan-400">
                Get in Touch
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                Ready to Join the Movement?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                Whether you want to contribute to existing projects, start your own initiative, or simply learn more about our community, we'd love to hear from you.
              </p>
              <div className="space-y-4">
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3">
                  <div className="rounded-full bg-cyan-500/20 p-2">
                    <Mail className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Email Us</h3>
                    <p className="text-sm text-muted-foreground">contact@theopencompany.co</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3">
                  <div className="rounded-full bg-cyan-500/20 p-2">
                    <Github className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">GitHub</h3>
                    <p className="text-sm text-muted-foreground">github.com/theopencompany</p>
                  </div>
                </motion.div>
              </div>
              <div className="flex space-x-4">
                {[
                  { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                  { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                  { icon: <Github className="h-5 w-5" />, label: "GitHub" },
                ].map((social, index) => (
                  <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <a
                      href="#"
                      className="rounded-full border border-cyan-400/20 p-2 text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                    >
                      {social.icon}
                      <span className="sr-only">{social.label}</span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-lg border border-border bg-muted/20 backdrop-blur-sm p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-white mb-2">Send Us a Message</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Have a project idea or want to get involved? Let's talk!
              </p>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium text-white">
                      First name
                    </label>
                    <Input id="first-name" placeholder="Enter your first name" className="rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium text-white">
                      Last name
                    </label>
                    <Input id="last-name" placeholder="Enter your last name" className="rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" className="rounded-full" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Tell us about your ideas or how you'd like to contribute" className="min-h-[120px] rounded-lg" />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full rounded-full bg-cyan-500 hover:bg-cyan-600">
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-slate-900/95 backdrop-blur-sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mx-auto max-w-7xl grid gap-8 px-4 py-10 md:px-6 lg:grid-cols-4"
        >
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-sm text-gray-300">
              Connecting developers, students, and freshers to build the future through open-source collaboration.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                { icon: <Github className="h-5 w-5" />, label: "GitHub" },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Community</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Join Us
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Contributors
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Code of Conduct
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Events
              </a>
            </nav>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Projects</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Browse Projects
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Submit Project
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Guidelines
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Resources
              </a>
            </nav>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Support</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Documentation
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Help Center
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Contact Us
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>
            </nav>
          </div>
        </motion.div>
        
        <div className="border-t border-gray-700">
          <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0 px-4 md:px-6">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} The Open Company. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">
              Built with ❤️ by the open source community
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default OpenCompanyLandingPage