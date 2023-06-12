/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
// Library
import AddressFormDialog from '@plugin_addressform';
import Button from '@common_button';
import Add from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
// import Layout from '@layout_customer';
import Link from 'next/link';
import TableAddress from '@core_modules/customer/pages/address/components/table';
import useStyles from '@core_modules/customer/pages/address/components/style';
import Skeleton from '@material-ui/lab/Skeleton';
import { SkeletonMobile, SkeletonTable } from '@core_modules/customer/pages/address/components/skeleton';
import ItemMobile from '@core_modules/customer/pages/address/components/ItemMobile';
import Typography from '@common_typography';

const generateData = (data) => (
    <p>
        <strong>
            {data.address_label}
        </strong>
        {data.firstname}
        {' '}
        {data.lastname}
        <br />
        {data?.street ? data.street[0] : ''}
        <br />
        {data.city}
        {', '}
        {data?.region?.region ? data?.region?.region : ''}
        {', '}
        {data.postcode}
        <br />
        <Link href={`tel:${data.telephone}`}>
            <a>{data.telephone}</a>
        </Link>
    </p>
);

// Main Render Page
const Content = (props) => {
    // style
    const styles = useStyles();
    const {
        loading, address, selectedAddressId,
        handleOpenNew, handleAddress, loadingAddress,
        success, openNew, t, handleChange, removeAddress,
        cancelApproval, requestApproval, handleOpenStatus,
        approvalStatus, openStatus, handleCloseStatus,
        dataCompany,
    } = props;

    let defaultShiping = {};
    let defaultBilling = {};
    let defaultAddress = false;

    const isCompanyAdmin = dataCompany?.getCompanyStatus?.is_company_admin ?? false;

    for (let index = 0; index < address.length; index++) {
        const addr = address[index];
        if (addr.default_billing && !defaultBilling.id) {
            defaultBilling = addr;
        }

        if (addr.default_shipping && !defaultShiping.id) {
            defaultShiping = addr;
        }

        if (addr.default_billing === true || addr.default_shipping === true) {
            defaultAddress = true;
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.defaultAddress}>
                    <div>
                        <h2>{t('customer:address:defaultBilling')}</h2>
                        {loading ? (
                            <>
                                <Skeleton animation="wave" variant="text" width="90%" height={20} />
                                <Skeleton animation="wave" variant="text" width="100%" height={20} />
                                <Skeleton animation="wave" variant="text" width="40%" height={20} />
                            </>
                        ) : (
                            <>
                                {address.length > 0 && defaultAddress && defaultBilling?.id ? (
                                    generateData(defaultBilling, props)
                                ) : (
                                    <div>
                                        <div>
                                            <p>{t('customer:address:emptyMessage')}</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div>
                        <h2>{t('customer:address:defaultShipping')}</h2>
                        {loading ? (
                            <>
                                <Skeleton animation="wave" variant="text" width="90%" height={20} />
                                <Skeleton animation="wave" variant="text" width="100%" height={20} />
                                <Skeleton animation="wave" variant="text" width="40%" height={20} />
                            </>
                        ) : (
                            <>
                                {address.length > 0 && defaultAddress && defaultShiping?.id ? (
                                    generateData(defaultShiping, props)
                                ) : (
                                    <div>
                                        <div>
                                            <p>{t('customer:address:emptyMessage')}</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.tableOuterContainer}>
                    <h2>{t('customer:address:additionalAddress')}</h2>
                    <div className="hidden-desktop">
                        {
                            loading
                                ? (<SkeletonMobile />)
                                : address.length > 0 ? (
                                    <>
                                        {address.map((item, index) => (
                                            <ItemMobile
                                                {...item}
                                                first={index === 0}
                                                handleAddress={handleAddress}
                                                removeAddress={removeAddress}
                                                cancelApproval={cancelApproval}
                                                requestApproval={requestApproval}
                                                checked={item.id == selectedAddressId}
                                                key={item.id}
                                                addressId={item.id}
                                                firstname={item.firstname}
                                                lastname={item.lastname}
                                                company={item.company}
                                                fax={item.fax}
                                                erp_id_address={item.erp_id_address}
                                                telephone={item.telephone}
                                                postcode={item.postcode}
                                                region={item.region.region}
                                                city={item.city}
                                                country={{
                                                    id: item.country.code,
                                                    full_name_locale: item.country.label,
                                                }}
                                                street={item.street.join(' ')}
                                                value={item.id}
                                                defaultBilling={item.default_billing}
                                                defaultShipping={item.default_shipping}
                                                loadingAddress={loadingAddress}
                                                success={success}
                                                handleChange={handleChange}
                                                selectedAddressId={selectedAddressId}
                                                t={t}
                                                can_edit={item.can_edit}
                                                can_delete={item.can_delete}
                                                can_cancel_request={item.can_cancel_request}
                                                can_request={item.can_request}
                                                can_view_status={item.can_view_status}
                                                handleOpenStatus={handleOpenStatus}
                                                isCompanyAdmin={isCompanyAdmin}
                                            />
                                        ))}
                                    </>
                                ) : (<Alert severity="warning">{t('customer:address:emptyMessage')}</Alert>)
                        }
                    </div>
                    <TableContainer component={Paper} className={[styles.tableContainer, 'hidden-mobile'].join(' ')}>
                        <Table className={styles.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow className={styles.tableRowHead}>
                                    <TableCell align="left">Default</TableCell>
                                    <TableCell align="left">{t('customer:address:firstname')}</TableCell>
                                    <TableCell align="left">{t('customer:address:lastname')}</TableCell>
                                    <TableCell align="left">{t('customer:address:street')}</TableCell>
                                    <TableCell align="left">{t('customer:address:phone')}</TableCell>
                                    <TableCell align="left"> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <SkeletonTable />
                                ) : address.length > 0 ? (
                                    <>
                                        {address.map((item) => (
                                            <TableAddress
                                                {...item}
                                                handleAddress={handleAddress}
                                                removeAddress={removeAddress}
                                                cancelApproval={cancelApproval}
                                                requestApproval={requestApproval}
                                                checked={item.id == selectedAddressId}
                                                key={item.id}
                                                addressId={item.id}
                                                firstname={item.firstname}
                                                lastname={item.lastname}
                                                telephone={item.telephone}
                                                postcode={item.postcode}
                                                region={item.region.region}
                                                city={item.city}
                                                country={{
                                                    id: item.country.code,
                                                    full_name_locale: item.country.label,
                                                }}
                                                street={item.street.join(' ')}
                                                value={item.id}
                                                defaultBilling={item.default_billing}
                                                defaultShipping={item.default_shipping}
                                                loadingAddress={loadingAddress}
                                                success={success}
                                                handleChange={handleChange}
                                                selectedAddressId={selectedAddressId}
                                                t={t}
                                                can_edit={item.can_edit}
                                                can_delete={item.can_delete}
                                                can_cancel_request={item.can_cancel_request}
                                                can_request={item.can_request}
                                                can_view_status={item.can_view_status}
                                                approvalStatus={approvalStatus}
                                                handleOpenStatus={handleOpenStatus}
                                                openStatus={openStatus}
                                                handleCloseStatus={handleCloseStatus}
                                                isCompanyAdmin={isCompanyAdmin}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9}>
                                            <Alert severity="warning">{t('customer:address:emptyMessage')}</Alert>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                {isCompanyAdmin && (
                    <div className={[styles.address_action].join(' ')}>
                        <Button className={styles.btn_action} variant="contained" onClick={() => handleOpenNew()}>
                            <Typography variant="p" type="normal" color="white">
                                {t('customer:address:addTitle')}
                            </Typography>
                            <Add fontSize="small" />
                        </Button>
                    </div>
                )}
                <AddressFormDialog
                    {...props}
                    onSubmitAddress={(data, type) => {
                        handleAddress(data, type);
                    }}
                    loading={loadingAddress}
                    success={success}
                    open={openNew}
                    setOpen={() => handleOpenNew(!openNew)}
                />
            </div>
        </>
    );
};

export default Content;
