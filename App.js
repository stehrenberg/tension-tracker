import React from 'react';
import { Text, View, PanResponder, Dimensions } from 'react-native';

import styles from './styles';

const app = class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            red: 127,
            green: 0,
            blue: 0,
            brightness: 127,
        };
        this.panResponderHandlers = this.createPanResponderHandlers();
    }

    handlePanMove = (event, gestureState) => {
        let { red, green, blue } = this.state;
        const rgbValues = [red, green, blue];
        const { dx, dy } = gestureState;
        const { height } = Dimensions.get('window');
        const brightnessDelta = dy / height;
        const shouldDim = brightnessDelta > 0;
        const subtrahend = shouldDim ? 0 : 255;
        const maxDelta = rgbValues
            .map(value => Math.abs(subtrahend - value))
            .reduce((prev = 255, value) => Math.max(prev, value));
        const signedMaxDelta = shouldDim ? maxDelta : -(maxDelta);
        const newRgbValues = rgbValues.map(oldValue => oldValue + (brightnessDelta * maxDelta * 0.1));

        [red, green, blue] = [...newRgbValues];

        this.setState({red, green, blue});

        console.log(this.state);
    };

    render() {
        let {red, green, blue} = this.state;
        [red, green, blue] = [red, green, blue].map((value) => Math.min((Math.max(0, value)), 255));

        return <View
            style={ { ...styles.general.view, backgroundColor: `rgba(${ red }, ${ green }, ${ blue }, 1)` } }
            { ...this.panResponderHandlers }
        />;
    };

    createPanResponderHandlers = () => {
        const itsTrue = (event, gestureState) => true;
        const config = {
            onStartShouldSetPanResponder: itsTrue,
            onStartShouldSetPanResponderCapture: itsTrue,
            onMoveShouldSetPanResponder: itsTrue,
            onMoveShouldSetPanResponderCapture: itsTrue,
            onPanResponderMove: this.handlePanMove,
        };

        return PanResponder.create(config).panHandlers;
    };
};

export default app;