function loaderAuthors(page, url, args) {
  page.loading = true;
  args = args || {};

  var pageNum = 1;
  var canContinue = true;
  page.entries = 0;

  function loader() {
    if (!canContinue) {
      page.haveMore(false);
      return;
    }

    args.page = pageNum;
    var html = HTML.parse(utils.httpRequest(url, args)).root;
    var entries = html.getElementByClassName("authors")[0].getElementByTagName("li");
    for (var i in entries) {
      var entry = entries[i];

      var itemUrl = PREFIX + ":videos:" + escape("https://channel9.msdn.com" +
        entry.getElementByClassName("button")[0].attributes.getNamedItem("href").value) + "/Posts";

      var metadata = {};
      metadata.title = entry.getElementByClassName("name")[0].textContent;
      metadata.icon = entry.getElementByClassName("avatar")[0].attributes.getNamedItem("src").value;

      page.appendItem(itemUrl, "video", metadata);
      page.entries++;
    }

    var hasNextPage = html.getElementByClassName("next").length > 0;
    if (hasNextPage) {
      pageNum++;
      page.haveMore(true);
    } else {
      canContinue = false;
      page.haveMore(false);
    }
  }

  page.asyncPaginator = loader;
  loader();
  page.loading = false;
}

function loaderFolders(page, url, args) {
  page.loading = true;
  args = args || {};
  var pageNum = 1;
  var canContinue = true;

  function loader() {
    if (!canContinue) {
      page.haveMore(false);
      return;
    }

    args.page = pageNum;
    var html = HTML.parse(utils.httpRequest(url, args)).root;
    var entries = html.getElementByClassName("entries")[0].getElementByTagName("li");
    for (var i in entries) {
      var entry = entries[i];

      var itemUrl = PREFIX + ":videos:" + escape("https://channel9.msdn.com" +
        entry.getElementByClassName("title")[0].attributes.getNamedItem("href").value);

      var metadata = {};
      metadata.title = entry.getElementByClassName("entry-meta")[0].getElementByClassName("title")[0].textContent;

      metadata.icon = entry.getElementByClassName("thumb")[0].attributes.getNamedItem("src").value;
      if (metadata.icon[0] == '/') metadata.icon = "https://channel9.msdn.com" + metadata.icon;

      if (entry.getElementByClassName("description")[0].textContent)
        metadata.description = entry.getElementByClassName("description")[0].textContent.trim();

      if (entry.getElementByClassName("count").length > 0)
        metadata.duration = entry.getElementByClassName("count")[0].textContent + " episodes";

      page.appendItem(itemUrl, "video", metadata);
    }

    var hasNextPage = html.getElementByClassName("next").length > 0;
    if (hasNextPage) {
      pageNum++;
      page.haveMore(true);
    } else {
      canContinue = false;
      page.haveMore(false);
    }
  }

  page.asyncPaginator = loader;
  loader();
  page.loading = false;
}

function loaderTags(page, url, args) {
  page.loading = true;
  args = args || {};

  function loader() {
    var html = HTML.parse(utils.httpRequest(url)).root;
    var entries = html.getElementByClassName("quickJump")[0].getElementByTagName("li");
    for (var i in entries) {
      var entry = entries[i];

      var itemUrl = entry.getElementByTagName("a")[0].attributes.getNamedItem("href").value;

      var metadata = {};
      metadata.title = entry.getElementByTagName("a")[0].textContent;

      page.appendItem(PREFIX + ":tag:" + itemUrl.match("#(.*)$")[1], "directory", metadata);
    }

    page.haveMore(false);
  }

  //page.asyncPaginator = loader;
  loader();
  page.loading = false;
}

function loaderTag(page, url, args) {
  page.loading = true;
  args = args || {};

  function loader() {
    var json = JSON.parse(utils.httpRequest(url));
    for (var i in json) {
      var entry = json[i];

      var itemUrl = PREFIX + ":videos:" + escape("https://channel9.msdn.com" + entry.href);

      var metadata = {};
      metadata.title = entry.name;

      page.appendItem(itemUrl, "directory", metadata);
    }

    page.haveMore(false);
  }

  //page.asyncPaginator = loader;
  loader();
  page.loading = false;
}

function loaderVideo(page, url, args) {
  page.loading = true;
  var html = HTML.parse(utils.httpRequest(url)).root;

  page.metadata.title = html.getElementByClassName("entry-header")[0].getElementByTagName("h1")[0].textContent;

  if (html.getElementByClassName("download").length > 0) {
    var generalMetadata = {};
    if (html.getElementByClassName("views")[0].getElementByClassName("count").length > 0)
      generalMetadata.viewCount = parseInt(html.getElementByClassName("views")[0].getElementByClassName("count")[0].textContent);
    var duration = utils.toDuration(html.getElementByClassName("entry-caption")[0].textContent);
    var thumb = utils.getMetaProperty(html, "og:image");
    var downloads = html.getElementByClassName("download")[0].getElementByTagName("li");
    for (var i in downloads) {
      var download = downloads[i];

      var title = download.getElementByTagName("a")[0].textContent;
      var itemUrl = download.getElementByTagName("a")[0].attributes.getNamedItem("href").value;

      page.appendItem(itemUrl, "video", {
        "title": title,
        "icon": thumb,
        "duration": duration
      } || generalMetadata);
    }
  } else {
    page.appendPassiveItem("default", null, {
      "title": "Video possibly not yet available"
    });
  }

  page.loading = false;
}

function loaderVideos(page, url, args) {
  page.loading = true;
  args = args || {};

  var pageNum = 1;

  function loader() {
    args.page = pageNum;
    var html = HTML.parse(utils.httpRequest(url, args)).root;

    if (html.getElementByClassName("alert info").length > 0) {
      var message = html.getElementByClassName("alert info")[0].getElementByTagName("p")[0].textContent;
      page.appendPassiveItem("default", null, {
        "title": message
      });

      page.haveMore(false);
      return;
    }

    var entries = html.getElementByClassName("entries")[0].getElementByTagName("li");
    for (var i in entries) {
      var entry = entries[i];

      if (entry.getElementByClassName("entry-image").length > 0) {
        var itemUrl = PREFIX + ":video:" + escape("https://channel9.msdn.com" +
          entry.getElementByTagName("a")[0].attributes.getNamedItem("href").value);

        var metadata = {};
        metadata.title = entry.getElementByClassName("entry-meta")[0].getElementByClassName("title")[0].textContent;
        metadata.icon = entry.getElementByClassName("thumb")[0].attributes.getNamedItem("src").value;
        metadata.description = entry.getElementByClassName("description")[0].textContent.trim();
        if (entry.getElementByClassName("entry-caption").length > 0)
          metadata.duration = utils.toDuration(entry.getElementByClassName("entry-caption")[0].textContent);

        if (entry.getElementByClassName("date").length > 0)
          metadata.title += " (" + entry.getElementByClassName("date")[0].textContent + ")";

        page.appendItem(itemUrl, "video", metadata);
        page.entries++;
      }
    }

    var hasNextPage = html.getElementByClassName("next").length > 0;
    if (hasNextPage) {
      pageNum++;
      page.haveMore(true);
    } else {
      page.haveMore(false);
      if (page.entries === 0) {
        page.appendPassiveItem("default", null, {
          "title": "Apparently there are no videos yet"
        });
      }
    }
  }

  page.asyncPaginator = loader;
  loader();
  page.loading = false;
}

function loaderSearchEpisodes(page, url, args) {
  page.loading = true;
  args = args || {};

  var offset = 0;
  var perPage = 15;
  var canContinue = true;

  function loader() {
    if (!canContinue) {
      page.haveMore(false);
      return;
    }

    args.$top = perPage;
    args.$skip = offset;
    var body = utils.httpRequest(url, args);
    body = body.substring(body.indexOf("{"), body.lastIndexOf("});") + 1);

    var json = JSON.parse(body);

    var entries = json.documents;
    for (var i in entries) {
      var entry = entries[i];

      var itemUrl = entry.permalink;

      var metadata = {};
      metadata.title = entry.title;
      metadata.icon = entry.previewImage;
      metadata.description = entry.body;
      if (entry.mediaDuration > 0.0)
        metadata.duration = utils.toDuration(entry.mediaDuration);

      var publishDate = new Date(Date.parse(entry.published));
      metadata.title += " (" + publishDate.toLocaleString() + ")";

      page.appendItem(PREFIX + ":video:" + escape(itemUrl), "video", metadata);
    }

    offset += perPage;
    canContinue = offset < json.totalCount;
    page.haveMore(canContinue);
    page.entries = json.totalCount;
  }

  page.asyncPaginator = loader;
  loader();
  page.loading = false;
}

exports.authors = function (page, url, args) {
  loaderAuthors(page, url, args);
};

exports.shows = function (page, url, args) {
  loaderFolders(page, url, args);
};

exports.series = function (page, url, args) {
  loaderFolders(page, url, args);
};

exports.blogs = function (page, url, args) {
  loaderFolders(page, url, args);
};

exports.event = function (page, url, args) {
  loaderFolders(page, url, args);
};

exports.events = function (page, url, args) {
  loaderFolders(page, url, args);
};

exports.tag = function (page, url, args) {
  loaderTag(page, url, args);
};

exports.tags = function (page, url, args) {
  loaderTags(page, url, args);
};

exports.videos = function (page, url, args) {
  loaderVideos(page, url, args);
};

exports.video = function (page, url, args) {
  loaderVideo(page, url, args);
};

exports.searchEpisodes = function (page, url, args) {
  loaderSearchEpisodes(page, url, args);
};

exports.getSortOptions = function (url) {
  var html = HTML.parse(utils.httpRequest(url)).root;
  if (html.getElementByClassName("tabs").length > 0) {
    var entries = html.getElementByClassName("tabs")[0].getElementByTagName("li");
    var sortOptions = [];
    for (var i in entries) {
      var entry = entries[i];

      var title;
      if (entry.getElementByTagName("a").length > 0) {
        var sort = entry.getElementByTagName("a")[0].attributes.getNamedItem("href").value;
        if (sort.indexOf("sort=") != -1) sort = sort.match(/sort=([^#]*)/)[1];
        else sort = null;

        title = entry.getElementByTagName("a")[0].textContent;
        sortOptions.push([sort, title]);
      } else {
        title = entry.textContent;
        sortOptions.unshift(["", title, true]);
      }
    }

    return sortOptions;
  }

  return null;
};
