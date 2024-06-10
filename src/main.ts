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
   
    
    // Custom Julia general


    WA.room.onEnterLayer("floor").subscribe(() => {
      WA.room.hideLayer("roof");
      WA.room.hideLayer("roof-appear");
      WA.room.hideLayer("walls-bg-front");
      WA.room.hideLayer("sign");
    });
    
  WA.room.onLeaveLayer("floor").subscribe(() => {
      WA.room.showLayer("roof");
      WA.room.showLayer("walls-bg-front");
      WA.room.showLayer("facade-furniture-bg");
      WA.room.showLayer("sign");
    });




    // snow zone
    WA.room.onEnterLayer("snow_zone").subscribe(() => {
      WA.room.showLayer("snow-on");
    });
    
  WA.room.onLeaveLayer("snow_zone").subscribe(() => {
      WA.room.hideLayer("snow-on");
    });
    
    let billboard1: EmbeddedWebsite = await WA.room.website.get("billboard1")
    WA.room.onEnterLayer("billboard1-zone").subscribe(() => {
      console.log("HI JULIA")
      billboard1.visible = false;
      WA.room.hideLayer("portal-on");
      WA.room.showLayer("portal-off");
    });
    
  WA.room.onLeaveLayer("billboard1-zone").subscribe(() => {
      billboard1.visible = true;
      WA.room.showLayer("portal-on");
      WA.room.hideLayer("portal-off");
    });
    
    let billboard2: EmbeddedWebsite = await WA.room.website.get("billboard2")
    WA.room.onEnterLayer("billboard2-zone").subscribe(() => {
      billboard2.visible = false;
      WA.room.hideLayer("portal-on-2");
      WA.room.showLayer("portal-off-2");
    });
    
  WA.room.onLeaveLayer("billboard2-zone").subscribe(() => {
      billboard2.visible = true;
      WA.room.showLayer("portal-on-2");
      WA.room.hideLayer("portal-off-2");
    });

    let billboard3: EmbeddedWebsite = await WA.room.website.get("billboard3")
    WA.room.onEnterLayer("billboard3-zone").subscribe(() => {
      billboard3.visible = false;
      WA.room.hideLayer("portal-on-3");
      WA.room.showLayer("portal-off-3");
    });
    
  WA.room.onLeaveLayer("billboard3-zone").subscribe(() => {
      billboard3.visible = true;
      WA.room.showLayer("portal-on-3");
      WA.room.hideLayer("portal-off-3");
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
