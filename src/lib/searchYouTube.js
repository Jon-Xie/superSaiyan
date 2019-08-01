var searchYouTube = (options, callback) => {
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${options.max || 5}&q=${options.query}&videoEmbeddable=true&key=${options.key}`,
    method: 'GET',
    success: (data) => callback(data.items)
  });
};

export default searchYouTube;
