import React from 'react';
import { View, PanResponder, Dimensions, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { Font } from 'expo';
import Moment from 'moment';

import ColorChangeView from './components/ColorChangeView';
import PagerView from './components/PagerView';
import Calendar from './components/Calendar';

import styles from './styles';
import { data } from './data/entries';

const app = class App extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                red: 200,
                green: 0,
                blue: 0,
                loaded: false,
                saving: false,
            };
            this.colorChangeView = null;
            this.panResponderHandlers = this.createPanResponderHandlers();
            this.currentRGBValues = { ...this.state };
            this.initialPinchCoords = [];
        }

        async componentDidMount() {
            await Font.loadAsync({
                'chalkduster': require('./assets/fonts/chalkduster.ttf'),
                'pea-walker': require('./assets/fonts/pea-walker.ttf'),
                'glotona-white': require('./assets/fonts/glotona-white.ttf'),
            });

            this.setState({ loaded: true });
        }

        handlePanGrant = (event, gestureState) => {
            const { touches } = { ...event.nativeEvent };
            const useTouches = event.nativeEvent.changedTouches.length > 2
                ? event.nativeEvent.changedTouches
                : touches;
            this.initialPinchCoords = useTouches.map(touch => ( { x: touch.pageX, y: touch.pageY } ));
        };

        handlePanMove = (event, gestureState) => {

            let { red, green, blue } = this.state;
            const { numberActiveTouches } = gestureState;
            const { touches } = { ...event.nativeEvent };
            const rgbValues = [red, green, blue];
            const { dx, dy } = gestureState;
            const { height } = Dimensions.get('window');

            const changeBrightness = () => {
                const brightnessDelta = 255 * dy / ( height << 1 );
                const newRgbValues = rgbValues.map(value => Math.max(Math.min(value - brightnessDelta, 255), 0));
                [red, green, blue] = [...newRgbValues];

                return { red, green, blue };
            };

            const changeHue = () => {
                const maxDistance = this.calcLengthOf(this.calcVectorBetween(this.initialPinchCoords));
                const useTouches = event.nativeEvent.changedTouches.length > 2
                    ? event.nativeEvent.changedTouches
                    : touches;
                const touchCoordinates = useTouches.map((touch) => ( {
                    x: touch.pageX,
                    y: touch.pageY
                } ));
                const deltaDistance = this.calcLengthOf(this.calcVectorBetween(touchCoordinates)) || 0;
                const relativeColorDelta = ( ( maxDistance - deltaDistance ) / maxDistance || 0 );
                const colorDelta = 255 * relativeColorDelta;

                const newRed = green >= 255 ? Math.max(red - colorDelta, 0) : red + colorDelta;
                const newRedCrunched = Math.max(Math.min(newRed, 255), 0);
                const newGreen = newRed >= 255 && blue <= 0 ? green + ( newRed - 255 ) : newRed <= 0 && green >= 255 ? green + colorDelta : green;
                const newGreenCrunched = Math.min(newGreen, 255);
                const newBlue = newGreen >= 255 && newRed < 1 ? blue + ( newGreen - 255 ) : blue;
                const newBlueCrunched = Math.min(newBlue, 255);
                const temporaryRed = newGreen >= 255 ? Math.max(newRedCrunched - newGreen + 255, 0) : newRedCrunched;
                const finalGreen = blue >= 255 ? Math.max(newGreenCrunched - colorDelta, 0) : newGreenCrunched;
                const finalRed = blue >= 255 && green > 0 ? 0 : temporaryRed;
                const finalBlue = green <= 0 && finalRed >= 255 ? Math.max(newBlueCrunched - colorDelta, 0) : newBlueCrunched;

                return { red: finalRed, green: finalGreen, blue: finalBlue };
            };

            const backgroundColor = numberActiveTouches === 1 ? changeBrightness() : changeHue();

            this.currentRGBValues = { ...backgroundColor };
            this.setState({ ...backgroundColor });
        };

        handlePanEnd = (event, gestureState) => {
            this.setState({ ...this.currentRGBValues });
        };

        saveColor = () => {
            this.setState({ saving: true });
            const { red, green, blue } = this.state;
            const newEntry = {
                date: Moment().format("YYYY-MM-DD HH:mm:ss"),
                color: [red, green, blue, 1]
            };
            data.push(newEntry);
            this.storeData(newEntry.date, newEntry).then(this.setState({ saving: false }));
        };

        storeData = async (key, ...data) => {
            try {
                await AsyncStorage.setItem(key, JSON.stringify(data),
                    (err, result = 'nuffin') => this.setState({ saving: false }));
            } catch (error) {
                console.log("something went wrong - could not store data.", error);
                this.saveColor();
            }
        };


        render() {
            return this.state.loaded && (
                <PagerView style={ styles.general.panHandlerView } { ...this.panResponderHandlers }>
                    <TouchableWithoutFeedback onLongPress={ this.saveColor }>
                        <View key="1" style={ { ...styles.general.view } }>
                            <ColorChangeView
                                ref={ colorChangeView => {
                                    this.colorChangeView = colorChangeView;
                                } }
                                style={ { ...styles.general.view } }
                                color={ [this.state.red, this.state.green, this.state.blue] }
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View key="2" style={ { ...styles.views.calendarView } }>
                        <Calendar/>
                    </View>
                </PagerView>
            );
        }

        calcVectorBetween = (vectorPair) => vectorPair.reduce(
            (prev = { x: 0, y: 0 }, current) => (
                {
                    dx: current.x - prev.x,
                    dy: current.y - prev.y
                } )
        );

        calcLengthOf = ({ dx, dy }) => Math.sqrt(Math.abs(dx * dx + dy * dy));

        createPanResponderHandlers = () => {
            const itsTrue = (event, gestureState) => true;
            const config = {
                onStartShouldSetPanResponder: itsTrue,
                onStartShouldSetPanResponderCapture: itsTrue,
                onMoveShouldSetPanResponder: itsTrue,
                onMoveShouldSetPanResponderCapture: itsTrue,
                onPanResponderGrant: this.handlePanGrant,
                onPanResponderMove: this.handlePanMove,
                onPanResponderRelease: this.handlePanEnd,
                onPanResponderTerminate: this.handlePanEnd,
            };

            return PanResponder.create(config).panHandlers;
        };
    }
;

export default app;