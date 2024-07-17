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
                            <p>ticket price</p>
                            <p>Quantity Ticket</p>
                        </div>
                        <div class="justify-content-between flex">
                            <p>IDR. 55.000</p>
                            <p>Quantity Ticket</p>
                        </div>
                    </div>
                    <div class="col-md-1"></div>
                </div>
                <div class="row">
                    <h4 class="text-start my-3">Term & Condition</h4>
                    <div class="term-condition overflow-scroll scrollspy-example" data-bs-spy="scroll">
                        {{ this.event_declaration.event_declaration }}
                    </div>

                    <div class="form-check">
                        <div class="row">
                            <label class="form-check-label" for="flexCheckChecked">
                                YES, I AGREE, I WANT TO BUY TICKET
                            </label></div>
                        <div class="row">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                            <p class="additional-font">I do understand</p>
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
                    <div class="justify-content-between flex mt-3">
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
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="total-payment col-md-6">
                        <p>Total Payment</p>
                    </div>
                    <div class="price col-md-6 p-ticket text-end">
                        <div class="price =">
                            IDR 10k
                        </div>
                        <span class="span-total-ticket text-end">please check ticket before add to purchase</span>
                    </div>
                    <div class="total-payment bottom-0 end-0 ">
                        <div class="form-group">
                            <button class="btn-purchase mt-4">Purchase</button>
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
                event_declaration: "",
                declareget: {
                    events_id: this.$route.params.Eventsid,
                    ip_address: "10.10.10.10",
                    prev_action: "getcart",
                },
                global_url: this.$globalURL
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

            declareGet() {
                axios({
                        method: "POST",
                        url: "/rsvp/declareget",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        data: this.declareget
                    })
                    .then(res => {
                        this.event_declaration = res.data;
                        this.createCookie("prev_action", this.prev_action);
                    })
            },
        },
        mounted() {
            this.events_id = $cookies.get("events_id");
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
            this.declareGet();
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
</style>