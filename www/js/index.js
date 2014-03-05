/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

        var budgetItem = 0;

        $.ajax({
            url: 'http://ibenn.co.uk/budgietReturnBudget.php',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 5000,
            success: function(data, status){
                $.each(data, function(i,item){
                    budgets(item.budget);
                });
            },
            error: function(){
                //error loading data
                console.log("Didn't load");
            }
        });

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function budgets(budget) {
    if (budget == null) {
        budget = "NaN";
    }

    var spending = 26;

    var balance = budget - spending;

    if (balance < 0) {
        document.body.style.background = '#a4003e';
    } else {
        document.body.style.background = '#51c778';
    }

    if (document.getElementById('number')){
        document.getElementById('number').innerHTML = ("£" + balance);
    }
    if (document.getElementById('budget')){
        document.getElementById('budget').innerHTML = (budget);
    }
    if (document.getElementById('budget2')){
        document.getElementById('budget2').value = (budget);
    }
}

