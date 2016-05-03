var loader = require("./loader");
var movian = require("./movian");

function fillSortBy(page, sortOptions, callback) {
  movian.initializePageMenu(page, {
    "sort": sortOptions
  }, callback);

  if (sortOptions) page.metadata.title += " (" + sortOptions[0][1] + ")";
}

exports.authors = function (page, args) {
  page.type = "directory";
  page.model.contents = "grid";
  page.metadata.title = PLUGIN_NAME + " - Authors";
  page.metadata.icon = Plugin.path + "logo.png";

  var url = "https://channel9.msdn.com/Browse/Authors";
  fillSortBy(page, loader.getSortOptions(url), function (newArgs) {
    page.flush();
    loader.authors(page, url, newArgs || args);
  });
  loader.authors(page, url, args);
};

exports.shows = function (page, args) {
  page.type = "directory";
  page.model.contents = "grid";
  page.metadata.title = "Shows";
  page.metadata.icon = Plugin.path + "logo.png";

  var url = "https://channel9.msdn.com/Browse/Shows";
  fillSortBy(page, loader.getSortOptions(url), function (newArgs) {
    page.flush();
    loader.shows(page, url, newArgs || args);
  });
  loader.shows(page, url, args);
};

exports.series = function (page, args) {
  page.type = "directory";
  page.model.contents = "grid";
  page.metadata.title = "Series";
  page.metadata.icon = Plugin.path + "logo.png";

  var url = "https://channel9.msdn.com/Browse/Series";
  fillSortBy(page, loader.getSortOptions(url), function (newArgs) {
    page.flush();
    loader.series(page, url, newArgs || args);
  });
  loader.series(page, url, args);
};

exports.blogs = function (page, args) {
  page.type = "directory";
  page.model.contents = "grid";
  page.metadata.title = "Blogs";
  page.metadata.icon = Plugin.path + "logo.png";

  var url = "https://channel9.msdn.com/Browse/Blogs";
  fillSortBy(page, loader.getSortOptions(url), function (newArgs) {
    page.flush();
    loader.blogs(page, url, newArgs || args);
  });
  loader.blogs(page, url, args);
};

exports.events = function (page, args) {
  page.type = "directory";
  page.model.contents = "grid";
  page.metadata.title = "Events";
  page.metadata.icon = Plugin.path + "logo.png";

  var url = "https://channel9.msdn.com/Browse/Events";
  fillSortBy(page, loader.getSortOptions(url), function (newArgs) {
    page.flush();
    loader.events(page, url, newArgs || args);
  });
  loader.events(page, url, args);
};

exports.event = function (page, url, args) {
  page.type = "directory";
  page.model.contents = "grid";
  page.metadata.title = "Event";
  page.metadata.icon = Plugin.path + "logo.png";

  fillSortBy(page, loader.getSortOptions(url), function (newArgs) {
    page.flush();
    loader.event(page, url, newArgs || args);
  });
  loader.event(page, url, args);
};

exports.tag = function (page, tag, args) {
  page.type = "directory";
  page.metadata.title = tag;
  page.metadata.icon = Plugin.path + "logo.png";

  var url = "https://channel9.msdn.com/Browse/Tags/firstLetter/" + tag + "/json";
  loader.tag(page, url, args);
};

exports.tags = function (page, args) {
  page.type = "directory";
  page.metadata.title = "Tags";
  page.metadata.icon = Plugin.path + "logo.png";

  var url = "https://channel9.msdn.com/Browse/Tags";
  loader.tags(page, url, args);
};

exports.videos = function (page, url, args) {
  page.type = "directory";
  page.metadata.title = "Videos";
  page.metadata.icon = Plugin.path + "logo.png";

  fillSortBy(page, loader.getSortOptions(url), function (newArgs) {
    page.flush();
    loader.videos(page, url, newArgs || args);
  });
  loader.videos(page, url, args);
};

exports.video = function (page, url, args) {
  page.type = "directory";
  page.metadata.title = "Video";
  page.metadata.icon = Plugin.path + "logo.png";

  loader.video(page, url, args);
};

exports.searchEpisodes = function (page, args) {
  page.type = "directory";
  page.metadata.title = PLUGIN_NAME + " - Episodes";
  page.metadata.icon = Plugin.path + "logo.png";

  var url = "https://c9search.azurewebsites.net/content/search";
  loader.searchEpisodes(page, url, args);
};
