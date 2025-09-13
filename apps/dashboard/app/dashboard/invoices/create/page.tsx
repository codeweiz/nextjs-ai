import Form from '@microboat/dashboard/app/ui/invoices/create-form';
import Breadcrumbs from '@microboat/dashboard/app/ui/invoices/breadcrumbs';
import {fetchCustomers} from '@microboat/dashboard/app/lib/data';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Invoices Create',
};

export default async function Page() {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Invoices', href: '/dashboard/invoices'},
                    {
                        label: 'Create Invoice',
                        href: '/dashboard/invoices/create',
                        active: true,
                    },
                ]}
            />
            <Form customers={customers}/>
        </main>
    );
}
