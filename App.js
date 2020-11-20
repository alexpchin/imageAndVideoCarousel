/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Text,
  Image,
  Button,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';

const {width} = Dimensions.get('window');

const PlaceDetailsGallery = ({galleryUrls}) => {
  const [fullScreen, setFullScreen] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);

  // Quick hack to check for video
  const isVideo = (url) =>
    url &&
    typeof url.match === 'function' &&
    url.match(/\.(m4v|mp4|mov)/) != null;

  // Quick hack to check for image
  const isImage = (url) =>
    url &&
    typeof url.match === 'function' &&
    url.match(/\.(jpeg|jpg|gif|png)/) != null;

  const renderItem = ({item}) => {
    // Convert Metro’s asset loader number to uri
    const assetUri = Image.resolveAssetSource(item).uri;

    if (isVideo(assetUri)) {
      return (
        <Video
          source={item}
          style={fullScreen ? styles.videoFull : styles.videoSquare}
          muted
          resizeMode={fullScreen ? 'contain' : 'cover'}
        />
      );
    } else if (isImage(assetUri)) {
      return (
        <FastImage
          source={item}
          style={fullScreen ? styles.imageFull : styles.imageSquare}
          resizeMode={fullScreen ? 'contain' : 'cover'}
        />
      );
    } else {
      return null;
    }
  };

  const handleSnapToItem = (index) => setActiveSlide(index);

  const expand = () => setFullScreen(!fullScreen);

  return (
    <View style={fullScreen ? styles.fullContainer : styles.squareContainer}>
      <Carousel
        data={galleryUrls}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={handleSnapToItem}
      />
      <Button onPress={expand} title={'Full Screen'} />
      {/* Pagination would go here? */}
    </View>
  );
};

const App: () => React$Node = () => {
  const [galleryUrls, setGalleryUrls] = useState([
    require('./assets/house-images/1.jpg'),
    require('./assets/house-images/landscape.mp4'),
    require('./assets/house-images/2.jpg'),
    require('./assets/house-images/3.jpg'),
    require('./assets/house-images/4.jpg'),
    require('./assets/house-images/5.jpg'),
    require('./assets/house-images/6.jpg'),
    require('./assets/house-images/7.jpg'),
    require('./assets/house-images/8.jpg'),
    require('./assets/house-images/9.jpg'),
  ]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text>Testing Carousel</Text>
        <PlaceDetailsGallery galleryUrls={galleryUrls} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  squareContainer: {
    width: width,
    height: width,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  videoFull: {
    flex: 1,
  },
  videoSquare: {
    width: width,
    height: width,
  },
  imageFull: {
    flex: 1,
  },
  imageSquare: {
    width: width,
    height: width,
  },
});

export default App;
