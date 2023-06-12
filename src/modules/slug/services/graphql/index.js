import { useQuery } from '@apollo/client';
import * as Schema from '@core_modules/slug/services/graphql/schema';

export const getResolver = (urlpath, context) => useQuery(Schema.getResolver(urlpath), context);
export const resolverProduct = (url, context) => useQuery(Schema.resolverProduct(url), context);

export default { getResolver };
