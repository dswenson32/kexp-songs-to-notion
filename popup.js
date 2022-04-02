const database_id = "";
const notion_ari_url = "https://api.notion.com/v1/";
const headers = {"Authorization": "", "Notion-Version": "2022-02-22", 'Access-Control-Allow-Origin': '*'};
const sendMessageButton = document.getElementById('sendMessage')
const docBod = document.body;

let artist, title, album;

docBod.onload = async function(e) {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);

    chrome.tabs.sendMessage(tab[0].id, {action: "getSong"}, function(response) {
        // here we would pass the JSON to getSongDetails
        showSongDetails(response);
    });
}

sendMessageButton.onclick = function(e) {
   console.log("Sending to notion...");
   sendToNotion();
}

function showSongDetails(resJson){
    $("#kexp-artist").append(resJson.artist);
    $("#kexp-title").append(resJson.title);
    $("#kexp-album").append(resJson.album);

    artist = resJson.artist;
    title = resJson.title;
    album = resJson.album;
}


function sendToNotion(){
    const reqBody = {
        "parent": { "database_id": database_id },
         "properties": {
            "Title": {
                "title": [
                    {
                        "text": {
                            "content": title
                        }
                    }
                ]
            },
            "Artist": {
                "rich_text": [
                    {
                        "text": {
                            "content": artist
                        }
                    }
                ]
            },
            "Album": {
                "rich_text": [
                    {
                        "text": {
                            "content": album
                        }
                    }
                ]
            },
            "Date Added" : {
                "date" : {
                    "start": new Date().toISOString()
                }
            }
        }
    }

    let request = $.ajax({
        type: "POST",
        url: notion_ari_url + "pages",
        headers: headers,
        data: JSON.stringify(reqBody),
        contentType: "application/json",
        processData: false 
    })
    request.done(function(){console.log("We did it!!")});
    request.fail(function(){console.log("uh oh...")});
}

