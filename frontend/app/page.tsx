"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Shield,
  Search,
  Filter,
  Send,
  Trash2,
  Brain,
  Zap,
  Github,
  Linkedin,
  User,
  Mail,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Analysis result type
interface AnalysisResult {
  id: string
  texto: string
  toxicity: number
  insult: number
  manipulacion_detectada: boolean
  tipo_manipulacion: string
  timestamp: Date
}

// Mock analysis function (replace with actual API call to your Python backend)
const analyzeText = async (text: string): Promise<Omit<AnalysisResult, "id" | "timestamp">> => {
  const response = await fetch("http://127.0.0.1:8000/analizar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      textos: [text]  // ✅ usa "textos" en lugar de "texts"
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del backend:", errorText);
    throw new Error("Error al analizar el texto");
  }

  const data = await response.json();
  const result = data[0] || data.resultados?.[0];

  return {
    texto: result.texto,
    toxicity: result.toxicity,
    insult: result.insult,
    manipulacion_detectada: result.manipulacion_detectada,
    tipo_manipulacion: result.tipo_manipulacion,
  };
};



// Social Links Component
function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open("https://linkedin.com/in/walter-melendez", "_blank")}
        className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20"
      >
        <Linkedin className="h-4 w-4" />
        LinkedIn
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open("https://github.com/walter-melendez", "_blank")}
        className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20"
      >
        <Github className="h-4 w-4" />
        GitHub
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open("/personal-info", "_blank")}
        className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20"
      >
        <User className="h-4 w-4" />
        About Me
      </Button>
    </div>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="mt-16 border-t border-purple-200 dark:border-purple-700 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/10 dark:to-indigo-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between md:gap-4">
          {/* Developer Info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg">
              <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Developed by{" "}
                <span className="font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Walter Melendez
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI-Powered Text Safety & Manipulation Detection
              </p>
            </div>
          </div>

          {/* Social Links and Contact */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-4">
            {/* Social Links - Mobile: Stack vertically, Desktop: Horizontal */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://linkedin.com/in/walter-melendez", "_blank")}
                className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20 w-full sm:w-auto justify-center"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-sm">LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://github.com/walter-melendez", "_blank")}
                className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20 w-full sm:w-auto justify-center"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">GitHub</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("/personal-info", "_blank")}
                className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20 w-full sm:w-auto justify-center"
              >
                <User className="h-4 w-4" />
                <span className="text-sm">About Me</span>
              </Button>
            </div>

            {/* Contact Button */}
            <Button
              onClick={() => window.open("mailto:walter@example.com", "_blank")}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-full sm:w-auto justify-center"
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm">Contact Me</span>
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 pt-4 sm:pt-6 border-t border-purple-200 dark:border-purple-700">
          <div className="flex flex-col items-center justify-center gap-2 text-center md:flex-row md:justify-between md:text-left">
            <p className="text-xs text-gray-500 dark:text-gray-400 order-2 md:order-1">
              © 2024 PreventIA. All rights reserved.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              "Unmasking manipulation, One Message at a Time"
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 order-1 md:order-2">
              Built with Next.js, TypeScript & AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function PreventIADashboard() {
  const [results, setResults] = useState<AnalysisResult[]>([])
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Handle text analysis
  const handleAnalyze = async () => {
    if (!inputText.trim()) return

    setIsAnalyzing(true)
    try {
      const analysis = await analyzeText(inputText)
      const newResult: AnalysisResult = {
        ...analysis,
        id: Date.now().toString(),
        timestamp: new Date(),
      }
      setResults((prev) => [newResult, ...prev])
      setInputText("")
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Clear all results
  const clearResults = () => {
    setResults([])
  }

  // Filter results based on search and filter criteria
  const filteredResults = results.filter((result) => {
    const matchesSearch = result.texto.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterType === "all" ||
      (filterType === "manipulation" && result.manipulacion_detectada) ||
      (filterType === "safe" && !result.manipulacion_detectada) ||
      filterType === result.tipo_manipulacion

    return matchesSearch && matchesFilter
  })

  // Get manipulation type color and variant
  const getManipulationColor = (type: string) => {
    switch (type) {
      case "desprecio/control":
        return "destructive"
      case "chantaje_emocional":
        return "default"
      case "victimizacion":
        return "secondary"
      case "aislamiento":
        return "outline"
      case "ninguna":
        return "secondary"
      default:
        return "default"
    }
  }

  // Get toxicity level color with enhanced theme
  const getToxicityColor = (level: number) => {
    if (level >= 0.8) return "bg-toxic-critical"
    if (level >= 0.6) return "bg-toxic-high"
    if (level >= 0.4) return "bg-toxic-medium"
    if (level >= 0.2) return "bg-toxic-low"
    return "bg-toxic-safe"
  }

  // Get risk level text
  const getRiskLevel = (toxicity: number, manipulation: boolean) => {
    if (manipulation && toxicity >= 0.7) return "CRITICAL"
    if (manipulation || toxicity >= 0.6) return "HIGH"
    if (toxicity >= 0.4) return "MEDIUM"
    if (toxicity >= 0.2) return "LOW"
    return "SAFE"
  }

  // Get risk level color
  const getRiskLevelColor = (toxicity: number, manipulation: boolean) => {
    const level = getRiskLevel(toxicity, manipulation)
    switch (level) {
      case "CRITICAL":
        return "text-red-600 dark:text-red-400"
      case "HIGH":
        return "text-orange-600 dark:text-orange-400"
      case "MEDIUM":
        return "text-yellow-600 dark:text-yellow-400"
      case "LOW":
        return "text-emerald-600 dark:text-emerald-400"
      case "SAFE":
        return "text-teal-600 dark:text-teal-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  // Calculate statistics
  const totalTexts = results.length
  const manipulationDetected = results.filter((r) => r.manipulacion_detectada).length
  const averageToxicity = totalTexts > 0 ? results.reduce((sum, r) => sum + r.toxicity, 0) / totalTexts : 0
  const highToxicity = results.filter((r) => r.toxicity >= 0.7).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          {/* Mobile: Social icons at top */}
          <div className="flex items-center gap-3 sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://linkedin.com/in/walter-melendez", "_blank")}
              className="border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://github.com/walter-melendez", "_blank")}
              className="border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20"
            >
              <Github className="h-4 w-4" />
            </Button>
          </div>

          {/* Desktop: Left side social icons */}
          <div className="hidden sm:flex items-center gap-3 w-32">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://linkedin.com/in/walter-melendez", "_blank")}
              className="border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://github.com/walter-melendez", "_blank")}
              className="border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20"
            >
              <Github className="h-4 w-4" />
            </Button>
          </div>

          {/* Center: Title and description */}
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg">
                <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                PreventIA
              </h1>
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-4 sm:px-0">
              AI-Powered Text Safety & Manipulation Detection
              <br />
              <span className="text-xs sm:text-sm italic font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                "Unmasking manipulation, One Message at a Time"
              </span>
            </p>
          </div>

          {/* Right: Theme toggle */}
          <div className="w-auto sm:w-32 flex justify-center sm:justify-end">
            <ThemeToggle />
          </div>
        </div>

        {/* Text Input Section */}
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 dark:border-purple-700 dark:from-purple-900/20 dark:to-indigo-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <Zap className="h-5 w-5" />
              Analyze New Text
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter the text you want to analyze for toxicity and manipulation patterns..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] resize-none border-purple-200 focus:border-purple-400 dark:border-purple-700 dark:focus:border-purple-500"
              disabled={isAnalyzing}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">{inputText.length} characters</span>
              <Button
                onClick={handleAnalyze}
                disabled={!inputText.trim() || isAnalyzing}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Analyze Text
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        {totalTexts > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card className="border-indigo-200 dark:border-indigo-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Analyzed</CardTitle>
                <Search className="h-4 w-4 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{totalTexts}</div>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Threats Detected</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{manipulationDetected}</div>
                <p className="text-xs text-muted-foreground">
                  {((manipulationDetected / totalTexts) * 100).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Toxicity</CardTitle>
                <Shield className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {(averageToxicity * 100).toFixed(1)}%
                </div>
                <Progress value={averageToxicity * 100} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border-orange-200 dark:border-orange-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{highToxicity}</div>
                <p className="text-xs text-muted-foreground">Toxicity ≥ 70%</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters and Controls */}
        {totalTexts > 0 && (
          <div className="flex flex-col gap-4 items-stretch sm:flex-row sm:items-center">
            <div className="flex-1">
              <Input
                placeholder="Search analyzed texts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-purple-200 focus:border-purple-400 dark:border-purple-700 dark:focus:border-purple-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[200px] border-purple-200 dark:border-purple-700">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="manipulation">Threats Detected</SelectItem>
                  <SelectItem value="safe">Safe Content</SelectItem>
                  <SelectItem value="desprecio/control">Desprecio/Control</SelectItem>
                  <SelectItem value="chantaje_emocional">Chantaje Emocional</SelectItem>
                  <SelectItem value="victimizacion">Victimización</SelectItem>
                  <SelectItem value="aislamiento">Aislamiento</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={clearResults}
                className="flex items-center justify-center gap-2 border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20 w-full sm:w-auto"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sm:inline">Clear All</span>
              </Button>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {filteredResults.map((result) => (
              <Card
                key={result.id}
                className={`${
                  result.manipulacion_detectada
                    ? "border-toxic-critical bg-toxic-critical-light"
                    : "border-toxic-safe bg-toxic-safe-light"
                } transition-all duration-200 hover:shadow-lg`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
                      {result.texto}
                    </CardTitle>
                    <div className="flex flex-col items-end gap-2 ml-2">
                      {result.manipulacion_detectada ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      ) : (
                        <Shield className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      )}
                      <Badge
                        variant="outline"
                        className={`text-xs font-bold ${getRiskLevelColor(result.toxicity, result.manipulacion_detectada)}`}
                      >
                        {getRiskLevel(result.toxicity, result.manipulacion_detectada)}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Analyzed: {result.timestamp.toLocaleString()}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {/* Manipulation Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                    <span className="text-sm font-medium">Threat Status:</span>
                    <Badge variant={result.manipulacion_detectada ? "destructive" : "secondary"} className="w-fit">
                      {result.manipulacion_detectada ? "⚠️ Detected" : "✅ Safe"}
                    </Badge>
                  </div>

                  {/* Manipulation Type - Always show */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                    <span className="text-sm font-medium">Manipulation Type:</span>
                    <Badge
                      variant={
                        result.manipulacion_detectada ? getManipulationColor(result.tipo_manipulacion) : "outline"
                      }
                      className={`w-fit ${result.tipo_manipulacion === "ninguna" ? "text-gray-500 dark:text-gray-400" : ""}`}
                    >
                      {result.tipo_manipulacion === "ninguna"
                        ? "None Detected"
                        : result.tipo_manipulacion.replace(/_/g, " ").replace(/\//g, " / ").toUpperCase()}
                    </Badge>
                  </div>

                  {/* Toxicity Level */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Toxicity Level:</span>
                      <span className="text-sm font-bold">{(result.toxicity * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
                      <div
                        className={`h-2 sm:h-3 rounded-full ${getToxicityColor(result.toxicity)} transition-all duration-300`}
                        style={{ width: `${result.toxicity * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Insult Level */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Insult Level:</span>
                      <span className="text-sm font-bold">{(result.insult * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
                      <div
                        className={`h-2 sm:h-3 rounded-full ${getToxicityColor(result.insult)} transition-all duration-300`}
                        style={{ width: `${result.insult * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : totalTexts > 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No results found matching your criteria.</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-6xl">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Ready to Protect</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Enter text above to start analyzing for toxicity and manipulation patterns. PreventIA will provide
                detailed safety insights and threat detection.
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
