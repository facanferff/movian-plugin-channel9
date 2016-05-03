exports.getMetaProperty = function (doc, property) {
  var metas = doc.getElementByTagName("meta");
  for (var i in metas) {
    var meta = metas[i];

    var type = meta.attributes.getNamedItem("property");
    if (type && type.value === property)
      return meta.attributes.getNamedItem("content").value;
  }

  return null;
};

exports.httpRequest = function (url, args) {
  var request = HTTP.request(url, {
    args: args,
    compression: true
  });
  return request.toString();
};

exports.toDuration = function (value) {
  var minutes = -1;
  var seconds = 0;

  // try first string regex
  if (typeof (value) === "string") {
    var regex = /(.+?) minute[s]?, (.+?) second[s]?/;
    var match = value.match(regex);
    if (match) {
      minutes = parseInt(match[1]);
      seconds = parseInt(match[2]);
    }
  }

  // try double regex
  if (typeof (value) === "number") {
    minutes = Math.floor(value);
    seconds = Math.floor((value - minutes) * 60);
  }

  if (minutes >= 0) {
    var text = "";

    text += minutes;

    text += ":";

    if (seconds < 10) text += "0";
    text += seconds;

    return text;
  }

  return null;
};
