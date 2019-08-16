import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class CurrentWeather extends React.Component {
    componentDidMount() {
        // let columnCont = this.props.columnCont;
        // if (columnCont > 1) {
        //     let percent = (100 / columnCont).toFixed(2) + '%';
        //     let test = this.document;
        //     let allTds = document.getElementsByClassName('timeStyle');
        //     for (let index = 0; index < allTds.length; index++) {
        //         allTds[index].width = percent;
        //     }
        // }
    }


    getWeekDay() {
        const day = new Date();
        const weeklyNum = day.getDay();
        var weekday = new Array(7);
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        weekday[0] = "Sunday";
        return weekday[weeklyNum];
    }

    
    // divide different columns averagly
    renderWeather(timeWeather) {
        return (
            <View style={{ alignSelf: 'stretch'}}>
                <View style={{ alignSelf: 'stretch' }}>
                    <Text>{timeWeather[0]}</Text>
                </View>
                <View style={{ alignSelf: 'stretch' }}>
                    <Image style={{ width: 50, height: 50 }} source={timeWeather[1]} />
                </View>
                <View style={{ alignSelf: 'stretch' }}>
                    <Text>{timeWeather[2]}<Text style={styles.text}>&#8451;</Text></Text>
                </View>
            </View>
        );        
    }
    
    render() {
        const todayWeather = [];
        todayWeather.push(this.getWeekDay());
        todayWeather.push('Today');
        todayWeather.push(this.props.highest);
        todayWeather.push(this.props.lowest);

        const timeWeathers = this.props.timeWeather;
        
        return (
            <View>
                <View style={styles.today}>
                    <View style={styles.date} hitSlop={{ top: 10, bottom: 10, left: 0}}>
                        <Text style={styles.dateText}>{todayWeather[0]}</Text>
                        <Text style={styles.dateText}>{todayWeather[1]}</Text>
                    </View>

                    <View style={styles.temp} hitSlop={{ top: 10, bottom: 10, right: 0 }}>
                        <Text style={styles.tempText}>{todayWeather[2]}<Text style={styles.tempText}>&#8451;</Text></Text>
                        <Text style={styles.tempText}>{todayWeather[3]}<Text style={styles.tempText}>&#8451;</Text></Text>
                    </View>

                </View>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        flexDirection: 'row'
                    }}
                />
                <View style={styles.today}>
                    {
                        timeWeathers.map((timeWeather) => { // This will render a row for each data element.
                            return this.renderWeather(timeWeather);
                        })
                    }
                </View>                
                {/* <Table>
                    <Cols data={this.props.timeWeather} heightArr={[40, 30, 30, 30, 30]} textStyle={styles.text} />
                </Table> */}
                <View
                    style={{
                        
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        flexDirection: 'row'
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    today: {
        alignItems: 'stretch', padding: 16, paddingTop: 10, backgroundColor: '#fff', flexDirection: 'row'
    },
    date: {
        alignItems: 'flex-start', padding: 16, paddingTop: 10, backgroundColor: '#fff', flexDirection: 'row'
    },
    temp: {
        alignItems: 'flex-end', padding: 16, paddingTop: 10, backgroundColor: '#fff', flexDirection: 'row'
    },
    dateText: {
        textAlign: 'left',
        margin: 6,
        fontFamily: 'Cochin',
        fontSize: 16,
        fontWeight: 'bold'
    },
    tempText: {
        textAlign: 'right',
        margin: 6,
        fontFamily: 'Cochin',
        fontSize: 16,
        fontWeight: 'bold'
    }

});


export default CurrentWeather;