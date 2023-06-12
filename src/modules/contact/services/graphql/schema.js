import { gql } from '@apollo/client';

export const contactusFormSubmit = gql`
    mutation contactusFormSubmit($email: String!, $fullname: String!, $message: String!, $telephone: String) {
        contactusFormSubmit(input: { email: $email, fullname: $fullname, message: $message, telephone: $telephone }) {
            success_message
        }
    }
`;

export const awHelpdeskCreateTicket = gql`
    mutation awHelpdesk2TicketCreate(
        $subject: String!
        $content: String!
        $customer_name: String!
        $customer_email: String!
        $department_id: Int
        $order_id: Int
        $attachments: [awHelpdesk2TicketAttachmentInput]
    ) {
        awHelpdesk2TicketCreate(
        subject: $subject
        content: $content
        customer_name: $customer_name
        customer_email: $customer_email
        department_id: $department_id
        order_id: $order_id
        attachments: $attachments
    ) {
            created_at
            customer {
                email
                id
                name
            }
            subject
            uid
            status {
                id
                label
            }
        }
    }
`;

export const getCmsBlocks = gql`
    query($identifiers: [String]) {
        cmsBlocks(identifiers: $identifiers) {
            items {
                identifier
                title
                content
            }
        }
    }
`;

export const getHelpdeskDepartmentOrder = gql`
    {
        getHelpdeskDepartmentOrder {
            departments {
                departmentId
                name
            }
            orders {
                incrementId
                orderId
            }
        }
    }
`;

export const getAvailableDepartments = gql`
    {
        awHelpdesk2AvailableDepartmentsForCreateTicket {
            current_storefront_label {
                content
                store_id
            }
            id
            name
            options {
                current_storefront_label {
                store_id
                content
                }
                id
                is_required
                sort_order
                storefront_labels{
                store_id
                content
                }
                type
                values {
                storefront_labels{
                    store_id
                    content
                }
                }
            }
            storefront_labels {
                content
                store_id
            }
        }
    }
`;

export default { contactusFormSubmit };
