/* eslint-disable react/no-danger */
/* eslint-disable consistent-return */
import { getCmsBlocks } from '@core_modules/theme/services/graphql';
import useStyles from '@core_modules/theme/components/ContactPageBottom/style';
import parse from 'html-react-parser';

const ContactComponent = (props) => {
    const { content } = props;
    return parse(content, {
        replace: (domNode) => {
            if (domNode.attribs && domNode.attribs['data-content-type'] === 'html') {
                return (
                    <div dangerouslySetInnerHTML={{ __html: domNode.children[0].data }} />
                );
            }
        },
    });
};

const ContactPageBottom = (props) => {
    const {
        storeConfig,
    } = props;
    const styles = useStyles();
    const {
        data, loading,
    } = getCmsBlocks({ identifiers: ['contact-before-footer'] }, { skip: !storeConfig });

    return (
        <div>
            {((!loading && data?.cmsBlocks) && (
                <div className={styles.pageBottom} id="html-body">
                    <ContactComponent content={data.cmsBlocks.items[0].content} />
                </div>
            ))}
        </div>
    );
};

export default ContactPageBottom;
