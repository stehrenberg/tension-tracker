import React from 'react';
import { Text, View, PanResponder, Dimensions } from 'react-native';

import ColorChangeView from './components/ColorChangeView';
import styles from './styles';

const app = class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            red: 127,
            green: 0,
            blue: 0
        };
        this.colorChangeView = null;
        this.panResponderHandlers = this.createPanResponderHandlers();
        this.currentRGBValues = {...this.state};
    }

    handlePanMove = (event, gestureState) => {
        let { red, green, blue } = this.state;
        const rgbValues = [red, green, blue];
        const { dx, dy } = gestureState;
        const { height } = Dimensions.get('window');
        const relativeBrightnessDelta = 255 * dy / ( height << 1 );
        const newRgbValues = rgbValues.map(value => Math.max(Math.min(value - relativeBrightnessDelta, 255), 0));
        [red, green, blue] = [...newRgbValues];
        this.currentRGBValues = { red, green, blue };

        this.colorChangeView && this.colorChangeView.setNativeProps({ backgroundColor: this.generateRGBColorString(red, green, blue) });
    };

    handlePanEnd = (event, gestureState) => {
        this.setState({...this.currentRGBValues});
    };


    render() {
        return (
            <View style={ styles.general.panHandlerView } { ...this.panResponderHandlers }>
                <ColorChangeView
                    ref={ colorChangeView => { this.colorChangeView = colorChangeView; } }
                    style={ {...styles.general.view, backgroundColor: this.generateRGBColorString() }} />
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


    createPanResponderHandlers = () => {
        const itsTrue = (event, gestureState) => true;
        const config = {
            onStartShouldSetPanResponder: itsTrue,
            onStartShouldSetPanResponderCapture: itsTrue,
            onMoveShouldSetPanResponder: itsTrue,
            onMoveShouldSetPanResponderCapture: itsTrue,
            onPanResponderRelease: this.handlePanEnd,
            onPanResponderTerminate: this.handlePanEnd,
            onPanResponderMove: this.handlePanMove,
        };

        return PanResponder.create(config).panHandlers;
    };
};

export default app;