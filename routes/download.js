const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const slugify = require('slugify');
const downloadRouter = express.Router();
const os = require('os');
const pathToFfmpeg = require('ffmpeg-static');
const YoutubeMp3Downloader = require('youtube-mp3-downloader');




downloadRouter.get('/:videoId', async (req, res, next) => {

  var OSName="Unknown OS";
  let dpath='';
  const clientOS = req.headers['user-agent'];
  if (clientOS.indexOf("Win")!=-1) OSName="Windows";
  if (clientOS.indexOf("Mac")!=-1) OSName="MacOS";
  if (clientOS.indexOf("X11")!=-1) OSName="UNIX";
  if (clientOS.indexOf("Linux")!=-1) OSName="Linux";
  console.log(OSName);
  console.log(process.env.HOME);

  if(OSName=="Windows")
  {
    dpath='C:/Users/'+os.userInfo().username+'/Downloads';
  }
  else{
    dpath='~/Downloads';
  }

  /*try {
    var YD = new YoutubeMp3Downloader({
      ffmpegPath: pathToFfmpeg, // FFmpeg binary location
      outputPath:dpath,
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
  }*/
});

module.exports = downloadRouter;
