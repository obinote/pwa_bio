/* eslint-disable max-len */
import React from 'react';
// import Layout from '@layout_customer';

const ReportPage = () => {
    const powerbi = 'https://app.powerbi.com/reportEmbed?reportId=30b46fe7-cd4f-4e35-bcb3-77ded45470c4&autoAuth=true&ctid=5ce332bc-34b7-42c0-a92e-eab6b501d517';
    const titleFrame = 'Outlet - Buyer Dashboard';

    return (
        <>
            <div style={{ display: 'none' }}>
                <iframe
                    title={titleFrame}
                    width="1340"
                    height="941.25"
                    src={powerbi}
                    frameBorder="0"
                    allowFullScreen="true"
                />
            </div>
        </>
    );
};

export default ReportPage;
