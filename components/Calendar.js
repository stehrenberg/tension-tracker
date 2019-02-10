import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-material-ui';
import { LinearGradient } from 'expo';
import Moment from 'moment';

import Weekday from './Weekday';

import styles from '../styles';
import { data } from '../data/entries';


const calendar = class Calendar extends React.Component {

    constructor(props) {
        super(props);
        const displayWeekNo = Moment().format("W");
        this.state = {
            displayWeekNo,
            weekEntries: [],
        }
    }

    getEntriesForWeek = (week) => {
        const startOfWeek = Moment(week, "W").startOf("isoWeek");
        return data.filter((entry) => Moment(entry.date).isSameOrAfter(startOfWeek));
    };

    getEntriesForWeekday = (weekday) => {
        const weekEntries = this.getEntriesForWeek(this.state.displayWeekNo);
        return weekEntries.filter((entry) => Moment(entry.date).format("ddd").toLocaleUpperCase() === weekday);
    };

    render() {
        const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

        return (
            <View style={ styles.general.view }>
                <Text style={ styles.general.title }>Your Rainbow</Text>

                <View style={ {
                    textContainer:
                        {
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            ...styles.general.textContainer
                        }
                } }>
                    <View style={ {
                        textContainer: {
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'stretched',
                        }
                    } }>
                        <View style={ { textContainer: { flex: 1, flexDirection: 'row', alignItems: 'stretched' } } }>
                            {
                                WEEKDAYS.map(
                                    day => (
                                        <Weekday
                                            key={ day }
                                            day={ day }
                                            data={ this.getEntriesForWeekday(day) }/>)
                                )
                            }
                        </View>
                    </View>
                    <View style={ {
                        textContainer: {
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'stretched',
                        }
                    } }>
                    </View>
                </View>
            </View>
        )
    }
};

export default calendar;