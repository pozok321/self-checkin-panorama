<template>
    <section class="vh-100 container-fluid">
        <div class="row">
            <div class="col-md-8 p-5 vh-100">
                <div class="justify-content-between flex mb-3" name="cart">
                    <div class="my-car mt-4">
                        <img src="../assets/image/cart.svg" alt="cart">
                        <span>My Cart</span>
                    </div>
                    <div class="event-date">
                        <p>FLEI EXPO XXII</p>
                        <span>18 - 20 November 202</span>
                    </div>
                </div>
                <div class="border-bottom mb-3"></div>
                <div class="row">
                    <div class="col-md-6">
                        <img src="../assets/image/flei-img.png" alt="cart" width="100%">
                    </div>
                    <div class="col-md-5 top-50 start-0 m-auto">
                        <div class="ticket-title">
                            <h4 class="text-start">Ticket FLEI EXPO Day 1</h4>
                        </div>
                        <div class="border-bottom my-2"></div>
                        <div class="justify-content-between flex">
                            <p>Ticket price</p>
                            <p>Quantity Ticket</p>
                        </div>
                        <div class="justify-content-between flex">
                            IDR. {{this.main_ticket}}
                            <div class="quantity-item" v-if="event_detail.pre_reg == 'Y'">
                                <form id='myform' method='POST' class='quantity' action='#'>
                                    <input type='button' value='-' class='qtyminus minus' field='quantity'
                                        @click="min_qty(main_ticket, form_getCart.ticket_qty)" disabled />
                                    <input type='number' name='quantity' class='qty' v-model="form_getCart.ticket_qty"
                                        @change="add_qty(main_ticket, form_getCart.ticket_qty)" disabled />
                                    <input type='button' value='+' class='qtyplus plus' field='quantity'
                                        @click="plus_qty(main_ticket, form_getCart.ticket_qty)" disabled />
                                </form>
                            </div>
                            <div class="quantity-item" v-else>
                                <form id='myform' method='POST' class='quantity'
                                    v-if="main_ticket.mark_soldout == 'N' && main_ticket.ticket_remain > 0">
                                    <input type='button' value='-' class='qtyminus minus' field='quantity'
                                        @click="min_qty(main_ticket, form_getCart.ticket_qty)" />
                                    <input type='number' name='quantity' class='qty' v-model="form_getCart.ticket_qty"
                                        @change="add_qty(main_ticket, form_getCart.ticket_qty)" />
                                    <input type='button' value='+' class='qtyplus plus' field='quantity'
                                        @click="plus_qty(main_ticket, form_getCart.ticket_qty)" />
                                </form>
                                <form id='myform' method='POST' class='quantity' v-else>
                                    <input type='button' value='-' class='qtyminus minus' field='quantity'
                                        @click="min_qty(main_ticket, form_getCart.ticket_qty)" disabled />
                                    <input type='number' name='quantity' class='qty' v-model="form_getCart.ticket_qty"
                                        disabled @change="add_qty(main_ticket, form_getCart.ticket_qty)" />
                                    <input type='button' value='+' class='qtyplus plus' field='quantity'
                                        @click="plus_qty(main_ticket, form_getCart.ticket_qty)" disabled />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-1"></div>
                </div>
                <div class="row">
                    <div class="formRSVP">
                        <h4 class="text-start my-3">Terms & Condition</h4>
                        <div class="term-condition overflow-scroll scrollspy-example" data-bs-spy="scroll">
                            {{ this.event_declaration.event_declaration }}
                        </div>
                        <div v-if="isLoading">
                            <div class="is-loading text-30"></div>
                            <div class="is-loading text-30"></div>
                            <div class="is-loading text-30"></div>
                        </div>
                        <div id="stylebar" class="scrollbar" v-html="this.event_declaration.event_detail" v-else></div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="declare_checkbox"
                                    v-model="declare_checkbox" name="declare_checkbox" disabled>
                                <label class="form-check-label" for="declare_checkbox">
                                    Yes, I understand and agree to comply.
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 bg-grey p-5 vh-100">
                <h2 class="mt-3 text-start">Your Order Details</h2>
                <div class="border-bottom mt-3"></div>
                <div class="justify-content-between flex mt-3">
                    <div class="total-ticket">
                        Total Ticket
                    </div>
                    <div class="ticket-number">
                        2
                    </div>
                </div>
                <div class="row mt-5">
                    <h4 class="text-start">Add On Ticket (Optional)</h4>
                    <!-- <div class="justify-content-between flex mt-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                            <label class="form-check-label" for="flexCheckChecked">
                                Additional Ticket 1
                            </label>
                            <p class="additional-font">Additional Ticket Start 12:00 - 13:30 Pm </p>
                        </div>
                        <div class="price-addon">
                            <p>IDR 10K</p>
                        </div>
                    </div>
                    <div class="justify-content-between flex">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="check1">
                            <label class="form-check-label" for="flexCheckChecked">
                                Additional Ticket 2
                            </label>
                            <p class="additional-font">Additional Ticket Start 12:00 - 13:30 Pm </p>
                        </div>
                        <div class="price-addon">
                            <p>IDR 10K</p>
                        </div>
                    </div>
                    <div class="justify-content-between flex">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                            <label class="form-check-label" for="flexCheckChecked">
                                Additional Ticket 3
                            </label>
                            <p class="additional-font">Additional Ticket Start 12:00 - 13:30 Pm </p>
                        </div>
                        <div class="price-addon">
                            <p>IDR 10K</p>
                        </div>
                    </div>
                    <div class="justify-content-between flex">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                            <label class="form-check-label" for="flexCheckChecked">
                                Additional Ticket 4
                            </label>
                            <p class="additional-font">Additional Ticket Start 12:00 - 13:30 Pm </p>
                        </div>
                        <div class="price-addon">
                            <p>IDR 10K</p>
                        </div>
                    </div> -->
                </div>
                <div class="row mt-5">
                    <div class="total-payment col-md-6">
                        <p>Total Payment</p>
                    </div>
                    <div class="price col-md-6 p-ticket text-end">
                        <div class="price">
                            IDR 10k
                        </div>
                        <span class="span-total-ticket text-end">please check ticket before add to purchase</span>
                    </div>
                    <div class="total-payment bottom-0 end-0">
                        <div class="row">
                            <div class="col-lg-12 col-sm-12 col-12">
                                <button class="btn btn-purchase" :disabled="declare_checkbox == false" @click="next_page()">
                                    <span v-if="LoadingButton">
                                        <span class="loader loading-quarter"></span>
                                        Processing
                                    </span>
                                    <span v-else>
                                        Purchase
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="topFunction()" id="myBtn" title="Go to top">
            <i class='bx bxs-chevron-up'></i>
        </button>
        </div>
    </section>
</template>

<script>
    import Swal from 'sweetalert2'
    import axios from 'axios'

    export default {
        data() {
            return {
                form_getCart: {
                    events_id: this.$route.params.Eventsid,
                    ticketid: JSON.parse(localStorage.getItem("mt_id")),
                    ticket_qty: localStorage.getItem("ticket_qty"),
                },
                form_getDeclare: {
                    events_id: this.$route.params.Eventsid,
                },
                form_getticketSession: {
                    events_id: this.$route.params.Eventsid,
                    ticket_id: '',
                },
                url: '',
                cart_detail: [],
                main_ticket: [],
                addon_ticket: [],
                ticket_ao: [],
                ticket_details: [],
                ticket_session: [],
                event_declaration: [],
                enable_button: true,
                subtotal: '',
                total: '',
                onhold_msg: '',
                route_name: this.$route.name,
                declare_checkbox: false,
                LoadingButton: false,
                isLoading: false,
                global_url: this.$globalURL,
                event_detail: JSON.parse(localStorage.getItem("event_details")),
                titlePage: 'Terms & Condition',
                descPage: 'By buying this ticket, you agree to comply with following terms & conditions.'
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
            getCart() {
                this.isLoadingHeader = true
                this.isLoading = true;
                axios({
                        url: "/rsvp/getcart",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getCart,
                    })
                    .then(res => {
                        this.isLoading = false;
                        this.isLoadingHeader = false
                        if (res.data.status == 201) {
                            Swal.fire({
                                title: "Warning",
                                html: res.data.msg,
                                icon: "warning",
                            });
                            this.$router.push("/ticketlist/" + this.form_getCart.events_id);
                        } else {
                            this.cart_detail = res.data;
                            this.main_ticket = this.cart_detail.main_ticket;
                            this.addon_ticket = this.cart_detail.addon_ticket;
                            this.total = this.cart_detail.total_price;

                            for (let i = 0; i < this.addon_ticket.length; i++) {
                                this.ticket_ao[this.addon_ticket[i].ticket_id] = this.addon_ticket[i].selected

                            }
                            this.setTitle("My Cart - " + this.event_detail.event_title + " - Undangin")

                            if (this.event_detail.rsvp_counter !== 'O') {
                                this.$router.push("/closed/" + this.form_getCart.events_id);
                            }
                        }
                    })
            },
            reset_qty() {
                this.createCookie("qty", "1", 2)
            },

            getDeclare() {
                this.topFunction();
                axios({
                        method: "POST",
                        url: "/rsvp/declareget",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        data: this.form_getDeclare
                    })
                    .then(res => {
                        this.event_declaration = res.data;
                        this.setTitle("Declare - Undangin")
                        this.js();
                        this.js_showchecked();
                    })
            },
            topFunction() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            },
            js() {
                var mybutton = document.getElementById("myBtn");
                window.onscroll = function () {
                    scrollFunction()
                };

                function scrollFunction() {
                    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                        mybutton.style.display = "block";
                    } else {
                        mybutton.style.display = "none";
                    }
                }
            },
            js_showchecked() {
                setTimeout(function () {
                    (function ($) {
                        $.fn.hasScrollBar = function () {
                            return this.get(0).scrollHeight > this.height();
                        }
                    })(jQuery);
                    var scrollbar = $('#stylebar').hasScrollBar()

                    var master_agreement = document.getElementById('stylebar');
                    if (scrollbar == true) {
                        jQuery(master_agreement).scroll(function (e) {
                            if (isScrolledToBottom(master_agreement)) {
                                jQuery('#declare_checkbox').prop('disabled', false);
                            }
                        });
                    } else {
                        jQuery('#declare_checkbox').prop('disabled', false);
                    }

                    function isScrolledToBottom(el) {
                        var $el = $(el);
                        // console.log("test ", el.scrollHeight - $el.scrollTop() - $el.outerHeight())
                        return el.scrollHeight - $el.scrollTop() - $el.outerHeight() < 1000;
                    }
                }, 200);
            },

            setTitle(title_page) {
                document.title = `${title_page}`
            },
            next_page() {
                this.LoadingButton = true
                // this.$router.push("/register/" + this.form_getDeclare.events_id);
            },
            plus_qty(ticket, ticket_qty) {
                this.form_getCart.ticket_qty = parseInt(ticket_qty) + 1

                if (this.form_getCart.ticket_qty > this.event_detail.setting.maxticket_per_guest) {
                    this.form_getCart.ticket_qty = this.event_detail.setting.maxticket_per_guest
                    var wording = "Max allowed limit is " + this.event_detail.setting.maxticket_per_guest +
                        " tickets / <br> Maks pembelian adalah " + this.event_detail.setting.maxticket_per_guest +
                        " tiket";
                    Swal.fire({
                            title: "Warning",
                            icon: "warning",
                            html: wording,
                        })
                        .then((value) => {});
                }
                this.check_on_hold()
            },
            min_qty(ticket, ticket_qty) {
                if (ticket_qty > 0) {
                    this.form_getCart.ticket_qty = ticket_qty - 1
                    this.check_on_hold()
                }
                if (this.form_getCart.ticket_qty < 1) {
                    this.form_getCart.ticket_qty = 1
                }
            },
            add_qty(ticket, ticket_qty) {
                if (this.form_getCart.ticket_qty < 1) {
                    this.form_getCart.ticket_qty = 1
                }
                if (ticket_qty > this.event_detail.setting.maxticket_per_guest) {
                    this.form_getCart.ticket_qty = this.event_detail.setting.maxticket_per_guest
                    var wording = "Max allowed limit is " + this.event_detail.setting.maxticket_per_guest +
                        " tickets / <br> Maks pembelian adalah " + this.event_detail.setting.maxticket_per_guest +
                        " tiket";
                    Swal.fire({
                            title: "Warning",
                            icon: "warning",
                            html: wording,
                        })
                        .then((value) => {});
                }
                this.check_on_hold()
            },
            check_on_hold() {
                this.isLoading = true
                this.form_getCart.ticketid = []

                this.form_getCart.ticketid.push(this.main_ticket.ticket_id)
                for (let i = 0; i < this.addon_ticket.length; i++) {
                    if (this.ticket_ao[this.addon_ticket[i].ticket_id] == true) {
                        this.form_getCart.ticketid.push(this.addon_ticket[i].ticket_id)
                    }
                }
                axios({
                        url: "/rsvp/checkonhold",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getCart,
                    })
                    .then(res => {
                        this.isLoading = false
                        if (this.form_getCart.ticket_qty < 1) {
                            this.enable_button = false
                            this.onhold_msg = 'Oops! Minimum is 1 ticket'
                            this.form_getCart.ticket_qty = 0
                            Swal.fire({
                                    title: "Warning",
                                    icon: "warning",
                                    html: this.onhold_msg,
                                })
                                .then((value) => {});
                        } else {
                            this.onhold_data = res.data
                            if (res.data.status == 201) {
                                this.enable_button = false
                            } else {
                                this.enable_button = true
                            }
                            this.onhold_msg = res.data.msg
                            this.getCart()
                        }
                    })
            },
            get_infoticket(ticket) {
                this.isLoading = true
                this.form_getticketSession.ticket_id = ticket.ticket_id

                axios({
                        url: "/rsvp/ticketsession",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getticketSession,
                    })
                    .then(res => {
                        this.isLoading = false
                        this.ticket_details = res.data
                        this.ticket_session = res.data.ticket_session
                    })
            },
            calculate_price() {
                this.subtotal = 0
                for (let i = 0; i < this.addon_ticket.length; i++) {
                    if (this.ticket_ao[this.addon_ticket[i].ticket_id] == true) {
                        // if (this.addon_ticket[i].coret == true) {
                        //     this.subtotal = this.subtotal + parseInt(this.addon_ticket[i].final_price)
                        // } else {
                        this.subtotal = this.subtotal + parseInt(this.addon_ticket[i].final_price)
                        // }
                    }
                }

                let subtotal_ticket = 0;
                if (this.main_ticket.coret == true) {
                    subtotal_ticket = parseInt(this.main_ticket.final_price)
                } else {
                    subtotal_ticket = parseInt(this.main_ticket.normal_price)
                }

                this.total = (this.subtotal + subtotal_ticket) * this.form_getCart.ticket_qty
            },
            formatCurrency(value, currency) {
                if (currency == 'IDR') {
                    if (value == 0) {
                        return currency = currency + ' ' + value
                    } else {
                        var number_string = value ? value.toString().replace(/[^,\d]/g, '') : '',
                            split = number_string.split(','),
                            sisa = split[0].length % 3,
                            rupiah = split[0].substr(0, sisa),
                            ribuan = split[0].substr(sisa).match(/\d{3}/gi);
                        var separator = '';
                        // tambahkan titik jika yang di input sudah menjadi angka ribuan
                        if (ribuan) {
                            separator = sisa ? '.' : '';
                            rupiah += separator + ribuan.join('.');
                        }

                        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
                        return currency == undefined ? rupiah : (rupiah ? currency + ' ' + rupiah : '');
                    }
                } else {
                    return currency + value ? currency + ' ' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') :
                        '';
                }
            },
            kFormatter(num, currency) {
                if (currency == 'IDR') {
                    return Math.abs(num) > 999 ? currency + ' ' + Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) +
                        'K' : currency + ' ' + Math.sign(num) * Math.abs(num)
                } else {
                    return currency + value ? currency + ' ' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') :
                        '';
                }
            },
            update_mycart() {
                this.isLoadingHeader = true
                this.isLoading = true;
                this.LoadingButton = true

                axios({
                        url: "/rsvp/getcart",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getCart,
                    })
                    .then(res => {
                        this.isLoading = false;
                        this.isLoadingHeader = false
                        if (res.data.status == 201) {
                            Swal.fire({
                                title: "Warning",
                                html: res.data.msg,
                                icon: "warning",
                            });
                            this.$router.push("/ticketlist/" + this.form_getCart.events_id);
                        } else {
                            this.cart_detail = res.data;
                            this.main_ticket = this.cart_detail.main_ticket;
                            this.addon_ticket = this.cart_detail.addon_ticket;
                            this.total = this.cart_detail.total_price;

                            for (let i = 0; i < this.addon_ticket.length; i++) {
                                this.ticket_ao[this.addon_ticket[i].ticket_id] = this.addon_ticket[i].selected

                            }

                            if (this.event_detail.rsvp_counter !== 'O') {
                                this.$router.push("/closed/" + this.form_getCart.events_id);
                            }

                            if (this.main_ticket.mark_soldout == 'N' && this.main_ticket.ticket_remain > 0) {
                                localStorage.setItem("mt_id", JSON.stringify(this.form_getCart.ticketid));
                                localStorage.setItem("ticket_qty", this.form_getCart.ticket_qty);

                                if (this.event_detail.setting.tnc_toggle == 'N') {
                                    this.$router.push("/register/" + this.form_getCart.events_id);
                                } else {
                                    this.$router.push("/declare/" + this.form_getCart.events_id);
                                }

                            } else if (this.main_ticket.mark_soldout == 'N' && this.main_ticket.ticket_remain < 1) {
                                Swal.fire({
                                    title: "Warning",
                                    html: "On hold, please try in a few minutes ! / Tertahan, mohon dicoba beberapa menit lagi",
                                    icon: "warning",
                                });
                            } else {
                                Swal.fire({
                                    title: "Warning",
                                    html: "Ticket sold out ! / Tiket sudah habis terjual",
                                    icon: "warning",
                                });
                            }
                        }
                    })
            }
        },
        mounted() {
            this.form_getDeclare.events_id = $cookies.get("events_id");
            if (this.form_getDeclare.events_id === null) {
                Swal.fire({
                    title: "Your Session is Expired!",
                    icon: "warning",
                });
                setTimeout(1000);
                this.$router.push("/");
            } else {
                this.getCookie()
            }
            this.getDeclare();
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

    .bg-grey {
        background-color: #F8F8F8;
    }

    .text-white {
        color: #fff;
    }

    .flex {
        display: flex
    }

    .event-date {
        line-height: 10px
    }

    .formRSVP input.padding-100 {
        padding-left: 125px;
    }

    .formRSVP {
        margin: auto;
        width: fit-content;
        padding: 30px 20px;
        position: relative;
    }

    .termcondition-overflow {
        flex: 1;
        overflow: auto;
        padding: 8px;
    }

    .border-dash {
        border-style: dashed;
        border-width: thin;
        border-radius: 20px;
    }

    .term-condition {
        max-height: 250px;
        height: 200px;
    }

    .term-condition p {
        font-size: 15px;
    }

    .card-deck {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
    }

    .btn-purchase {
        width: 100%;
        background-color: #3AB54B;
        color: #fff;
        border-color: #fff;
        font-family: Helvetica;
        border-radius: 15px;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 16pt;
        font-weight: bold;
    }

    .additional-font {
        font-size: 8px;
    }

    .span-total-ticket {
        color: #DD7223;
        font-size: 7px;
        font-style: italic;
    }

    .price-addon {
        color: #09303E;
        font-size: 14px;
        font-weight: bold;
    }

    .price {
        color: #09303E;
        font-size: 30px;
        font-weight: bold;
    }

    .p-ticket {
        line-height: 10px;
        margin: auto;
    }

    .quantity-item {
        display: block;
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

    .form-check-input:checked {
        background-color: #22B473;
        border-color: #22B473;
    }

    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #myform {
        text-align: center;
        margin: 0;
    }

    .qty {
        width: 40px;
        height: 25px;
        text-align: center;
    }

    #myform input.qty {
        vertical-align: top;
        display: inline-block;
        width: 40px;
        border: 1px solid #e1eaea;
        border-radius: 4px;
        background: none;
        padding: 2px;
        border: 1px solid #BFCFDD;
    }

    #myform input.qtyplus {
        vertical-align: top;
        display: inline-block;
        width: 25px;
        height: 25px;
        padding: 2px;
        border-radius: 4px;
        font-size: 9pt;
        background: #000000;
        color: #FFFFFF;
        border: 1px solid #BFCFDD;
    }

    #myform input.qtyminus {
        vertical-align: top;
        display: inline-block;
        width: 25px;
        height: 25px;
        padding: 2px;
        border-radius: 4px;
        font-size: 9pt;
        background: #000000;
        color: #FFFFFF;
        border: 1px solid #BFCFDD;
    }
</style>