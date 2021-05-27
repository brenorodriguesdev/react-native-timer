import React, { useEffect, useState } from 'react';
import { Text, Animated, TouchableOpacity } from 'react-native';
import Svg, { Circle, } from 'react-native-svg';

export function Timer(props) {

    const {
        totalTimeOnSeconds,
        size,
        borderSize,
        borderColor,
        borderColorHover,
        backgroundColor,
        fontStyle } = props

    const center = size / 2;
    const radius = size / 2 - borderSize / 2;
    const circumference = 2 * Math.PI * radius;


    const [isPlaying, setIsPlaying] = useState(false)
    const [totalTime, setTotalTime] = useState(totalTimeOnSeconds)
    const [time, setTime] = useState(totalTimeOnSeconds)
    const [percent, setPercent] = useState(100)
    const [percentAnimation, setPercentAnimation] = useState(new Animated.Value(100))
    const [timer, setTimer] = useState()


    const restart = () => {
        setIsPlaying(false)
        setTotalTime(totalTimeOnSeconds)
        setTime(totalTimeOnSeconds)
        setPercent(100)
        setPercentAnimation(new Animated.Value(100))
        if (timer) {
            clearTimeout(timer)
        }
    }

    const play = () => {

        setIsPlaying(true)

        Animated.timing(
            percentAnimation,
            {
                toValue: 0,
                duration: totalTime * 1000,
                useNativeDriver: true
            },

        ).start()


        percentAnimation.addListener((percent) => {
            setPercent(percent.value)
        })

    }

    const stop = () => {
        setIsPlaying(false)

        Animated.timing(
            percentAnimation
        ).stop()

        clearTimeout(timer)
    }

    const endTimer = () => {

    }

    useEffect(() => {

        if (isPlaying) {

            if (time > 0) {
                setTimer(setTimeout(() => {
                    setTime(time - 1);
                }, 1000));
            } else {
                endTimer()
            }
        }

    }, [time, isPlaying])


    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor(time / 60 % 60);
    const seconds = Math.floor(time / 60 * 60 % 60);

    return (
        <Animated.View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size}>
                <Circle stroke={borderColor} cx={center} cy={center} r={radius} strokeWidth={borderSize} fill={backgroundColor} />
                <Circle stroke={borderColorHover} cx={center} cy={center} r={radius} strokeWidth={borderSize} strokeDasharray={circumference} strokeDashoffset={circumference + (circumference * percent) / 100} fill={backgroundColor} transform={`rotate(-90 ${center} ${center})`} />
            </Svg>
            <TouchableOpacity style={{ position: 'absolute' }} onPress={() => { time > 0 ? isPlaying ? stop() : play() : restart() }}>
                <Text style={fontStyle}>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}


