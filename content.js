console.log("Welcome to KEXP!");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === "getSong") {
        sendResponse(getSongDetails());
      }
    }
);


function getSongDetails(){
    let artist, title, album;

    // Get Artist
    artist = $(".Player-title").children()[0].text;
    // Get Title
    var length = $(".Player-title").children()[0].text.length;
    length = length+3; //Need to account for hyphen
    title = $(".Player-title").children().text().substring(length);
    // Get Album
    album = $(".Player-album").text();


    console.log(artist + " ~ " + title + " ~ " + album)

    let resJson = {
        "artist" : artist,
        "title" : title,
        "album" : album
    }

    return resJson;
}