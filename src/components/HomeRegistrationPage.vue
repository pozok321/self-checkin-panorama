<template>
    <section class="vh-100">
        <img :src=" global_url +  form_getevent.poster" alt="event banner" class="bg-registration-page">

        <div class="centered container">
            <div class="row m-auto w-50">
                <h4 class="text-white">PLEASE CHOOSE TICKET DAY</h4>
                <div class="input-group mt-3 text-center">
                    <select class="form-select" id="selectTicket" v-model="ticket_id" @change="ticketList()">
                        <option v-for="ticketData in ticket" v-bind:value="ticketData.id">
                            {{ ticketData.class_name }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <button class="btn-get-ticket mt-4" @click="confirmGetTicket()">Get Ticket</button>
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
                zpl_printer: "",
                thermal_printer: "",
                showOnMedia: "",
                venue_id: "",
                session_topic: "",
                prev_action: "",
                ticket_id: "",
                ticket_list:"",
                multiple_session_entry: "",
                qr_setting: "",
                ticket:"",
                global_url: this.$globalURL,
                form_getevent: {
                    events_id: "",
                    ticket_level: 'MT',
                    prev_action: ""
                },
                // event_detail: JSON.parse(localStorage.getItem("event_details")),
                // route_name: this.$route.name
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

            
            getEvent() {
                this.isLoading = true;
                this.isLoadingProduct = true
                axios({
                        url: "/rsvp/ticketlist",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getevent,
                    })
                    .then(res => {
                        this.isLoading = false;
                        this.getEvent = res.data;
                        console.log(this.getEvent, "test123")
                    })
            },

            simpanData() {
                localStorage.zpl_printer = this.zpl_printer;
                localStorage.thermal_printer = this.thermal_printer;
                console.log("data berhasil disimpan");
            },
            hapusData() {
                localStorage.removeItem = this.zpl_printer;
                localStorage.removeItem = this.thermal_printer;
            }
        },
        mounted() {
            this.form_getevent.events_id = $cookies.get("events_id");
            // console.log(this.events_id, "events_id");
            if (localStorage.zpl_printer) {
                this.zpl_printer = localStorage.zpl_printer;
            }
            if (localStorage.thermal_printer) {
                this.thermal_printer = localStorage.thermal_printer;
            }

            if (this.form_getevent.events_id == null) {
                Swal.fire({
                    title: "Your Session is Expired!",
                    icon: "warning",
                });
                setTimeout(1000);
                this.$router.push("/");
            } else {
                this.getCookie()
            }
            this.getEvent();

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

    .text-white {
        color: #fff;
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

    .ticket-buy-center {
        position: absolute;
        left: 50%;
        right: 50%;
        text-align: center;
        align-items: center;
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

    .btn-get-ticket {
        width: 100%;
        background-color: #2096C1;
        color: #fff;
        font-family: Helvetica;
        border-radius: 50px;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 16pt;
        font-weight: bold;
    }

    .bg-registration-page {
        position: relative;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 100%;
    }

    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>