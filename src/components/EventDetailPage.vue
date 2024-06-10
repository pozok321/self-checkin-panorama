<template>
    <section class="vh-100 bg-agenda-session" style="background-color:#F1F1F1">
        <!-- <div class="btn-group dropend top-left">
            <select class="form-select icon-setting" id="selectAgenda" v-model="agenda_id" @change="getTrack()">
                <option v-for="agendaData in agenda" v-bind:value="agendaData.id">
                    {{ agendaData.agenda_name }}
                </option>
            </select>
            <button @click="simpanData()">simpan</button>
            <button @click="hapusData()">hapus</button>
            <button class="icon-setting" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
        </div> -->
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-6 col-lg-6 col-xl-8">
                <div class="row text-center">
                    <div class="col-sm-6">
                        <img :src=" global_url + session.event_poster" alt="event banner" width="100%"
                            height="100%">
                    </div>
                    <div class="col-sm-6 bg-white border-dash">
                        <div class="card-body">
                            <h3 class="mt-5">you can choose for check in or registration</h3>
                            <div class="row">
                                <div class="checkin mt-5 mb-3">
                                    <span class="mx-2"><img src="../assets/image/check-in.png"
                                            alt="checkin-icon"></span>
                                    <button class="w-50 btn-checkin" @click="checkinPage()"> Check in</button>
                                </div>
                                <div class="registration mt-3 mb-5">
                                    <span class="mx-2"><img src="../assets/image/registration.png" alt="registration-icon"></span>
                                    <button class="w-50 btn-registration"> Registration </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Swal from 'sweetalert2'
    import axios from 'axios'

    export default {
        data() {
            return {
                url: '',
                zpl_printer:"",
                thermal_printer:"",
                events_id: "",
                prime_agenda: "",
                showOnMedia: "",
                venue_id: "",
                agenda_id: "",
                session_id: "",
                track_id: "",
                agenda_name: "",
                track_id: "",
                session_topic: "",
                session: "",
                agenda: "",
                track: "",
                multiple_session_entry: "",
                qr_setting: "",
                global_url : this.$globalURL,
            };
        },
        components: {

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
            checkinPage() {
                this.$router.push("/scanpage");
            },

            getSession() {
                axios({
                        method: "GET",
                        url: "/selfsvc/event/" + this.events_id + "/agenda/" + this.agenda_id + "/track/" + this
                            .track_id + "/session/" + this.session_id,
                        headers: {
                            "Content-Type": "text/plain"
                        },
                    })
                    .then(res => {
                        this.session = res.data;
                        this.multiple_session_entry = this.session.multiple_session_entry;
                        this.qr_setting = this.session.qr_setting;
                        this.createCookie("multiple_session_entry", this.multiple_session_entry);
                        this.createCookie("qr_setting", this.qr_setting);
                    })
            },
            getAgenda() {
                axios({
                        method: "GET",
                        url: "/selfsvc/event/" + this.events_id + "/agenda",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                    })
                    .then(res => {
                        this.agenda = res.data;
                    })
            },
            
            getTrack() {
                axios({
                    method: "GET",
                    url: "/selfsvc/event/" + this.events_id + "/agenda/" + this.agenda_id + "/track",
                    headers: {
                        "Content-Type": "text/plain",
                        "x-api-key": this.token,
                    },
                }).then((res) => {
                    this.track = res.data;
                });

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

            simpanData(){
                localStorage.zpl_printer = this.zpl_printer;
                localStorage.thermal_printer = this.thermal_printer;
                console.log("data berhasil disimpan");
            },
            hapusData(){
                localStorage.removeItem = this.zpl_printer;
                localStorage.removeItem = this.thermal_printer;
            }
        },
        mounted() {
            this.events_id = $cookies.get("events_id");
            this.session_id = $cookies.get("session_id");
            this.agenda_id = $cookies.get("agenda_id");
            if (localStorage.zpl_printer) {
                this.zpl_printer = localStorage.zpl_printer;
            }
            if (localStorage.thermal_printer) {
                this.thermal_printer = localStorage.thermal_printer;
            }

            if (this.events_id == null) {
                Swal.fire({
                    title: "Your Session is Expired!",
                    icon: "warning",
                });
                setTimeout(1000);
                this.$router.push("/");
            } else {
                this.getCookie()
            }
            this.getSession();
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