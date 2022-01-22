<template>
    <validation-observer ref="ValidationObserver">
        <div style="display: grid; grid-gap: 10px;">
            <slot></slot>
        </div>
    </validation-observer>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

export default {
    name: 'nw-form',
    components: {
        ValidationObserver
    },
    props: {
        model: {
            type: Object,
        }
    },
    provide() {
        return {
            model: this.model,
        }
    },
    methods: {
        validate() {
            return this.$refs.ValidationObserver.validate();
        },
    }
}
</script>

