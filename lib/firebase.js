// Import the Firebase SDK
import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  setDoc,
} from "firebase/firestore"
import { generateAnalysis } from "./openai"

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Firebase başlatma ve kontrol için değişkenler
let app = null
let db = null
let isInitialized = false
let isInitializing = false
let initError = null

// Firebase'i başlatma fonksiyonu
const initializeFirebase = async () => {
  // Zaten başlatılıyorsa veya başlatma işlemi devam ediyorsa bekle
  if (isInitialized) return { db, error: null }
  if (isInitializing) {
    // Başlatma işlemi devam ediyorsa, tamamlanana kadar bekle
    await new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (!isInitializing) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 100)
    })
    return { db, error: initError }
  }

  isInitializing = true

  try {
    // Firebase'i başlat
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)

    // Başarıyla başlatıldı
    isInitialized = true
    isInitializing = false
    initError = null

    console.log("Firebase successfully initialized")
    return { db, error: null }
  } catch (error) {
    console.error("Firebase initialization error:", error)
    initError = error
    isInitializing = false
    return { db: null, error }
  }
}

// Tarayıcı ortamında otomatik başlatma
if (typeof window !== "undefined") {
  initializeFirebase().catch((err) => {
    console.error("Failed to initialize Firebase:", err)
  })
}

/**
 * Güvenli Firestore işlemi gerçekleştiren yardımcı fonksiyon
 * @param {Function} operation - Gerçekleştirilecek Firestore işlemi
 * @param {any} fallbackValue - Hata durumunda dönülecek değer
 * @returns {Promise<any>} - İşlem sonucu veya fallback değeri
 */
const safeFirestoreOperation = async (operation, fallbackValue = null) => {
  // Firebase başlatılmamışsa başlat
  if (!isInitialized) {
    const { error } = await initializeFirebase()
    if (error) {
      console.error("Firebase not initialized, using fallback value")
      return fallbackValue
    }
  }

  try {
    // İşlemi gerçekleştir
    return await operation()
  } catch (error) {
    console.error("Firestore operation error:", error)
    return fallbackValue
  }
}

/**
 * Add water usage data to Firestore
 * @param {Object} data - The water usage data
 * @returns {Promise<DocumentReference>} - The document reference
 */
export async function addWaterUsageData(data) {
  return safeFirestoreOperation(
    async () => {
      // Add timestamp
      const dataWithTimestamp = {
        ...data,
        timestamp: new Date(),
      }

      // Add to Firestore
      const docRef = await addDoc(collection(db, "waterUsage"), dataWithTimestamp)
      console.log("Document written with ID: ", docRef.id)
      return docRef
    },
    { id: "mock-id-" + Date.now() },
  ) // Hata durumunda sahte bir ID döndür
}

/**
 * Analyze water usage data using OpenAI
 * @param {Object} data - The water usage data
 * @returns {Promise<Object>} - The analysis results
 */
export async function analyzeWaterUsage(data) {
  try {
    // Generate analysis using OpenAI
    const analysis = await generateAnalysis(data)

    // Store analysis in Firestore if possible
    await safeFirestoreOperation(async () => {
      const docRef = await addDoc(collection(db, "analysis"), {
        waterUsageData: data,
        analysis: analysis,
        timestamp: new Date(),
      })
      console.log("Analysis stored with ID: ", docRef.id)
    })

    return analysis
  } catch (error) {
    console.error("Error analyzing water usage: ", error)
    // Return mock data if OpenAI API fails
    return getMockAnalysisData()
  }
}

/**
 * Get water usage analysis from Firestore
 * @param {string} id - The document ID
 * @returns {Promise<Object>} - The analysis data
 */
export async function getWaterUsageAnalysis(id) {
  return safeFirestoreOperation(async () => {
    const docRef = doc(db, "analysis", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data().analysis
    } else {
      console.log("Analysis not found, using mock data")
      return getMockAnalysisData()
    }
  }, getMockAnalysisData())
}

/**
 * Update family settings in Firestore
 * @param {Object} data - The family settings data
 * @returns {Promise<void>}
 */
export async function updateFamilySettings(data) {
  return safeFirestoreOperation(async () => {
    // In a real app, you would get the user ID from authentication
    const userId = "current-user"

    // Update family settings in Firestore
    await setDoc(doc(db, "familySettings", userId), {
      ...data,
      updatedAt: new Date(),
    })

    console.log("Family settings updated successfully")
  })
}

/**
 * Get baraj data from Firestore
 * @returns {Promise<Object>} - The baraj data
 */
export async function getBarajData() {
  return safeFirestoreOperation(async () => {
    const docRef = doc(db, "barajData", "latest")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log("No baraj data found, using mock data")
      return getMockBarajData()
    }
  }, getMockBarajData())
}

/**
 * Get user's water usage history
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} - The user's water usage history
 */
export async function getUserWaterUsageHistory(userId) {
  return safeFirestoreOperation(async () => {
    // Query Firestore for user's water usage data
    const q = query(
      collection(db, "waterUsage"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
      limit(30),
    )

    const querySnapshot = await getDocs(q)
    const data = []

    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    if (data.length > 0) {
      return processDataForDashboard(data)
    } else {
      return null // Mock data kullanılacak
    }
  }, null)
}

/**
 * Process data for dashboard
 * @param {Array} data - The raw data
 * @returns {Object} - Processed data for dashboard
 */
function processDataForDashboard(data) {
  // This would be more complex in a real application
  // For now, we'll return mock data
  return null // This will cause the app to use mock data
}

/**
 * Mock baraj data
 * @returns {Object} - Mock baraj data
 */
function getMockBarajData() {
  return {
    barajlar: [
      {
        name: "Altınapa Barajı",
        capacity: 15.7,
        currentLevel: 4.2,
        percentage: 27,
        estimatedDepletion: "Ekim 2025",
        status: "warning",
      },
      {
        name: "Apa Barajı",
        capacity: 110.0,
        currentLevel: 18.7,
        percentage: 17,
        estimatedDepletion: "Ağustos 2025",
        status: "critical",
      },
      {
        name: "Bağbaşı Barajı",
        capacity: 35.5,
        currentLevel: 12.4,
        percentage: 35,
        estimatedDepletion: "Aralık 2025",
        status: "warning",
      },
      {
        name: "Beyşehir Gölü",
        capacity: 4150.0,
        currentLevel: 1660.0,
        percentage: 40,
        estimatedDepletion: "Şubat 2026",
        status: "warning",
      },
      {
        name: "Sille Barajı",
        capacity: 12.5,
        currentLevel: 5.0,
        percentage: 40,
        estimatedDepletion: "Ocak 2026",
        status: "warning",
      },
    ],
    lastUpdated: "15 Mayıs 2025",
    averagePercentage: 31.8,
  }
}

/**
 * Mock analysis data
 * @returns {Object} - Mock analysis data
 */
function getMockAnalysisData() {
  return {
    userName: "Örnek Kullanıcı",
    waterUsageScore: 65,
    totalLitersPerDay: 142,
    insights: [
      "Duş süreniz önerilen 5 dakikadan daha uzun",
      "Bulaşık makinesi kullanımınız verimli",
      "Yaz ayları dışında bahçe sulama sıklığını azaltmayı düşünün",
    ],
    recommendations: [
      "Duş süresini 5 dakika azaltarak günde yaklaşık 50 litre tasarruf edin",
      "Diş fırçalama sırasında tüketimi azaltmak için su tasarruflu musluklar takın",
      "Mümkün olduğunda bahçe sulaması için yağmur suyu toplayın",
    ],
    comparison: {
      user: 142,
      cityAverage: 165,
      recommended: 100,
    },
    breakdown: [
      { category: "Duş", percentage: 40, liters: 57 },
      { category: "Bulaşık Makinesi", percentage: 15, liters: 21 },
      { category: "Çamaşır Makinesi", percentage: 20, liters: 28 },
      { category: "Bahçe", percentage: 15, liters: 21 },
      { category: "Diğer", percentage: 10, liters: 14 },
    ],
  }
}
