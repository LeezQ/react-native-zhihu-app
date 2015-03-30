'use strict';

var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
} = React;

var Posts = React.createClass({

    render: function() {
        return(
            <View style={styles.container}>
                <Text style={styles.loadingText}>
                    Fetching Posts...
                </Text>
            </View>
        );
    }

});

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#0099EE',
        height: 800,
        paddingTop:100,
    },

    loadingText: {
        height: 100,
        paddingTop: 100,
        color: '#000000',
    }
})

module.exports = Posts;