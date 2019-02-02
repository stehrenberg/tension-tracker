import React from 'react';
import { Text, View, PanResponder, Dimensions } from 'react-native';

const colorChangeView = class ColorChangeView extends React.Component {

    view = null;

    render() {
        const { style } = this.props;

        return <View ref={ view => this.view = view }style={ style } />;
    }

    setNativeProps(props) {
        this.view.setNativeProps(props);
    }

};

export default colorChangeView;