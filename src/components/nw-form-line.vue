<template>
    <validation-provider :rules="rules" v-slot="{ errors }">
        <div class="nw-form-line">
            <label>{{ label }}: </label>
            <input v-model="modelValue$" type="text">
            <br>
            {{ errors }}
        </div>
    </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { get, set as lodashSet } from 'lodash';

export default {
    components: {
        ValidationProvider,
    },
    props: {
        value: {},
        label: String,
        modelValue: {},
    },
    inject: ['model'],
    computed: {
        value$: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        },
        modelValue$: {
            get() {
                return get(this.model, this.modelValue)
            },
            set(value) {
                lodashSet(this.model, this.modelValue, value)
            }
        },
        rules() {
            const [
                value,
                validate,
                isDisabled,
                model,
            ] = this.model.__getFormHelpers(this.modelValue)

            return validate(value, model)
        }
    }
}
</script>
