import VideoList from './VideoList.js';
import videosData from '../data/exampleVideoData.js';
import VideoPlayer from './videoPlayer.js';
import Search from './Search.js';
import YOUTUBE_API_KEY from '../config/youtube.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videosData: videosData,
      currentVideo: videosData[0]
    }
    this.onVideoChange = this.onVideoChange.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }
  // init function: communicate with youtube API
  componentDidMount() {
    this.props.searchYouTube({
      key: YOUTUBE_API_KEY,
      query: 'super saiyan',
      max: 10
    }, (data) => this.setState({
      videosData: data,
      currentVideo: data[0]
    }));
  }

  // change video to the one we clicked
  onVideoChange(video) {
    this.setState({ currentVideo: video });
  }

  onSearchHandler(queryValue) {
    this.props.searchYouTube({
      key: YOUTUBE_API_KEY,
      query: queryValue,
      max: 10
      // this refers to the success callback in searchYouTube.js
    }, (data) => this.setState({
      videosData: data,
      currentVideo: data[0]
    }));
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search onSearchHandler={this.onSearchHandler} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo} />
          </div>
          <div className="col-md-5">
            <VideoList onClickHandler={this.onVideoChange} videos={this.state.videosData} />
          </div>
        </div>
      </div>
    )
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
