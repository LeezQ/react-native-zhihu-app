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
    render: function() {
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
  infoTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  rightContainer: {
    flex: 1,
    padding: 5,
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 3,
    textAlign: 'left',
  },
  year: {
    fontSize: 12,
    color: '#999999',
  },
  thumbnail: {
    flex: 1,
    height: 200,
  },
  listView: {
    paddingTop: 20,
  },

  loadingText: {
    marginTop: 100,
    textAlign: 'center',
    flex: 1,
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);