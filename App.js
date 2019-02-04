import React from 'react';
import { Text, View, PanResponder, Dimensions } from 'react-native';

import ColorChangeView from './components/ColorChangeView';
import styles from './styles';


const app = class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            red: 0,
            green: 0,
            blue: 0,
        };
        this.colorChangeView = null;
        this.panResponderHandlers = this.createPanResponderHandlers();
        this.currentRGBValues = { ...this.state };
        this.initialPinchCoords = [];
    }

    handlePanGrant = (event, gestureState) => {
        this.initialPinchCoords = event.nativeEvent.changedTouches.map(touch => ( { x: touch.pageX, y: touch.pageY } ));
    };

    handlePanMove = (event, gestureState) => {

        const { numberActiveTouches, touches } = gestureState;
        let { red, green, blue } = this.state;
        const rgbValues = [red, green, blue];
        const { dx, dy } = gestureState;
        const { height } = Dimensions.get('window');

        const changeBrightness = () => {
            const brightnessDelta = 255 * dy / ( height << 1 );
            const newRgbValues = rgbValues.map(value => Math.max(Math.min(value - brightnessDelta, 255), 0));
            [red, green, blue] = [...newRgbValues];

            return { red, green, blue };
        };

        const changeHue = () => {
            const maxDistance = this.calcLengthOf(this.calcVectorBetween(this.initialPinchCoords));
            const touchCoordinates = event.nativeEvent.changedTouches.map((touch) => ( {
                x: touch.pageX,
                y: touch.pageY
            } ));
            const deltaDistance = this.calcLengthOf(this.calcVectorBetween(touchCoordinates)) || 0;
            const relativeColorDelta = ((maxDistance - deltaDistance) / maxDistance || 0);
            const colorDelta = 255 * relativeColorDelta;

            const newRed = green >= 255? Math.max(red - colorDelta, 0) : red + colorDelta;
            const newRedCrunched = Math.max(Math.min(newRed, 255), 0);
            const newGreen = newRed >= 255 ? green + (newRed - 255) : newRed <= 0 && green >= 255? green + colorDelta :green;
            const newGreenCrunched = Math.min(newGreen, 255);
            const newBlue = newGreen >= 255 && newRed < 1 ? blue + (newGreen -255) : blue;
            const newBlueCrunched = Math.min(newBlue, 255);
            const finalRed = newGreen >= 255? Math.max( newRedCrunched - newGreen + 255, 0) : newRedCrunched;
            const finalGreen = blue >= 255? Math.max(newGreenCrunched - colorDelta, 0) : newGreenCrunched;


            console.log(newGreen, newBlue);
            return { red: finalRed, green: finalGreen, blue: newBlueCrunched };
        };

        const backgroundColor = numberActiveTouches === 1 ? changeBrightness() : changeHue();
        console.log(backgroundColor);

        this.currentRGBValues = { ...backgroundColor };
        this.colorChangeView && this.colorChangeView.setNativeProps({ backgroundColor: this.generateRGBColorString(red, green, blue) });
    };

    handlePanEnd = (event, gestureState) => {
        this.setState({ ...this.currentRGBValues });
    };

    render() {
        return (
            <View style={ styles.general.panHandlerView } { ...this.panResponderHandlers }>
                <ColorChangeView
                    ref={ colorChangeView => {
                        this.colorChangeView = colorChangeView;
                    } }
                    style={ { ...styles.general.view, backgroundColor: this.generateRGBColorString() } }/>
                <Text style={ { fontSize: 36, alignSelf: 'center', position: 'absolute', bottom: 50 } }>Hi!</Text>
            </View>
        );
    };

    generateRGBColorString = (
        red = this.state.red,
        green = this.state.green,
        blue = this.state.blue
    ) => {
        return `rgba(${ red }, ${ green }, ${ blue }, 1)`;
    };

    calcVectorBetween = (vectorPair) => vectorPair.reduce(
        (prev = { x: 0, y: 0 }, current) => (
            {
                dx: current.x - prev.x,
                dy: current.y - prev.y
            } )
    );

    calcLengthOf = ({dx, dy}) => Math.sqrt(Math.abs( dx * dx + dy * dy ));

    createPanResponderHandlers = () => {
        const itsTrue = (event, gestureState) => true;
        const config = {
            onStartShouldSetPanResponder: itsTrue,
            onStartShouldSetPanResponderCapture: itsTrue,
            onMoveShouldSetPanResponder: itsTrue,
            onMoveShouldSetPanResponderCapture: itsTrue,
            onPanResponderGrant: this.handlePanGrant,
            onPanResponderMove: this.handlePanMove,
            onPanResponderRelease: this.handlePanEnd,
            onPanResponderTerminate: this.handlePanEnd,
        };

        return PanResponder.create(config).panHandlers;
    };
};

export default app;