import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Overview extends React.Component {
    render() {
        return (
            <View style={overviewStyles.overview} hitSlop={{ top: 20, bottom: 10, left: 0, right: 0 }}>
                {this.props.weatherInfo}
            </View>
        )
    }
}

const overviewStyles = StyleSheet.create({
    overview: {        
        padding: 20
    }
});

export default Overview;