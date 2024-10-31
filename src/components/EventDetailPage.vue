<template>
    <section class="vh-100 bg-agenda-session" style="background-color:#F1F1F1">
        <div class="d-flex justify-content-center align-items-center h-100">
            <loading v-model:active="isLoading" :can-cancel="false" />
            <div class="col-12 col-md-6 col-lg-6 col-xl-8" v-if="session.poster != null">

                <div class="row text-center">
                    <div class="col-sm-6">
                        <img :src=" global_url + session.poster" alt="event banner" width="100%" height="100%">
                    </div>
                    <div class="col-sm-6 bg-white border-dash">
                        <div class="card-body">
                            <h3 class="mt-5">you can choose for check in or registration</h3>
                            <div class="row">
                                <div class="checkin mt-5 mb-3">
                                    <span class="mx-2"><img src="../assets/image/check-in.png"
                                            alt="checkin-icon"></span>
                                    <button class="w-50 btn-checkin" @click="checkinPage()">Check in</button>
                                </div>
                                <div class="registration mt-3 mb-5">
                                    <span class="mx-2"><img src="../assets/image/registration.png"
                                            alt="registration-icon"></span>
                                    <button class="w-50 btn-registration" @click="homeRegistrationPage()">Registration
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-6 col-xl-8" v-else>
                <div class="row text-center">
                    <div class="col-sm-6">
                        <img src="../assets/image/default.png" alt="event banner" width="100%" height="100%">
                    </div>
                    <div class="col-sm-6 bg-white border-dash">
                        <div class="card-body">
                            <h3 class="mt-5">you can choose for check in or registration</h3>
                            <div class="row">
                                <div class="checkin mt-5 mb-3">
                                    <span class="mx-2"><img src="../assets/image/check-in.png"
                                            alt="checkin-icon"></span>
                                    <button class="w-50 btn-checkin" @click="checkinPage()">Check in</button>
                                </div>
                                <div class="registration mt-3 mb-5">
                                    <span class="mx-2"><img src="../assets/image/registration.png"
                                            alt="registration-icon"></span>
                                    <button class="w-50 btn-registration" @click="homeRegistrationPage()">Registration
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-setting" data-bs-toggle="modal" data-bs-target="#showdetails_modal">
                <img src="../assets/image/setting.png" alt="back" width="50" />
            </div>
        </div>
        <div class="modal fade" id="showdetails_modal">
            <div class="modal-dialog modal-top modal-top-50">
                <div class="modal-content border-bottom-navy">
                    <div class="modal-body">
                        <h4>Edit Scanner Name</h4>
                        <div class="form-group">
                            <input type="text" class="form-control" name="fullname" placeholder="Scanner Name" v-model="set_tablet.scanner_name"></input>
                        </div>
                        <button class="btn-save" @click="setTabletName()">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Swal from 'sweetalert2'
    import axios from 'axios'
    import Loading from 'vue-loading-overlay';

    export default {
        data() {
            return {
                url: '',
                events_id: "",
                venue_id: "",
                agenda_id: "",
                session_id: "",
                agenda_name: "",
                track_id: "",
                session: "",
                agenda: "",
                track: "",
                multiple_session_entry: "",
                qr_setting: "",
                global_url: this.$globalURL,
                getWaitingPage: "",
                form_getposter: {
                    events_id: "",
                    ip_address: "10.10.10.10",
                    prev_action: ""
                },
                isLoading: false,
                set_tablet:{
                    events_id: $cookies.get("events_id"),
                    scanner_name: localStorage.getItem("scanner_name"),
                }
            };
        },
        components: {
            Loading
        },
        methods: {
            createCookie(name, value, day) {
                if (day) {
                    let currentDate = new Date();
                    currentDate.setTime(currentDate.getTime() + (day * 24 * 60 * 60 * 1000));
                    var expires = "expires=" + currentDate.toGMTString();
                } else {
                    var expires = "";
                }
                document.cookie = name + "=" + value + ";" + expires + "; path=/";
            },
            getCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            },
            checkinPage() {
                this.$router.push("/scanpage");
            },
            homeRegistrationPage() {
                this.get_ipaddress();
                localStorage.setItem('event_details', JSON.stringify(this.getPoster));
                this.$router.push("/homeregistrationpage");
            },

            getTabletName(){
                localStorage.getItem("scanner_name");
            },
            setTabletName(){
                axios({
                        method: "POST",
                        url: "/checkin/settablet",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        data: this.set_tablet,
                    })
                    .then(res => {
                        if (res.data.status == "200") {
                            localStorage.setItem("scanner_name", this.set_tablet.scanner_name);
                            Swal.fire({
                                title: "Success",
                                icon: "success",
                                text: res.data.msg,
                            }).then((value) => {
                                location.reload();
                            });
                           
                        } else{
                            Swal.fire({
                                title: "Warning",
                                icon: "warning",
                                text: res.data.msg,
                            })
                        }
                    })
            },
            getPoster() {
                axios({
                        url: "/rsvp/p1home",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getposter
                    })
                    .then(res => {
                        this.getPoster = res.data;
                        this.poster_mobile = this.getPoster.poster_mobile;
                        localStorage.setItem("poster_mobile", this.poster_mobile);
                    })
            },
            get_ipaddress() {
                var this_ = this
                $.getJSON('https://jsonip.com/', function (data) {
                    this_.ip_address = data.ip
                    localStorage.setItem('ip_address', this_.ip_address)
                });
            },
        },
        mounted() {
            this.isLoading = true;
            // simulate AJAX
            setTimeout(() => {
                this.isLoading = false
            }, 500)
            this.form_getposter.events_id = $cookies.get("events_id");
            this.events_id = $cookies.get("events_id");
            this.session_id = $cookies.get("session_id");
            this.agenda_id = $cookies.get("agenda_id");
            this.track_id = $cookies.get("track_id");
            if (this.events_id == null) {
                Swal.fire({
                    title: "Your Session is Expired!",
                    icon: "warning",
                });
                setTimeout(1000);
                this.$router.push("/");
            } else {
                this.getCookie();
            }
            // this.getSession();
            this.getPoster();
            this.getTabletName();
        },
    };
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    h1,
    h2,
    h3,
    h4 {
        margin-bottom: 0px;
        text-align: center;
    }

    .button-setting {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
    }

    .bg-white {
        background-color: #fff;
    }

    .border-dash {
        border-style: dashed;
        border-width: thin;
        border-radius: 20px;
    }

    .card-deck {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
    }

    .btn-checkin {
        background-color: #EBEBEB;
        color: #25516B;
        border-radius: 20px;
        font-size: 20px;
        align-items: center;
        text-align: center;
        border: none;
        padding: 10px;
        font-weight: bold;
    }

    .btn-save{
        background-color: #315568;
        color: #fff;
        padding: 10px;
        border-radius: 10px;
        width: 100%;
    }

    .btn-registration {
        background-color: #25516B;
        color: #EBEBEB;
        border-radius: 20px;
        font-size: 20px;
        align-items: center;
        text-align: center;
        border: none;
        padding: 10px;
        font-weight: bold;
    }

    .bg-agenda-session {
        position: relative;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background: url(../assets/image/bg-agenda-session.png)
    }

    .top-left {
        position: absolute;
        top: 0;
        left: 0;
    }

    .icon-setting {
        background: url(../assets/image/icon-setting.svg);
        background-repeat: no-repeat;
        background-position: center;
        min-width: 8rem;
        min-height: 8rem;
        border: 0px;
    }
</style>