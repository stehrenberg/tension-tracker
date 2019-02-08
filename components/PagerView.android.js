import React from 'react';
import { View, ViewPagerAndroid } from 'react-native';

import styles from "../styles";

export default class PagerView extends React.Component {

    render() {
        return (
            <ViewPagerAndroid
                initialPage={ 1 }
                style={ styles.general.panHandlerView } { ...this.props }>
                { this.props.children }
            </ViewPagerAndroid>
        );
    }
}