import React, {  useEffect, useState } from "react";
import {  View, ScrollView , Image , TouchableWithoutFeedback ,TouchableOpacity } from "react-native";
import styles from './snap_carousel.style';
import Carousel , { Pagination }  from 'react-native-snap-carousel';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp , 
  scale,
  screenWidth
} from '../../../../commons/responsive_design';
import Video from 'react-native-video';
const carouselWidth = wp(90);
const innerItemWidth = wp(70)
const carouselHeight = hp(40);
const SnapCarousel = (props) => {
  //for handle on click on item 
  const { 
    items , //array of items [ { uri : '' } , { Required() }  ]
    handleOnClick, // handle image click
  } = props;

  const innerWidth = carouselWidth - wp(4);
  const innerHeight = carouselHeight - wp(2);
  const innerMargin = ( wp(100) - innerWidth ) / 2 ;
  const scrollRef = React.createRef();

  const [activeIndex,setActiveIndex] = useState(0);

  const _pagination = () => {
    return (
        <Pagination
          dotsLength={items.length}
          activeDotIndex={activeIndex}
          containerStyle={{ 
              width : carouselWidth,
              position : 'absolute',
              bottom : 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap : 'nowrap',
            }}
          dotStyle={{
            width: scale(10),
            height: scale(6),
            borderRadius: scale(3),
            backgroundColor: "darkgray",
            opacity : 1
          }}
          inactiveDotStyle={{
            width: scale(6),
            height: scale(6),
            borderRadius: scale(3),
            backgroundColor: "darkgray",
            opacity : 0.5
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        );
    }

  const   _renderItem = ({item, index}) => {
    return (
        <TouchableWithoutFeedback
        key={index}
        onPress={() => handleOnClick(item)}>
          {/* Carousel Image View  */}
            <View
            style={[
              styles.backgroundImageView,
              {
                  height: hp(35)  ,
                  width: wp(85) ,
              }
            ]}
            >
              {
                item.rf_file_type === 'image/png' || item.rf_file_type === 'image/jpg' || item.rf_file_type === 'image/jpeg' ? 
                 <Image
                  source={{ uri : item.rf_file_name }}
                  style={styles.backgroundImage}
                  resizeMode={'contain'}
                />
                : null
              }

              { 
                item.rf_file_type === 'video/mp4'  ? 
                <Video source={{uri: item.rf_file_name}}   // Can be a URL or a local file.
                onBuffer={() => console.log('buffering video')}                // Callback when remote video is buffering
                onError={() => console.log('error while playing video')}               // Callback when video cannot be loaded
                style={styles.backgroundImage} /> : null
              }
            </View>
      </TouchableWithoutFeedback>
    );
}

  return (
    <View  style={[{
      height: hp(35)  ,
      width: wp(88) ,
      display : 'flex',
      flexDirection : 'row',
      marginHorizontal : wp(2)
    },styles.card]} >
      {/* Main Carousel  */}
            <Carousel
              data={items}
              renderItem={_renderItem}
              sliderWidth={wp(100)}
              itemWidth={wp(95)}
              onSnapToItem={(index) => setActiveIndex(index)}
              autoplay={true}
              autoplayDelay={200}
              autoplayInterval={3000}
              enableMomentum={false}
              lockScrollWhileSnapping={true}
              loop={true}
              firstItem={0}
              hasParallaxImages={false}
              inactiveSlideOpacity={0.7}
            /> 
           {_pagination()}
    </View>
  );
}

export default SnapCarousel;

