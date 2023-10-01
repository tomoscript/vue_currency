<template>
  <div class="home">
    <div class="exchange__card">
      <div class="exchange__content">
        <div class="exchange__form">
          <div class="flex__row items__center">
            <div class="flex__column">
              <div class="flex__row items__center">
                <InputText v-model="sourceValue" />
                <div class="currency__wrapper">
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
                <div class="currency__wrapper">
                  <span class="currency__name">{{
                    this.$store.state.currency.targetCurrency.toUpperCase()
                  }}</span>
                  <img alt="chevron_down" src="../assets/icons/chevron_down.svg" width="16" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="exchange__result">
          1 {{ this.$store.state.currency.sourceCurrency.toUpperCase() }} =
          <span class="text__success">{{ this.$store.state.currency.rateCurrency }}</span>
          {{ this.$store.state.currency.targetCurrency.toUpperCase() }}
        </div>
        <div class="exchange__result">
          {{ formattedSource }} {{ this.$store.state.currency.sourceCurrency.toUpperCase() }} =
          <span class="text__success">{{ formattedTarget }}</span>
          {{ this.$store.state.currency.targetCurrency.toUpperCase() }}
        </div>
      </div>
    </div>
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
    };
  },
  methods: {
    formatThousand(number) {
      const string = number.toString();
      if (string.includes(".")) {
        const arrStr = string.split(".");
        return arrStr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "." + arrStr[1];
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

.text__success {
  color: #d30000;
  font-weight: 600;
}
</style>
