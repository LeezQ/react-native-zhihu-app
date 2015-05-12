/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  } = React;

var PostsView = require('./App/Views/Posts');

var AwesomeProject = React.createClass({
  render: function () {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#FF6600'
        initialRoute={{
          title: '知乎专栏',
          component: PostsView,
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);