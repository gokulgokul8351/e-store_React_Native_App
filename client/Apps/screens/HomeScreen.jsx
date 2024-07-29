import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from '../components/HomeScreen/Slider'
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
} from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import Categories from '../components/HomeScreen/Categories'
import LatestItem from '../components/HomeScreen/LatestItem'
import Header from '../components/HomeScreen/Header'

const HomeScreen = () => {
  const db = getFirestore(app)
  const [sliderList, setSliderList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [latestItemList, setLatestItemList] = useState([])

  useEffect(() => {
    getSliders()
    getCategoryList()
    getLatestItemList()
  }, [])

  const getSliders = async () => {
    // fetch slider collections in db
    const querySnapshot = await getDocs(collection(db, 'Sliders'))
    querySnapshot.forEach((doc) => {
      // doc.date()  is never undefined for query doc snapshots
      setSliderList((previousValue) => [...previousValue, doc.data()])
    })
  }

  // get category's in db

  const getCategoryList = async () => {
    setCategoryList([])
    const querySnapshot = await getDocs(collection(db, 'Category'))

    querySnapshot.forEach((doc) => {
      setCategoryList((previousValue) => [...previousValue, doc.data()])
    })
  }

  //  get latest item in db UserPost collection

  const getLatestItemList = async () => {
    setLatestItemList([])
    const querySnapShot = await getDocs(
      collection(db, 'UserPost'),
      orderBy('createdAt', 'desc')
    )

    querySnapShot.forEach((doc) => {
      setLatestItemList((previousValue) => [...previousValue, doc.data()])
    })
  }

  return (
    <ScrollView className=" py-10 px-6 flex-1 bg-white ">
      <Header />
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
      <LatestItem
        latestItemList={latestItemList}
        heading={'Latest Items'}
      />
    </ScrollView>
  )
}

export default HomeScreen
