import VisitUs from '@/components/homePage/VisitUs'
import Layout from '@/components/layout/Layout'
import React from 'react'


const page = () => {
    return (
        <Layout>
            <div className='pt-16 md:pt-20 pb-8 min-h-screen'>
                <VisitUs />
            </div>
        </Layout>
    )
}

export default page