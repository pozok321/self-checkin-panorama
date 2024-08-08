<template>
    <section class="vh-100">
        <div class="container">
            <div class="row">
                <div id="input-data" class="w-75 m-auto">
                    <div class="text-center my-5">
                    <h1>Register</h1>
                    <span>Enter your full name, E-mail, and password to register</span>
                </div>
                    <div class="formRSVP">
                        <Form @submit="onSubmit" v-slot="{ errors }">
                            <!-- <div class="form-group form-select-search"
                                v-if="event_detail.setting.guest_title_toggle == 'Y'">
                                <div class="form-control-select" :class="{ 'errorfield': errors.salutation }">
                                    <Field as="select" name="salutation" id="salutation" class="form-control"
                                        v-model="form_Reg.salutation" :rules="isRequired"
                                        >
                                        <option v-for="salutation in salutation_data"
                                            v-bind:value="salutation.salutation_code">
                                            {{ salutation.salutation_description }}
                                        </option>
                                    </Field>
                                </div>
                                <span class="icon-form"><i class='bx bxs-user'></i></span>
                                <ErrorMessage class="notif-verror" name="salutation" />
                            </div> -->
                            <div class="form-group">
                                <Field type="text" class="form-control" name="fullname" v-model="form_Reg.fullname"
                                    placeholder="Full Name / Nama Lengkap" :rules="isRequired"
                                    :class="{ 'errorfield': errors.fullname }">
                                </Field>
                                <span class="icon-form"><i class='bx bxs-user'></i></span>
                                <ErrorMessage class="notif-verror" name="fullname" />
                            </div>
                            <div class="row" v-if="event_detail.setting.yob_toggle == 'Y'">
                                <div class="col-md-6">
                                    <div class="form-group form-select-search">
                                        <div class="form-control-select" :class="{ 'errorfield': errors.yob }"
                                            v-if="event_detail.setting.yob_required === 'Y'">
                                            <Field as="select" name="yob" id="yob" class="form-control"
                                                v-model="form_Reg.yob" :rules="isRequired">
                                                <option v-for="year in years_list" v-bind:value="year">
                                                    {{ year }}
                                                </option>
                                            </Field>
                                        </div>
                                        <Field as="select" name="yob" id="yob" class="form-control"
                                            v-model="form_Reg.yob" v-else>
                                            <option v-for="year in years_list" v-bind:value="year">
                                                {{ year }}
                                            </option>
                                        </Field>
                                        <span class="icon-form"><i class='bx bx-calendar'></i></span>
                                        <ErrorMessage class="notif-verror" name="yob" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="filter-country">
                                            <Field as="select" id="select_country" name="region" style="width:100%"
                                                v-model="form_Reg.country_code">
                                                <option value="">Select a Country</option>
                                                <option v-for="code in code_country" :data-image="code.flags"
                                                    v-bind:value="code.phonecode">
                                                    +{{code.phonecode}}
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{code.country_name}}
                                                </option>
                                            </Field>
                                            <Field type="number" class="form-control padding-100" name="phone_number"
                                                :class="{ 'errorfield': errors.phone_number }" v-model="phone_number"
                                                @input="check_phonenumber(phone_number)" maxlength="14"
                                                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                                                placeholder="Phone Number / No. WhatsApp" :rules="isRequired"></Field>
                                            <span class="icon-form"><i class='bx bx-mobile'></i></span>
                                            <ErrorMessage class="notif-verror" name="phone_number" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <Field type="text" class="form-control" name="email_address" id="email_address"
                                            v-model="form_Reg.email" placeholder="Email " :rules="isRequired"
                                            v-on:keyup="ValidateEmail(form_Reg.email)"
                                            :class="{ 'errorfield': errors.email_address }" />
                                        <span class="icon-form"><i class='bx bxs-envelope'></i></span>
                                        <ErrorMessage class="notif-verror" name="email_address" />
                                        <div class="notif-verror" v-if="notif_email">
                                            invalid email address / email tidak valid (format: xxx@xxx.xxx)
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <Field type="text" class="form-control" name="email_confirm" id="email_confirm"
                                            v-model="email_confirm" placeholder="Email Confirmation" :rules="isRequired"
                                            v-on:keyup="trim_emailconfirm(email_confirm)"
                                            :class="{ 'errorfield': errors.email_confirm }" />
                                        <span class="icon-form"><i class='bx bxs-envelope'></i></span>
                                        <ErrorMessage class="notif-verror" name="email_confirm" />
                                        <div class="notif-verror" v-if="not_verify">
                                            Email is different, please check again!
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.birth_date_toggle == 'Y'">
                                    <div class="form-group">
                                        <Field type="text" class="form-control" name="birth_date" id="birth_date"
                                            v-model="form_Reg.birth_date"
                                            placeholder="Birthdate / Tanggal lahir (dd/mm/yyyy)" :rules="isRequired"
                                            :class="{ 'errorfield': errors.birth_date }">
                                        </Field>
                                        <span class="icon-form"><i class='bx bxs-user'></i></span>
                                        <ErrorMessage class="notif-verror" name="birth_date" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.sex_toggle == 'Y'">
                                    <div class="form-group form-select-search">
                                        <div class="form-control-select" :class="{ 'errorfield': errors.sex }">
                                            <Field as="select" name="sex" id="sex" class="form-control"
                                                v-model="form_Reg.sex" :rules="isRequired">
                                                <option value="" disabled>Sex / Jenis Kelamin</option>
                                                <option value="M">Male / Pria</option>
                                                <option value="F">Female / Wanita</option>
                                            </Field>
                                        </div>
                                        <span class="icon-form"><i class='bx bxs-user'></i></span>
                                        <ErrorMessage class="notif-verror" name="sex" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.profession_toggle == 'Y'">
                                    <div class="form-group form-select-search">
                                        <div class="form-control-select" :class="{ 'errorfield': errors.profession }"
                                            v-if="event_detail.setting.profession_required == 'Y'">
                                            <Field as="select" name="profession" id="profession" class="form-control"
                                                v-model="form_Reg.profession" :rules="isRequired">
                                                <option v-for="profession in profession_enable"
                                                    v-bind:value="profession.profession_id">
                                                    {{ profession.profession_name }}
                                                </option>
                                            </Field>
                                        </div>
                                        <Field as="select" name="profession" id="profession" class="form-control"
                                            v-model="form_Reg.profession" v-else>
                                            <option v-for="profession in profession_enable"
                                                v-bind:value="profession.profession_id">
                                                {{ profession.profession_name }}
                                            </option>
                                        </Field>
                                        <span class="icon-form"><i class='bx bxs-briefcase'></i></span>
                                        <ErrorMessage class="notif-verror" name="profession" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="form_Reg.profession_isothers == 'Y'">
                                    <div class="form-group">
                                        <Field type="text" class="form-control" name="profession_others"
                                            v-model="form_Reg.profession_others"
                                            placeholder="Profession Others / Profesi Lainnya" :rules="isRequired"
                                            :class="{ 'errorfield': errors.profession_others }" />
                                        <span class="icon-form"><i class='bx bxs-briefcase'></i></span>
                                        <ErrorMessage class="notif-verror" name="profession_others" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.jobtitle_toggle == 'Y'">
                                    <div class="form-group form-select-search">
                                        <div class="form-control-select" :class="{ 'errorfield': errors.position }"
                                            v-if="event_detail.setting.jobtitle_required == 'Y'">
                                            <Field as="select" name="position" id="position" class="form-control"
                                                v-model="form_Reg.position" :rules="isRequired">
                                                <option v-for="position in data_position_enable"
                                                    v-bind:value="position.position_id">
                                                    {{ position.position_name }}
                                                </option>
                                            </Field>
                                        </div>
                                        <Field as="select" name="position" id="position" class="form-control"
                                            v-model="form_Reg.position" v-else>
                                            <option v-for="position in data_position_enable"
                                                v-bind:value="position.position_id">
                                                {{ position.position_name }}
                                            </option>
                                        </Field>
                                        <span class="icon-form"><i class='bx bxs-briefcase'></i></span>
                                        <ErrorMessage class="notif-verror" name="position" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="form_Reg.position_isothers == 'Y'">
                                    <div class="form-group">
                                        <Field type="text" class="form-control" name="position_others"
                                            v-model="form_Reg.position_others"
                                            placeholder="Position Others / Posisi Lainnya" :rules="isRequired"
                                            :class="{ 'errorfield': errors.position_others }" />
                                        <span class="icon-form"><i class='bx bxs-briefcase'></i></span>
                                        <ErrorMessage class="notif-verror" name="position_others" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.division_toggle == 'Y'">
                                    <div class="form-group form-select-search">
                                        <div class="form-control-select" :class="{ 'errorfield': errors.division }"
                                            v-if="event_detail.setting.division_required == 'Y'">
                                            <Field as="select" name="division" id="division" class="form-control"
                                                v-model="form_Reg.division" :rules="isRequired">
                                                <option v-for="division in data_division_enable"
                                                    v-bind:value="division.division_id">
                                                    {{ division.division_name }}
                                                </option>
                                            </Field>
                                        </div>
                                        <Field as="select" name="division" id="division" class="form-control"
                                            v-model="form_Reg.division" v-else>
                                            <option v-for="division in data_division_enable"
                                                v-bind:value="division.division_id">
                                                {{ division.division_name }}
                                            </option>
                                        </Field>
                                        <span class="icon-form"><i class='bx bxs-briefcase'></i></span>
                                        <ErrorMessage class="notif-verror" name="division" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="form_Reg.division_isothers == 'Y'">
                                    <div class="form-group">
                                        <Field type="text" class="form-control" name="division_others"
                                            v-model="form_Reg.division_others"
                                            placeholder="division Others / Divisi Lainnya" :rules="isRequired"
                                            :class="{ 'errorfield': errors.division_others }" />
                                        <span class="icon-form"><i class='bx bxs-briefcase'></i></span>
                                        <ErrorMessage class="notif-verror" name="division_others" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.nim_toggle == 'Y'">
                                    <div class="form-group">
                                        <Field type="text" class="form-control" id="nim" name="nim"
                                            v-model="form_Reg.nim" placeholder="NIM" :rules="isRequired"
                                            :class="{ 'errorfield': errors.nim }"
                                            v-if="event_detail.setting.nim_required == 'Y'" />
                                        <Field type="text" class="form-control" id="nim" name="nim"
                                            v-model="form_Reg.nim" placeholder="NIM (Optional)" v-else />
                                        <span class="icon-form"><i class='bx bxs-bank'></i></span>
                                        <ErrorMessage class="notif-verror" name="nim" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.faculty_toggle == 'Y'">
                                    <div class="form-group">
                                        <Field type="text" class="form-control" id="faculty_name" name="faculty_name"
                                            v-model="form_Reg.faculty_name" placeholder="Faculty Name / Nama Fakultas"
                                            :rules="isRequired" :class="{ 'errorfield': errors.faculty_name }"
                                            v-if="event_detail.setting.faculty_required == 'Y'" />
                                        <Field type="text" class="form-control" id="faculty_name" name="faculty_name"
                                            v-model="form_Reg.faculty_name"
                                            placeholder="Faculty Name / Nama Fakultas (Optional)" v-else />
                                        <span class="icon-form"><i class='bx bxs-bank'></i></span>
                                        <ErrorMessage class="notif-verror" name="faculty_name" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.companyname_toggle == 'Y'">
                                    <div class="form-group">
                                        <Field type="text" class="form-control" id="company" name="company"
                                            v-model="form_Reg.company"
                                            placeholder="Company (Optional)"
                                            :rules="isRequired" :class="{ 'errorfield': errors.company }"
                                            v-if="event_detail.setting.companyname_required == 'Y'" />
                                        <Field type="text" class="form-control" id="company" name="company"
                                            v-model="form_Reg.company"
                                            placeholder="Company (Optional)"
                                            v-else />
                                        <span class="icon-form"><i class='bx bxs-bank'></i></span>
                                        <ErrorMessage class="notif-verror" name="company" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.companytype_toggle == 'Y'">
                                    <div class="form-group form-select-search">
                                        <div class="form-control-select" :class="{ 'errorfield': errors.company_type }"
                                            v-if="event_detail.setting.companytype_required == 'Y'">
                                            <Field as="select" name="company_type" id="company_type"
                                                class="form-control" v-model="form_Reg.company_type"
                                                :rules="isRequired">
                                                <option v-for="companytype in data_companytype_enable"
                                                    v-bind:value="companytype.comptype_id">
                                                    {{ companytype.comptype_name }}
                                                </option>
                                            </Field>
                                        </div>
                                        <Field as="select" name="company_type" id="company_type" class="form-control"
                                            v-model="form_Reg.company_type" v-else>
                                            <option v-for="companytype in data_companytype_enable"
                                                v-bind:value="companytype.comptype_id">
                                                {{ companytype.comptype_name }}
                                            </option>
                                        </Field>
                                        <span class="icon-form"><i class='bx bxs-briefcase'></i></span>
                                        <ErrorMessage class="notif-verror" name="company_type" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="form_Reg.company_type_isothers == 'Y'">
                                    <div class="form-group">
                                        <Field type="text" class="form-control" name="company_type_others"
                                            v-model="form_Reg.company_type_others" placeholder="Company Type Others"
                                            :rules="isRequired" :class="{ 'errorfield': errors.company_type_others }" />
                                        <span class="icon-form"><i class='bx bxs-briefcase'></i></span>
                                        <ErrorMessage class="notif-verror" name="company_type_others" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.companycountry_toggle == 'Y'">
                                    <div class="form-group form-select-search">
                                        <div class="form-control-select"
                                            :class="{ 'errorfield': errors.company_country }"
                                            v-if="event_detail.setting.companycountry_required == 'Y'">
                                            <Field as="select" name="company_country" id="company_country"
                                                class="form-control" v-model="form_Reg.company_country"
                                                :rules="isRequired">
                                                <option v-for="code in code_country" v-bind:value="code.country_code">
                                                    {{code.country_name}}
                                                </option>
                                            </Field>
                                        </div>
                                        <Field as="select" name="company_country" id="company_country"
                                            class="form-control" v-model="form_Reg.company_country" v-else>
                                            <option v-for="code in code_country" v-bind:value="code.country_code">
                                                {{code.country_name}}
                                            </option>
                                        </Field>
                                        <span class="icon-form"><i class='bx bx-world'></i></span>
                                        <ErrorMessage class="notif-verror" name="company_country" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.companycity_toggle == 'Y'">
                                    <div class="form-group form-select-search">
                                        <div class="form-control-select"
                                            :class="{ 'errorfield': errors.company_province }"
                                            v-if="event_detail.setting.companycity_required == 'Y'">
                                            <Field as="select" name="company_province" id="company_province"
                                                class="form-control" v-model="form_Reg.company_province"
                                                :rules="isRequired">
                                                <option v-for="data_province in data_province"
                                                    v-bind:value="data_province.province_code">
                                                    {{ data_province.province_name }}
                                                </option>
                                            </Field>
                                        </div>
                                        <Field as="select" name="company_province" id="company_province"
                                            class="form-control" v-model="form_Reg.company_province" v-else>
                                            <option v-for="data_province in data_province"
                                                v-bind:value="data_province.province_code">
                                                {{ data_province.province_name }}
                                            </option>
                                        </Field>
                                        <span class="icon-form"><i class='bx bx-world'></i></span>
                                        <ErrorMessage class="notif-verror" name="company_province" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.companycity_toggle == 'Y'">
                                    <div class="form-group form-select-search">
                                        <div class="form-control-select" :class="{ 'errorfield': errors.company_city }"
                                            v-if="event_detail.setting.companycity_required == 'Y'">
                                            <Field as="select" name="company_city" id="company_city"
                                                class="form-control" v-model="form_Reg.company_city"
                                                :rules="isRequired">
                                                <option v-for="data_city in data_city"
                                                    v-bind:value="data_city.city_code">
                                                    {{ data_city.city_name }}
                                                </option>
                                            </Field>
                                        </div>
                                        <Field as="select" name="company_city" id="company_city" class="form-control"
                                            v-model="form_Reg.company_city" v-else>
                                            <option v-for="data_city in data_city" v-bind:value="data_city.city_code">
                                                {{ data_city.city_name }}
                                            </option>
                                        </Field>
                                        <span class="icon-form"><i class='bx bx-world'></i></span>
                                        <ErrorMessage class="notif-verror" name="company_city" />
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="event_detail.setting.reguler_invitationcode_toggle == 'Y'">
                                    <div class="form-group">
                                        <Field type="text" class="form-control" id="regular_invitation_code"
                                            name="regular_invitation_code" v-model="form_Reg.invitationcode"
                                            placeholder="Invitation Code / Kode Undangan" :rules="isRequired"
                                            :class="{ 'errorfield': errors.regular_invitation_code }" />
                                        <span class="icon-form"><i class='bx bxs-coupon'></i></span>
                                        <ErrorMessage class="notif-verror" name="regular_invitation_code" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group text-end">
                                <button class="btn-back mt-4 mx-3" @click="backToCart()">Back</button>
                                <button class="btn-next mt-4" @click="confirmGetTicket()">Next</button>
                            </div>
                        </Form>
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
    import {
        Form,
        Field,
        ErrorMessage
    } from 'vee-validate';

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
        components: {
            Form,
            Field,
            ErrorMessage
        },
        methods: {
            isRequired(value) {
                if (!value) {
                    return 'this field is required / kolom wajib diisi';
                }

                return true;
            },
            getEvent() {
                this.topFunction()
                // this.getSalutation()
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
                if (this.form_Reg.email == this.email_confirm) {
                    this.not_verify = false
                    this.form_Reg.phone = this.phone_number
                    this.isLoadingAnimation = true
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
                                    this.$router.push("/questionnairepage/" + this.form_Reg.events_id);
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
                } else {
                    this.not_verify = true
                    this.topFunction()
                }
            },
            backToCart() {
                this.$router.push("/mycart/" + this.events_id);
            },
            getCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(";");
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == " ") c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
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