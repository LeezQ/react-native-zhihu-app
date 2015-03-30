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
} = React;

var API_URL = 'http://zhuanlan.zhihu.com/api/columns/pinapps/posts';
var REQUEST_URL = API_URL;

var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData(REQUEST_URL);
  },

  fetchData: function(url) {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={this.renderZhihuHeader}
        onEndReached={this.endReached}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>
          加载知乎中...
        </Text>
      </View>
    );
  },


  endReached: function() {
      this.fetchData('http://zhuanlan.zhihu.com/api/columns/pinapps/posts?limit=10&offset=10');
  },

  renderZhihuHeader: function() {
    return(
      <View style={styles.container}>
          <Text style={styles.infoTitle}>
            知乎专栏
          </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.titleImage}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.publishedTime}</Text>
        </View>
      </View>
    );
  },
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