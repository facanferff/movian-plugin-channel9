function getOptionValues(sort) {
  return {
    "sort": sort
  };
}

exports.initializePageMenu = function (page, options, callback) {
  if (page.options) {
    if (options.sort) {
      page.options.createMultiOpt("sort", "Sort by", options.sort, function (key) {
        log.d("Set sort by to: " + key);
        if (page.asyncPaginator) callback(getOptionValues(key));
      });
    }
  }
};
