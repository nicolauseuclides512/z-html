(function () {

    'use strict';

    let jQuery;
    // let baseUrl = "https://development.zuragan.com/api/v1/pub";
    // let baseUrl = "https://api.zuragan.com/api/v1/pub";
    // let baseUrl = "localhost:9292/api/v1/pub";
    // let baseUrl = "http://localhost:8789/api/v1";
    let baseUrl = "http://development.zuragan.com:8494/api/v1";

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


        $('#zuragan-resi-form').submit(function (event) {
            event.preventDefault();
            let $inputs = $('#zuragan-resi-form :input');
            getWaybillDetails($, $inputs);

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
            float:left;
        }
        .img-thumbnail2{
            border-color: white;
            vertical-align: middle;
            /*width: 40px;*/
            height: 40px;
            font-size: 0;
            float:left;
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
            float:left;
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
            font-size: 14px;
            float:left;
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

        <form class="form-inline text-center" id="zuragan-resi-form">
            <div class="container-fluid">
                <div class="row pt-0 pb-0">
                    <div class="col-md-12" style="background: linear-gradient(#56AB2F, #0F9B0F, #0F9B0F, hsl(50, 80%, 15%, 0.9)); height:100px; padding:15px 16% 0px 16%">
                        <div class="col-md-12" style="margin-top: 25px; background:#fff; border-radius:10px; box-shadow:0px 1px 4px 0px #ccc; padding:20px">
                            <div class="col-md-5">
                                <label>Nama Kurir</label><br/>
                                <img src="resi/delivman_g.png" class="img-thumbnail">
                                <select class="form-control" id="zuragan-carrier" name="ongkir_carrier" style="width:80%">
                                    <option>Pilih Kurir</option>
                                </select>
                            </div>
                            <div class="col-md-5">
                                <label>Nomor Resi</label><br/>
                                <img src="resi/track_g.png" class="img-thumbnail">
                                <input type="text" name="resi_number" class="form-control tags-noBorder" id="zuragan-resi-number" placeholder="Nomor Resi" style="width:80%" required>
                            </div>
                            
                            <div class="col-md-2">
                                <button type="submit" class="btn btn-primary btn-block" style="background-color: #5ccc5c; height:61px">
                                <i class="fas fa-search" style="font-size:20px"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div id="resi-results"></div>
    `;
        $("#zuragan-resi-widget").append($(widgetForm));
        setCarriersData($);
    }

    function setCarriersData($) {
        $.ajax({
            url: baseUrl + "/carriers/list",
            dataType: "JSON",
            type: "GET",
            async: true,
            success: function (response) {
                let carriersForm = $('#zuragan-carrier');
                carriersForm.empty();
                $.each(response.data, function (key, value) {
                    carriersForm.append('<option value=' + value['code'] + '>'+value['name']+'</option>');
                });
            }
        });
    }

    function getWaybillDetails($, $inputs) {
        $('#resi-results').empty();
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
        data.waybill = values.resi_number.value;
        data.courier = values.ongkir_carrier.value;

        $.ajax({
            url: baseUrl + "/check-waybill",
            data: data,
            dataType: "JSON",
            type: "POST",
            async: true,
            success: function (response) {
                let resultHtml = $('#resi-results');
                var courier_image;
                switch (data.courier){
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
                    case "jnt":
                        courier_image = "jnt_id.png";
                        break;
                    case "pandu":
                        courier_image = "pandu.png";
                        break;
                    case "sicepat":
                        courier_image = "sicepat_id.png";
                        break;
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
            .img-thumbnail3{
                border-color: white;
                vertical-align: middle;
                height: 65px;
            }
            /* Timeline */
            .timeline{
                list-style: none;
                padding: 20px;
                position: relative;
            }
            .timeline:before {
                top: 40px;
                bottom: 0;
                position: absolute;
                content: " ";
                width: 3px;
                background-color: #eeeeee;
                left: 10%;
                margin-left: -1.5px;
            }
            .timeline .timeline-item {
                margin-bottom: 20px;
                position: relative;
            }
            .timeline .timeline-item:before,
            .timeline .timeline-item:after {
                content: "";
                display: table;
            }
            .timeline .timeline-item:after {
                clear: both;
            }
            .timeline .timeline-item .timeline-badge {
                color: #fff;
                width: 54px;
                height: 54px;
                line-height: 52px;
                font-size: 22px;
                text-align: center;
                position: absolute;
                top: 18px;
                left: 8%;
                margin-left: -25px;
                background-color: #7c7c7c;
                border: 3px solid #ffffff;
                z-index: 100;
                border-top-right-radius: 50%;
                border-top-left-radius: 50%;
                border-bottom-right-radius: 50%;
                border-bottom-left-radius: 50%;
            }
            .timeline .timeline-item .timeline-badge i,
            .timeline .timeline-item .timeline-badge .fa,
            .timeline .timeline-item .timeline-badge .glyphicon {
                top: 2px;
                left: 0px;
            }
            .timeline .timeline-item .timeline-badge.primary {
                background-color: #1f9eba;
            }
            .timeline .timeline-item .timeline-badge.info {
                background-color: #5bc0de;
            }
            .timeline .timeline-item .timeline-badge.success {
                background-color: #56AB2F;
            }
            .timeline .timeline-item .timeline-badge.warning {
                background-color: #d1bd10;
            }
            .timeline .timeline-item .timeline-badge.danger {
                background-color: #ba1f1f;
            }
            .timeline .timeline-item .timeline-panel {
                position: relative;
                width: 100%;
                float: left;
                right: 16px;
                min-width:400px;
                border: 1px solid #c0c0c0;
                background: #ffffff;
                border-radius: 2px;
                padding: 20px;
                -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
                box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
            }
            .timeline .timeline-item .timeline-panel:before {
                position: absolute;
                top: 26px;
                right: -16px;
                display: inline-block;
                border-top: 16px solid transparent;
                border-left: 16px solid #c0c0c0;
                border-right: 0 solid #c0c0c0;
                border-bottom: 16px solid transparent;
                content: " ";
            }
            .timeline .timeline-item .timeline-panel .timeline-title {
                margin-top: 0;
                color: inherit;
            }
            .timeline .timeline-item .timeline-panel .timeline-body > p,
            .timeline .timeline-item .timeline-panel .timeline-body > ul {
                margin-bottom: 0;
            }
            .timeline .timeline-item .timeline-panel .timeline-body > p + p {
                margin-top: 5px;
            }
            .timeline .timeline-item:last-child:nth-child(even) {
                float: left;
            }
            .timeline .timeline-item:nth-child(even) .timeline-panel {
                float: left;
                left: 100px;
            }
            .timeline .timeline-item:last-child:nth-child(odd) {
                float: left;
            }
            .timeline .timeline-item:nth-child(odd) .timeline-panel {
                float: left;
                left: 100px;
            }
            .timeline .timeline-item:nth-child(even) .timeline-panel:before {
                border-left-width: 0;
                border-right-width: 14px;
                left: -14px;
                right: auto;
            }
            .timeline .timeline-item:nth-child(odd) .timeline-panel:before {
                border-left-width: 0;
                border-right-width: 14px;
                left: -14px;
                right: auto;
            }
            
            </style>
            <br/>
            <br/>
            <br/>
            <div class="row pt-0 pb-0">
                <div class="col-md-4" style="background: linear-gradient(#56AB2F, #0F9B0F, #0F9B0F, hsl(50, 80%, 15%, 0.9)); height:200px; padding:15px 5% 0px 5%">
                    <div class="col-md-12 style="margin-top: 25px; background:#fff; border-radius:10px; box-shadow:0px 1px 4px 0px #ccc; padding:20px">
                        <table>
                            <tr>
                                <td style="width:42px"><img src="resi/box_1white.png" class="img-thumbnail" style="border:none"></td>
                                <td>
                                    <p style="color:#fff">
                                        `+response.data.result.summary.shipper_name+`<br\>
                                        `+response.data.result.summary.origin+`
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="width:42px"><img src="resi/box_2white.png" class="img-thumbnail" style="border:none"></td>
                                <td>
                                    <p style="color:#fff">
                                        `+response.data.result.summary.receiver_name+`<br\>
                                        `+response.data.result.summary.destination+`
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-md-12" style="margin-top: 5px; background:#fff; border-radius:10px; box-shadow:0px 1px 4px 0px #ccc; padding:20px">
                        <p>
                            <img src="https://s3-ap-southeast-1.amazonaws.com/sahitotest/assets/carriers/`+courier_image+`" class="img-thumbnail3"/>
                        </p>
                        
                        <p>
                            `+response.data.query.waybill+`<br\>
                            Last Info :`+response.data.result.summary.status+`<br\>
                        </p>
                    </div
                </div>

            </div>
            <div class="col-md-8">
                    <!-- MANIFEST TIMELINE goes here -->
                    <ul class="timeline">
						<li class="timeline-item">
						</li>
					</ul>
                </div>
            `;
                if (response.data.result.manifest !== null || response.data.result.manifest !== undefined) {
                    if (response.data.result.manifest.length > 0) {
                        resultHtml.append(table);

                        for (var j = 0; j < response.data.result.manifest.length; j++){
                            $('.timeline > li:last-child').append(`
                                <li class="timeline-item">
                                    <div class="timeline-badge success"><i class="glyphicon glyphicon-ok"></i></div>
                                        <div class="timeline-panel">
                                            <div class="timeline-heading">
                                                <p><small><i class="glyphicon glyphicon-time"></i>`+response.data.result.manifest[j].manifest_date+`<br\>`+response.data.result.manifest[j].manifest_time+`</small></p>
                                            </div>
                                            <div class="timeline-body">
                                                <p>`+response.data.result.manifest[j].manifest_description+`</p>
                                            </div>
                                        </div>
                                    </li>`
                            );
                        }
                    }
                    else {
                        $('#resi-results').empty();
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