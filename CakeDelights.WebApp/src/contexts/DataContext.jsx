import React, { createContext, useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  getDocs,
  query,
  setDoc
} from 'firebase/firestore'
import { db } from '../config/firebase'

export const DataContext = createContext()

// Sample data
const SAMPLE_BAKERY_ITEMS = [
  {
    id: '1',
    section: 'bakery',
    name: 'Classic Vanilla Cake',
    category: 'Cakes',
    description: 'Fluffy and moist vanilla cake made with the finest ingredients',
    flavors: 'Vanilla',
    servings: '6-8 servings',
    sizes: [
      { size: '500g', price: 25, servings: '3-4 servings' },
      { size: '1kg', price: 45, servings: '6-8 servings' },
      { size: '2kg', price: 85, servings: '12-15 servings' }
    ],
    image: null
  },
  {
    id: '2',
    section: 'bakery',
    name: 'Chocolate Delight',
    category: 'Cakes',
    description: 'Rich, decadent chocolate cake that melts in your mouth',
    flavors: 'Dark Chocolate',
    servings: '6-8 servings',
    sizes: [
      { size: '500g', price: 28, servings: '3-4 servings' },
      { size: '1kg', price: 50, servings: '6-8 servings' },
      { size: '2kg', price: 95, servings: '12-15 servings' }
    ],
    image: null
  },
  {
    id: '3',
    section: 'bakery',
    name: 'Strawberry Bliss',
    category: 'Cakes',
    description: 'Fresh strawberry cake with layers of cream and fruit',
    flavors: 'Strawberry, Vanilla',
    servings: '6-8 servings',
    sizes: [
      { size: '500g', price: 30, servings: '3-4 servings' },
      { size: '1kg', price: 55, servings: '6-8 servings' },
      { size: '2kg', price: 105, servings: '12-15 servings' }
    ],
    image: null
  },
  {
    id: '4',
    section: 'bakery',
    name: 'Almond Biscotti',
    category: 'Pastries & Cookies',
    description: 'Crispy, crunchy Italian almond cookies perfect with tea or coffee',
    flavors: 'Almond',
    servings: '12 pieces',
    sizes: [
      { size: '250g', price: 12, servings: '6 pieces' },
      { size: '500g', price: 20, servings: '12 pieces' }
    ],
    image: null
  },
  {
    id: '5',
    section: 'bakery',
    name: 'Chocolate Chip Cookies',
    category: 'Pastries & Cookies',
    description: 'Classic cookies loaded with premium chocolate chips',
    flavors: 'Chocolate Chip',
    servings: '12 cookies',
    sizes: [
      { size: '250g', price: 10, servings: '6 cookies' },
      { size: '500g', price: 18, servings: '12 cookies' }
    ],
    image: null
  }
]

export function DataProvider({ children }) {
  const [menuItems, setMenuItems] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    facebook: ''
  })
  const [loading, setLoading] = useState(true)

  // Initialize Firebase and load data
  useEffect(() => {
    let unsubscribe = null
    let socialUnsubscribe = null

    const loadData = async () => {
      try {
        // Check admin status from localStorage
        const savedAdminStatus = localStorage.getItem('cakeDelightsAdminStatus')
        if (savedAdminStatus === 'true') {
          setIsAdmin(true)
        }

        // Listen to menu items in real-time
        const menuCollection = collection(db, 'menuItems')
        unsubscribe = onSnapshot(
          menuCollection,
          (snapshot) => {
            const items = snapshot.docs.map(docSnap => ({
              id: docSnap.id,
              ...docSnap.data()
            }))
            setMenuItems(items)
            setLoading(false)
          },
          (error) => {
            console.warn('Error fetching from Firestore:', error)
            // Don't use localStorage for menu items - Firebase is the source of truth
            // Just set loading to false and keep existing items
            setLoading(false)
          }
        )

        // Listen to social links in real-time
        const socialRef = doc(db, 'config', 'socialLinks')
        socialUnsubscribe = onSnapshot(
          socialRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setSocialLinks(docSnap.data())
              // Cache only small social links data
              localStorage.setItem('cakeDelightsSocialLinks', JSON.stringify(docSnap.data()))
            }
          },
          (error) => {
            console.warn('Error fetching social links:', error)
            const saved = localStorage.getItem('cakeDelightsSocialLinks')
            if (saved) {
              setSocialLinks(JSON.parse(saved))
            }
          }
        )

        // Initialize sample data if collection is empty
        const snapshot = await getDocs(collection(db, 'menuItems'))
        if (snapshot.empty) {
          await initializeSampleData()
        }
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }

    loadData()

    return () => {
      if (unsubscribe) unsubscribe()
      if (socialUnsubscribe) socialUnsubscribe()
    }
  }, [])

  const initializeSampleData = async () => {
    const SAMPLE_BAKERY_ITEMS = [
      {
        section: 'bakery',
        name: 'Classic Vanilla Cake',
        category: 'Cakes',
        description: 'Fluffy and moist vanilla cake made with the finest ingredients',
        flavors: 'Vanilla',
        servings: '6-8 servings',
        sizes: [
          { size: '500g', price: 25 },
          { size: '1kg', price: 45 },
          { size: '2kg', price: 85 }
        ],
        image: null
      },
      {
        section: 'bakery',
        name: 'Chocolate Delight',
        category: 'Cakes',
        description: 'Rich, decadent chocolate cake that melts in your mouth',
        flavors: 'Dark Chocolate',
        servings: '6-8 servings',
        sizes: [
          { size: '500g', price: 28 },
          { size: '1kg', price: 50 },
          { size: '2kg', price: 95 }
        ],
        image: null
      },
      {
        section: 'bakery',
        name: 'Strawberry Bliss',
        category: 'Cakes',
        description: 'Fresh strawberry cake with layers of cream and fruit',
        flavors: 'Strawberry, Vanilla',
        servings: '6-8 servings',
        sizes: [
          { size: '500g', price: 30 },
          { size: '1kg', price: 55 },
          { size: '2kg', price: 105 }
        ],
        image: null
      },
      {
        section: 'bakery',
        name: 'Almond Biscotti',
        category: 'Pastries & Cookies',
        description: 'Crispy, crunchy Italian almond cookies perfect with tea or coffee',
        flavors: 'Almond',
        servings: '12 pieces',
        sizes: [
          { size: '250g', price: 12 },
          { size: '500g', price: 20 }
        ],
        image: null
      },
      {
        section: 'bakery',
        name: 'Chocolate Chip Cookies',
        category: 'Pastries & Cookies',
        description: 'Classic cookies loaded with premium chocolate chips',
        flavors: 'Chocolate Chip',
        servings: '12 cookies',
        sizes: [
          { size: '250g', price: 10 },
          { size: '500g', price: 18 }
        ],
        image: null
      }
    ]

    try {
      for (const item of SAMPLE_BAKERY_ITEMS) {
        await addDoc(collection(db, 'menuItems'), item)
      }
    } catch (error) {
      console.error('Error initializing sample data:', error)
    }
  }

  const addMenuItem = async (item) => {
    try {
      const docRef = await addDoc(collection(db, 'menuItems'), item)
      return { id: docRef.id, ...item }
    } catch (error) {
      console.error('Error adding menu item:', error)
      throw error
    }
  }

  const updateMenuItem = async (id, updatedItem) => {
    try {
      const itemRef = doc(db, 'menuItems', id)
      await updateDoc(itemRef, updatedItem)
    } catch (error) {
      console.error('Error updating menu item:', error)
      throw error
    }
  }

  const deleteMenuItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'menuItems', id))
    } catch (error) {
      console.error('Error deleting menu item:', error)
      throw error
    }
  }

  const updateSocialLinks = async (links) => {
    try {
      const socialRef = doc(db, 'config', 'socialLinks')
      await setDoc(socialRef, links)
    } catch (error) {
      console.error('Error updating social links:', error)
      throw error
    }
  }

  const login = () => {
    setIsAdmin(true)
    localStorage.setItem('cakeDelightsAdminStatus', 'true')
  }

  const logout = () => {
    setIsAdmin(false)
    localStorage.setItem('cakeDelightsAdminStatus', 'false')
  }

  const getItemsBySection = (section) => {
    return menuItems.filter(item => item.section === section)
  }

  return (
    <DataContext.Provider
      value={{
        menuItems,
        isAdmin,
        socialLinks,
        loading,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        updateSocialLinks,
        login,
        logout,
        getItemsBySection
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = React.useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}
