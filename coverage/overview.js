import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Overview extends React.Component {
    render() {
        return (
            <View style={overviewStyles.overview}>
                {this.props.weatherInfo}
            </View>
        )
    }
}

const overviewStyles = StyleSheet.create({
    overview: {        
        flexDirection: 'column',
        flex: 1,
        padding: 20
    }
});

export default Overview;