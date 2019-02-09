import React from 'react';
import Moment from "moment";
import { Text, View, Dimensions } from "react-native";
import { Card } from "react-native-material-ui";
import { LinearGradient } from "expo";

import styles from '../styles';
import { data } from "../data/entries";

export default class Weekday extends React.Component {


    render() {
        const { height, width } = Dimensions.get('window');

        return (
            <View>
                <Card style={ styles.cards.weekDay }>
                    <View style={ { ...styles.views.weekDayView, flexDirecton: 'row' } }>
                        <LinearGradient
                            colors={ [
                                ...data.filter(entry => Moment(entry.date).format('DD') == "06")
                                    .map(entry => `rgba(${ entry.color.join(',') })`),
                            ] }
                            start={ [0.0, 0.0] }
                            end={ [ 1.0, 0.0 ] }
                            style={ {
                                position: 'relative',
                                height: '100%',
                                width: '100%',
                            } }
                        >
                            <Text style={
                                {
                                    ...styles.general.weekDay,
                                    flex: 1,
                                    width: '100%',
                                    backgroundColor: 'transparent',
                                } }>
                                {
                                    this.props.day
                                }
                            </Text>
                        </LinearGradient>
                    </View>
                </Card>
            </View>
        );
    }
}