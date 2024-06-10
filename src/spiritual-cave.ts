/// <reference types="@workadventure/iframe-api-typings" />

import { EmbeddedWebsite } from "@workadventure/iframe-api-typings";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then( async () => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)
    // Cave custom 
    let fire: EmbeddedWebsite = await WA.room.website.get("fire")
    let coverup: EmbeddedWebsite = await WA.room.website.get("coverup")
    WA.room.onEnterLayer("zone_outside").subscribe(() => {
      WA.room.hideLayer("coverup")
    });
    WA.room.onEnterLayer("teepee-floor").subscribe(() => {
      coverup.visible = false
      WA.room.hideLayer("coverup")
      WA.room.hideLayer("teepee-roof")
    });
    WA.room.onLeaveLayer("teepee-floor").subscribe(() => {
      coverup.visible = true
      WA.room.showLayer("teepee-roof")
    });


    WA.room.onEnterLayer("zone_inside").subscribe(() => {
      WA.room.showLayer("coverup")
      WA.room.hideLayer("teepee-roof")
      WA.room.hideLayer("teepee-walls-fg")
      WA.room.hideLayer("rock-facade")
      WA.room.hideLayer("teepee-furniture")
      WA.room.hideLayer("teepee-roof")
      WA.room.hideLayer("teepee-grounds")
      WA.room.hideLayer("outside-sand")
      coverup.visible = false
      fire.visible = false
    });
    WA.room.onLeaveLayer("zone_inside").subscribe(() => {
      WA.room.hideLayer("coverup")
      WA.room.showLayer("teepee-roof")
      WA.room.showLayer("teepee-walls-fg")
      WA.room.showLayer("rock-facade")
      WA.room.showLayer("teepee-furniture")
      WA.room.showLayer("teepee-roof")
      WA.room.showLayer("teepee-grounds")
      WA.room.showLayer("outside-sand")
      coverup.visible = true
      fire.visible = true
    });
    WA.room.onEnterLayer("floor").subscribe(() => {
      coverup.visible = false
      WA.room.hideLayer("roof");
      WA.room.hideLayer("roof-appear");
      WA.room.hideLayer("walls-bg-front");
      WA.room.hideLayer("sign");
    });
    WA.room.onLeaveLayer("floor").subscribe(() => {
      coverup.visible = true
      WA.room.showLayer("roof");
      WA.room.showLayer("walls-bg-front");
      WA.room.showLayer("facade-furniture-bg");
      WA.room.showLayer("sign");
    });
    
   
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
