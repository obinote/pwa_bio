import { useMutation } from '@apollo/client';
import * as Schema from '@core_modules/authentication/services/graphql/schema';

export const generateSession = (params) => useMutation(Schema.internalGenerateSession, {
    context: {
        request: 'internal',
    },
    variables: params,
});

export const deleteSession = () => useMutation(Schema.internalDeleteSession, {
    context: {
        request: 'internal',
    },
});

export default {
    generateSession,
    deleteSession,
};
