"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { ArrowRight, BarChart3, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { NavHeader } from "@/components/nav-header"
import { Footer } from "@/components/footer"

const FeatureCard = ({ icon: Icon, title, description, delay = 0, color = "#a855f7" }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className="h-full transition-all duration-300 group-hover:shadow-xl border-2 group-hover:border-purple-400 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm">
        <CardHeader>
          <div
            className="p-2 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-2"
            style={{ color }}
          >
            <Icon className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="ghost" className="p-0 group-hover:text-purple-600 dark:group-hover:text-purple-400">
            Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function Home() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <div className="min-h-screen flex flex-col">
      <NavHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-900 to-purple-700 text-white py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6"
            >
              Predict Customer Churn with Confidence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-purple-100 mb-10"
            >
              Our advanced analytics platform helps you identify at-risk customers before they leave, so you can take
              action and improve retention.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                <Link href="/predict">Try It Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-purple-800">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Churn Prediction Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides everything you need to understand and reduce customer churn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={BarChart3}
              title="Advanced Analytics"
              description="Get detailed insights into churn patterns and customer behavior with our advanced analytics dashboard."
              delay={0.1}
              color="#f472b6"
            />
            <FeatureCard
              icon={Users}
              title="Customer Segmentation"
              description="Identify high-risk customer segments and understand the factors driving churn in each group."
              delay={0.2}
              color="#3b82f6"
            />
            <FeatureCard
              icon={Shield}
              title="Proactive Retention"
              description="Take action before customers leave with personalized retention strategies and recommendations."
              delay={0.3}
              color="#22c55e"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our simple three-step process makes it easy to predict and prevent customer churn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Customer Data</h3>
              <p className="text-muted-foreground">
                Enter key customer attributes like contract type, services, and payment history.
              </p>
            </motion.div>

            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
              }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Predictions</h3>
              <p className="text-muted-foreground">
                Our AI model analyzes the data and provides accurate churn probability predictions.
              </p>
            </motion.div>

            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } },
              }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Take Action</h3>
              <p className="text-muted-foreground">
                Use our recommendations to implement targeted retention strategies and reduce churn.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Reduce Customer Churn?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Start predicting customer churn today and take proactive steps to improve retention.
            </p>
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
              <Link href="/predict">Get Started Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
