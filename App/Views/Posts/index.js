'use strict';

var React = require('react-native');

var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var REQUEST_URL = 'http://zhuanlan.zhihu.com/api/columns/pinapps/posts?limit=10&offset=';

var Posts = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      responseData: [],
      loaded: false,
      pageOffset: 0, 
      loading: false,
    };
  },

  componentDidMount: function() {
    this.fetchData(REQUEST_URL + this.state.pageOffset * 10);
  },

  fetchData: function(url) {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        var data = this.state.responseData.concat(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          loaded: true,
          responseData: data,
          pageOffset: ++this.state.pageOffset,
          loading: false,
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
        pageSize={10}
        renderRow={this.renderMovie}
        style={styles.listView}
        renderFooter={this.renderFooter}
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
    this.fetchData(REQUEST_URL + this.state.pageOffset * 10);
  },

  loadMore: function() {
    this.setState({
        loading: true 
    });
    this.fetchData(REQUEST_URL + this.state.pageOffset * 10);
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

  renderFooter: function() {
    return (
          <TouchableHighlight 
            onPress={this.loadMore}
            underlayColor='#FFFFFF'>
            <View style={styles.containerFooter}>
              <Text style={styles.loadeMoreBtn}>
                点击加载...
              </Text>
              {this.state.loading ? 
                <Image
                source={{uri: 'http://s6.mogucdn.com/pic/140813/kuw9n_ieyggojrmi4dknlbmiytambqgiyde_26x26.gif'}}
                style={{width:26, height:26, flex: 1, marginLeft: -80}}
              />
                : <Image
                source={{uri: ''}}
                style={{width:26, height:26, flex: 1, marginLeft: -80}}
              />
            }
              
            </View>
          </TouchableHighlight>
        )
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
  },

  containerFooter: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent:'center',
  },

  loadeMoreBtn: {
    textAlign: 'right',
    flex: 1,
    color: '#f34943',
    fontSize: 14,
    marginTop: 5,
  },
});

module.exports = Posts;