<template>
    <div class="hello">
        <nw-form :model="someDocument" ref="form">
            <nw-form-line
                label="doc name"
                model-value="DocName"
            ></nw-form-line>

            <input v-model="someDocument.IsSomeFlag" type="checkbox">

            {{ someDocument.DocName }}
        </nw-form>

        <button @click="validate">
            validate
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Model from '../model/model';
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
});

class SomeDocument extends Model {
    constructor(
        public DocCode: string = "",
        public DocName: string = "",
        public IsSomeFlag: boolean = true,
    ) {
        super()

        this.addValidation('DocName', (v: string, m: SomeDocument) => {
            return m.IsSomeFlag ? 'required' : '';
        })
    }
}

export default Vue.extend({
    data() {
        return {
            someDocument: new SomeDocument(),
        };
    },
    computed: {
        rules() {
            const [
                value,
                validate,
                isDisabled,
                model,
            ] = (this as any).someDocument.__getFormHelpers('DocName')

            return validate(value, model)
        }
    },
    methods: {
        fetchDoc() {
            this.someDocument = new SomeDocument(
                '12',
                'решение суда о каком-либо действие',
                true
            )
        },
        validate() {
            if (this.$refs.form) {
                this.$refs.form.validate();
            }
        },
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
