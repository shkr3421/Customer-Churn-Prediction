"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToForm = () => {
    const formElement = document.getElementById("prediction-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative bg-gradient-to-b from-purple-900 to-purple-700 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="container relative mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Customer Churn Prediction</h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl">
            Predict customer churn with our advanced analytics tool. Input your customer data and get instant insights
            on churn risk.
          </p>
          <div className="mt-10">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100 hover:text-purple-800 transition-all duration-300"
            >
              Try It Now
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-8 w-8 text-white opacity-70" />
      </div>
    </div>
  )
}
