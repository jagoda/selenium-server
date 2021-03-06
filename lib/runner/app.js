var util  = require('util'),
    spawn = require('child_process').spawn,
    fs    = require('fs'),
    wd    = __dirname + '/../..',
    args  = process.argv.slice(2),
    selenium
          = spawn(
              'java',
              ['-jar', __dirname + '/selenium-server-standalone-2.44.0.jar'].concat(args)
            ),
    ok    = false,
    out   = fs.createWriteStream(wd + '/logs/selenium.out', {flags: 'a'}),
    err   = fs.createWriteStream(wd + '/logs/selenium.err', {flags: 'a'});

selenium.stderr.on('data', function(data) {
  if (/^execvp\(\)/.test(data)) {
    console.log('Failed to start selenium. Please ensure that java '+
      'is in your system path');
  }
  else if (!ok) {
    ok = true;
    console.log("Selenium is started.");
    console.log("All output can be found at: " + wd + '/logs');
  }
});

selenium.stdout.pipe(out);
selenium.stderr.pipe(err);
