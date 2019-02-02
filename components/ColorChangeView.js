import React from 'react';
import { Text, ScrollView, PanResponder, Dimensions } from 'react-native';

const colorChangeView = class ColorChangeView extends React.Component {

    view = null;

    render() {
        const { style } = this.props;

        return <ScrollView ref={ view => this.view = view }
                           style={{contentContainer: style }}
        />;
    }

    setNativeProps(props) {
        this.view.setNativeProps(props);
    }

};

export default colorChangeView;