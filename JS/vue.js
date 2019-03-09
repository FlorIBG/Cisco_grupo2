Vue.config.debug = false;
Vue.config.devtools = false;
Vue.config.silent = false;

$(document).ready(function() {
    $("#search-entry").focus();
});

Vue.component('imgresult', {
    template: '#imgresult-template',
    props: {
        imgwidth: 0,
        imgheight: 0,
        imgsrc: '',
        giphy_link: '',
        bgcolor: ''
    },
    methods: {
        onClick: function() {
            window.open(this.giphy_link, '_blank');
        }
    }
});

// bootstrap the demo
var app = new Vue({
    el: '#app',
    data: {
        search_query: '',
        search_results: [],
        status: "",
        count: 25,
        cb_sticker: false,
        dd_sticker_bg: "white"
    },
    watch: {
        cb_sticker: function(val) { this.process(val); },
        dd_sticker_bg: function(val) { this.process(val); },
        count: function(val) { this.process(val); },
        search_query: function(val) { this.process(val); }
    },
    methods: {
        process: function(val) {
                this.doQuery();
        },
        doQuery: _.debounce(function() {
            if (this.search_query) 
            {
                //console.log('searching for ' + this.search_query);
                this.status = "Searching for "+this.search_query+"...";
                $.ajax("https://api.giphy.com/v1/"+(this.cb_sticker?"stickers":"gifs")+"/search?api_key=dc6zaTOxFJmzC&limit=" + this.count + "&q=" + this.search_query)
                    .done(function(res) {
                        //console.log("OK", res);
                        this.search_results = [];
                        for (var entry in res.data) {
                            var e = res.data[entry];
                            //console.log(e);
                            this.search_results.push({
                                width: e.images.fixed_height.width,
                                height: e.images.fixed_height.height,
                                src: e.images.fixed_height.webp,
                                giphy_link: e.url
                            })
                        }
                        this.status = (this.search_results.length == 0) ? "No results for " +  this.search_query: "";
                    }.bind(this))
                    .fail(function(res) {
                        this.search_results = [];
                        this.status = res.statusText;
                        console.error("probs: " + res.statusText, res);
                    }.bind(this));
            } else {
                this.search_results = [];
                this.status = "";
            }
        }, 750)
    }
});