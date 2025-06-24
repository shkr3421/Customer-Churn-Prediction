"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface ChurnResultProps {
  percentage: number
  risk: string
}

export function ChurnResult({ percentage, risk }: ChurnResultProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw gauge background
    ctx.beginPath()
    ctx.lineWidth = 20
    ctx.strokeStyle = "#e5e7eb" // gray-200
    ctx.arc(100, 100, 80, Math.PI, 2 * Math.PI)
    ctx.stroke()

    // Calculate end angle based on percentage
    const endAngle = Math.PI + (percentage / 100) * Math.PI

    // Determine color based on risk
    let color
    if (percentage < 30)
      color = "#10b981" // green-500
    else if (percentage < 70)
      color = "#f59e0b" // amber-500
    else color = "#ef4444" // red-500

    // Draw gauge fill
    ctx.beginPath()
    ctx.lineWidth = 20
    ctx.strokeStyle = color
    ctx.arc(100, 100, 80, Math.PI, endAngle)
    ctx.stroke()

    // Draw percentage text
    ctx.font = "bold 24px Arial"
    ctx.fillStyle = "#1f2937" // gray-800
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${percentage.toFixed(1)}%`, 100, 100)

    // Draw label
    ctx.font = "14px Arial"
    ctx.fillStyle = "#6b7280" // gray-500
    ctx.fillText("Churn Risk", 100, 130)
  }, [percentage])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center"
    >
      <h3 className="text-xl font-semibold mb-4">Prediction Results</h3>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <canvas ref={canvasRef} width="200" height="150" className="mb-4 md:mb-0" />

        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            {risk === "High" ? (
              <AlertTriangle className="h-6 w-6 text-red-500" />
            ) : (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
            <h4 className="text-lg font-medium">{risk === "High" ? "High Risk of Churn" : "Low Risk of Churn"}</h4>
          </div>

          <p className="text-gray-600 max-w-md">
            {risk === "High"
              ? "This customer has a high probability of churning. Consider proactive retention strategies such as personalized offers or service upgrades."
              : "This customer is likely to stay. Continue providing excellent service and consider opportunities for upselling or cross-selling."}
          </p>

          <div className="mt-4 p-3 bg-purple-50 border border-purple-100 rounded-lg">
            <h5 className="font-medium text-purple-800 mb-1">Key Factors:</h5>
            <ul className="text-sm text-purple-700">
              {percentage > 50 && (
                <>
                  <li>• Short-term contract increases churn risk</li>
                  <li>• Lack of tech support or security features</li>
                </>
              )}
              {percentage <= 50 && (
                <>
                  <li>• Longer tenure indicates customer loyalty</li>
                  <li>• Multiple services reduce likelihood of churn</li>
                </>
              )}
              <li>• {percentage > 70 ? "High" : "Moderate"} monthly charges relative to services</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
