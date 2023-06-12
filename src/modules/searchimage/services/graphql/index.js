import { useQuery } from '@apollo/client';
import Schema from './schema';

export const searchByImage = (variables) => useQuery(Schema.searchByImage, {
    variables,
    context: {
        request: 'internal',
    },
    fetchPolicy: 'no-cache',
});

export default {
    searchByImage,
};
