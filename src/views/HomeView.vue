<template>
  <div class="home">
    <div class="exchange__card">
      <div class="exchange__content">
        <div class="exchange__form">
          <div class="flex__row items__center">
            <div class="flex__column">
              <label>Currency</label>
              <div class="flex__row items__center">
                <InputText v-model="sourceValue" />
                <div class="currency__wrapper">
                  <span class="currency__name">{{ sourceCurrency }}</span>
                  <img alt="chevron_down" src="../assets/icons/chevron_down.svg" width="16" />
                </div>
              </div>
            </div>
            <div class="change__button__wrapper">
              <div class="change__button">
                <img alt="chevron_down" src="../assets/icons/transfer.svg" width="24" />
              </div>
            </div>
            <div class="flex__column">
              <label>Convert to</label>
              <div class="flex__row items__center">
                <InputText v-model="targetValue" />
                <div class="currency__wrapper">
                  <span class="currency__name">{{ targetCurrency }}</span>
                  <img alt="chevron_down" src="../assets/icons/chevron_down.svg" width="16" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="exchange__result">
          {{ formattedSource }} {{ sourceCurrency }} =
          <span class="text__success">{{ formattedTarget }}</span>
          {{ targetCurrency }}
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
      sourceValue: "1",
      sourceCurrency: this.$store.state.currency.sourceCurrency.toUpperCase(),
      targetValue: "",
      targetCurrency: this.$store.state.currency.targetCurrency.toUpperCase(),

      rateValue: this.$store.state.currency.rateCurrency,
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
  },
  watch: {
    sourceValue(newVal) {
      if (newVal == 0) {
        this.targetValue = 0;
      } else {
        this.targetValue = parseFloat(newVal) * parseFloat(this.rateValue);
      }
    },
    targetValue(newVal) {
      if (newVal == 0) {
        this.sourceValue = 0;
      } else {
        this.sourceValue = parseFloat(newVal) / parseFloat(this.rateValue);
      }
    },
  },
  computed: {
    formattedSource() {
      return this.formatThousand(this.sourceValue);
    },
    formattedTarget() {
      return this.formatThousand(this.targetValue);
    },
  },
  mounted() {
    console.log("mounted");
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

.change__button__wrapper {
  padding-top: 16px;
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
