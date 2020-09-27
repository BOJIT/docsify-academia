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
      const tokens = marked.lexer(content);
      var markdown = [];
      var index = 0;
      tokens.forEach(element => {
        if(element.type === "heading") {
          // Find location of corresponding header
          var heading_position = content.indexOf(element.raw, index);
          // Push preceeding markdown onto array
          markdown.push(content.slice(index, heading_position));
          // Push new header onto array
          markdown.push(element.raw.replace('# ', '# 1.5.6 '))
          index = heading_position + element.raw.length;
        }
      });
      return markdown.join("");
    });

    hook.afterEach(function (html, next) {
      next(html);
    });
  }

  $docsify.plugins = [].concat(install, $docsify.plugins);
}());