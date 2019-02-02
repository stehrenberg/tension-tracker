import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { times } from "async";
import { Text, View } from 'react-native';
import { Avatar, Card, ListItem, Icon } from 'react-native-material-ui';

import { challenges } from '../data/challenges'
import styles from '../styles';

export default class ChallengeCard extends React.Component {

    render() {
        const { title, text, activated, hint = "default", level } = challenges[0];

        return <Card style={ styles.challengeCard }>
            <ListItem
                leftElement={ <Avatar text="n.A."/> }
                centerElement={ {
                    primaryText: title,
                    secondaryText: `${ ( Moment(activated).fromNow() ) }`,
                } }
                style={ styles.listItem }
            />
            <View style={ styles.general.textContainer }>
                <Text style={ styles.general.text }>{ text }</Text>
                <Text style={ styles.general.hint }>{ hint }</Text>
            </View>
            <View style={ styles.general.textContainer }>
                {
                    times(3, () => <Icon name='star'/>)
                }
            </View>
        </Card>
    }
}

ChallengeCard.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    easier: PropTypes.string,
    activated: PropTypes.instanceOf(Moment),
};