import React from 'react';
import Moment from "moment";
import { Text, View } from "react-native";
import { Card } from "react-native-material-ui";
import { LinearGradient } from "expo";

import styles from '../styles';

export default class Weekday extends React.Component {


    render() {
        const { day } = this.props;
        const defaultEntry = { color: [1,1,1,0] };
        let { data } = this.props;

        data = data.length > 0 ? [...data] : [defaultEntry];

        console.log(data);
        return (
            <View>
                <Card style={ styles.cards.weekDay }>
                    <View style={ { ...styles.views.weekDayView, flexDirecton: 'row' } }>
                        <LinearGradient
                            colors={ [
                                'rgba(1,1,1,0)',
                                ...data.map(entry => `rgba(${ entry.color.join(',') })`)
                                || 'rgba(1,1,1,0)'
                            ]}
                            start={ [0.0, 0.0] }
                            end={ [1.0, 0.0] }
                            style={ {
                                position: 'relative',
                                height: '100%',
                                width: '100%',
                            } }>
                            <Text style={
                                {
                                    ...styles.general.weekDay,
                                    flex: 1,
                                    width: '100%',
                                    backgroundColor: 'transparent',
                                } }>
                                {
                                    day
                                }
                            </Text>
                        </LinearGradient>
                    </View>
                </Card>
            </View>
        );
    }
}