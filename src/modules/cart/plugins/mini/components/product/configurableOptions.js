/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ConfigurableAccordion = ({ items }) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="product-configurable-container">
            <div className="product-configurable-top" onClick={handleExpanded}>
                <span>Lihat detail</span>
                { expanded ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
            </div>
            <div className="product-configurable-items" style={{ display: expanded ? 'block' : 'none' }}>
                {items.map((val, idx) => (
                    <div className="option-wrapper" key={idx}>
                        <strong>{val.option_label}</strong>
                        :
                        {` ${val.value_label}`}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConfigurableAccordion;
