import { StyleSheet, Dimensions } from 'react-native';

const styles = {
    general: StyleSheet.create({
        view: {
            flex: 1,
            backgroundColor: '#26cbb5',
            alignItems: 'stretch',
            justifyContent: 'center',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },
        title: {
            color: '#fff',
            fontFamily: 'chalkduster',
            textShadowColor: '#239882',
            paddingTop: 20,
            paddingBottom: 10,
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 20,
            fontSize: 36,
            width: 'auto',
        },
        subTitle: {
            color: '#e44681',
            fontSize: 20,
            fontWeight: 'bold',
        },
        weekDay: {
            position: 'relative',
            fontSize: 12,
            fontFamily: 'pea-walker',
            color: '#000',
            backgroundColor: '#fff',
            alignSelf: 'flex-start',
        },
        text: {
            color: '#595959',
            fontSize: 24,
        },
        hint: {
            color: '#595959',
            fontSize: 24,
            fontWeight: '300',
        },
        textContainer: {
            backgroundColor: '#fff',
            padding: 20,
            width: '100%',
        },
        panHandlerView: {
            flex: 1,
            backgroundColor: '#fff',
            width: "100%",
            height: "100%",
            opacity: 100,
        },
    }),
    /*container: View.propTypes.style,
    //contentViewContainer: View.propTypes.style,
    leftElementContainer: View.propTypes.style,
    centerElementContainer: View.propTypes.style,
    textViewContainer: View.propTypes.style,
    primaryText: Text.propTypes.style,
    firstLine: View.propTypes.style,
    primaryTextContainer: Text.propTypes.style,
    secondaryText: Text.propTypes.style,
    tertiaryText: Text.propTypes.style,
    rightElementContainer: View.propTypes.style,
    leftElement: View.propTypes.style,
    rightElement: View.propTypes.style,*/
    color: StyleSheet.create({
        freshGreen: {
            color: '#26cbb5',
        },
    }),
    listItem: StyleSheet.create({
        primaryText: {
            color: '#e44681',
            fontWeight: "500",
            fontSize: 20,
        },
        secondaryText: {
            fontSize: 12,
        },
    }),
    challengeCard: StyleSheet.create({
        container: {
            borderWidth: 1.5,
            borderStyle: 'solid',
            borderColor: '#1a8373',
            borderRadius: 5,
            shadowColor: '#f0f',
        }
    }),
    views: StyleSheet.create({
        snapButtonView: {
            flex: 0.18,
            backgroundColor: '#595959',
            opacity: 10,
        },
        calendarView: {
            backgroundColor: "#ffe",
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
        },
        weekDayView : {
            height: Dimensions.get('window').height * 0.1,
        }
    }),
    cards: StyleSheet.create(
        {
            weekDay: {
                flex: 1,
                backgroundColor: '#efe',
                borderColor: '#239882',
                borderWidth: 0.5,
            }
        }
    ),
};

export default styles;
