// ==UserScript==
// @name     Remove unwanted news
// @version  1.3
// @grant    none
// @namespace news_filtering
// @description This script helps you to filter out the news that you don't want to see. This example works for zeit.de, spiegel.de and watson.ch (popular swiss newssite)
// @license MIT
// @include        https://www.watson.ch/*
// @match https://www.zeit.de/*
// @match https://www.spiegel.de/*
// @match https://www.reddit.com/*
// @match https://www.facebook.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js 
// ==/UserScript==
//https://gist.github.com/BrockA/2625891


function recurseEl(father,element) {
  if(element.childElementCount === 0) {
    search = /(stories)|(sponsored)|(kardashian)|(heizen)|(strom)|(macron)|(merz)|(elon)|(ukraine)|(selenskyj)|(liveticker)|(influencer)|(fifa)|(messi)|(infantino)|(corona)|(putin)|(bolsonaro)|(trump)|(trumps)|(arabischen)|(arabisch)|(jong)|(musk)|(promis)|(promi)|(katar)|(boateng)|(russland)|(russen)|(nati)|(weltmeister)/
		if (element.innerText.toLowerCase().match(search)){
			console.log("removing" + element.innerText)
      element.textContent = '';
      father.style.display = "none";
    }
  } else {
    Array.from(element.children).forEach(child => {
      recurseEl(father,child);
    });
  }
}

function updateHTML()
{
  var href = window.location.host;
  if (href == "www.zeit.de"){
		var selector =  ".zon-teaser-standard, .zon-teaser-wide, .zon-teaser-poster"
  }
  else if (href == "www.watson.ch"){
  	var selector = '.region'
  }
  else if (href == "www.spiegel.de"){
  	var selector = "article"
  }
  else if (href == "www.reddit.com"){
    var selector = ".link"
  }
  else if (href == "www.facebook.com"){
		var selector = 'svg[viewBox="0 0 20 20"]'
  }
  $(selector).each(function(i, obj) {
    try {
        if (href == "www.facebook.com"){
          var obj = obj.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
          console.log(obj.innerText.toLowerCase())  
          recurseEl(obj,obj);
        }
        else{
          recurseEl(obj,obj);
        }
    	}
    catch (error) {
      //console.error(error);
    }
  });
};

var intervalId = window.setInterval(function(){
	updateHTML();
}, 2000);


