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

BUZZWORDS.namespace('BUZZWORDS.validation.displayServerSideErrors');
BUZZWORDS.namespace('BUZZWORDS.validation.validateName');
BUZZWORDS.namespace('BUZZWORDS.validation.formEmail');
BUZZWORDS.namespace('BUZZWORDS.validation.validateEmailUniqueness');
BUZZWORDS.namespace('BUZZWORDS.validation.addBuzzwordsFormValidator');
BUZZWORDS.namespace('BUZZWORDS.validation.editBuzzwordsFormValidator');

/**
 * Configure the HTML forms to hide the standard form buttons (they will be displayed in the footer). And to set up 
 * the actions to take place when they are clicked.
 * 
 * @author Joshua Wilson
 */
$(document).ready (function(mainEvent) {
    //Initialize the vars in the beginning so that you will always have access to them.
    var getCurrentTime = BUZZWORDS.util.getCurrentTime;
    
    /* 
     * The "pagebeforeshow" event will delay this function until everything is set up.
     * 
     * The "e.handled" if statement used here and elsewhere is meant to keep jqm from running this code multiple times 
     * for one display.
     */
    
    // Hide the actual form buttons so that we can use proxy buttons in the footer.
//    $('#buzzwords-add-page').on( "pagebeforeshow", function(e) {
//        if(e.handled !== true) {
//            console.log(getCurrentTime() + " [js/formSetup.js] (#buzzwords-add-page -> pagebeforeshow) - start");
//            
//            $('#submit-add-btn').parent().hide();
//            $('#clear-add-btn').parent().hide();
//            $('#cancel-add-btn').parent().hide();
//            
//            e.handled = true;
//            console.log(getCurrentTime() + " [js/formSetup.js] (#buzzwords-add-page -> pagebeforeshow) - end");
//            // Add in a line to visually see when we are done.
//            console.log("-----------------------------Create Page---------------------------------------");
//        }
//    });
//    $('#submit-add-btn').parent().hide();
//    $('#clear-add-btn').parent().hide();
//    $('#cancel-add-btn').parent().hide();

    // Hide the actual form buttons so that we can use proxy buttons in the footer.
//    $('#buzzwords-edit-page').on( "pagebeforeshow", function(e) {
//        if(e.handled !== true) {
//            console.log(getCurrentTime() + " [js/formSetup.js] (#buzzwords-edit-page -> pagebeforeshow) - start");
//            
//            $('#submit-edit-btn').parent().hide();
//            $('#reset-edit-btn').parent().hide();
//            $('#cancel-edit-btn').parent().hide();
//            
//            e.handled = true;
//            console.log(getCurrentTime() + " [js/formSetup.js] (#buzzwords-edit-page -> pagebeforeshow) - end");
//        }
//    });
//    $('#submit-edit-btn').parent().hide();
//    $('#reset-edit-btn').parent().hide();
//    $('#cancel-edit-btn').parent().hide();
    
    // The Clear button will remove data and validation marks but leave you in the form.
    // The Cancel button will clear the form and return you to the main page.
    //   The Cancel button has a link on it and that is what differentiates them. Otherwise they both need to clear the form.
    $('#clear-add-btn').on("click", function(e) {
        console.log(getCurrentTime() + " [js/formSetup.js] (#clear-add-btn, #cancel-add-btn -> on click) - start");
        
        // Remove errors display as a part of the validation system. 
        BUZZWORDS.validation.addBuzzwordsFormValidator.resetForm();
        
        // Reset this flag when the form passes validation. 
        BUZZWORDS.validation.formEmail = null;
        
        // Remove any errors that are not a part of the validation system.
        $('.invalid').remove();
        
        console.log(getCurrentTime() + " [js/formSetup.js] (#clear-add-btn, #cancel-add-btn -> on click) - end");
    });
    
    // The Clear button will remove data and validation marks but leave you in the form.
    // The Cancel button will clear the form and return you to the main page.
    //   The Cancel button has a link on it and that is what differentiates them. Otherwise they both need to clear the form.
    $('#cancel-add-btn').on("click", function(e) {
        console.log(getCurrentTime() + " [js/formSetup.js] (#clear-add-btn, #cancel-add-btn -> on click) - start");
        
        // Remove errors display as a part of the validation system. 
        BUZZWORDS.validation.addBuzzwordsFormValidator.resetForm();
        
        
        // Remove any errors that are not a part of the validation system.
        $('.invalid').remove();
        
        location.href = "index.html";
        
        e.handled = true;
        console.log(getCurrentTime() + " [js/formSetup.js] (#clear-add-btn, #cancel-add-btn -> on click) - end");
    });
    
    // This Reset button will remove unsaved changes and validation marks while leaving you in the form.
    $('#reset-edit-btn').on("click", function(e) {
        console.log(getCurrentTime() + " [js/formSetup.js] (#reset-edit-btn -> on click) - start");
        
        // Get the buzzword ID before we wipe the form. 
        var buzzwordID = $('input#buzzwords-edit-input-id').attr('value');
        
        // Remove errors display as a part of the validation system. 
        BUZZWORDS.validation.editBuzzwordsFormValidator.resetForm();
        
        // Remove any errors that are not a part of the validation system.
        $('.invalid').remove();
        
        // Since we are only "reseting" the form we need to put back the original data.
        BUZZWORDS.edit.getBuzzwordById(buzzwordID);
        
        e.handled = true;
        console.log(getCurrentTime() + " [js/formSetup.js] (#reset-edit-btn -> on click) - end");
    });
    
    // This Cancel button will clear the form and return you to the main page.
    $('#cancel-edit-btn').on("click", function(e) {
        console.log(getCurrentTime() + " [js/formSetup.js] (#cancel-edit-btn -> on click) - start");
        
        // Remove errors display as a part of the validation system. 
//            editValidator.resetForm();
        BUZZWORDS.validation.editBuzzwordsFormValidator.resetForm();
        
        // Reset this flag when the form passes validation. 
        BUZZWORDS.validation.formEmail = null;
        
        // Remove any errors that are not a part of the validation system.
        $('.invalid').remove();
        
        location.href = "index.html";

        console.log(getCurrentTime() + " [js/formSetup.js] (#cancel-edit-btn -> on click) - end");
    });
    
    // Hide the Delete dialog as the default
    $('#buzzwords-delete-dialog').hide();
    $('#buzzwords-delete-background').hide();
    
    // This Delete button will call the delete dialog/modal.
    $('#delete-edit-btn').on("click", function(e) {
    	console.log(getCurrentTime() + " [js/formSetup.js] (#delete-edit-btn -> on click) - start");
    	
    	// Show the Delete dialog
    	$('#buzzwords-delete-dialog').show();
    	$('#buzzwords-delete-background').show();
    	
    	console.log(getCurrentTime() + " [js/formSetup.js] (#delete-edit-btn -> on click) - end");
    });
    
    // This No button will close the delete dialog/modal.
    $('#cancel-delete-button').on("click", function(e) {
    	console.log(getCurrentTime() + " [js/formSetup.js] (#delete-edit-btn -> on click) - start");
    	
    	// Hide the Delete dialog
    	$('#buzzwords-delete-dialog').hide();
    	$('#buzzwords-delete-background').hide();
    	
    	console.log(getCurrentTime() + " [js/formSetup.js] (#delete-edit-btn -> on click) - end");
    });
    
}); 

