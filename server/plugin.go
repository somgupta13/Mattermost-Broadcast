package main

import (
	"encoding/json"
	"github.com/mattermost/mattermost-server/v5/model"
	"net/http"
	"fmt"
	"github.com/mattermost/mattermost-server/v5/plugin"
)

type Item struct {
	Message string    `json:"Message"`
	Usersid [] string `json:"Usersid"`
}

type Plugin struct {
	plugin.MattermostPlugin
}

// ServeHTTP 
func (p *Plugin) ServeHTTP(c *plugin.Context, w http.ResponseWriter, r *http.Request) {
	switch r.URL.Path {
	case "/":
		fmt.Fprint(w, "Hey,You Have landed Successfully... Now try OUR beautiful API")
	case "/broadcast":
		p.broadcast(w, r)

	default:
		http.NotFound(w, r)
	}
}
// handle broadcast 
func (p *Plugin) broadcast(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("Mattermost-User-ID")
	if userID == "" {
		http.Error(w, "Not authorized", http.StatusUnauthorized)
		return
	}

	var item *Item
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&item)
	if err != nil {
		p.API.LogError("Unable to decode JSON err=" + err.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	for _,reciept_id:= range item.Usersid {

		channel,_ := p.API.GetDirectChannel(userID,reciept_id)

		_, err := p.API.CreatePost(p.makePost(userID,channel.Id,item.Message))

		if err != nil{
			p.API.LogError("Unable to Broadcast -- err=" + err.Error())

		}
	}
}
//make desired post
func (p *Plugin) makePost(user_id string, channel_id string, message string) *model.Post {
	return &model.Post{
		UserId:    user_id,
		ChannelId: channel_id,
		Message:   message,
	}
}
