<template>
  <div class="home">
    <div class="exchange__card">
      <div class="exchange__content">
        <div class="flex__row items__center">
          <div class="flex__column">
            <div class="flex__row items__center">
              <InputText v-model="sourceValue" />
              <div class="currency__wrapper" @click="setPopupModal(true, 'source')">
                <span class="currency__name">{{
                  this.$store.state.currency.sourceCurrency.toUpperCase()
                }}</span>
                <img alt="chevron_down" src="../assets/icons/chevron_down.svg" width="16" />
              </div>
            </div>
          </div>
          <div class="change__button__wrapper" @click="switchCurrency">
            <div class="change__button">
              <img alt="chevron_down" src="../assets/icons/transfer.svg" width="24" />
            </div>
          </div>
          <div class="flex__column">
            <div class="flex__row items__center">
              <div class="currency__wrapper" @click="setPopupModal(true, 'target')">
                <span class="currency__name">{{
                  this.$store.state.currency.targetCurrency.toUpperCase()
                }}</span>
                <img alt="chevron_down" src="../assets/icons/chevron_down.svg" width="16" />
              </div>
            </div>
          </div>
        </div>
        <div class="exchange__result">
          1 {{ this.$store.state.currency.sourceCurrency.toUpperCase() }} =
          <span class="text__danger">{{ formatThousand(this.$store.state.currency.rateCurrency) }}</span>
          {{ this.$store.state.currency.targetCurrency.toUpperCase() }}
        </div>
        <div class="exchange__result">
          {{ formattedSource }} {{ this.$store.state.currency.sourceCurrency.toUpperCase() }} =
          <span class="text__success">{{ formattedTarget }}</span>
          {{ this.$store.state.currency.targetCurrency.toUpperCase() }}
        </div>
      </div>
      <div class="space__card"></div>
    </div>

    <v-dialog v-model="popupModal" scrollable width="auto">
      <v-card>
        <v-card-title>Select Currency</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 400px">
          <div v-for="(currency_name, currency_code)  in this.$store.state.currency.listCurrency">
            <div class="currency__option" @click="changeCurrency(currency_code)">
              {{ currency_code }} - {{ currency_name }}
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
    <v-dialog v-model="this.$store.state.currency.loading" :scrim="false" persistent width="200px">
      <v-card color="#c5e1c5">
        <v-card-text class="progress__dialog">
          &nbsp;
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import InputText from "@/components/forms/InputText.vue";

export default {
  name: "HomeView",
  components: {
    InputText,
  },
  data() {
    return {
      sourceValue: "",
      targetValue: "",

      popupModal: false,
      currentPopup: "",
      dialogModel: "",
    };
  },
  methods: {
    formatThousand(number) {
      const string = number.toString();
      if (string.includes(".")) {
        const arrStr = string.split(".");
        const commaStr = arrStr[1].length > 5 ? arrStr[1].substr(0, 5) : arrStr[1];
        return arrStr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "," + commaStr;
      } else {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      }
    },
    switchCurrency() {
      const tempSource = this.$store.state.currency.sourceCurrency;
      const tempTarget = this.$store.state.currency.targetCurrency;
      this.$store.commit("currency/setSourceCurrency", tempTarget);
      this.$store.commit("currency/setTargetCurrency", tempSource);
      this.$store.dispatch("currency/fetchRate");
    },
    setPopupModal(isShow, type) {
      this.popupModal = isShow;
      this.currentPopup = type;
    },
    changeCurrency(currency) {
      if (this.currentPopup == "source") {
        this.$store.commit("currency/setSourceCurrency", currency.toLowerCase());
        this.$store.dispatch("currency/fetchRate");
      } else {
        this.$store.commit("currency/setTargetCurrency", currency.toLowerCase());
        this.$store.dispatch("currency/fetchRate");
      }
      this.setPopupModal(false, "");

      this.sourceValue = "";
    },
  },
  watch: {
    sourceValue(newVal) {
      if (newVal == 0) {
        this.targetValue = 0;
      } else {
        this.targetValue = parseFloat(newVal) * this.$store.state.currency.rateCurrency;
      }
    },
  },
  computed: {
    formattedSource() {
      return this.sourceValue.length > 0 ? this.formatThousand(this.sourceValue) : 0;
    },
    formattedTarget() {
      return this.targetValue > 0 ? this.formatThousand(this.targetValue) : 0;
    },
  },
  mounted() {
    this.$store.dispatch("currency/fetchRate");
    this.$store.dispatch("currency/fetchCurrencies");
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}

.flex__column {
  display: flex;
  flex-direction: column;
}
.flex__row {
  display: flex;
  flex-direction: row;
}
.items__center {
  align-items: center;
}
.currency__wrapper {
  display: flex;
  align-items: center;
  margin-left: 4px;
  border: 1px solid black;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
}
.currency__name {
  margin-right: 4px;
}
.change__button {
  background-color: gold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 100%;
  margin: 0 16px;
  cursor: pointer;
}

.text__danger {
  color: #d30000;
  font-weight: 400;
}
.text__success {
  color: #008c3f;
  font-weight: 600;
}
.currency__option {
  padding: 12px 16px;
  cursor: pointer;
  color: black;
}
.currency__option:hover {
  background-color: #c5e1c5;
}

.exchange__card {
  margin-top: 64px;
  border-radius: 12px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  background-image: url("../assets/images/bg-image.jpg");
  background-repeat: repeat;
}
.exchange__content {
  padding: 24px 48px;
  border-radius: 12px;
  background-color: white;
}
.exchange__result {
  margin-top: 12px;
}
.space__card {
  height: 16px;
}

.v-dialog > .v-card > .v-card__text {
  padding: 0;
}
.v-dialog > .v-card > .v-card__text.progress__dialog {
  padding: 0 24px 20px;
}
</style>
