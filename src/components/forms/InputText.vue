<template>
  <div class="input__text">
    <input v-model="internalValue" type="text" autocomplete="off" @keypress="isNumber($event)" />
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: ["value"],
  data() {
    return {
      internalValue: this.value,
    };
  },
  methods: {
    isNumber(e) {
      e = e ? e : window.event;
      var charCode = e.which ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        e.preventDefault();
      } else {
        // check count dot
        if (charCode == 46) {
          if (this.internalValue.length < 1 || this.internalValue.toString().includes(".")) {
            e.preventDefault();
          } else {
            return true;
          }
        }
      }
    },
  },
  watch: {
    internalValue(newVal) {
      this.$emit("input", newVal);
    },
    value(newVal) {
      this.internalValue = newVal;
    },
  },
};
</script>

<style scoped>
.input__text > input {
  border: 1px solid black;
  padding: 10px 16px;
  border-radius: 8px;
}

.input__text > input:focus {
  outline: none !important;
  box-shadow: inset 0 0 0 2px black;
  transition: box-shadow 0.3s ease-in-out;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

/* Firefox */
input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
