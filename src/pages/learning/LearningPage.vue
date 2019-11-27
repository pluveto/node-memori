<template>
    <div class="container" style="height: 100%">
        <SpellInputPage key="1" v-if="mode==1" :card="current" :correctCallback="onAnswerCorrect" :wrongCallback="onAnswerWrong" :forgetCallback="onForget"></SpellInputPage>
        <CardExpositionPage key="2" v-if="mode==2" :card="current" :editAdditionCallback="onEditAddition" :continueClickCallback="onContinue" :skipCallback="onSkip"></CardExpositionPage>
    </div>
</template>

<script>
import SpellInputPage from "./SpellInputPage.vue";
import CardExpositionPage from "./CardExpositionPage.vue";
import back from "../../plugins/backend";
var timer;
export default {
    components: { SpellInputPage, CardExpositionPage },
    data() {
        return {
            current: {},
            mode: 0,
            learned: 0,
            total: localStorage.getItem("perGroupAmount"),
            answerCorrect: null
        };
    },
    created() {
        this.getCardToLearn();
    },
    mounted() {
        console.log("learning page mounted");
        timer = setInterval(this.heartBeat, 5 * 1000)
    },
    destroyed() {
        console.log("learning page destroyed");
        clearInterval(timer)
    },
    methods: {
        heartBeat() {
            console.log("tick");
            if (this.current.id != undefined) {
                back.heartBeat(this.current.collection_id, this.current.id)
            }
        },
        onSkip() {
            this.reset();
        },
        onContinue() {
            console.log("on continue");
            //sync card
            if (this.answerCorrect) {
                this.current.mastery++;
            } else {
                this.current.mastery = 0;
            }
            console.log(
                "mastery of " + this.current.spell + " : " + this.current.mastery
            );
            back.syncCard(this.current, () => {
                this.reset();
            });
        },
        onEditAddition(newVal) {
            console.log("edit it!", newVal);
            this.current.addition = newVal;
        },
        getCardToLearn() {
            back.getCardsToLearn(this.$route.params.id, 1, data => {
                this.cards = data;
                if (data.length > 0) {
                    this.current = data[0];
                    console.log("Current Card: ", data[0]);
                    this.mode = 1;
                } else {
                    this.$buefy.toast.open({
                        message: "没有需要学习的卡片~",
                        type: "is-info"
                    });
                    this.$router.go(-1);
                }
            });
        },
        onAnswerCorrect() {
            console.log("onAnswerCorrect");
            this.$buefy.toast.open({
                message: "回答正确~",
                type: "is-success",
                position: "is-bottom-right"
            });
            this.answerCorrect = true;
            this.mode = 2;
        },
        onAnswerWrong() {
            console.log("onAnswerWrong");
            this.$buefy.toast.open({
                message: "回答错误 qwq",
                position: "is-bottom-right",
                type: "is-danger"
            });
            this.answerCorrect = false;
            this.mode = 2;
        },
        onForget() {
            this.answerCorrect = false;
            this.mode = 2;
        },
        reset() {
            this.mode = 0;
            this.getCardToLearn();
            this.answerCorrect = null;
        }
    }
};
</script>

<style>
.word {
    margin-bottom: 2em;
    flex: 0 1 auto;
    text-align: center;
}

.card-center {
    flex: 1 1 auto;
}

.memori-card {
    padding: 1em;
    height: 100%;
    display: flex;
    flex-flow: column;
}
</style>