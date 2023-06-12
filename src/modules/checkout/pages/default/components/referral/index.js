import gqlService from '@core_modules/checkout/services/graphql';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';

const Loader = () => (
    <>
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
    </>
);

const DropdownReferral = (props) => {
    const [applyReferral] = gqlService.applyReferral({ onError: () => { } });
    const [loadingReferral, setLoadingReferral] = React.useState(false);
    const {
        vendor, checkout, setCheckout,
    } = props;

    const state = {
        ...checkout,
    };

    if (loadingReferral) {
        return <Loader />;
    }

    const dataVendor = vendor.map((itemVendor, itemIndex) => {
        const objReferral = state.data.cart.selected_referral?.find((o) => o.vendor_code === itemVendor.vendor_code);
        return (
            <div key={itemIndex}>
                <Autocomplete
                    options={itemVendor.salesman}
                    getOptionLabel={(option) => (option.sales_name ? `${option.sales_id} - ${option.sales_name}` : '')}
                    id={`controlled-referral-${itemIndex}`}
                    value={objReferral || null}
                    onChange={(event, newValue) => {
                        setLoadingReferral(true);
                        const cartId = state.data.cart.id;
                        applyReferral({
                            variables: {
                                cart_id: cartId,
                                sales_id: newValue?.sales_id ?? '-',
                                sales_name: newValue?.sales_name ?? '-',
                                vendor_code: itemVendor.vendor_code,
                            },
                        }).then((result) => {
                            if (result && result.data && result.data.applyReferral) {
                                state.data.cart.selected_referral = result.data.applyReferral.cart.selected_referral;
                                setCheckout(state);
                            }
                            setLoadingReferral(false);
                        });
                    }}
                    renderInput={(params) => (
                        <div>
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autoCorrect: 'off',
                                    autoCapitalize: 'none',
                                    spellCheck: 'false',
                                }}
                                name={`referral_${new Date().getTime()}`}
                                placeholder="Select sales person"
                                label={itemVendor.vendor_name}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    )}
                />
            </div>
        );
    });
    return dataVendor;
};

const Referral = (props) => {
    const {
        checkout,
        setCheckout,
    } = props;
    const [vendor, setVendor] = React.useState([]);
    const [loadingReferral, setLoadingReferral] = React.useState(true);

    React.useEffect(() => {
        const { cart } = checkout.data;
        if (cart && cart.vendor) {
            setLoadingReferral(false);
            const vendorData = [];
            cart.vendor.forEach((vendors) => {
                vendorData.push(vendors);
            });
            setVendor(vendorData);
        }
    }, [checkout.data.cart]);

    if (loadingReferral) {
        return <Loader />;
    }
    return (
        <div className="referral-section">
            <DropdownReferral vendor={vendor} checkout={checkout} setCheckout={setCheckout} />
        </div>
    );
};

export default Referral;
