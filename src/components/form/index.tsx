import { h } from 'preact';
import { memo, useEffect } from 'preact/compat';
import { useForm, FormProvider } from 'react-hook-form';

import { Input, Textarea } from 'ui/form';

import { FormProps, InputConfig } from './types';

// с API могут приходить невалидные значения
const withParsedMinMaxValues = (settings: InputConfig) => {
    const { inputProps: { min, max } } = settings;

    if(min !== undefined) {
        settings.inputProps.min = Number.isNaN(Number(min)) ? undefined :  Number(min);
    }
    if(max !== undefined) {
        settings.inputProps.max = Number.isNaN(Number(max)) ? undefined :  Number(max);
    }
    return settings;
};

const setSelectValues = (defaultValues: any, inputConfigs: InputConfig[], setValue: Function) => {
    inputConfigs.forEach((data) => {
        if(!Array.isArray(data.select) || defaultValues?.[data.inputProps.name]) {
            return;
        }
        setValue(data.inputProps.name, data.select[0]);
    });
};

const Form = ({
    inputConfigs, className, children, onSubmitAction, defaultValues, showEmptyOnSubmit
}: FormProps) => {
    const formInitParams = { mode: 'onChange' } as { mode: 'onChange'; defaultValues: Record<string, any>; };

    if(defaultValues) {
        formInitParams.defaultValues = defaultValues;
    }

    const methods = useForm(formInitParams);
    const {
        register, handleSubmit, errors, watch, formState, setValue
    } = methods;
    const isFirstSubmit = formState.submitCount === 1 && formState.isSubmitted;

    const onSubmit = (data) => {
        const emptyValue = showEmptyOnSubmit && Object.values(data).find((value) => (value === '' || value === 'Unknown'));

        if(showEmptyOnSubmit && formState.submitCount === 0 && emptyValue !== undefined) {
            return;
        }
        onSubmitAction(data);
    };

    useEffect(() => {
        setSelectValues(defaultValues, inputConfigs, setValue);
    }, [defaultValues, inputConfigs, setValue]);

    return (
        <FormProvider {...methods}>
            <form className={className} onSubmit={handleSubmit(onSubmit)}>
                {Array.isArray(inputConfigs) && inputConfigs.map((settings) => {
                    const {
                        pattern, errorText, variant, inputProps, ...props
                    } = withParsedMinMaxValues(settings);
                    const {
                        min, max, required, name
                    } = inputProps;
                    const error = errors[inputProps.name];
                    const errorMessage = Boolean(error) && (error.message || errorText || 'Error!');
                    const value = watch(inputProps.name);
                    const hasValue = value?.length;
                    const isEmptyAfterSubmit = showEmptyOnSubmit && isFirstSubmit && (!hasValue || value === 'Unknown');
                    const registerConfig = {
                        ...pattern && { pattern },
                        ...required && { required },
                        ...!Number.isNaN(Number(min)) && {
                            min: Number(min)
                        },
                        ...!Number.isNaN(Number(max)) && {
                            max: Number(max)
                        }
                    };
                    const isValid = !error && hasValue && (value !== 'Unknown');
                    const inputData = {
                        ...props,
                        inputProps,
                        key: name,
                        errorMessage
                    };

                    if(name === 'passwordConfirm') {
                        registerConfig.validate = (value) => value === watch('password');
                    }

                    inputProps.ref = register(registerConfig);

                    if(variant === 'textarea') {
                        return <Textarea errorMessage={errorMessage} name={name} />;
                    }

                    return <Input isShowEmpty={isEmptyAfterSubmit} valid={isValid} {...inputData} />;
                })}
                {children}
            </form>
        </FormProvider>
    );
};

export default memo(Form);
