<template>
    <section class="vh-100">
        <div class="container">
            <div class="row">
                <div class="text-center my-5">
                    <h1>Register</h1>
                    <span>Enter your full name, E-mail, and password to register</span>
                </div>
                <div id="input-data" class="w-75 m-auto">
                    <form id="registration_form">
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" id="fullname" aria-describedby="emailHelp"
                                placeholder="Full Name" />
                        </div>
                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <input type="password" class="form-control" id="email" placeholder="Email" />
                            </div>
                            <div class="mb-3 col-md-6">
                                <input type="password" class="form-control" id="confirmationemail"
                                    placeholder="Confirmation E-mail" />
                            </div>
                            <div class="mb-3 col-md-6">
                                <input type="password" class="form-control" id="countrycode" placeholder="Country" />
                            </div>
                            <div class="mb-3 col-md-6">
                                <input type="password" class="form-control" id="province" placeholder="Province" />
                            </div>
                            <div class="mb-3 col-md-6">
                                <input type="password" class="form-control" id="city" placeholder="City" />
                            </div>
                            <div class="mb-3 col-md-6">
                                <input type="password" class="form-control" id="phone" placeholder="Phone" />
                            </div>
                            <div class="mb-3 col-md-6">
                                <input type="password" class="form-control" id="company" placeholder="Company" />
                            </div>
                        </div>

                        
                    </form>
                    <div class="form-group text-end">
                        <button class="btn-back mt-4 mx-3" @click="backToCart()">Back</button>
                        <button class="btn-next mt-4" @click="confirmGetTicket()">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Swal from "sweetalert2";
    import axios from "axios";
    import 'https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js';
    import '/src/assets/bootstrap-datepicker.min.js';

    export default {
        data() {
            return {
                events_id: this.$route.params.Eventsid,
                phone_number: '',
                codephone: '62',
                email_confirm: '',
                not_verify: false,
                form_Reg: {
                    events_id: this.$route.params.Eventsid,
                    ticketid: JSON.parse(localStorage.getItem("mt_id")),
                    ticket_qty: localStorage.getItem("ticket_qty"),
                    salutation: '',
                    fullname: '',
                    email: '',
                    country_code: '62',
                    phone: '',
                    company: '',
                    company_city: '',
                    company_province: '',
                    company_country: '',
                    company_type: '',
                    company_type_isothers: '',
                    company_type_others: '',
                    position: '',
                    position_isothers: '',
                    position_others: '',
                    profession: '',
                    profession_isothers: '',
                    profession_others: '',
                    division: '',
                    division_isothers: '',
                    division_others: '',
                    nim: '',
                    faculty_name: '',
                    yob: '',
                    invitationcode: '',
                    birth_date: '',
                    sex: '',
                    prev_action: "declareget",
                },
                notif_email: false,
                event_detail: JSON.parse(localStorage.getItem("event_details")),
                order_id: localStorage.getItem("order_id"),
                form_getEvid: {
                    events_id: this.$route.params.Eventsid
                },
                salutation_data: [],
                years_list: [],
                code_country: [],
                data_profession: [],
                profession_enable: [],
                data_position: [],
                data_position_enable: [],
                data_division: [],
                data_division_enable: [],
                data_companytype: [],
                data_companytype_enable: [],
                form_getProvince: {
                    country_code: ''
                },
                data_province: [],
                form_getCity: {
                    country_code: '',
                    province_code: ''
                },
                data_city: '',
                global_url: this.$globalURL,
                isLoading: true,
                LoadingButton: false,
                isLoadingAnimation: false,
                route_name: this.$route.name,
                titlePage: 'Register',
                descPage: 'Please fill in all field to register.'
            };
        },
        components: {},
        methods: {
            isRequired(value) {
                if (!value) {
                    return 'this field is required / kolom wajib diisi';
                }

                return true;
            },
            getEvent() {
                this.topFunction()
                this.getSalutation()
                this.get_codecountry()
                if (this.event_detail.setting.yob_toggle == 'Y') {
                    this.get_yearslist()
                }
                if (this.event_detail.setting.birth_date_toggle == 'Y') {
                    this.get_jsbirthdate()
                }
                if (this.event_detail.setting.profession_toggle == 'Y') {
                    this.get_Profession()
                }
                if (this.event_detail.setting.jobtitle_toggle == 'Y') {
                    this.get_Position()
                }
                if (this.event_detail.setting.division_toggle == 'Y') {
                    this.get_Division()
                }
                if (this.event_detail.setting.companytype_toggle == 'Y') {
                    this.get_companytype()
                }
                if (this.event_detail.setting.companycountry_toggle == 'Y') {
                    this.get_datacountry()
                }
                if (this.event_detail.setting.companycity_toggle == 'Y') {
                    this.get_Province()
                }
            },

            get_jsbirthdate() {
                var self = this
                setTimeout(function () {
                    $('#birth_date').datepicker({
                        todayHighlight: true,
                        format: "dd/mm/yyyy",
                        autoclose: true,
                    }).on(
                        "changeDate",
                        function () {
                            self.form_Reg.birth_date = $('#birth_date').val()
                        }
                    );
                }, 200);
            },
            getSalutation() {
                this.isLoadingAnimation = true;
                axios({
                        url: "/master/getsalutation",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getEvid,
                    })
                    .then(res => {
                        this.isLoading = false
                        this.isLoadingAnimation = false;
                        this.salutation_data = res.data.salutation;

                        var is = this
                        setTimeout(function () {
                            $('#salutation').on("change", function () {
                                is.form_Reg.salutation = $(this).val();
                            });

                            $("#salutation").select2({
                                placeholder: "Salutation / Sapaan",
                                escapeMarkup: function (markup) {
                                    return markup;
                                }
                            });
                        }, 200);
                    })
            },
            check_phonenumber(input_phone) {
                const phone = input_phone;
                if (phone.toString().startsWith('0'))
                    this.phone_number = phone.toString().substring(1);
            },
            get_codecountry() {
                this.isLoadingAnimation = true;
                axios({
                        url: "/master/getcountry",
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
                                is.form_Reg.country_code = $(this).val();
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
                        }, 50);
                    })
            },
            get_yearslist() {
                const startYear = 1900;
                const endYear = new Date().getFullYear();
                for (let i = endYear; i >= startYear; i--) {
                    this.years_list = [...this.years_list, i]
                }

                var is = this
                setTimeout(function () {
                    $('#yob').on("change", function () {
                        is.form_Reg.yob = $(this).val();
                    });

                    if (is.event_detail.setting.yob_required == 'Y') {
                        $("#yob").select2({
                            placeholder: "Year of Birth / Tahun Lahir",
                            escapeMarkup: function (markup) {
                                return markup;
                            }
                        });
                    } else {
                        $("#yob").select2({
                            placeholder: "Year of Birth / Tahun Lahir (Optional)",
                            escapeMarkup: function (markup) {
                                return markup;
                            }
                        });
                    }
                }, 200);
            },
            get_Profession() {
                this.isLoadingAnimation = true;
                axios({
                        url: "/master/getprofession",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getEvid,
                    })
                    .then(res => {
                        this.isLoadingAnimation = false;
                        this.data_profession = res.data.profession
                        for (let i = 0; i < this.data_profession.length; i++) {
                            if (this.data_profession[i].profession_enabled == 'Y') {
                                this.profession_enable.push(this.data_profession[i])
                            }
                        }

                        var is = this
                        setTimeout(function () {
                            $('#profession').on("change", function () {
                                is.form_Reg.profession = $(this).val();
                                is.change_profession_isothers(is.form_Reg.profession)
                            });

                            if (is.event_detail.setting.profession_required == 'Y') {
                                $("#profession").select2({
                                    placeholder: "Profession / Profesi",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });
                            } else {
                                $("#profession").select2({
                                    placeholder: "Profession / Profesi (Optional)",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });
                            }
                        }, 200);
                    })
            },
            change_profession_isothers(value) {
                for (let i = 0; i < this.data_profession.length; i++) {
                    if (this.data_profession[i].profession_id == value) {
                        this.form_Reg.profession_isothers = this.data_profession[i].is_others
                    } else {
                        this.form_Reg.profession_others = ''
                    }
                }
            },
            get_Position() {
                this.isLoadingAnimation = true;
                axios({
                        url: "/master/getjobposition",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getEvid,
                    })
                    .then(res => {
                        this.isLoadingAnimation = false;
                        this.data_position = res.data.jobposition

                        for (let i = 0; i < this.data_position.length; i++) {
                            if (this.data_position[i].position_enabled == 'Y') {
                                this.data_position_enable.push(this.data_position[i])
                            }
                        }

                        var is = this
                        setTimeout(function () {
                            $('#position').on("change", function () {
                                is.form_Reg.position = $(this).val();
                                is.change_position_isothers(is.form_Reg.position)
                            });

                            if (is.event_detail.setting.jobtitle_required == 'Y') {
                                $("#position").select2({
                                    placeholder: "Position / Posisi",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });
                            } else {
                                $("#position").select2({
                                    placeholder: "Position / Posisi (Optional)",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });
                            }
                        }, 200);
                    })
            },
            change_position_isothers(value) {
                for (let i = 0; i < this.data_position.length; i++) {
                    if (this.data_position[i].position_id == value) {
                        this.form_Reg.position_isothers = this.data_position[i].is_others
                    } else {
                        this.form_Reg.position_others = ''
                    }
                }
            },
            get_Division() {
                this.isLoadingAnimation = true;
                axios({
                        url: "/master/getdivision",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getEvid,
                    })
                    .then(res => {
                        this.isLoadingAnimation = false;
                        this.data_division = res.data.division

                        for (let i = 0; i < this.data_division.length; i++) {
                            if (this.data_division[i].division_enabled == 'Y') {
                                this.data_division_enable.push(this.data_division[i])
                            }
                        }

                        var is = this
                        setTimeout(function () {
                            $('#division').on("change", function () {
                                is.form_Reg.division = $(this).val();
                                is.change_division_isothers(is.form_Reg.division)
                            });

                            if (is.event_detail.setting.division_required == 'Y') {
                                $("#division").select2({
                                    placeholder: "Division / Divisi",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });
                            } else {
                                $("#division").select2({
                                    placeholder: "Division / Divisi (Optional)",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });
                            }
                        }, 200);
                    })
            },
            change_division_isothers(value) {
                for (let i = 0; i < this.data_division.length; i++) {
                    if (this.data_division[i].division_id == value) {
                        this.form_Reg.division_isothers = this.data_division[i].is_others
                    } else {
                        this.form_Reg.division_others = ''
                    }
                }
            },
            get_companytype() {
                this.isLoadingAnimation = true;
                axios({
                        url: "/master/getcompanytype",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getEvid,
                    })
                    .then(res => {
                        this.isLoadingAnimation = false;
                        this.data_companytype = res.data.companytype

                        for (let i = 0; i < this.data_companytype.length; i++) {
                            if (this.data_companytype[i].comptype_enabled == 'Y') {
                                this.data_companytype_enable.push(this.data_companytype[i])
                            }
                        }

                        var is = this
                        setTimeout(function () {
                            $('#company_type').on("change", function () {
                                is.form_Reg.company_type = $(this).val();
                                is.change_companytype_isothers(is.form_Reg.company_type)
                            });

                            if (is.event_detail.setting.companytype_required == 'Y') {
                                $("#company_type").select2({
                                    placeholder: "Company Type / Tipe Perusahaan",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });
                            } else {
                                $("#company_type").select2({
                                    placeholder: "Company Type / Tipe Perusahaan (Optional)",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });
                            }
                        }, 200);
                    })
            },
            change_companytype_isothers(value) {
                for (let i = 0; i < this.data_companytype.length; i++) {
                    if (this.data_companytype[i].comptype_id == value) {
                        this.form_Reg.company_type_isothers = this.data_companytype[i].is_others
                    } else {
                        this.form_Reg.company_type_others = ''
                    }
                }
            },
            get_datacountry() {
                var is = this
                setTimeout(function () {
                    $('#company_country').on("change", function () {
                        is.form_Reg.company_country = $(this).val();
                        is.get_Province()
                    });

                    if (is.event_detail.setting.companycountry_required == 'Y') {
                        $("#company_country").select2({
                            placeholder: "Country / Negara",
                            escapeMarkup: function (markup) {
                                return markup;
                            }
                        });
                    } else {
                        $("#company_country").select2({
                            placeholder: "Country / Negara (Optional)",
                            escapeMarkup: function (markup) {
                                return markup;
                            }
                        });
                    }
                }, 200);
            },
            get_Province() {
                this.form_getProvince.country_code = this.form_Reg.company_country

                this.isLoadingAnimation = true;
                axios({
                        url: "/master/getprovince",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getProvince,
                    })
                    .then(res => {
                        this.isLoadingAnimation = false;
                        this.data_province = res.data

                        var is = this
                        setTimeout(function () {
                            $('#company_province').on("change", function () {
                                is.form_Reg.company_province = $(this).val();
                                is.get_city()
                            });

                            if (is.event_detail.setting.companycity_required == 'Y') {
                                $("#company_province").select2({
                                    placeholder: "Province / Propinsi",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });

                                $("#company_city").select2({
                                    placeholder: "City / Kota",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });
                            } else {
                                $("#company_province").select2({
                                    placeholder: "Province / Propinsi (Optional)",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });

                                $("#company_city").select2({
                                    placeholder: "City / Kota (Optional)",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });
                            }
                        }, 200);
                    })
            },
            get_city() {
                this.form_getCity.country_code = this.form_Reg.company_country
                this.form_getCity.province_code = this.form_Reg.company_province

                this.isLoadingAnimation = true;
                axios({
                        url: "/master/getcity",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getCity,
                    })
                    .then(res => {
                        this.isLoadingAnimation = false;
                        this.data_city = res.data

                        var is = this
                        setTimeout(function () {
                            $('#company_city').on("change", function () {
                                is.form_Reg.company_city = $(this).val();
                            });

                            if (is.event_detail.setting.companycity_required == 'Y') {
                                $("#company_city").select2({
                                    placeholder: "City / Kota",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });
                            } else {
                                $("#company_city").select2({
                                    placeholder: "City / Kota (Optional)",
                                    escapeMarkup: function (markup) {
                                        return markup;
                                    }
                                });
                            }
                        }, 200);
                    })
            },
            trim_email(email_address) {
                this.form_Reg.email = email_address.replace(/\s+/g, '');
            },
            trim_emailconfirm(email_confirm) {
                this.email_confirm = email_confirm.replace(/\s+/g, '');
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
            topFunction() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            },
            setTitle(title_page) {
                document.title = `${title_page}`
            },
            onSubmit(values) {
                // if (this.form_Reg.email == this.email_confirm) {
                this.not_verify = false
                this.form_Reg.phone = this.phone_number
                this.isLoadingAnimation = true;

                axios({
                        url: "/rsvp/addguest",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_Reg,
                    })
                    .then(res => {
                        if (res.data.status == 200) {
                            localStorage.setItem('order_id', res.data.order_id)
                            if (this.event_detail.setting.rsvp_assesment == 'Y') {
                                this.$router.push("/questionaire/" + this.form_Reg.events_id);
                            } else {
                                this.$router.push("/checkout/" + this.form_Reg.events_id);
                            }
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
                // } else {
                //     this.not_verify = true
                //     this.topFunction()
                // }
            },
            backToCart() {
                this.$router.push("/mycart/" + this.events_id);
            }

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
                this.getEvent();
                this.setTitle("Registration - " + this.event_detail.event_title + " - Undangin ")
            }
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
        background-color: #ebebeb;
        color: #25516b;
        border-radius: 20px;
        font-size: 20px;
        align-items: center;
        text-align: center;
        border: none;
        padding: 10px;
        font-weight: bold;
    }

    .btn-back {
        width: 25%;
        background-color: #ffffff;
        color: #2096c1;
        font-family: Helvetica;
        border-radius: 10px;
        font-size: 16pt;
        padding: 5px 0 5px 0;
        font-weight: bold;
        border-color: #2096c1;
    }

    .btn-next {
        width: 25%;
        background-color: #315568;
        color: #fff;
        font-family: Helvetica;
        border-radius: 10px;
        font-size: 16pt;
        padding: 5px 0 5px 0;
        font-weight: bold;
        border-color: #315568;
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