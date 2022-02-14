const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const slugify = require('slugify');
const downloadRouter = express.Router();
const pathToFfmpeg = require('ffmpeg-static');
const YoutubeMp3Downloader = require('youtube-mp3-downloader');
const downloadPath = require('downloads-folder');

downloadRouter.get('/:videoId', async (req, res, next) => {
  console.log(pathToFfmpeg);
  console.log(downloadPath.windows());

  try {
    var YD = new YoutubeMp3Downloader({
      ffmpegPath: pathToFfmpeg, // FFmpeg binary location
      outputPath: downloadPath.windows(),
      youtubeVideoQuality: 'highestaudio', // Desired video quality (default: highestaudio)
      queueParallelism: 2, // Download parallelism (default: 1)
      progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
      allowWebm: false, // Enable download from WebM sources (default: false)
    });

    YD.download('gT3zXBd2ksk');

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
  /* try {
      const videoUrl = `https://www.youtube.com/watch?v=${req.params.videoId}`;
  
      if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).send({ error: "Invalid YouTube Url" });
      }
  
      const videoInfo = await ytdl.getBasicInfo(videoUrl);
      const fileName =
        slugify(videoInfo.videoDetails.title, { replacement: " ", locale: "en", remove: /[\/\?<>\\:\*\|"]/g }) || "file";
  
      res.set({
        "Content-Disposition": `attachment; filename="${fileName}.mp3"`,
        "Access-Control-Expose-Headers": "Content-Disposition",
        "Content-Type": "audio/mpeg",
      });
  
      const downloadAudio = ytdl(videoUrl, { quality: "highestaudio" });
  
      downloadAudio.on("error", (err) => {
        return res.status(400).send({ error: "Download failed!" });
      });
  
      const convertAudio = new ffmpeg({ source: downloadAudio });
  
      // convert.setFfmpegPath("ffmpegLocation") // Uncomment only if you need to set the ffmpeg path here!
      // If you have the ffmpeg path in your environment variables you don't need this!
  
      convertAudio.withAudioCodec("libmp3lame").toFormat("mp3").output(res).run();
  
      convertAudio.on("error", () => {
        convertAudio.kill();
        downloadAudio.destroy();
  
        return res.status(400).send({ error: "Download canceled by the user" });
      });
  
      convertAudio.on("end", () => {
        return res.end();
      });
    } catch (err) {
      res.status(400).send({ error: "Something went wrong" });
    }*/
});

module.exports = downloadRouter;
