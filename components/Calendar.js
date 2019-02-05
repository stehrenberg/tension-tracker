import React from 'react';
//import { Card, CardContent, CardHeader} from '@material-ui/core';
import { Card, Text, Title } from 'react-native-material-ui';

import styles from '../styles';


const calendar = class Calendar extends React.Component {

    render() {
        const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        const {classes} = this.props;

        return (
            <Card className={ styles.challengeCard.container }>
                <Title>February</Title>
                <View>
                    <View>
                        {
                            WEEKDAYS.map(day => <Text >{`${day}`}</Text>)
                        }
                    </View>
                    <View>
                        {
                            [0, 1, 2, 3, 4].map((number) => (
                                <View>
                                    {
                                        WEEKDAYS
                                            .map((day, i) => (<Text>{`${number * 7 + ++i}`}</Text>))
                                    }
                                </View>)
                            )
                        }
                    </View>
                </View>
            </Card>
        )
    }

}

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