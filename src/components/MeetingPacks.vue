<template>    
    <div>
        <v-app>
        <!-- NAV-MENU -->
        <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; text-align:center;">           
            <router-link to="/dashboard" style="text-decoration:none;"><v-icon color="#fff" size="35" style="margin-left:10px;">mdi-home</v-icon></router-link>
            <p style="font-weight:bold; font-size:24px; margin-left:40%;">Meeting Packs</p>
        </div>

        <!-- COMPONENT -->
        <div style="height:850px; margin-top:0.5%; margin-bottom:0.5%; background-color:#f8f9f9; border-top:5px solid rgb(86,182,229); width:98%; margin-left:1%; margin-right:1%;">
            <div class = "parent" style="height:45px; width:100%; margin-top: 7px; background-color:#fff;">
                <div class="left-buttons">                
                    <router-link to=""><v-icon v-on:click="loadItemFromHistory()" style="float:left; margin-left:10px; background-color:rgb(86,182,229); color:#fff" size="30">mdi-chevron-left</v-icon></router-link> 
                    <p style="float:left; font-weight:bold; font-size:24px; text-align:left; margin-left:10px; width:250px;">Meeting Packs</p>              
                </div>
                    <div class="filler"></div>
                <div class="right-buttons" style="display:inline;">                
                    
                    <div class="dropdown-table" style="display:inline;">
                            <v-menu>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        color="primary" 
                                        text
                                        v-on="on"
                                    >
                                        Ascending
                                        <v-icon>mdi-swap-vertical-bold</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item style="display:block;">     
                                        <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" 
                                            v-on:click="doSort('itemName')" href="javascript:">Name
                                            <span v-if="sort.field=='itemName'">({{sort.desc?'desc':'asc'}})</span>
                                        </v-list-item-title>

                                        <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" 
                                            v-on:click="doSort('itemSize')" href="javascript:">Size
                                            <span v-if="sort.field=='itemSize'">({{sort.desc?'desc':'asc'}})</span>
                                        </v-list-item-title>

                                        <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" 
                                            v-on:click="doSort('itemLastUpdatedOn')" href="javascript:">Modified On
                                            <span v-if="sort.field=='itemLastUpdatedOn'">({{sort.desc?'desc':'asc'}})</span>
                                        </v-list-item-title>

                                        <v-list-item-title style="padding: 12px; font-size:16px; cursor:pointer" 
                                            v-on:click="doSort('itemUploadedBy')" href="javascript:">Submitted By
                                            <span v-if="sort.field=='itemUploadedBy'">({{sort.desc?'desc':'asc'}})</span>
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>       
                        </div> 
                    
                    <div style="display:inline;">
                        <button class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:">Name</button>
                    </div>
                    </div> 
            </div> 

            <div  v-if="closePDF" style="position:absolute; background-color:#f5f5f5; width:98%; height:850px; padding:1%; margin-right:1%; z-index:2;">
            <!-- <div v-if="closePDF" style="position:absolute; background-color:#f5f5f5; width:77%; height:900px; padding:1%; overflow:hidden; margin-top:1%; margin-right:1%; margin-left:22%; z-index:-1"> -->
                <button class="btn btn-lg" v-on:click="closePDF = !closePDF;" style="background-color:red; float:right; margin-right:10px;">
                    <v-icon>mdi-close-outline</v-icon>
                </button>              
                <pspdfkit :pdf-url="pdf" :license-key="LICENSE_KEY" :base-url="baseUrl">
                </pspdfkit> 
            </div>
        
            <div class = "parent" style="height:55px; width:100%; background-color:#f1f1f1;">
                <p style="font-weight:bold; font-size:24px; margin-left:10px; float:left;">{{joinNames()}}</p>            
            </div>

            <div class="blackish" style="width:100%;">
                
                <table width="100%" style="overflow-y:auto; overflow-x:auto;">
                    <tr>
                        <td>
                            <div style="width:100%;">
                                <table style="width:100%;">
                                    <tr style="color:#fff; background-color:rgb(86,182,229);">
                                        <th style="padding:7px; width:5%;">No.</th>
                                        <th style="width:5%;"></th> 
                                        <th style="width:60%;">Name</th>
                                        <th style="width:10%;">Size</th>
                                        <th style="width:10%;">Modified_On</th>
                                        <th style="width:10%;">Submitted_By</th>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="width:100%; height:600px; overflow:auto;">
                                <table class="table-striped" style="width:100%;">
                                    <tbody>
                                        <tr v-for="(item, index) in sortedData2" :key="index">
                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:5%;">{{ index + 1 + "." }}</td>
                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:5%;">    
                                                <span class="input-group-addon">
                                                    <v-icon v-if="item.itemExtension" color="rgb(86,182,229)" style="margin-right:5px;">mdi-file-pdf-outline</v-icon>                                                        
                                                    <v-icon v-else color="rgb(86,182,229)" style="margin-right:5px;">mdi-folder-open</v-icon>
                                                </span>
                                            </td>
                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:60%;">
                                                <a href="#"  v-on:click="getMeetingPack(item)">
                                                    {{ item.itemName }}
                                                </a>                                                    
                                            </td>
                                            <td v-if="item.itemSize == 0" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                {{ "0.00 KB" }} 
                                            </td>
                                            <td v-else style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                {{ item.itemSize | prettyBytes }} 
                                            </td>
                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                {{ parseInt(item.itemLastUpdatedOn, 10) |  moment('DD-MMM-YYYY') }}                                 
                                            </td>
                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                {{ item.itemUploadedBy }}                                 
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <!-- <tr>
                        <td>
                            <div style="width:100%; height:190px; overflow:auto; position:absolute;">
                                <table class="table-striped" width="100%">
                                    <tbody width  = "100%">
                                        <tr v-for="(item, index) in sortedData2" :key="index">
                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:5%;">{{ index + 1 + "." }}</td>
                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:5%;">    
                                                <span class="input-group-addon"><v-icon color="rgb(86,182,229)" style="margin-right:5px;">mdi-folder-open</v-icon></span>
                                            </td>
                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:60%;">
                                                <a href="#"  v-on:click="getMeetingPack(item)">
                                                    {{ item.itemName }}
                                                </a>
                                                
                                            </td>
                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                {{ item.itemSize | prettyBytes }} 
                                            </td>
                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                {{ parseInt(item.itemLastUpdatedOn, 10) |  moment('DD-MMM-YYYY') }}                                 
                                            </td>
                                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                {{ item.itemUploadedBy }}                                 
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>  
                            </div>
                        </td>
                    </tr> -->
                </table>

                <!-- <table width="100%" border="1">
                    <tr style="background-color:rgb(86,182,229); display:block; line-height:30px; overflow-y:hidden; overflow-x:hidden; color:#ffffff;">
                    <tr style="background-color:rgb(86,182,229); overflow-y:auto; overflow-x:auto;">    
                        <td style="width:5%;">No.</td>
                        <td style="width:5%;"></td> 
                        <td style="width:70%;">Name</td>
                        <td style="width:10%;">Size</td>
                        <td style="width:10%;">Modified_On</td>
                        <td style="width:10%;">Submitted_By</td>
                    </tr>

                    <tbody>
                        <tr>
                            <td style="width:5%">Just a Test</td>
                            <td style="width:5%"></td>
                            <td style="width:70%">Just a Test</td>
                            <td style="width:10%">Just a Test</td>
                            <td style="width:10%">Just a Test</td>
                            <td style="width:10%">Just a Test</td>
                        </tr>
                    </tbody>
                </table> -->

                <!-- <table class="table-striped" style="width:100%; display:block; overflow-y:auto; overflow-x:auto;">
                        <tr style="background-color:rgb(86,182,229); width:100%; height:auto; display:block; line-height:30px; overflow-y:hidden; overflow-x:hidden; color:#ffffff;">
                        <th style="padding:7px; width:5%;">No.</th>
                        <th style="padding:7px; width:8%;"></th> 
                        <th style="padding:7px; width:70%;">Name</th>
                        <th style="padding:7px; width:10%;">Size</th>
                        <th style="padding:7px; width:10%;">Modified_On</th>
                        <th style="padding:7px; width:10%;">Submitted_By</th>
                    </tr>

                    <tbody style="overflow-y:auto; overflow-x:auto; height:670px; display:block;">
                        <tr v-for="(item, index) in sortedData2" :key="index" 
                            style="width:100%;">
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:5%;">{{ index + 1 + "." }}</td>
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:5%;">    
                                <span class="input-group-addon"><v-icon color="rgb(86,182,229)" style="margin-right:5px;">mdi-folder-open</v-icon></span>
                            </td>
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:40%;">
                                <a href="#"  v-on:click="getMeetingPack(item)">
                                    {{ item.itemName }}
                                </a>
                                
                            </td>
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:15%;">
                                {{ item.itemSize | prettyBytes }} 
                            </td>
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:15%;">
                                {{ parseInt(item.itemLastUpdatedOn, 10) |  moment('DD-MMM-YYYY') }}                                 
                            </td>
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:15%;">
                                {{ item.itemUploadedBy }}                                 
                            </td>
                        </tr>
                    </tbody> -->

                    
                    <!-- <tr style="background-color:rgb(86,182,229); width:100%; height:auto; display:block; line-height:30px; overflow-y:hidden; overflow-x:hidden; color:#ffffff;">
                        <th style="padding:7px; min-width:70px;">No.</th>
                        <th style="padding:7px; min-width:70px;"></th> 
                        <th style="padding:7px; min-width:650px;">Name</th>
                        <th style="padding:7px; min-width:200px;">Size</th>
                        <th style="padding:7px; min-width:200px;">Modified On</th>
                        <th style="padding:7px; min-width:200px;">Submitted By</th>
                        <th style="padding:7px; min-width:200px;">Briefcase</th>
                    </tr>

                    <tbody style="overflow-y:auto; overflow-x:auto; height:670px; display:block;">
                        <tr v-for="(item, index) in sortedData2" :key="index" 
                            style="width:100%;">
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:70px; max-width:70px;">{{ index + 1 + "." }}</td>
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:70px; max-width:70px;">    
                                <span class="input-group-addon"><v-icon color="rgb(86,182,229)" style="margin-right:5px;">mdi-folder-open</v-icon></span>
                            </td>
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:650px; max-width:650px;">
                                <a href="#"  v-on:click="getMeetingPack(item)">
                                    {{ item.itemName }}
                                </a>
                                
                            </td>
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:200px; max-width:200px;">
                                {{ item.itemSize | prettyBytes }} 
                            </td>
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:200px; max-width:200px;">
                                {{ parseInt(item.itemLastUpdatedOn, 10) |  moment('DD-MMM-YYYY') }}                                 
                            </td>
                            <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:200px; max-width:200px;">
                                {{ item.itemUploadedBy }}                                 
                            </td>
                            <td style="padding-right:10px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; min-width:200px; max-width:200px;">
                                <button class="btn btn-danger">Remove</button>
                            </td>
                        </tr>
                    </tbody> 
                </table> -->

            </div>
        </div>  
        <!-- END OF COMPONENT -->

        <!-- FOOTER -->
        <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; padding-left:40%;">
            <v-icon color="#fff" style="margin-right:5px;">mdi-file-pdf-outline</v-icon>
            <p style="font-weight:bold; font-size:19px;">Matters Arising Report</p>
        </div>
        </v-app>
    </div>       
</template>


<script>
    var moment = require('moment');
    import axios from 'axios';
    import UserData from './repository/UserData';
    import Vue from 'vue';
    import PSPDFKit from "pspdfkit";

    // const LICENSE_KEY = "H8E3jzmVoQoKTpdmwIL-fp3l4tIXnqDrMQX2iyEpWQDWkgbJ1xho58ylym0MVf1AVcCkze3LIlMvZ7SjQwo9wrkaIq8CtOP2_jKSiXyms44dQq9CXTicGr1nPn8gZrAb4_C9pikBx8K6Vn90vswIM9cxHReanwhwx6np0W9bvQwgj0mgqWrgm_ay96va6pYgPNSz6f-V-XlCdiCm8V1m3xKLN-Iu7Fw5dSGFO7jaFVKMzxmPuqXAbmmsV6RHcuqv6mKVbC_zgT-9FmJsp-ppBiRKWTefb9Shk_7-a-PmUXf4ZbTC_9c5g-n0ExH-e6h8PbHrLiOSOkkxMHK288aRHT2EwTleY1RnULGKXmc2dmpgWkSarBsfVFV6_FAHO5FE57AfGDDlCgyYqaFz5hOcNOBR178CBBBhjGvxrYwmL-0R3KsOq_5Q5VHAcYB1k-z6";
    // const LICENSE_KEY = "Ni5LCTkSzrHKL3GnUlgVXV-Nt0-8cc5vbAlHmT6bRZZsheHGsPidBAsVHH7EbGm6krygVYe1_nAyLUlRZ4OUN9xBGmFpOiLJbNNvfnzJFkg3HwNvhVr0pNcug-kq6qFZMefIjdFy6-51sEWAD6nFfaRAFr0ihgzQ_Qf7o43DSWakOaAFFk6THvYiEAiwlDeTR-ggbcRf3orhW58EWXjqc8d1Ez1iy3SJtFsy0ReQcWBlkV2r_0HzjWzc1mvO4fDFSmYJvZ7DiL9MAtoEXyy14hpwaGW4uliBV6-JeCdjz64pzuEqhYql2EgzbG0r2eLGHIeDyrYtkA20c_Zyd_zbf4Vtbd31PPuPymL-75ZIcXtoIhlUcKLxMTEUcL8KiXgx7zEHWU4ajjtH2uPXNHkBnxyUL4K9OH7WxmV5k2nxAjqHLOf9bPIf0q61OJyejnmO";
    const LICENSE_KEY = "xmnyiKkvzmQ0WIOagPDOdV_GESKnYO6fNa-1Ck87vP0NEExhZQ_DNdRPLVJK1l2M2s30Yt1Sz1J94COZb2TWcvvO2mQRYJBkIZWMYLII-p0daMx3ClCRbSmPJ1yUW0EbvRm50xZC2hzO8lLVP2GRr47Qeceo0Y837a9qyXglGJLiJpKVYl1liSuDzArGi1nPOF1AfbyevOEdBaUVAMiYypx6iIo281tNqkzMV5j4d5eB-yMpn0xnvbXd-RdiGLZXn--8yqGVbwZWSTCjnnPbVkheQqiuAUUrvFPlC0LENI1c94TS_zLzo6RVx03kZF0bxI_vYyyxYx8r7IwghUBKXuBnUJXZHsteNLBMaQg-rIKh-ORAwjFwSM80vLow6nunBmPyLHvyERGeABpyPQyWRN0R6DaflKyYpmUn_UohjxcfYl8AQYJkf6cAXLJAeWnQ"
 
    const pspdfkit = Vue.component('pspdfkit', {
    template: 
        `
        <div class="container" style="height:100%; width:97%;">
            <!--<button class="btn btn-lg" text v-on:click="closePDF = !closePDF;" style="color:green; ">CLOSE</button> -->               
        </div>
        `,
    name: 'pspdfkit',
    props: ['pdfUrl', 'licenseKey', 'baseUrl'],
    _instance: null,

    mounted: function mounted() {
        this.getImportedData((annotations)=>{
            try{
                this.load(JSON.parse(annotations))
            }
            catch(error){
                this.load(JSON.parse(null))
            }
        }); 
    },

    methods: {
        load: function load(annotations) {
            const that = this;
            PSPDFKit.load({
                disableWebAssemblyStreaming: true,
                pdf: this.pdfUrl,
                pdf2: "example.pdf",
                container: '.container',
                licenseKey: this.licenseKey,
                baseUrl: this.baseUrl,
                instantJSON:annotations,
            })
            .then(function (instance) {
                // that._instance = instance;
                that.$parent.errorMsg = ''
                instance.addEventListener("annotations.didSave", async () => {
                instance.exportInstantJSON().then(function (instantJSON) {
                console.log(instantJSON)
                const form = new FormData();
                form.append("payload", JSON.stringify(instantJSON));
                form.append("document_id", UserData.getDocumentId());
                form.append("user_id", UserData.getUserId());
                form.append("company_code", UserData.getCompanyCode());

                    axios.post("https://eserver1.stl-horizon.com/pspdfkit/saveAnnotation.php", form)
                    .then(response=>{
                        console.log(response);
                    });
                });
            })
            })
            .catch(function (err) {
                PSPDFKit.unload('.container')
                that.$parent.errorMsg = err.message
            });
        },

        unload: function unload() {
            if (this._instance) {
                PSPDFKit.unload(this._instance || '.container')
                this._instance = null
            }
        },

        getImportedData: function getImportedData(annotationsCallBack) {
            const form = new FormData();
                form.append("document_id", UserData.getDocumentId());
                form.append("user_id", UserData.getUserId());
                form.append("company_code", UserData.getCompanyCode());

            axios.post('https://eserver1.stl-horizon.com/pspdfkit/importAnnotation.php', form)
                .then(response => {
                    var data = response.data;
                    if(data){
                        if(annotationsCallBack instanceof Function){
                            annotationsCallBack(data.replace(/\\"/g, '"'))
                        }
                    }
                    else{
                       if(annotationsCallBack instanceof Function){
                            annotationsCallBack(data)
                        } 
                    }
                })
            },
    },
    
    watch: {
        pdfUrl: function pdfUrl() {
            this.unload()
            this.load()
        }
    },

    beforeDestroy: function beforeDestroy() {
        this.unload()
    }
    });

    export default{
        data: () => ({
            moment: moment,
            test: true,
            getRecentDocuments: [],
            itemSubArray: [],
            itemSubArray2: [],
            itemSubArray3: [],

            navigationPath:[
                {
                    "itemName": "...",
                    "localUrl": "0"
                }
            ],

            parentItemId:"",

            items2: [
                { title: 'Name' },
                { title: 'Size' },
                { title: 'Modified On' },
                { title: 'Submitted By' },
            ],
         
            currentComponent: null,

            componentsArray: ['comp1', 'comp2'],

            dynamicComponent: {
                template: `<p>Wheee</p>`
            },

            sort: {
                field: '',
                desc: true        
            },

            items: [
                { id: 1, name: 'Person 1', leave: 123.45 },
                { id: 2, name: 'John Smith', leave: 13.45 },
                { id: 3, name: 'Bill Smith', leave: 23.45 },
                { id: 4, name: 'John Doe', leave: 133.53 }
            ],

            load:{
                userId: '45',
                companyCode: '010',
                accessToken: '97f914eb1ceb1867e3824f647f7e589b',
                model: 'getMeetingPackFolder',
                companyId: '2',
                itemId: '0'
            },
            userdata:{                
                rootUrl:"https://eserver1.stl-horizon.com/api_v13/frontend/web/index.php/user/create"
            },

            pdf:'example.pdf',
            LICENSE_KEY: LICENSE_KEY,
            baseUrl: '',
            errorMsg: '',

            closePDF: false,
        }),

        methods: {
            reloadPage(){
                window.location.reload();
            },        

            getMeetingPackFolder(){
                let baseUrl = UserData.getBaseUrl();
                axios.post(baseUrl,this.getUserData())
                    .then(response => {         
                        this.getMeetingPackFolder = response.data;
                        this.itemSubArray = this.getMeetingPackFolder.data.itemSubArray;                    
                        this.parentUrl = baseUrl;                          
                        this.navigationPath.push({"itemName":this.getMeetingPackFolder.data.itemName,"itemId":this.parentItemId})
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },

            // getMeetingPack(item){
            //     if(item.hasOwnProperty("itemExtension")){
            //         // window.open(item.itemUrl);
            //         this.closePDF = !this.closePDF;
            //         this.pdf=item.itemUrl;
            //         UserData.setDocumentId(item.itemId);
            //         return   
            //     }                   
            //     let baseUrl = UserData.getBaseUrl();
            //     axios.post(baseUrl,this.getUserData(item.itemId, item.itemParentId))
            //         .then(response => {  
            //             this.getMeetingPackFolder = response.data;
            //             this.itemSubArray = this.getMeetingPackFolder.data.itemSubArray;                    
            //                 this.parentUrl=baseUrl;                            
            //                 this.navigationPath.push({"itemName":this.getMeetingPackFolder.data.itemName,"itemId":this.parentItemId})
            //             })
            //         .catch(e => {
            //             console.log('Error', e);
            //     })
            // },

            getMeetingPack(item){
                if(item.itemExtension == 'pdf'){
                    this.closePDF = !this.closePDF;
                    this.pdf=item.itemUrl;
                    UserData.setDocumentId(item.itemId);
                    return  
                }
                if(item.itemExtension == ('docx')){
                    window.open(item.itemUrl);
                }
                if(item.itemExtension == ('pptx')){
                    window.open(item.itemUrl);
                }
                if(item.itemExtension == ('xlsx')){
                    window.open(item.itemUrl);
                }
                

                // if(item.hasOwnProperty("itemExtension")){
                //     // window.open(item.itemUrl);
                //     this.closePDF = !this.closePDF;
                //     this.pdf=item.itemUrl;
                //     UserData.setDocumentId(item.itemId);
                //     return   
                // }                   
                let baseUrl = UserData.getBaseUrl();
                axios.post(baseUrl,this.getUserData(item.itemId, item.itemParentId))
                    .then(response => {  
                        this.getMeetingPackFolder = response.data;
                        this.itemSubArray = this.getMeetingPackFolder.data.itemSubArray;                    
                            this.parentUrl=baseUrl;                            
                            this.navigationPath.push({"itemName":this.getMeetingPackFolder.data.itemName,"itemId":this.parentItemId})
                        })
                    .catch(e => {
                        console.log('Error', e);
                })
            },

            getUserData(itemId=0,parentItemId=0){
                this.parentItemId=parentItemId;
                const formData = new FormData();
                formData.append('userId', UserData.getUserId());
                formData.append('companyCode', UserData.getCompanyCode());
                formData.append('accessToken', UserData.getAccessToken());
                formData.append('model', "getMeetingPackFolder");
                formData.append('companyId', UserData.getCompanyId());
                formData.append('itemId', itemId);
                return formData;        
            },

            // loadItemFromHistory(){
            //     let baseUrl = UserData.getBaseUrl();
            //     let currentTop = this.navigationPath.pop();
            //     axios.post(baseUrl,this.getUserData(currentTop.itemId))
            //         .then(response => {
            //             this.getSubMeetingPackFolder = response.data;
            //             this.itemSubArray = this.getSubMeetingPackFolder.data.itemSubArray;
            //         }, 
            //         error => {
            //             console.error(error);
            //     });
            // },

            loadItemFromHistory(){
                let currentTop = this.navigationPath.pop();
                axios.post(UserData.getBaseUrl(), this.getUserData(currentTop.itemId))
                    .then(response => {
                        this.getSubMeetingPackFolder = response.data;
                        this.itemSubArray = this.getSubMeetingPackFolder.data.itemSubArray;   
                    })
                    .catch(e => {
                        console.log("Error", e)
                        })
            },

            joinNames(){
                return [...this.navigationPath.map((value)=>{
                    return value.itemName
                })].join("/")
            },
            
            sortBySize(){
                this.itemSubArray2.itemSize.sort(function (a,b) {
                    return a - b;
                });
            },

            doSort (field) {
                if(field == this.sort.field){
                    this.sort.desc = !this.sort.desc
                }else{
                    this.sort.field = field;
                    this.sort.desc = true;
                }
            },     
            
            openPDF: function openPDF(e) {
                this.pdf = window.URL.createObjectURL(e.target.files[0])
            },

            swapComponent: function(component) {
                this.currentComponent = component;
            } 
                     
        },

        computed: {
            sortedData () {
                if(!this.sort.field){
                    return this.items
                }

                return this.items.concat().sort((a,b)=>{
                    if(this.sort.desc){
                        return a[this.sort.field] > b[this.sort.field] ? -1:1        
                    }
                    else{
                        return a[this.sort.field] > b[this.sort.field] ? 1:-1                  
                    }
                })
            },

            sortedData2 () {
                if(!this.sort.field){
                    return this.itemSubArray
                }

                return this.itemSubArray.concat().sort((a,b)=>{
                    if(this.sort.desc){
                        return a[this.sort.field] > b[this.sort.field] ? -1:1        
                    }
                    else{
                        return a[this.sort.field] > b[this.sort.field] ? 1:-1                  
                    }
                })
            }
        },
      
        beforeMount(){
            this.getMeetingPackFolder();
        },

        mounted() {
            const getRecentDocuments = JSON.parse(this.$localStorage.get('getRecentDocuments'));
            
            if (getRecentDocuments) {  
                this.getRecentDocuments = getRecentDocuments;
            }
        },

        components: {
            pspdfkit: pspdfkit            
        },
    }

</script>

<style scoped>
    body { 
        margin:0;
        padding:0; 
    }

    .nav-menu{
        margin-top:0px; 
        background-color: rgb(86,182,229);
        color:#fff;
        display:flex;
    }

    .nav-menu .btn{
        background-color:rgb(86,182,229);
        border:none;
        padding:0px;    
        margin-right:15px;
        color:white;
        outline:none;
    }

    .col-left{
        align-content: center;
        z-index: -1;
    } 

    .col-left .left-menu{
        background-color: #f5f5f5 ;
        align-content: center;
        margin-bottom:10px;
        font-size:20px;
    }

    .col-right{
        float:left;
        width:73%;
        overflow:hidden;
        height: auto;
        margin-top:1%;
        position: relative;
        z-index: -1;
    }

    .col-right th{
        padding:5px;
    }

    .col-right td{
        padding: 3px;
    }

    .col-right-top{
        height:230px;
        background-color: #f5f5f5;
        margin-bottom: 15px;
        padding: 10px;
        border-top: 5px solid rgb(86,182,229);
    }

    .col-right-bottom{
        height:430px;
        background-color:#ffffff;
    }

    .col-right-bottom-left{
        background-color: #f5f5f5;
    }

    .col-right-bottom-right{
        width: 59%;
        height: 430px;
        background-color: #f5f5f5;
        float:left;
        padding:1%;
    }
    .col-right-top .btn{
        padding: 3px;
        width: 100px;
    }

    .menu-row-icon-six{
        margin:0px;
        padding:0px;
        color:rgb(86,182,229);
    }

    table.scroll {
        width: 100%; 
        border-spacing: 0;
    }

    tbody tr td {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    tbody td:last-child, thead th:last-child {
        border-right: none;
    }

    button:focus {
        outline: 0 !important;
        border: 0 !important;
        box-shadow: none !important;
    }

    a{
        text-decoration: none;
        color:#000000;
    }

    a:hover{
        color:rgb(86,182,229);
    }

    .parent {
        display: flex;
        width:100%;
    }

    .filler {
        flex-grow: 1;
    }

    .left-buttons{
        display: inline;
    }
    
    .right-buttons{
        display: inline;
    }

    .user_row{
        display:flex;
    }
    .user_row>div{
        flex:1;
        text-align: center;
    }
   </style>
