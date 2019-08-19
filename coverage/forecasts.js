import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Table, Rows } from 'react-native-table-component';


let columnWidth;
class Forecast extends React.Component {
    getNextWeekDay(i) {
        const day = new Date();
        const weeklyNum = day.getDay();
        var weekday = new Array(7);
        weekday[1] = "Mon.";
        weekday[2] = "Tue.";
        weekday[3] = "Wed.";
        weekday[4] = "Thur.";
        weekday[5] = "Fri.";
        weekday[6] = "Sat.";
        weekday[0] = "Sun.";
        let x = weeklyNum + i + 1;
        if (x > 6) {
            x = x % 7;
        }
        return weekday[x];
    }
    
    render() {
        let forecasts = this.props.forecasts;
        if (forecasts) {
            forecasts.map((forecast, index) => {
                forecast.unshift(this.getNextWeekDay(index));
            });
        }
        return (
            <Table style={{ width: "100%" }} borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
                <Rows data={forecasts} textStyle={styles.forecastText} />
            </Table>
        )
    }    
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
     },
    forecastText: {
        textAlign: 'center',
        margin: 6,
        fontFamily: 'Cochin',
        fontSize: 14,
        fontWeight: 'bold'
    }
});


export default Forecast;

