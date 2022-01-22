type validateFunctionType<T> = (value: T, model: any) => Array<String>|string|object
type isDisabledFunctionType<T> = (value: T, model: any) => boolean

interface IIndexable {
    [key: string]: any;
}

class Model implements IIndexable {

    private __validationSuffix = 'Validate'

    private getSystemPropName(name: string, type: string): string {
        return `__${name}${type}`;
    }

    protected addValidation(fieldName: string, f: validateFunctionType<any>): void {

        const ctx = this

        Object.defineProperty(
            this,
            this.getSystemPropName(fieldName, this.__validationSuffix),
            {
                value: f,
                writable: false
            }
        )
    }

    public __getFormHelpers(field: string) {
        const validate = (this as IIndexable)[this.getSystemPropName(field, this.__validationSuffix)]
        const isDisabled = () => {}
        const model = this
        const value = (this as IIndexable)[field]

        return [
            value,
            validate,
            isDisabled,
            model,
        ];
    }
}

export default Model;
