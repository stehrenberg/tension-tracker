import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-material-ui';

import styles from '../styles';


const calendar = class Calendar extends React.Component {

    render() {
        const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

        return (
            <Card className={ styles.challengeCard.container }>
                <View style={ {
                    textContainer:
                        {
                            flex:1,
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
                        <Text style={ styles.general.calendarTitle }>This Week</Text>
                        <View style={{ textContainer: {flex: 1, flexDirection: 'row', alignItems: 'stretched'} }}>
                        {
                            WEEKDAYS.map(day => <Text>{ `${ day }` }</Text>)
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
                        {
                            [0, 1, 2, 3, 4].map((number) => (
                                <View style={ {
                                    textContainer: {
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'stretched',
                                    }
                                } }>
                                    {
                                        //WEEKDAYS.map((day, i) => ( <Text>{ `${ number * 7 + ++i }` }</Text> ))
                                    }
                                </View> )
                            )
                        }
                    </View>
                </View>
            </Card>
        )
    }
};

/*const styles = theme => (
    {
        calendar: {
            width: '80vmax',
        },
        weekdays: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 12,
            color: '#26cbb5',
        },
        daysOfMonth: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: '#9c9c9c'
        },
        weeksOfMonth: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        },
        daysOfWeek: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: 16,
            color: '#9c9c9c',
        },
        day: {
            width: 30,
        }
    }
);*/

export default calendar;