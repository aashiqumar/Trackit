import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image, Dimensions, Animated } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

const {width, height} = Dimensions.get('screen')

const buttonStyle = "mt-2 mb-30 bg-blue-600 w-max items-center justify-center text-white mx-5 h-12 rounded-lg";

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    "key": "3571572",
    "title": "Gain Total Control of Your Money",
    "description": "Become your own money manager and make every cent count",
    "image": "https://cdn-icons-png.flaticon.com/512/781/781760.png"
  },
  {
    "key": "3571747",
    "title": "Get to Know Where Your Money Goes",
    "description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    "image": "https://cdn-icons-png.flaticon.com/512/5812/5812952.png"
  },
  {
    "key": "3571680",
    "title": "Planning ahead",
    "description": "Setup your budget for each category so you in control and on Track",
    "image": "https://cdn-icons-png.flaticon.com/512/4727/4727478.png"
  },
 
]

const Indicator = ({ scrollX }) => {
    
    return <View className="flex-row items-center justify-center">
        {DATA.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1.4, 0.8],
                extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.6, 0.9, 0.6],
                extrapolate: 'clamp',
            });
            return <Animated.View
                key={`indicator-${i}`}
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: '#fff',
                    marginBottom: 50,
                    margin: 10,
                    transform: [{scale,}]
                }}
            />
        })}
    </View>
}

const Backdrop = ({ scrollX }) => {
    const backgroundColor = scrollX.interpolate({
        inputRange: bgs.map((_, i) => i*width),
        outputRange: bgs.map((bg) => bg) ,
    })
    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFillObject,
                {
                    backgroundColor,
                }
            ]}
        />
    )
}

const Square = ({ scrollX }) => {

    const YOLO = Animated.modulo(Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)
    ), 1);

    const rotate = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['-32deg', '5deg', '-30deg'],
    })

    const translateX = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -height, -0],
    })

    return <Animated.View
        style={{
            width: width * 2,
            height: width * 2,
            backgroundColor: '#fff',
            borderRadius: 86,
            position: 'absolute',
            top: -height * 0.63,
            left: -height * 0.3,
            transform: [
                {
                    rotate,
                },
                {
                    translateX,
                }
            ]
        }}
    />
};

const OnBoarding = () => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    


  return (

        <View className="flex-auto bg-white items-center">
            
            <Backdrop scrollX={scrollX}/>
            <Square scrollX={scrollX}/>
            <Animated.FlatList
                data={DATA}
                horizontal
                contentContainerStyle= {{ paddingBottom: 10 }}
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX
                    }}}],
                    {useNativeDriver: false }
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.key}
                pagingEnabled
                renderItem={({ item }) => {
                    return (
                        <View className="flex-col" style={{ width, alignItems: 'center' }}>
                            <View className="pt-32 pb-20" style={{ alignItems:'center', justifyContent: 'center'}}>
                                <Image source={{ uri: item.image }} style={{ width: width/2, height: width/2, resizeMode: 'contain' }}/>
                            </View>

                            <View className="px-4 pt-16">
                                <Text style={{ color: 'black', fontWeight: '800', fontSize: 24, marginBottom: 10,}}>{item.title}</Text>
                                <Text style={{ color: 'white', fontWeight: '500' }}>{item.description}</Text>
                            </View>
                        </View>
                    )
                }}
            />
            <View className="flex-row space-x-40">
                <Indicator className="mb-10" scrollX={scrollX}/>
                <TouchableOpacity className="text-black items-center justify-center mb-10 ">
                    <Text className="font-bold text-xl">Login</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}




export default OnBoarding