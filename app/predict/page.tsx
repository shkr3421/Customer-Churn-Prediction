"use client"

import { NavHeader } from "@/components/nav-header"
import { Footer } from "@/components/footer"
import ChurnPredictionForm from "@/components/churn-prediction-form"

export default function PredictPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavHeader />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Predict Customer Churn</h1>
            <p className="text-muted-foreground">
              Enter customer details below to get an instant churn prediction and risk assessment.
            </p>
          </div>
          <ChurnPredictionForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
