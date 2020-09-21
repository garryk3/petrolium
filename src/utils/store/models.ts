import router from 'components/router/model';
import localization from 'utils/localization/model';
import user from 'utils/user/model';
import errors from 'components/warning/model';
import content from 'routes/content/model';
import myCalcs from 'routes/my-calc/model';
import calculator from 'components/calculator/model';

export interface RootModel {
    router: typeof router;
    localization: typeof localization;
    user: typeof user;
    errors: typeof errors;
    content: typeof content;
    myCalcs: typeof myCalcs;
    calculator: typeof calculator;
}

export const models: RootModel = {
    router,
    localization,
    user,
    errors,
    content,
    myCalcs,
    calculator
};
