"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: {
      container: 'h-8 w-8',
      text: 'text-lg',
      spacing: 'gap-2'
    },
    md: {
      container: 'h-10 w-10',
      text: 'text-xl md:text-2xl',
      spacing: 'gap-3'
    },
    lg: {
      container: 'h-12 w-12',
      text: 'text-2xl md:text-3xl',
      spacing: 'gap-3'
    },
    xl: {
      container: 'h-16 w-16',
      text: 'text-3xl md:text-4xl',
      spacing: 'gap-4'
    }
  }

  const currentSize = sizeClasses[size]

  return (
    <div className={`flex items-center ${currentSize.spacing} ${className}`}>
      <motion.div
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className={`${currentSize.container} relative rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg`}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
        
        {/* Inner design */}
        <div className="relative flex items-center justify-center">
          {/* Main "O" with geometric elements */}
          <div className="relative">
            {/* Background circle */}
            <div className="absolute inset-0 rounded-full bg-white/10"></div>
            
            {/* Letter "O" */}
            <span className="relative z-10 text-white font-bold text-lg leading-none">
              O
            </span>
            
            {/* Decorative elements */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
          </div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-transparent blur-sm"></div>
      </motion.div>
      
      {showText && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`font-great-vibes ${currentSize.text} text-white relative`}
        >
          The Open Company
          {/* Subtle text shadow for better readability */}
          <span className="absolute inset-0 font-great-vibes text-cyan-400/20 blur-sm">
            The Open Company
          </span>
        </motion.span>
      )}
    </div>
  )
}

// Icon-only version for smaller spaces
export function LogoIcon({ size = 'md', className = '' }: Omit<LogoProps, 'showText'>) {
  return <Logo size={size} showText={false} className={className} />
}