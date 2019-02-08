import React from 'react';
import { View, ScrollView, ViewPagerAndroid } from 'react-native';

export default class PagerView extends React.Component {

    render() {
        console.log("ios:", this.props);
        return (
            <ScrollView style={ { backgroundColor: "#0ff" } } pagingEnabled={ true }>
                { this.props.children }
            </ScrollView>
        );

    }
}