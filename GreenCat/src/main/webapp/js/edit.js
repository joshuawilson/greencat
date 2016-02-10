/*
 * JBoss, Home of Professional Open Source
 * Copyright 2014, Red Hat, Inc. and/or its affiliates, and individual
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

BUZZWORDS.namespace('BUZZWORDS.edit.getBuzzwordById');
BUZZWORDS.namespace('BUZZWORDS.edit.buildBuzzwordDetail');

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
    
    console.log(getCurrentTime() + " [js/edit.js] (document) - start");
    
    // This is called by the on click event list above.
    // Retrieve employee detail based on employee id.
    BUZZWORDS.edit.getBuzzwordById = function (buzzwordID) {
        console.log(getCurrentTime() + " [js/edit.js] (getBuzzwordById) - start");
        console.log(getCurrentTime() + " [js/edit.js] (getBuzzwordById) - buzzwordID = " + buzzwordID);
    
        var jqxhr = $.ajax({
            url: restEndpoint + "/" + buzzwordID.toString(),
            cache: false,
            type: "GET"
        }).done(function(data, textStatus, jqXHR) {
            console.log(getCurrentTime() + " [js/edit.js] (getBuzzwordById) - success on ajax call");
            BUZZWORDS.edit.buildBuzzwordDetail(data);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(getCurrentTime() + " [js/edit.js] (getBuzzwordById) - error in ajax" +
                        " - jqXHR = " + jqXHR.status +
                        " - textStatus = " + textStatus +
                        " - errorThrown = " + errorThrown);
        });
        console.log(getCurrentTime() + " [js/edit.js] (getBuzzwordById) - end");
    };
    
    // This is called by BUZZWORDS.edit.getBuzzwordById.
    // Display buzzword detail for editing on the Edit page.
    BUZZWORDS.edit.buildBuzzwordDetail = function(buzzword) {
        console.log(getCurrentTime() + " [js/edit.js] (buildBuzzwordDetail) - start");
        
        // The intl-Tel-Input plugin stores the lasted used country code and uses it to predetermine the flag to be 
        // displayed. So we remove the plugin before the data gets loaded in the Edit form and then initialize it after. 
        $("#buzzwords-edit-input-tel").intlTelInput("destroy");
        
        // Put each field value in the text input on the page.
        $('#buzzwords-edit-input-firstName').val(buzzword.firstName);
        $('#buzzwords-edit-input-lastName').val(buzzword.lastName);
        $('#buzzwords-edit-input-tel').val(buzzword.phoneNumber);
        $('#buzzwords-edit-input-email').val(buzzword.email);
        $('#buzzwords-edit-input-date').val(buzzword.birthDate);
        $('#buzzwords-edit-input-id').val(buzzword.id);
        
        // The intl-Tel-Input plugin needs to be initialized every time the data gets loaded into the Edit form so that 
        // it will correctly validate it and display the correct flag.
        $('#buzzwords-edit-input-tel').intlTelInput({nationalMode:false});
        
        console.log(getCurrentTime() + " [js/edit.js] (buildBuzzwordDetail) - end");
        // Add in a line to visually see when we are done.
        console.log("-----------------------------Update Page---------------------------------------");
    };
    
    console.log(getCurrentTime() + " [js/edit.js] (Get ID and fill in Edit form) - start");
    
    BUZZWORDS.edit.getBuzzwordById(BUZZWORDS.util.getQueryVariable("id"));
    
    console.log(getCurrentTime() + " [js/edit.js] (Get ID and fill in Edit form) - end");
        
    console.log(getCurrentTime() + " [js/edit.js] (document) - end");
});


