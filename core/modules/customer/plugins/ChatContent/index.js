import Content from '@core_modules/customer/plugins/ChatContent/components/index';
import CoreBase from '@core_modules/customer/plugins/ChatContent/core';

const Page = (props) => <CoreBase {...props} Content={Content} />;

export default Page;
