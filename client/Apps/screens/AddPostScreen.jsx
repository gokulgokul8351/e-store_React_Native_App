import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { Formik } from 'formik'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { useUser } from '@clerk/clerk-expo'

const AddPostScreen = () => {
  const [categoryList, setCategoryList] = useState([])
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const { user } = useUser()

  const db = getFirestore(app)

  useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = async () => {
    setCategoryList([])

    const querySnapshot = await getDocs(collection(db, 'Category'))

    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()])
    })
  }

  // used pick image functionality

  const picImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  // imag generate uri

  const onSubmitMethod = async (value) => {
    setLoading(true)
    // convert uri to blob file
    const storage = getStorage()
    const response = await fetch(image)
    const blob = await response.blob()
    const storageRef = ref(storage, 'communityPost/' + Date.now() + '.jpg')

    uploadBytes(storageRef, blob)
      .then((snapShot) => {
        console.log('Uploaded a blob or file')
      })
      .then((res) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl)
          value.image = downloadUrl
          value.userName = user.fullName
          value.userEmail = user.primaryEmailAddress.emailAddress
          value.userImage = user.imageUrl

          // add to collection storage db
          const docRef = await addDoc(collection(db, 'UserPost'), value)

          if (docRef.id) {
            setLoading(false)
            Alert.alert('Success...♥', 'Successfully added post')
          }
        })
      })
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView className=" mt-4 p-10">
        <Text className=" text-[27px] font-bold ">Add New Post</Text>
        <Text className="text-[16px] text-gray-500 mb-7 mt-2 ">
          Create New Post Start Selling
        </Text>
        <Formik
          initialValues={{
            title: '',
            desc: '',
            price: '',
            category: '',
            address: '',
            image: '',
            userName: '',
            userEmail: '',
            userImage: '',
            createdAt: Date.now(),
          }}
          onSubmit={(value) => onSubmitMethod(value)}
          validate={(values) => {
            const errors = {}

            if (!values.title) {
              console.log('Title not present')
              ToastAndroid.show('Title must be there', ToastAndroid.SHORT)
              errors.name = 'Title must be there !'
            }
            return errors
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
          }) => (
            <View>
              <TouchableOpacity onPress={picImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 15,
                      marginBottom: 6,
                    }}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/img-placeholder/3.jpg')}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 15,
                      marginBottom: 6,
                    }}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                style={Styles.input}
                placeholder="title"
                value={values?.title}
                onChangeText={handleChange('title')}
              />
              <TextInput
                style={Styles.input}
                value={values?.desc}
                onChangeText={handleChange('desc')}
                placeholder="Description"
                numberOfLines={5}
              />
              <TextInput
                style={Styles.input}
                value={values?.price}
                onChangeText={handleChange('price')}
                placeholder="Price"
                keyboardType="number-pad"
              />
              <TextInput
                style={Styles.input}
                value={values?.address}
                onChangeText={handleChange('address')}
                placeholder="Address"
              />
              {/* category drop down input */}
              <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
                <Picker
                  className="  "
                  selectedValue={values?.category}
                  onValueChange={(itemValue) =>
                    setFieldValue('category', itemValue)
                  }
                >
                  {categoryList &&
                    categoryList.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item?.name}
                        value={item?.name}
                      />
                    ))}
                </Picker>
              </View>
              <TouchableOpacity
                className=" p-4 bg-blue-500 rounded-full mt-10 "
                onPress={handleSubmit}
                style={{ backgroundColor: loading ? '#ccc' : '#008080' }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className=" text-white text-center text-[16px] ">
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AddPostScreen

const Styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,
    paddingHorizontal: 17,
    fontSize: 17,
    marginTop: 10,
    marginBottom: 7,
    textAlignVertical: 'top',
  },
})
