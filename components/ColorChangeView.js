import React from 'react';
import { Text, View, PanResponder, Dimensions, TouchableHighlight } from 'react-native';

const colorChangeView = class ColorChangeView extends React.Component {

    view = null;

    render() {
        const { style, color } = this.props;
        const backgroundColor = this.generateRGBColorString(...color);
        const newStyle = { ...style, backgroundColor };

        return <View ref={ view => this.view = view } style={ { ...newStyle } }/>
    }

    generateRGBColorString = (
        red = 255,
        green = 0,
        blue = 255
    ) => `rgba(${ red }, ${ green }, ${ blue }, 1)`;
};

export default colorChangeView;