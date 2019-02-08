import React from 'react';
import { View, ScrollView, ViewPagerAndroid } from 'react-native';

export default class PagerView extends React.Component {

    render() {
        return (
            <ScrollView
                pagingEnabled={ true }
                showsHorizontalScrollIndicator={ true }
                horizontal={ true }
                {...this.props}>
                { this.props.children }
            </ScrollView>
        );
    }
}