<template>
    <section class="vh-100 bg-white">
        <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="fullPage" />
        <div class="container p-5">
            <div class="text-center">
                <h1>Questionnaire</h1>
                <span>Tell us about you and your business</span>
            </div>
            <div class="content-limit" v-if="event_detail">
                <div class="wrap-content radius-floating-none bg-white">
                    <div class="formRSVP">
                        <Form @submit="submitQuestion">
                            <div>
                                <div class="form-box" v-for="question in question_data.question"
                                    :class="{ 'redBox' : notifArray[question.question_id]}">
                                    <div class="is-loading text-30" v-if="isLoading"></div>
                                    <div v-else>
                                        <h4 class="title-sub">{{question.question}}</h4>
                                    </div>
                                    <div v-if="question.input_type == 'RB'">
                                        <div class="form-check form-check-block" v-for="QA in question.answer">
                                            <div class="is-loading text-30" v-if="isLoading"></div>
                                            <div v-else>
                                                <label class="form-check-label" :for="'qa-'+question.question_id+QA.id"
                                                    v-if="QA.answer_feedback == 'Y'">
                                                    <input class="form-check-input" type="radio"
                                                        :id="'qa-'+question.question_id+QA.id"
                                                        :value="question.question_id+','+QA.id+','+QA.quest_score+','+QA.is_others"
                                                        @click="action_changerb(question.question_id,QA)"
                                                        :name="'question-'+question.question_id" checked />
                                                    <span v-html="QA.answer_content"></span>
                                                </label>
                                                <label class="form-check-label" :for="'qa-'+question.question_id+QA.id"
                                                    v-else>
                                                    <input class="form-check-input" type="radio"
                                                        :name="'question-'+question.question_id"
                                                        :id="'qa-'+question.question_id+QA.id"
                                                        :value="question.question_id+','+QA.id+','+QA.quest_score+','+QA.is_others"
                                                        @click="action_changerb(question.question_id,QA)">
                                                    <span v-html="QA.answer_content"></span>
                                                </label>

                                                <div class="form-group" v-if="QA.is_others == 'Y'"
                                                    :id="'qa_other_wrap-'+question.question_id+QA.id"
                                                    style="display:none">
                                                    <input type="text" class="form-control"
                                                        :id="'qa_other-'+question.question_id+QA.id"
                                                        :name="'qa_other-'+question.question_id+QA.id"
                                                        placeholder="Answer Others" disabled />
                                                    <span class="icon-form"><i class='bx bx-check-square'></i></span>
                                                    <div class="notif-verror"
                                                        :id="'qa_other_notif-'+question.question_id+QA.id"
                                                        style="display:none">{{ titleNotifOther }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="notif-verror" v-if="notifArray[question.question_id]">
                                            {{ titleNotif }}
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="form-check form-check-block" v-for="QA in question.answer">
                                            <div class="is-loading text-30" v-if="isLoading"></div>
                                            <div v-else>
                                                <label class="form-check-label" :for="'qa-'+question.question_id+QA.id"
                                                    v-if="QA.answer_feedback == 'Y'">
                                                    <input class="form-check-input" type="checkbox"
                                                        :id="'qa-'+question.question_id+QA.id"
                                                        :value="question.question_id+','+QA.id+','+QA.quest_score+','+QA.is_others"
                                                        @input="action_change(question.question_id,QA)"
                                                        :name="'question-'+question.question_id" checked>
                                                    <span v-html="QA.answer_content"></span>
                                                </label>
                                                <label class="form-check-label" :for="'qa-'+question.question_id+QA.id"
                                                    v-else>
                                                    <input class="form-check-input" type="checkbox"
                                                        :id="'qa-'+question.question_id+QA.id"
                                                        :value="question.question_id+','+QA.id+','+QA.quest_score+','+QA.is_others"
                                                        :name="'question-'+question.question_id"
                                                        @input="action_change(question.question_id,QA)">
                                                    <span v-html="QA.answer_content"></span>
                                                </label>

                                                <div class="form-group" v-if="QA.is_others == 'Y'"
                                                    :id="'qa_other_wrap-'+question.question_id+QA.id"
                                                    style="display:none">
                                                    <input type="text" class="form-control"
                                                        :id="'qa_other-'+question.question_id+QA.id"
                                                        :name="'qa_otherfield-'+question.question_id+QA.id"
                                                        placeholder="Answer Others" disabled>
                                                    <span class="icon-form"><i class='bx bx-check-square'></i></span>
                                                    <div class="notif-verror"
                                                        :id="'qa_other_notif-'+question.question_id+QA.id"
                                                        style="display:none">{{ titleNotifOther }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="notif-verror" v-if="notifArray[question.question_id]">
                                            {{ titleNotif }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group text-center">
                                <a class="btn btn-back mx-1" @click="backPage()">
                                    <span>
                                        Back
                                    </span>
                                </a>
                                <button class="btn btn-main mx-1" id="btn_register">
                                    <span v-if="LoadingButton">
                                        <span class="loader loading-quarter"></span>
                                        Processing
                                    </span>
                                    <span v-else> Next </span>
                                </button>
                            </div>
                            <button @click="topFunction()" id="myBtn" title="Go to top">
                                <i class='bx bxs-chevron-up'></i>
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    import Swal from 'sweetalert2'
    import axios from 'axios'
    import Loading from 'vue-loading-overlay'
    import {
        Form,
        Field,
        ErrorMessage,
    } from 'vee-validate';

    export default {
        data() {
            return {
                event_detail: JSON.parse(localStorage.getItem("event_details")),
                form_getQuestion: {
                    events_id: this.$route.params.Eventsid,
                    order_id: localStorage.getItem("order_id"),
                    queue_id : JSON.parse(localStorage.getItem("queue_id")),
                },
                form_sendAnswer: {
                    events_id: this.$route.params.Eventsid,
                    guests_id: '',
                    order_id: localStorage.getItem("order_id"),
                    cbAnswer_id: [],
                    queue_id : JSON.parse(localStorage.getItem("queue_id")),
                },
                question_data: [],
                answer_checked: [],
                answer_isother: [],
                answer_other: [],
                notifArray: [],
                notifArrayOther: [],
                declare_checkbox: false,
                global_url: this.$globalURL,
                isLoading: false,
                LoadingButton: false,
                isLoadingAnimation: false,
                route_name: this.$route.name,
                titlePage: 'Attendance Details',
                descPage: 'Please fill in all fields',
                titleNotif: 'Please select something',
                titleNotifOther: 'this field is required',
            };
        },
        components: {
            Form,
            Field,
            ErrorMessage,
            Loading
        },
        methods: {
            backPage() {
                $("#btn_back").click();
                this.$router.push("/registrationpage/" + this.form_getQuestion.events_id);
            },
            isRequired(value) {
                if (!value) {
                    return 'this field is required';
                }
                return true;
            },
            get_ipaddress() {
                var this_ = this
                $.getJSON('https://jsonip.com/', function (data) {
                    this_.ip_address = data.ip
                    localStorage.setItem('ip_address', this_.ip_address)
                });
            },
            getQuestion() {
                this.topFunction()
                this.isLoading = true;
                axios({
                        url: "rsvp/questget",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_getQuestion,
                    })
                    .then(res => {

                        this.question_data = res.data;
                        if (res.data.status === '201') {

                            Swal.fire({
                                    title: "Warning",
                                    icon: "warning",
                                    text: res.data.msg,
                                })
                                .then((value) => {
                                    localStorage.clear();
                                    // this.get_ipaddress();
                                    this.$router.push("/homeregistrationpage");
                                });
                        } else {
                            this.isLoading = false;
                            this.form_sendAnswer.guests_id = this.question_data.guests_id;
                            for (let i = 0; i < this.question_data.question.length; i++) {
                                this.notifArray[this.question_data.question[i].question_id] = false
                                for (let j = 0; j < this.question_data.question[i].answer.length; j++) {
                                    this.notifArrayOther[this.question_data.question[i].question_id + this
                                        .question_data
                                        .question[i].answer[j].id] = false
                                    $("#qa_other_notif-" + this.question_data.question[i].question_id + this
                                        .question_data.question[i].answer[j].id).hide();
                                }
                            }
                            this.js()
                        }
                    })
            },

            action_changerb(question_id, value) {
                this.answer_isother[question_id + value.id] = value.is_others
                for (let i = 0; i < this.question_data.question.length; i++) {
                    if (this.question_data.question[i].question_id == question_id) {
                        for (let j = 0; j < this.question_data.question[i].answer.length; j++) {
                            if (this.question_data.question[i].answer[j].id == value.id) {
                                if (value.is_others == 'Y') {
                                    $("#qa_other_wrap-" + question_id + value.id).show()
                                    $("#qa_other-" + question_id + value.id).prop('disabled', false);
                                } else {
                                    $("#qa_other_wrap-" + question_id + value.id).hide()
                                    $("#qa_other-" + question_id + value.id).prop('disabled', true);
                                }
                            } else {
                                $("#qa_other_wrap-" + this.question_data.question[i].question_id + this
                                    .question_data
                                    .question[i].answer[j].id).hide()
                                $("#qa_other-" + this.question_data.question[i].question_id + this.question_data
                                    .question[i]
                                    .answer[j].id).prop('disabled', true);
                            }
                        }
                    }
                }
            },
            action_change(question_id, value) {
                this.answer_isother[question_id + value.id] = value.is_others
                if ($("#qa-" + question_id + value.id).is(":checked")) {
                    this.answer_checked[question_id + value.id] = 'Y'
                    if (this.answer_isother[question_id + value.id] == 'Y') {
                        $("#qa_other_wrap-" + question_id + value.id).show()
                        $("#qa_other-" + question_id + value.id).prop('disabled', false);
                    } else {
                        $("#qa_other_wrap-" + question_id + value.id).hide()
                        $("#qa_other-" + question_id + value.id).prop('disabled', true);
                    }
                } else {
                    this.answer_checked[question_id + value.id] = 'N'
                    $("#qa_other_wrap-" + question_id + value.id).hide()
                    $("#qa_other-" + question_id + value.id).prop('disabled', true);
                }
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
                        return el.scrollHeight - $el.scrollTop() - $el.outerHeight() < 1;
                    }
                }, 1000);
            },
            setTitle(title_page) {
                document.title = `${title_page}`
            },
            submitQuestion(values) {
                this.form_sendAnswer.cbAnswer_id = []
                var lengthQuestion = 0
                var lengthAnswer = 0
                var lengthAnswerOther = 0
                var is = this
                for (let i = 0; i < this.question_data.question.length; i++) {
                    if ($("input[name=question-" + this.question_data.question[i].question_id + "]").is(':checked')) {
                        lengthQuestion = lengthQuestion + 1;
                        $("input[name=question-" + this.question_data.question[i].question_id + "]:checked").each(
                            function () {
                                var array = $(this).val().split(",");
                                var answer_id = array[1]
                                var answer_other = $("#qa_other-" + is.question_data.question[i].question_id +
                                    answer_id).val()
                                if (answer_other !== undefined) {
                                    lengthAnswer = lengthAnswer + 1
                                    if (answer_other !== '') {
                                        lengthAnswerOther = lengthAnswerOther + 1
                                        $("#qa_other-" + is.question_data.question[i].question_id + answer_id)
                                            .removeClass("redBox")
                                        $("#qa_other_notif-" + is.question_data.question[i].question_id + answer_id)
                                            .hide();
                                        is.notifArrayOther[is.question_data.question[i].question_id + answer_id] =
                                            false
                                        var cbAnswer_id = $(this).val() + "," + answer_other
                                        is.form_sendAnswer.cbAnswer_id.push(cbAnswer_id)
                                    } else {
                                        $("#qa_other-" + is.question_data.question[i].question_id + answer_id)
                                            .addClass("redBox")
                                        $("#qa_other_notif-" + is.question_data.question[i].question_id + answer_id)
                                            .show();
                                        is.notifArrayOther[is.question_data.question[i].question_id + answer_id] =
                                            true
                                        is.topFunction()
                                    }
                                } else {
                                    is.form_sendAnswer.cbAnswer_id.push($(this).val())
                                }
                            });
                        this.notifArray[this.question_data.question[i].question_id] = false
                    } else {
                        this.notifArray[this.question_data.question[i].question_id] = true
                        this.topFunction()
                        return false;
                    }
                }

                if (this.question_data.question.length == lengthQuestion && lengthAnswer == lengthAnswerOther) {
                    this.actionSubmitQuestionare()
                } else {}
            },
            actionSubmitQuestionare() {
                this.isLoadingAnimation = true;
                axios({
                        url: "rsvp/savequest",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        method: "POST",
                        data: this.form_sendAnswer,
                    })
                    .then(res => {
                        if (res.data.status == 200) {
                            localStorage.setItem('guests_id', res.data.guests_id)
                            this.$router.push("/checkoutpage/" + this.form_getQuestion.events_id);
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
            },
            topFunction() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            },
        },
        mounted() {
            this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false
      }, 500)
            if (this.event_detail === null) {
                this.$router.push("/");
            } else {
                if (this.event_detail.rsvp_counter != 'O') {
                    this.$router.push("/closed/" + this.form_getQuestion.events_id);
                }
                if (this.getQuestion.order_id != null) {
                    this.$router.push("/registrationpage/" + this.events_id);
                } else {
                    if (this.event_detail.setting.rsvp_assesment == 'N') {
                        this.$router.push("/checkoutpage/" + this.events_id);
                    }
                    this.getQuestion();
                    this.setTitle("Questionaire - " + this.event_detail.event_title + " - Undangin ")
                }
            }
        },
    };
</script>

<style scoped>
    .form-control {
        padding: 10px;
        padding-left: 31px;
        height: 47px;
        border: 1px solid #91B2C3;
        border-radius: 10pt;
    }

    .redBox {
        border: 1px solid red;

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
</style>