/*
 * JBoss, Home of Professional Open Source
 * Copyright 2015, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

BUZZWORDS.namespace('BUZZWORDS.app.getBuzzwords');
BUZZWORDS.namespace('BUZZWORDS.app.buildBuzzwordList');
BUZZWORDS.namespace('BUZZWORDS.app.restEndpoint');
BUZZWORDS.namespace('BUZZWORDS.app.filterList');

BUZZWORDS.app.restEndpoint = 'rest/buzzwords';

/**
 * It is recommended to bind to this event instead of DOM ready() because this will work regardless of whether 
 * the page is loaded directly or if the content is pulled into another page as part of the Ajax navigation system.
 * 
 * The first thing you learn in jQuery is to call code inside the $(document).ready() function so everything 
 * will execute as soon as the DOM is loaded. However, in jQuery Mobile, Ajax is used to load the contents of 
 * each page into the DOM as you navigate, and the DOM ready handler only executes for the first page. 
 * To execute code whenever a new page is loaded and created, you can bind to the pagecreate event. 
 * 
 * 
 * These functions perform the GET. They display the list, detailed list, and fill in the update form.
 * 
 * @author Joshua Wilson
 */
$(document).ready (function(mainEvent) {
    //Initialize the vars in the beginning so that you will always have access to them.
    var getCurrentTime = BUZZWORDS.util.getCurrentTime,
        restEndpoint = BUZZWORDS.app.restEndpoint;
    
    console.log(getCurrentTime() + " [js/app.js] (document) - start");
    
    // Change the menu icon to an X and show/hide the nav section.
    // This should only be visible on smaller screen sizes.
    $('#nav-toggle').click(function() {
        this.classList.toggle('active');
        if ('-180px' >= $('nav').css('left')) {
            $('nav').animate({ "left": "0px" } );
            $('article').animate({ "left": "180px" } );
        } else {
            $('nav').animate({ "left": "-180px" });
            $('article').animate({ "left": "0px" });
        }
    });
    
    // Reset the Nav section and menu icon when the window changes size.
    $(window).resize(function() {
        if (document.documentElement.clientWidth >= 640) {
            // If the browser size is over 640px then make sure the menu icon is not an X. CSS will take care of the rest.
            $('#nav-toggle').removeClass('active');
        } else {
            // If less then 640px then hide the Nav and make sure the menu icon is not an X.
            $('nav').css("left", "-180px");
            $('article').css("left", "0px");
            $('#nav-toggle').removeClass('active');
        }
    });
    
    // This is called on page load and by the BUZZWORDS.submissions
    // Uses JAX-RS GET to retrieve current buzzword list. 
    BUZZWORDS.app.getBuzzwords = function () {
        console.log(getCurrentTime() + " [js/app.js] (getBuzzwords) - start");
        var jqxhr = $.ajax({
            url: restEndpoint,
            cache: false,
            type: "GET"
        }).done(function(data, textStatus, jqXHR) {
            console.log(getCurrentTime() + " [js/app.js] (getBuzzwords) - succes on ajax call");
            BUZZWORDS.app.buildBuzzwordList(data);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(getCurrentTime() + " [js/app.js] (getBuzzwords) - error in ajax - " +
                        " - jqXHR = " + jqXHR.status +
                        " - textStatus = " + textStatus +
                        " - errorThrown = " + errorThrown);
        });
        console.log(getCurrentTime() + " [js/app.js] (getBuzzwords) - end");
    };

    // This is called by BUZZWORDS.app.getBuzzwords.
    // Display buzzword list on page one.
    BUZZWORDS.app.buildBuzzwordList = function (buzzwords) {
        console.log(getCurrentTime() + " [js/app.js] (buildBuzzwordList) - start");
        var buzzwordList = "",
            buzzwordDetailList = "";
        
        // The data from the AJAX call is not sorted alphabetically, this will fix that.
        buzzwords.sort(function(a,b){
              var aName = a.firstName.toLowerCase() + a.lastName.toLowerCase();
              var bName = b.firstName.toLowerCase() + b.lastName.toLowerCase(); 
              return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        });
        
        // Pull the info out of the Data returned from the AJAX request and create the HTML to be placed on the page.
        $.each(buzzwords, function(index, buzzword) {
            // Create the HTML for the List only view.
            buzzwordList = buzzwordList.concat(
                "<li id=list-buzzword-ID-" + buzzword.id.toString() + " class=buzzwords-list-item >" +
                    "<a href='buzzwords-edit.html?id=" + buzzword.id.toString() + "' >" + buzzword.firstName.toString() + " " + buzzword.lastName.toString() + "</a>" +
                "</li>");
            // Create the HTML for the Detailed List view.
            buzzwordDetailList = buzzwordDetailList.concat(
                "<li id=detail-buzzword-ID-" + buzzword.id.toString() + " class=buzzwords-detail-list-item >" +
                    "<a href='buzzwords-edit.html?id=" + buzzword.id.toString() + "' >" + buzzword.firstName.toString() + " " + buzzword.lastName.toString() +
                    "<div class='detialedList'>" +
                        "<p><strong>" + buzzword.email.toString() + "</strong></p>" +
                        "<p>" + buzzword.phoneNumber.toString() + "</p>" +
                        "<p>" + buzzword.birthDate.toString() + "</p>" +
                    "</div>"+ "</a>"  +
                 "</li>");
        });
        
        // Check if it is the List view or Detailed view and add the buzzwords to the list.
        if ( $('#buzzwords-display-listview').hasClass('buzzwords-list')) {
            console.log(getCurrentTime() + " [js/app.js] (#buzzwords-display-listview) - append.listview - start");
            $('#buzzwords-display-listview').append(buzzwordList);
            console.log(getCurrentTime() + " [js/app.js] (#buzzwords-display-listview) - append.listview - end");
        } 
        
        // Check if it is the List view or Detailed view and add the buzzwords to the list.
        if ( $('#buzzwords-display-detail-listview').hasClass('buzzwords-list')) {
            console.log(getCurrentTime() + " [js/app.js] (#buzzwords-display-detail-listview) - append.listview - start");
            $('#buzzwords-display-detail-listview').append(buzzwordDetailList);
            console.log(getCurrentTime() + " [js/app.js] (#buzzwords-display-detail-listview) - append.listview - end");
        } 
        
        console.log(getCurrentTime() + " [js/app.js] (buildBuzzwordList) - end");
        // Add in a line to visually see when we are done.
        console.log("-----------------------------List Page---------------------------------------");
    };
    
    /**
     * Take the list of buzzwords and the filter string and if the string is found reduce the list to match
     */
    BUZZWORDS.app.filterList = function() {
        
        $('.filter-form').submit(function(event) {
            event.preventDefault();
            var value = $(this).find('input').val().toLowerCase();
            var list = $('.buzzwords-list li');
    
            list.hide();
            list.filter(function() {
                return $(this).text().toLowerCase().indexOf(value) > -1;
            }).show();
        });
        
    };
    
    // Clear the Search field and restore all the list items.
    $('#clear_input').click(function () {
        $('.filter-form').find('input').focus();
        $('.filter-form').find('input').val('');
        $('.buzzwords-list li').show();
    });

    // Fetches the initial Buzzword data.
    BUZZWORDS.app.getBuzzwords();
    BUZZWORDS.app.filterList();

    console.log(getCurrentTime() + " [js/app.js] (document) - end");
});


