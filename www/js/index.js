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
        document.body.style.background = localStorage.getItem('3');
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

function budgets() {
    var budget = localStorage.getItem('2');

    if (budget == null) {
        budget = "NaN";
    }

    var spending = localStorage.getItem('4');

    var balance = budget - spending;

    if (balance < 0) {
        document.body.style.background = '#a4003e';
        localStorage.setItem('3', '#a4003e');
    } else {
        document.body.style.background = '#51c778';
        localStorage.setItem('3', '#51c778');
    }

    if (document.getElementById('number')){
        document.getElementById('number').innerHTML = ("£" + balance.toFixed(2));
    }
    if (document.getElementById('budget')){
        document.getElementById('budget').innerHTML = (budget);
    }
    if (document.getElementById('budget2')){
        document.getElementById('budget2').value = (budget);
    }
    if (document.getElementById('daysleft')){
        if (localStorage.getItem('5') == 7) {
            document.getElementById('daysleft').innerHTML = "Last day!";
        } else {
            document.getElementById('daysleft').innerHTML = "Today and " +(localStorage.getItem('5') + " days remaining.");
        }
    }
}

function getBudget() {
    var budgetItem = 0;

    $.ajax({
        type: 'POST',
        url: 'http://ibenn.co.uk/budgiet/api/budgetreturn',
        dataType: 'json',
        data: {
            'uid': localStorage.getItem('10'),
            'token': localStorage.getItem('11')
        },
        success: function(data){
                $.each(data, function(i,item){
                    localStorage.setItem('2', item.budget);
                    localStorage.setItem('5', item.daysleft);
                    budgets();
                });
        },
        error: function(){
            //error loading data
            window.location.href = "login.html";
        }
    });
}

function items(){

    $.ajax({
        type: 'POST',
        url: 'http://ibenn.co.uk/budgiet/api/viewtest',
        dataType: 'json',
        data: {
            'uid': localStorage.getItem('10'),
            'token': localStorage.getItem('11')
        },
        success: function(data){
                localStorage.setItem('4', data.spending);
                budgets();
        },
        error: function(){
            //error loading data
            window.location.href = "login.html";
        }
    });
}

function itemDetails(){
    var amountTrans = 5;
    var innerHTML = '<h2>Last ' + amountTrans + ' transactions:</h2><table class="table table-striped" style="color: #000000;"><thead><tr><th>#</th><th>Time</th><th>Item</th><th>Price</th></tr></thead><tbody>';
    $.ajax({
        type: 'POST',
        url: 'http://ibenn.co.uk/budgiet/api/view5',
        dataType: 'json',
        data: {
            'uid': localStorage.getItem('10'),
            'token': localStorage.getItem('11')
        },
        success: function(data){
                var y = 0;
                $.each(data, function(i,item){
                    innerHTML += "<tr><td>" + (++y) + "</td>";
                    var date = new Date(item.timestamp*1000);
                    innerHTML += "<td>" + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + "</td>";
                    innerHTML += "<td>" + item.item + "</td>";
                    innerHTML += "<td>£" + item.price + "</td></tr>";
                });

                innerHTML += "</tbody></table>";

                document.getElementById('table').innerHTML = innerHTML;
        },
        error: function(){
            //error loading data
            window.location.href = "login.html";
        }
    });
}
