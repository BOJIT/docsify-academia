var chpt_num = new Array(6).fill(0);

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
          // Push new header onto array with incremented chapter
          chpt_num[element.depth - 1]++;
          chpt_num.fill(0, element.depth);
          const header_num = '# ' + chpt_num.slice(0, element.depth).join(".") + ' ';
          markdown.push(element.raw.replace('# ', header_num));
          console.log(chpt_num);
          // Update search index
          index = heading_position + element.raw.length;
        }
      });
      // Increment page number and return updated markdown;
      return markdown.join("");
    });

    hook.afterEach(function (html, next) {
      next(html);
    });
  }

  $docsify.plugins = [].concat(install, $docsify.plugins);
}());