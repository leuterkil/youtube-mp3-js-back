const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const slugify = require('slugify');
const downloadRouter = express.Router();
const os = require('os');
const pathToFfmpeg = require('ffmpeg-static');
const YoutubeMp3Downloader = require('youtube-mp3-downloader');

downloadRouter.get('/:videoId', async (req, res, next) => {
  
  const dpath=os.homedir()+'\\Downloads';
  const dPath = os.homedir();

  try {
    var YD = new YoutubeMp3Downloader({
      ffmpegPath: pathToFfmpeg, // FFmpeg binary location
      youtubeVideoQuality: 'highestaudio', // Desired video quality (default: highestaudio)
      queueParallelism: 2, // Download parallelism (default: 1)
      progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
      allowWebm: false, // Enable download from WebM sources (default: false)
    });

    YD.download(req.params.videoId);

    YD.on('finished', function (err, data) {
      console.log(JSON.stringify(data));
    });

    YD.on('error', function (error) {
      console.log(error);
      next();
    });

    YD.on('progress', function (progress) {
      console.log(JSON.stringify(progress));
    });
  } catch {
    console.log('error');
  }
});

module.exports = downloadRouter;
