import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItem from '../components/HomeScreen/LatestItem'

const ItemList = () => {
  const { params } = useRoute()
  const db = getFirestore(app)
  const [itemList, setItemList] = useState([])

  useEffect(() => {
    params && getItemListByCategory()
  }, [params])

  const getItemListByCategory = async () => {
    setItemList([])

    const querySnapShot = query(
      collection(db, 'UserPost'),
      where('category', '==', params.category)
    )

    const snapchat = await getDocs(querySnapShot)

    snapchat.forEach((doc) => {
      console.log(doc.data())
      setItemList((previousValue) => [...previousValue, doc.data()])
    })
  }

  return (
    <View>
      {itemList?.length > 0 ? (
        <LatestItem
          latestItemList={itemList}
          heading={''}
        />
      ) : (
        <Text className=" p-5 text-center justify-center text-[20px] text-gray-500 mt-24 ">
          No Post Found
        </Text>
      )}
    </View>
  )
}

export default ItemList
