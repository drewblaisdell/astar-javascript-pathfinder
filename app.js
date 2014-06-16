requirejs.config({
  baseUrl: 'scripts',
  urlArgs: 'bust=' + (new Date()).getTime()
});

requirejs(['main']);