let options = {
  throwOnError: false,
  displayMode: false
};
let blockOptions = {
  throwOnError: false,
  displayMode: true
};

(function () {
  function install(hook) {
    hook.beforeEach(content => {
      return content;
    });
    hook.afterEach(function (html, next) {
      next(html);
    });
  }

  $docsify.plugins = [].concat(install, $docsify.plugins);
}());