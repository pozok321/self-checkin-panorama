<script>
    import axios from 'axios'
    import {
        RouterLink,
        RouterView
    } from 'vue-router'
    import HeaderBanner from '../../components/HeaderBannerAddon.vue'
    import HeaderBannerSkeleton from '../../components/HeaderBannerSkeleton.vue'
    import CloseRsvp from '../../components/CloseRsvp.vue'
    import 'https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js';
    import {
        Form,
        Field,
        ErrorMessage
    } from 'vee-validate';
    import Swal from 'sweetalert2';
    import LoadingAnimation from '../../components/LoadingAnimation.vue';

    export default {
        name: 'Cart',
        components: {
            HeaderBanner,
            HeaderBannerSkeleton,
            CloseRsvp,
            Form,
            Field,
            ErrorMessage,
            LoadingAnimation,
        },
        data() {
            return {
                form_getReceipt: {
                    evidenc: this.$route.params.evidenc,
                    order_id: this.$route.params.orderid,
                },
                form_getDetails: {
                    evidenc: this.$route.params.evidenc,
                    order_id: this.$route.params.orderid,
                    guests_token: '',
                },
                form_sendOtp: {
                    evidenc: this.$route.params.evidenc,
                    order_id: this.$route.params.orderid,
                    email: '',
                },
                form_verifyOtp: {
                    evidenc: this.$route.params.evidenc,
                    order_id: this.$route.params.orderid,
                    email: '',
                    otp: '',
                },
                form_Giftticket: {
                    evidenc: this.$route.params.evidenc,
                    order_id: this.$route.params.orderid,
                    ho_fullname: "",
                    ho_email: "",
                    ho_country_code: "62",
                    ho_phone: "",
                    prev_token: "",
                    ticket_id: ""
                },
                code_country: [],
                notif_email: false,
                resend_otp: false,
                event_detail: [],
                member_data: [],
                member_detail: [],
                search_key: '',
                ticketlist: true,
                ticketdetail: false,
                otpform: false,
                giftticket_page: false,
                LoadingButton: false,
                global_url: this.$globalURL,
                isLoading: false,
                isLoadingHeader: false,
                isLoadingAnimation: false,
                route_name: this.$route.name
            }
        },
        mounted() {
            this.getReceipt();
        },
        methods: {
            isRequired(value) {
                if (!value) {
                    return 'this field is required / kolom wajib diisi';
                }

                return true;
            },
            ValidateEmail(mail) {
                var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (mail.match(mailformat)) {
                    this.notif_email = false
                    $("#btn_register").prop("disabled", false);
                    return true;
                } else {
                    this.notif_email = true
                    $("#btn_register").prop("disabled", true);
                    return false;
                }
            },
            check_phonenumber(input_phone) {
                const phone = input_phone;
                if (phone.toString().startsWith('0'))
                    this.phone_number = phone.toString().substring(1);
            },
            getReceipt() {
                this.isLoadingHeader = true
                this.isLoading = true;
                axios({
                        url: "/v1/rsvp/receipt/ticketlist",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getReceipt,
                    })
                    .then(res => {
                        this.isLoading = false;
                        this.isLoadingHeader = false
                        if (res.data.status == 201) {
                            Swal.fire({
                                    title: "Warning",
                                    icon: "warning",
                                    html: res.data.msg,
                                })
                                .then((value) => {});
                        } else {
                            this.event_detail = res.data;
                            this.member_data = this.event_detail.guest_list
                            this.setTitle("Receipt - " + this.event_detail.event_title +
                                " - Undangin")
                        }
                        this.topFunction()
                    })
            },
            topFunction() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            },
            setTitle(title_page) {
                document.title = `${title_page}`
            },

            show_qrcode(guest) {
                this.isLoadingHeader = true
                this.isLoading = true
                this.form_getDetails.guests_token = guest.token
                axios({
                        url: "/v1/rsvp/receipt/details",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getDetails,
                    })
                    .then(res => {
                        this.isLoadingHeader = false
                        this.member_detail = res.data
                        this.ticketlist = false
                        this.otpform = false
                        this.ticketdetail = true
                        var is = this
                        setTimeout(function () {
                            is.isLoading = false
                            const qrcode = new QRCode(document.getElementById('qrcode'), {
                                text: guest.token,
                                width: 80,
                                height: 80,
                                colorDark: '#000',
                                colorLight: '#fff',
                                correctLevel: QRCode.CorrectLevel.H
                            });
                        }, 200);
                    })
            },
            clear_qr() {
                $("#qrcode").empty();
                this.ticketlist = true
                this.ticketdetail = false
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
            topFunction() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            },
            search_data() {
                var input = document.getElementById("search_key");
                var filter = input.value.toLowerCase();
                var nodes = document.getElementsByClassName('guest-box');

                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].innerText.toLowerCase().includes(filter)) {
                        nodes[i].style.display = "block";
                    } else {
                        nodes[i].style.display = "none";
                    }
                }
            },
            copy_membertoken() {
                // Get the text field
                var copyText = document.getElementById("member_token");

                // Select the text field
                copyText.select();
                copyText.setSelectionRange(0, 99999); // For mobile devices

                // Copy the text inside the text field
                navigator.clipboard.writeText(copyText.value);

                // Alert the copied text
                Swal.fire({
                        text: "Success, copied token!",
                        icon: "success",
                    })
                    .then((value) => {});

                setTimeout(function () {
                    $(".swal-button--confirm").click();
                }, 1000);
            },
            sendOtp() {
                this.isLoadingAnimation = true;
                this.form_sendOtp.email = this.member_detail.tickets[0].email

                axios({
                        url: "/v1/rsvp/receipt/sendotp",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_sendOtp,
                    })
                    .then(res => {
                        this.isLoadingAnimation = false

                        if (res.data.status == 200) {
                            this.ticketlist = false
                            this.ticketdetail = false
                            this.otpform = true

                            this.resend_otp = false

                            var is = this
                            setTimeout(function () {
                                const input = document.querySelector('[autocomplete=one-time-code');
                                input.addEventListener('input', () => input.style.setProperty(
                                    '--_otp-digit',
                                    input
                                    .selectionStart));
                            }, 200);

                            this.getTimer(res.data);

                        } else {
                            Swal.fire({
                                    title: "Warning",
                                    icon: "warning",
                                    text: res.data.msg,
                                })
                                .then((value) => {});
                        }
                    })
            },
            getTimer(data) {
                var is = this
                setTimeout(function () {
                    var seconds = data.ttl;

                    function secondPassed() {
                        var minutes = Math.round((seconds - 30) / 60);
                        var remainingSeconds = seconds % 60;

                        if (remainingSeconds < 10) {
                            remainingSeconds = "0" + remainingSeconds;
                        }

                        document.getElementById('timer').innerHTML = minutes + ":" + remainingSeconds;
                        if (seconds == 0) {
                            clearInterval(countdownTimer);
                            is.resend_otp = true
                        } else {
                            seconds--;
                        }
                    }

                    var countdownTimer = setInterval(secondPassed, 1000);
                }, 100);
            },
            back_fromOtp() {
                this.show_qrcode(this.member_detail.tickets[0])
            },
            onSubmit(values) {
                this.form_verifyOtp.otp = $("#otp").val()
                this.form_verifyOtp.email = this.member_detail.tickets[0].email

                if (this.form_verifyOtp.otp) {
                    this.isLoadingAnimation = true;

                    axios({
                            url: "/v1/rsvp/receipt/validateotp",
                            headers: {
                                "Content-Type": "text/plain"
                            },
                            method: "POST",
                            data: this.form_verifyOtp,
                        })
                        .then(res => {
                            if (res.data.status == 200) {
                                for (let i = 1; i < 1000; i++) {
                                    window.clearInterval(i);
                                }
                                this.show_formgift()
                            } else {
                                this.isLoadingAnimation = false;
                                Swal.fire({
                                        title: "Warning",
                                        icon: "warning",
                                        text: res.data.msg,
                                    })
                                    .then((value) => {});
                            }
                        })
                } else {
                    Swal.fire({
                            title: "Warning",
                            icon: "warning",
                            text: "Please input otp correctly",
                        })
                        .then((value) => {});
                }
            },
            get_codecountry() {
                this.isLoadingAnimation = true;
                axios({
                        url: "/v1/master/getcountry",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                    })
                    .then(res => {
                        this.isLoadingAnimation = false;
                        this.code_country = res.data
                        var is = this
                        setTimeout(function () {
                            $("#select_country").select2({
                                templateResult: formatState,
                                templateSelection: formatState
                            });

                            $('#select_country').on("change", function () {
                                is.form_Giftticket.ho_country_code = $(this).val();
                            });

                            function formatState(opt) {
                                if (!opt.id) {
                                    return opt.text.toUpperCase();
                                }

                                var optimage = $(opt.element).attr('data-image');
                                if (!optimage) {
                                    return opt.text.toUpperCase();
                                } else {
                                    var $opt = $(
                                        '<span><img src="' + is.global_url + optimage +
                                        '" width="25px" />' + opt.text
                                        .toUpperCase() + '</span>'
                                    );
                                    return $opt;
                                }
                            };
                        }, 100);
                    })
            },
            show_formgift() {
                this.giftticket_page = true
                this.ticketlist = false
                this.ticketdetail = false
                this.otpform = false

                this.form_Giftticket.prev_token = this.member_detail.guests_token
                this.form_Giftticket.ticket_id = this.member_detail.tickets[0].ticket_id

                this.get_codecountry()
            },
            cancel_giftticket() {
                location.reload()
            },
            onSubmitGift(values) {
                this.isLoadingAnimation = true;

                axios({
                        url: "/v1/rsvp/receipt/handover",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_Giftticket,
                    })
                    .then(res => {
                        this.isLoadingAnimation = false;
                        if (res.data.status == 200) {
                            Swal.fire({
                                    title: "Success",
                                    icon: "success",
                                    text: res.data.msg,
                                })
                                .then((value) => {
                                    this.cancel_giftticket()
                                });
                        } else {
                            Swal.fire({
                                    title: "Warning",
                                    icon: "warning",
                                    text: res.data.msg,
                                })
                                .then((value) => {});
                        }
                    })
            }
        }

    }
</script>

<template>
    <div v-if="event_detail">
        <LoadingAnimation v-if="isLoadingAnimation" />
        <HeaderBannerSkeleton v-if="isLoadingHeader" />
        <HeaderBanner :events_id="event_detail.events_id" :route_name="route_name" :global_url="global_url"
            :poster_mobile="event_detail.poster_mobile" :event_title="event_detail.event_title" v-else />
        <div class="content-limit">
            <div class="wrap-content bg-white">
                <div class="formRSVP" v-if="ticketlist">
                    <h4 class="titlepage text-center">
                        <b>Ticket List</b>
                    </h4>
                    <div class="is-loading text-30" v-if="isLoading"></div>
                    <div v-else>
                        <p class="ppage text-center">Order ID : {{event_detail.order_id}}</p>
                    </div>

                    <!-- <div class="text-center">
                            <a :href="'<?php echo $url?>/online/'+ member_data.order_id + '/addon'"
                                class="btn green-btn short-btn" v-if="member_data.have_addon">
                                <span>
                                    Add on – Conference Ticket
                                </span>
                            </a>
                        </div> -->

                    <p>&nbsp;</p>

                    <div class="guest-wrap" id="data_search" v-if="member_data.length > 0">
                        <div class="form-group" v-if="member_data.length > 5">
                            <form>
                                <input type="text" class="form-control" id="search_key" name="search_key"
                                    v-model="search_key" v-on:keyup="search_data()"
                                    style="font-family:'Helvetica' , 'Material Icons'; color: grey;"
                                    placeholder="Search">
                                <span class="icon-search" @click="search_data()">
                                    <i class='bx bx-search-alt'></i>
                                </span>
                            </form>
                        </div>
                        <div class="guest-box" v-for="(guest, index) in member_data">
                            <div class="row">
                                <div class="col-lg-1 col-sm-1 col-1 padding-r-0">
                                    <div class="fontblack-12pt">
                                        <i class='bx bxs-user icon-member'></i>
                                    </div>
                                </div>
                                <div class="col-lg-7 col-sm-7 col-7 padding-r-0">
                                    <div v-if="isLoading">
                                        <div class="is-loading text-30"></div>
                                        <div class="is-loading text-30"></div>
                                    </div>
                                    <div v-else>
                                        <div class="fontblack-12pt">
                                            {{guest.guest_title}}
                                            {{guest.fullname}}
                                        </div>
                                        <div class="fontgrey-12pt">
                                            <!-- Attendance -->
                                            {{guest.ticket_name}}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-4 col-4 text-right">
                                    <button class="btn btn-choose" @click="show_qrcode(guest)">
                                        <span>Show QR</span>
                                    </button>
                                    <!-- data-bs-toggle="modal"
                                    data-bs-target="#showqrcode_modal" -->
                                    <!-- <button class="btn btn-choose" data-bs-toggle="modal"
                                        data-bs-target="#showqrcode_modal" @click="show_qrcode(guest)">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);"><path d="M20 7h-1.209A4.92 4.92 0 0 0 19 5.5C19 3.57 17.43 2 15.5 2c-1.622 0-2.705 1.482-3.404 3.085C11.407 3.57 10.269 2 8.5 2 6.57 2 5 3.57 5 5.5c0 .596.079 1.089.209 1.5H4c-1.103 0-2 .897-2 2v2c0 1.103.897 2 2 2v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zm-4.5-3c.827 0 1.5.673 1.5 1.5C17 7 16.374 7 16 7h-2.478c.511-1.576 1.253-3 1.978-3zM7 5.5C7 4.673 7.673 4 8.5 4c.888 0 1.714 1.525 2.198 3H8c-.374 0-1 0-1-1.5zM4 9h7v2H4V9zm2 11v-7h5v7H6zm12 0h-5v-7h5v7zm-5-9V9.085L13.017 9H20l.001 2H13z"></path></svg>
                                        </span>
                                    </button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="guest-wrap" v-else>
                        <div class="guest-box">
                            <div class="is-loading text-30" v-if="isLoading"></div>
                            <div class="row" v-else>
                                <div class="col-lg-12 col-sm-12 col-12 text-center">
                                    No data found
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="app-wrap text-center">
                            <h4>
                                Download App for<br>
                                "Business Matching for Visitor"
                            </h4>

                            <div>
                                <a href="#" target="blank">
                                    <img src="<?php echo $url."/awassets/img/"?>store-ios.svg" width="110"
                                        alt="Business Matching for Visitor App" class="download-btn">
                                </a>
                                <a href="#" target="blank">
                                    <img src="<?php echo $url."/awassets/img/"?>store-android.svg" width="110"
                                        alt="Business Matching for Visitor App" class="download-btn">
                                </a>
                            </div>

                            <h4>
                                or web based
                            </h4>

                            <div>
                                <a href="<?php echo $url; ?>/bizmatch/visitor/" target="blank">
                                    <button class="btn btn-choose"><span>Click Here</span></button>
                                </a>
                            </div>

                        </div> -->

                    <div class="powered text-center" style="padding-top:35px">
                        Powered by
                        <br>
                        <img src="/src/assets/img/undangin-logo.svg" width="120" alt="Undangin"
                            style="margin-top:10px;">
                    </div>
                </div>

                <div class="formRSVP" v-if="ticketdetail">
                    <div class="row">
                        <div class="col-8">
                            <h4 class="text-left"><b>Detail Ticket</b></h4>
                            <div>Full Name</div>
                            <div class="is-loading text-30" v-if="isLoading"></div>
                            <div class="mb-2" v-else><b>{{member_detail.fullname}}</b></div>

                            <div>Ticket Class</div>
                            <div class="mb-2 text-left">
                                <ul class="ppage" style="padding-left:15px">
                                    <li class="text-left" v-for="ticket in member_detail.tickets">
                                        <b>{{ticket.ticket_name}}</b>
                                    </li>
                                </ul>
                            </div>


                            <div>Order ID</div>
                            <div class="is-loading text-30" v-if="isLoading"></div>
                            <div class="mb-2" v-else><b>{{form_getReceipt.order_id}}</b></div>
                        </div>
                        <div class="col-4">
                            <div class="qr-box text-center">
                                <!-- <div class="is-loading img-height" v-if="isLoading"></div> -->
                                <div id="qrcode"></div>
                                <!-- <img :src="member_detail.qrimage" width="100%" :alt="member_detail.fullname" v-else> -->
                            </div>

                            <div v-if="isLoading">
                                <div class="is-loading text-30"></div>
                                <div class="is-loading text-30"></div>
                            </div>
                            <div v-else>
                                <!-- {{ member_detail }} -->
                                <div class="tokencopy-wrap" @click="copy_membertoken()" style="margin-top: 0;">
                                    <input type="text" class="form-control form-custom form-8pt"
                                        style="position: absolute; top: -2000px;" :value="member_detail.guests_token"
                                        id="member_token" readonly>
                                    <button class="btn btn-main font-12ptwhite copy-btn" @click="copy_membertoken()">
                                        Copy Token
                                        <!-- <i class='bx bxs-copy-alt'></i> -->
                                    </button>
                                </div>
                            </div>
                            <br>
                        </div>
                    </div>
                    <div class="text-center">

                    </div>
                    <div style="font-size:12px; margin-top:20px">
                        <!-- <h4 style="font-size:14px; font-weight:bold">Syarat & Ketentuan :</h4> -->
                        <p><b>JANGAN MEMBAGIKAN BARCODE E-TICKET ANDA SECARA ONLINE KARENA ORANG DAPAT MENYALIN DAN
                                MENGKLAIM TIKET ANDA.</b></p>
                        <ol style="font-size:12px; font-weight:normal; padding-left: 15px;">
                            <li> Kami tidak bertanggung jawab atas kehilangan e-ticket ini</li>
                            <li> E-ticket hanya dapat digunakan oleh 1 orang</li>
                            <li> E-ticket ditukarkan dengan tanda masuk saat di venue</li>
                            <!-- <li> Satu nomor WhatsApp hanya dapat membeli maksimal 5 tiket</li> -->
                            <!-- <li> Open gate dilakukan mulai pukul 09.00 WIB</li> -->
                        </ol>
                    </div>

                    <!-- <meta property="og:image" :content="member_detail.qrimage">
                        <div class="btn-wrap text-center">
                            <span class="line-blue"></span>
                            <p>Share QR Code on</p>
                            <a class="btn-share"
                                :href="'https://api.whatsapp.com/send/?text='+'%0A' + encodeURIComponent(member_data.event_title) +'%0AFullname+:+'+ encodeURIComponent(member_detail.fullname) +'%0AUrl+link+QR+Code+:+'+ encodeURIComponent(member_detail.qrimage)"
                                target="blank">
                                <img src="<?php echo $url."/awassets/img/"?>openrsvp/wa-icon.png" width="70"
                                    alt="Share on Email"><br>
                                WhatsApp
                            </a>
                            <a class="btn-share"
                                :href="'mailto:?subject=Your QR Code for '+ member_data.event_title +'&amp;body='+ member_data.event_title +'%0AFullname : '+ member_detail.fullname +'%0AUrl link QR Code : '+ member_detail.qrimage +'%0D%0D'">
                                <img src="<?php echo $url."/awassets/img/"?>openrsvp/email-icon.png" width="70"
                                    alt="Share on Email"><br>
                                Email
                            </a>
                            <a class="btn-share"
                                :href="'https://telegram.me/share/url?url='+ member_detail.qrimage +'&text='+ member_data.event_title +'%0AFullname : '+ member_detail.fullname +'%0ACheck out this url your qr code.'"
                                target="blank">
                                <img src="<?php echo $url."/awassets/img/"?>openrsvp/telegram-icon.png" width="70"
                                    alt="Share on Telegram"><br>
                                Telegram
                            </a>
                        </div> -->
                    <br>
                    <div class="btn-wrap text-center">
                        <button class="btn btn-main" data-bs-toggle="modal" data-bs-target="#showconfirm_modal">
                            Gift Ticket
                        </button>
                        <a class="btn btn-navy-cancel" @click="clear_qr()">
                            Close
                        </a>
                    </div>
                    <br>
                </div>

                <div class="formRSVP" v-if="giftticket_page">
                    <h4><b>Gift Ticket</b></h4>
                    <p>Please insert the ticket recipient’s personal information.</p>

                    <Form @submit="onSubmitGift" v-slot="{ errors }">
                        <div class="form-group">
                            <Field type="text" class="form-control form-controlc" name="fullname"
                                v-model="form_Giftticket.ho_fullname" placeholder="Full Name / Nama Lengkap"
                                :rules="isRequired" :class="{ 'errorfield': errors.fullname }">
                            </Field>
                            <span class="icon-form"><i class='bx bxs-user'></i></span>
                            <ErrorMessage class="notif-verror" name="fullname" />
                        </div>
                        <div class="form-group">
                            <div class="filter-country">
                                <Field as="select" id="select_country" name="region" style="width:100%"
                                    v-model="form_Giftticket.ho_country_code">
                                    <option value="">Select a Country</option>
                                    <option v-for="code in code_country" :data-image="code.flags"
                                        v-bind:value="code.phonecode">
                                        +{{code.phonecode}}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{code.country_name}}
                                    </option>
                                </Field>
                                <Field type="number" class="form-control form-controlc padding-100" name="phone_number"
                                    :class="{ 'errorfield': errors.phone_number }" v-model="form_Giftticket.ho_phone"
                                    @input="check_phonenumber(form_Giftticket.ho_phone)" maxlength="14"
                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                                    placeholder="Phone Number / No. WhatsApp" :rules="isRequired"></Field>
                                <span class="icon-form"><i class='bx bx-mobile'></i></span>
                                <ErrorMessage class="notif-verror" name="phone_number" />
                            </div>
                        </div>
                        <div class="form-group">
                            <Field type="text" class="form-control form-controlc" name="email_address"
                                id="email_address" v-model="form_Giftticket.ho_email" placeholder="Email "
                                :rules="isRequired" v-on:keyup="ValidateEmail(form_Giftticket.ho_email)"
                                :class="{ 'errorfield': errors.email_address }" />
                            <span class="icon-form"><i class='bx bxs-envelope'></i></span>
                            <ErrorMessage class="notif-verror" name="email_address" />
                            <div class="notif-verror" v-if="notif_email">
                                invalid email address / email tidak valid (format: xxx@xxx.xxx)
                            </div>
                        </div>


                        <div class="btn-wrap text-center">
                            <a class="btn btn-navy-cancel short-btn" @click="cancel_giftticket()">
                                Close
                            </a>
                            <button class="btn btn-main short-btn">
                                <span>
                                    Gift Ticket
                                </span>
                            </button>
                        </div>
                    </Form>
                </div>

                <button @click="topFunction()" id="myBtn" title="Go to top">
                    <i class='bx bxs-chevron-up'></i>
                </button>

            </div>
        </div>

        <div class="modalcustom-white" v-if="otpform">
            <div class="formRSVP">
                <div class="nav-back">
                    <a @click="back_fromOtp()"><i class='bx bx-arrow-back'></i></a>
                    Gift Ticket Verification
                </div>
                <Form @submit="onSubmit">
                    <h4 class="text-center"><b>Input your OTP code</b></h4>
                    <p class="font-12pt text-center">Please enter the OTP code that we emailed to you to confirm that
                        this
                        is who you
                        are.</p>

                    <div class="form-group text-center">
                        <label>
                            <input type="text" class="text-left" id="otp" autocomplete="one-time-code"
                                inputmode="numeric" maxlength="6" pattern="\d{6}">
                        </label>
                    </div>

                    <div class="font-12pt text-center">Didn’t receive the code?</div>
                    <div class="font-12ptblue text-center" v-if="resend_otp == false">
                        Pleasse wait <span id="timer">5:00</span> for send the code again
                    </div>
                    <div class="font-12ptblue text-center" v-else>
                        <a class="btn btn-navy-cancel short-btn" @click="sendOtp()">
                            Resend
                        </a>
                    </div>

                    <br />
                    <div class="btn-wrap text-center">
                        <button class="btn btn-main">
                            Verification
                        </button>
                    </div>
                </Form>

                <button id="btn-formgift" style="position: absolute; top: -200px;" data-bs-toggle="modal"
                    data-bs-target="#formgift_modal">
                    Gift Ticket
                </button>
            </div>
        </div>

        <!-- Modal Show Qr -->
        <div class="modal fade" id="showconfirm_modal" data-bs-keyboard="false" data-bs-backdrop="static">
            <div class="modal-dialog modal-top modal-top-50">
                <div class="modal-content border-bottom-navy">
                    <div class="modal-body">
                        <p>&nbsp;</p>
                        <h4 class="text-center"><b>Are you sure to gift ticket?</b></h4>
                        <p class="text-center">After you continue this step, we will send your OTP code to your email
                        </p>

                        <div class="btn-wrap text-center">
                            <a class="btn btn-navy-cancel short-btn" data-bs-dismiss="modal" id="close-confirm">
                                Cancel
                            </a>
                            <button class="btn btn-main short-btn" data-bs-dismiss="modal" @click="sendOtp()">
                                Continue
                            </button>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Show Qr -->
        <!-- <div class="modal fade" id="formgift_modal" data-bs-keyboard="false" data-bs-backdrop="static">
            <div class="modal-dialog modal-top modal-top-50">
                <div class="modal-content border-bottom-navy">
                    <div class="modal-body">
                        <h4><b>Gift Ticket</b></h4>
                        <p>Please insert the ticket recipient’s personal information.</p>

                        <Form @submit="onSubmitGift" v-slot="{ errors }">
                            <div class="form-group">
                                <Field type="text" class="form-control form-controlc" name="fullname"
                                    v-model="form_Giftticket.ho_fullname" placeholder="Full Name / Nama Lengkap"
                                    :rules="isRequired" :class="{ 'errorfield': errors.fullname }">
                                </Field>
                                <span class="icon-form"><i class='bx bxs-user'></i></span>
                                <ErrorMessage class="notif-verror" name="fullname" />
                            </div>
                            <div class="form-group">
                                <div class="filter-country">
                                    <Field as="select" id="select_country" name="region" style="width:100%"
                                        v-model="form_Giftticket.ho_country_code">
                                        <option value="">Select a Country</option>
                                        <option v-for="code in code_country" :data-image="code.flags"
                                            v-bind:value="code.phonecode">
                                            +{{code.phonecode}}
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{code.country_name}}
                                        </option>
                                    </Field>
                                    <Field type="number" class="form-control form-controlc padding-100"
                                        name="phone_number" :class="{ 'errorfield': errors.phone_number }"
                                        v-model="form_Giftticket.ho_phone"
                                        @input="check_phonenumber(form_Giftticket.ho_phone)" maxlength="14"
                                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                                        placeholder="Phone Number / No. WhatsApp" :rules="isRequired"></Field>
                                    <span class="icon-form"><i class='bx bx-mobile'></i></span>
                                    <ErrorMessage class="notif-verror" name="phone_number" />
                                </div>
                            </div>
                            <div class="form-group">
                                <Field type="text" class="form-control form-controlc" name="email_address"
                                    id="email_address" v-model="form_Giftticket.ho_email" placeholder="Email "
                                    :rules="isRequired" v-on:keyup="ValidateEmail(form_Giftticket.ho_email)"
                                    :class="{ 'errorfield': errors.email_address }" />
                                <span class="icon-form"><i class='bx bxs-envelope'></i></span>
                                <ErrorMessage class="notif-verror" name="email_address" />
                                <div class="notif-verror" v-if="notif_email">
                                    invalid email address / email tidak valid (format: xxx@xxx.xxx)
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-main" id="btn_register">
                                    <span v-if="LoadingButton">
                                        <span class="loader loading-quarter"></span>
                                        Processing
                                    </span>
                                    <span v-else>
                                        Register
                                    </span>
                                </button>
                            </div>
                        </Form>

                        <div class="btn-wrap text-center">
                            <a class="btn btn-navy-cancel short-btn" data-bs-dismiss="modal" @click="clear_qr()">
                                Close
                            </a>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<style scoped>
    .nav-back {
        font-family: 'Helvetica-Bold';
        font-size: 20pt;
        font-weight: bold;
        color: #315568;
        margin-bottom: 40px;
    }

    .nav-back a {
        font-size: 25pt;
        color: #315568;
        vertical-align: middle;
        margin-right: 10px;
    }

    .icon-search {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 28px;
    }

    .tokencopy-wrap {
        position: relative;
        margin-top: 25px;
    }

    .tokencopy-wrap input {
        font-style: italic;
    }

    .form-8pt {
        padding: 10px;
        height: 33px;
        font-size: 9.5pt;
    }

    .tokencopy-wrap .btn-customcopy {
        border: none;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 8pt;
        height: 33px;
        border-radius: 13px;
        background: #ccc;
        color: #151515;
    }

    .form-control:disabled,
    .form-control[readonly] {
        background-color: #e9ecef;
        opacity: 1;
    }

    .qr-box {
        padding: 2pt;
        border-radius: 5pt;
        box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
    }

    #qrcode {
        display: inline-block;
    }

    .ppage {
        font-family: 'PlusJakartaSans';
        font-weight: 500;
        font-size: 12pt;
        color: #09303E;
    }

    .inline-block {
        display: inline-block;
    }

    .btn-choose {
        width: auto;
        max-width: auto;
        padding: 8px;
        font-size: 12px;
        color: #FFFFFF;
        border-radius: 20px;
        background: #315568;
        margin: 2px;
    }

    :where([autocomplete=one-time-code]) {
        --otp-digits: 6;
        --otp-ls: 2ch;
        --otp-gap: 1.25;

        /* private consts */
        --_otp-bgsz: calc(var(--otp-ls) + 1ch);
        --_otp-digit: 0;

        all: unset;
        background:
            linear-gradient(90deg,
                var(--otp-bg, #BBB) calc(var(--otp-gap) * var(--otp-ls)),
                transparent 0),
            linear-gradient(90deg,
                var(--otp-bg, #EEE) calc(var(--otp-gap) * var(--otp-ls)),
                transparent 0);
        background-position: calc(var(--_otp-digit) * var(--_otp-bgsz)) 0, 0 0;
        background-repeat: no-repeat, repeat-x;
        background-size: var(--_otp-bgsz) 100%;
        caret-color: var(--otp-cc, #222);
        caret-shape: block;
        clip-path: inset(0% calc(var(--otp-ls) / 2) 0% 0%);
        font-family: ui-monospace, monospace;
        font-size: var(--otp-fz, 2.5em);
        inline-size: calc(var(--otp-digits) * var(--_otp-bgsz));
        letter-spacing: var(--otp-ls);
        padding-block: var(--otp-pb, 1ch);
        padding-inline-start: calc(((var(--otp-ls) - 1ch) / 2) * var(--otp-gap));
    }

    /* For this demo */
    label span {
        display: block;
        font-family: ui-sans-serif, system-ui, sans-serif;
        font-weight: 500;
        margin-block-end: 1ch;
    }

    .form-controlc {
        padding: 10px 10px 10px 31px;
        height: 47px;
        border: 1px solid #91B2C3;
        border-radius: 10pt;
    }

    input.padding-100 {
        padding-left: 125px;
    }

    .copy-btn {
        border-radius: 0px 0 5pt 5pt;
        padding: 5px;
    }
</style>