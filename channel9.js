/*
Channel 9 plugin for Movian Media Center Copyright (C) 2011-2016 Fábio Ferreira

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

This program is also available under a commercial proprietary license.
*/

var SERVICE = require('showtime/service');
var PAGE = require('showtime/page');
var HTTP = require('showtime/http');
var HTML = require('showtime/html');
var PROP = require('showtime/prop');

var log = require("./src/log");
var plugin = require("./src/plugin");
var view = require("./src/view");
var utils = require("./src/utils");

var PLUGIN_INFO = plugin.getDescriptor();
var PLUGIN_NAME = PLUGIN_INFO.title;
var PREFIX = PLUGIN_INFO.id;

SERVICE.create(PLUGIN_NAME, PREFIX + ":start", "video", true,
  Plugin.path + "logo.png");

new PAGE.Route(PREFIX + ":start", function (page) {
  page.metadata.icon = Plugin.path + "logo.png";
  page.metadata.title = PLUGIN_NAME;

  page.appendItem(PREFIX + ":allcontent", "directory", {
    title: "All Content"
  });
  page.appendItem(PREFIX + ":shows", "directory", {
    title: "Shows"
  });
  page.appendItem(PREFIX + ":series", "directory", {
    title: "Series"
  });
  page.appendItem(PREFIX + ":blogs", "directory", {
    title: "Blogs"
  });
  page.appendItem(PREFIX + ":events", "directory", {
    title: "Events"
  });
  page.appendItem(PREFIX + ":tags", "directory", {
    title: "Tags"
  });
  page.appendItem(PREFIX + ":authors", "directory", {
    title: "Authors"
  });

  page.type = "list";
});

new PAGE.Route(PREFIX + ":allcontent", function (page) {
  view.videos(page, "https://channel9.msdn.com/Browse/AllContent");
});

new PAGE.Route(PREFIX + ":authors", function (page) {
  view.authors(page);
});

new PAGE.Route(PREFIX + ":shows", function (page) {
  view.shows(page);
});

new PAGE.Route(PREFIX + ":series", function (page) {
  view.series(page);
});

new PAGE.Route(PREFIX + ":blogs", function (page) {
  view.blogs(page);
});

new PAGE.Route(PREFIX + ":event:(.*)", function (page, url) {
  view.event(page, unescape(url));
});

new PAGE.Route(PREFIX + ":events", function (page) {
  view.events(page);
});

new PAGE.Route(PREFIX + ":tags", function (page) {
  view.tags(page);
});

new PAGE.Route(PREFIX + ":tag:(.*)", function (page, tag) {
  view.tag(page, tag);
});

new PAGE.Route(PREFIX + ":video:(.*)", function (page, url) {
  view.video(page, unescape(url));
});

new PAGE.Route(PREFIX + ":videos:(.*)", function (page, url) {
  view.videos(page, unescape(url));
});

/*
 * Searchers
 */
new PAGE.Searcher("Channel 9 - Episodes", Plugin.path + "logo.png", function (page, query) {
  view.searchEpisodes(page, {
    "text": query
  });
});

new PAGE.Searcher("Channel 9 - Authors", Plugin.path + "logo.png", function (page, query) {
  view.authors(page, {
    "term": query
  });
});
