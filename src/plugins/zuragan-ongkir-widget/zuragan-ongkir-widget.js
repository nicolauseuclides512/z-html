(function () {

    'use strict';

    let jQuery;
    // let baseUrl = "https://development.zuragan.com/api/v1/pub";
    // let baseUrl = "https://api.zuragan.com/api/v1/pub";
    // let baseUrl = "http://development.zuragan.com:8494/api/v1";
    let baseUrl = "https://ongkir.zuragan.com/api/v1";
    // let baseUrl = "localhost:9292/api/v1/pub";

    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '3.2.1') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src",
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState === 'complete' || this.readyState === 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else { // Other browsers
            script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);

    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    function scriptLoadHandler() {
        jQuery = window.jQuery.noConflict(true);
        main();
    }

    function init($) {

        //Set Css
        let $head = $("head");
        let $headlinkLast = $head.find("link[rel='stylesheet']:last");
        let bootstrapStyle = '<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';
        let customStyle = `<style>ul.typeahead.dropdown-menu {max-height: 200px;overflow: auto;}</style>`;

        let $headScriptLast = $head.find("script[type='text/javascript']:last");
        let typeaheadScript = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.js"></script>';

        if ($headlinkLast.length) {
            $headScriptLast.after(typeaheadScript);
            $headlinkLast.after(bootstrapStyle);
            $headlinkLast.after(customStyle);
        }
        else {
            $head.append(typeaheadScript);
            $head.append(bootstrapStyle);
            $head.append(customStyle);
        }

        generateForm($);


        $('#zuragan-ongkir-form').submit(function (event) {
            event.preventDefault();
            let $inputs = $('#zuragan-ongkir-form :input');
            // getShippingCost($, $inputs);
            getShippingCosts($, $inputs);

        });

    }

    function generateForm($) {
        const widgetForm = `
        <style>
        .img-thumbnail{
            border-color: white;
            background-color: transparent;
            /*width: 20px;*/
            height: 40px;
        }
        .img-thumbnail2{
            border-color: white;
            vertical-align: middle;
            /*width: 40px;*/
            height: 40px;
            font-size: 0;
        }
        .img-thumbnail3{
            width: 200px;
            height: 60px;
        }
        .col-sm-3.pt-0 pb-0{

        }
        label{
            font-size:8pt;
            font-weight:normal;
            margin-left:5px;
            margin-right:0;
            margin-top:0;
            margin-bottom:0;
        }
        .form-control {
            -moz-border-radius: 2px;
            -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
            -webkit-border-radius: 2px;
            -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
            background-color: #fff;
            border-radius: 2px;
            border: 0px solid #eee;
            box-shadow: none;
            color: rgba(0, 0, 0, .6);
            font-size: 14px
        }
        ::placeholder{
            color:
        }
        .form-control:focus {
            background: #fff;
            box-shadow: none
        }
        .btn {
            -moz-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
            -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
            border-top-right-radius: 8px;
            border-bottom-right-radius : 8px;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
            font-family: Nunito, sans-serif;
            letter-spacing: .2px;
            opacity: .93
        }
        .btn-primary,
        .btn-primary.active,
        .btn-primary.focus,
        .btn-primary:active,
        .btn-primary:focus,
        .btn-primary:hover,
        .open>.dropdown-toggle.btn-primary {
            border: 0px solid #2FA3E6!important
        }
        </style>
        <br/>
        <form class="form-inline text-center" id="zuragan-ongkir-form">
            <div class="container-fluid" style="border:2px solid #5ccc5c; border-radius: 8px;">
                <div id="hidden-from-input"></div>
                    <div class="row pt-0 pb-0">
                        <div class="col-sm-4 pr-0 pl-0" style="padding-left: 0px;padding-right: 0px; text-align:left; border-bottom-left-radius:8px ;border-right:1px solid #d8f3d8; border-bottom:1px solid #d8f3d8">
                            <label>Kota Asal</label><br/>
                            <img src="ongkir/home_kotaAsal_g.png" class="img-thumbnail">
                            <input data-provide="typeahead" onfocus="this.select();" onmouseup="return false;" autocomplete="off" type="text" name="ongkir_origin" class="form-control tags-noBorder" id="zuragan-ongkir-from" placeholder="Kota Asal" style="width:75%" required />
                        </div>

                        <div class="col-sm-4 pr-0 pl-0" style="padding-left: 0px;padding-right: 0px; text-align:left; border-right:1px solid #d8f3d8; border-bottom:1px solid #d8f3d8">
                            <label>Kota Tujuan</label><br/>
                            <img src="ongkir/home_kotaTujuan_9.png" class="img-thumbnail">
                            <input data-provide="typeahead" onfocus="this.select();" onmouseup="return false;" autocomplete="off" type="text" name="ongkir_destination" class="form-control tags-noBorder" id="zuragan-ongkir-destination" placeholder="Kota Tujuan" style="width:75%" required "/>
                        </div>

                        <div class="col-sm-2 pr-0 pl-0" style="padding-left: 0px;padding-right: 0px; text-align:left;">
                            <label>Berat (g)</label><br/>
                            <img src="ongkir/home_berat_g.png" class="img-thumbnail">
                            <input type="number" value="1000" name="ongkir_weight" onfocus="this.select();" onmouseup="return false;" min="0" class="form-control tags-noBorder" id="zuragan-ongkir-weight" placeholder="1000 g" style="width:50%" require/>
                        </div>

                        <div class="col-sm-2 pr-0 pl-0" style="padding-left: 0px;padding-right: 0px; text-align:left;">
                            <button type="submit" class="btn btn-primary btn-block" style="background-color: #5ccc5c; height:61px">
                                <strong>PERIKSA</strong>
                            </button>
                        </div>
                    </div>
            </div>
        </form>

      <div id="ongkir-results"></div>
    `;

        $("#zuragan-ongkir-widget").append($(widgetForm));

        searchCity($, "#zuragan-ongkir-from");
        searchSubdistrict($, "#zuragan-ongkir-destination");
        // setCarriersData($);
    }

    function searchCity($, tag) {
        $(tag)
            .typeahead({
                fitToElement: true,
                minLength: 3,
                scrollHeight: 5,
                displayText: function (item) {
                    return item.full_name;
                },
                items: 15,
                delay: 400,
                source: function (query, process) {
                    $.ajax({
                        url: baseUrl + "/cities",
                        data: 'min_char=3&type=city&q=' + query,
                        dataType: "JSON",
                        type: "GET",
                        async: true,
                        success: function (response) {
                            process(response.data);
                        }
                    });
                },
                updater: function (item) {
                    $(tag).attr('data-id', item.id);
                    $(tag).attr('data-type', item.type);

                    return item.full_name;
                }
            });
    }

    function searchSubdistrict($, tag) {
        $(tag)
            .typeahead({
                fitToElement: true,
                minLength: 3,
                scrollHeight: 5,
                displayText: function (item) {
                    return item.full_name;
                },
                items: 15,
                delay: 400,
                source: function (query, process) {
                    $.ajax({
                        url: baseUrl + "/cities",
                        data: 'min_char=3&q=' + query,
                        dataType: "JSON",
                        type: "GET",
                        async: true,
                        success: function (response) {
                            process(response.data);
                        }
                    });
                },
                updater: function (item) {
                    $(tag).attr('data-id', item.id);
                    $(tag).attr('data-type', item.type);

                    return item.full_name;
                }
            });
    }

    function getShippingCosts($, $inputs) {
        $('#ongkir-results').empty();
        $(':button[type="submit"]').prop('disabled', true);

        let data = {};
        let values = {};

        $inputs.each(function () {
            values[this.name] = {
                value: $(this).val(),
                id: $(this).attr('data-id'),
                type: $(this).attr('data-type')
            };
        });

        data.origin = values.ongkir_origin.id;
        data.originType = values.ongkir_origin.type;
        data.destination = values.ongkir_destination.id;
        data.destinationType = values.ongkir_destination.type;
        data.weight = values.ongkir_weight.value;
        // data.courier = setCarriersData().value;
        data.courier = "jne:pos:tiki:wahana:jnt:pandu:sicepat";
        data.length = 0;
        data.width = 0;
        data.height = 0;


        $.ajax({
            url: baseUrl + "/ongkir/domestic-costs?sort=asc",
            data: data,
            dataType: "JSON",
            type: "POST",
            async: true,
            success: function (response) {
                let resultHtml = $('#ongkir-results');
                var nama_destinationType
                switch(data.destinationType){
                    case "city" :
                        nama_destinationType = response.data.destination_details.city_name;
                        break;
                    case "subdistrict":
                        nama_destinationType = response.data.destination_details.subdistrict_name;
                }
                let table = `
            <style>
                
            .table-responsive td
            {
                text-align:center;
            }
            .table-responsive th 
            {            
                text-align:center;
            }
            .table-responsive{
                width: 70%;
                background-color: #fafafa;
                box-shadow: 5px 5px #CCCCCC;
                border-radius: 10px;
                margin : auto;
            }
            </style>
            <br/>
            <br/>
            <br/>
            <table class="ongkir-result-table table table-responsive" align="center">
              <thead>
                <tr>
                    <th colspan="3" style="font-weight: normal; background-color:#5ccc5c; color:#FFFFFF; border-top-left-radius: 10px;border-top-right-radius: 10px;">
                    Tarif dari 
                    <strong>`+response.data.origin_details.city_name+`</strong> ke 
                    <strong>`+nama_destinationType+`</strong> <br/> 
                    <strong>`+data.weight+`</strong> gram</th2>
                </tr>
                <tr>
                  <th style="height:30px; vertical-align:middle; font-size:medium">KURIR</th>
                  <th style="text-align: left; height:30px; vertical-align:middle; font-size:medium">LAYANAN</th>
                  <th style="text-align:left; height:30px; vertical-align:middle; font-size:medium">TARIF</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
            `;

                if (response.data.data !== null || response.data.data !== undefined) {
                    if (response.data.results.length > 0) {
                        resultHtml.append(table);

                        for (var j = 0; j < response.data.results.length; j++){
                            var courier_image;
                            switch (response.data.results[j].code){
                                case "jne":
                                    courier_image = "jne_id.png";
                                    break;
                                case "pos":
                                    courier_image = "pos_id.png";
                                    break;
                                case "tiki":
                                    courier_image = "tiki_id.png";
                                    break;
                                case "wahana":
                                    courier_image = "wahana_id.png";
                                    break;
                                case "J&T":
                                    courier_image = "jnt_id.png";
                                    break;
                                case "pandu":
                                    courier_image = "pandu.png";
                                    break;
                                case "sicepat":
                                    courier_image = "sicepat_id.png";
                                    break;
                            }
                            $('.ongkir-result-table > tbody:last-child').append(`
                                <tr>
                                    <td><img src="https://s3-ap-southeast-1.amazonaws.com/sahitotest/assets/carriers/`+courier_image+`" class="img-thumbnail2"/></td>
                                    <td style="text-align: left; vertical-align:middle">` + response.data.results[j].service + ` <br/> `+ response.data.results[j].etd + `</td>
                                    <td style="color: blue; font-size: large; vertical-align:middle; text-align:left"><sup style="color:#4d4d4d">Rp. </sup>` + formatCurrency(response.data.results[j].value.toFixed(0)) + `</td>
                                </tr>`
                            );
                        }
                    } else {
                        $('#ongkir-results').empty();
                        resultHtml.append('<p style="text-align: center">Hasil pencarian tidak ditemukan..</p>');
                    }
                }

                $(':button[type="submit"]').prop('disabled', false);

            }
        });
    }

    function formatCurrency(total) {

        var dot = ".";
        var value = new String(total);
        var decimal = [];
        while(value.length > 3)
        {
            var asd = value.substr(value.length-3);
            decimal.unshift(asd);
            value = value.substr(0, value.length-3);
        }

        if(value.length > 0) { decimal.unshift(value); }
        value = decimal.join(dot);
        return value;

    }

    function main() {
        jQuery(document).ready(function ($) {
            init($);
        });
    }

})();