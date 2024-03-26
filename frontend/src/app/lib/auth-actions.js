"use server"

import {unstable_noStore as noStore} from 'next/cache';
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import {fetcherStrapi} from "@/app/lib/helpers";
import {outscraperClient} from "@/app/lib/outscraper";

export async function signUp(prevState, formData) {
    noStore()

    const response = await fetcherStrapi({
        url: "/users",
        method: "POST",
        body: {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            firstName: formData.get('firstName') || '',
            lastName: formData.get('lastName') || '',
            confirmed: true,
            role: 1
        }
    });

    if (response.success) {
        response.message = 'User created'
    }

    return response
}

export async function createCompany(prevState, formData) {
    noStore();

    const params = {
        query: [`${formData.get('companyName')}, ${formData.get('companyAddress')}`],
        reviewsLimit: 50
    }

    const reviewsData = await getCompanyReviews(params)

    const { reviews_data = [] } = reviewsData[0] || {};

    if (!reviews_data.length) {
        return {
            success: false,
            message: 'Company not found'
        }
    }

    const session = await getServerSession(authOptions)

    const reviews = reviews_data.map(({ author_title, review_text = '', review_rating, review_datetime_utc }) => ({
        author_title,
        review_text,
        review_rating,
        review_datetime_utc
    }))

    const response = await fetcherStrapi({
        url: "/companies",
        method: "POST",
        body: {
            data: {
                firstName: formData.get('firstName') || 'Name',
                lastName: formData.get('lastName') || 'Surname',
                companyName: formData.get('companyName') || '',
                companyAddress: formData.get('companyAddress') || '',
                users_permissions_user: session.id,
                reviews
            }
        },
        auth: true
    });

    if (response.success) {
        response.message = 'Company created'
    }

    return response
}

export async function getUsers(PAGE_SIZE, nextPage) {
    noStore();
    
    const session = await getServerSession(authOptions)

    const filterQuery = `filters[users_permissions_user][id][$eq]=${session.id}`; // Ensure session is managed correctly
    const paginationQuery = `pagination[page]=${nextPage}&pagination[pageSize]=${PAGE_SIZE}`;

    return fetcherStrapi({
        url: `/companies?populate[0]=users_permissions_user&${filterQuery}&${paginationQuery}`,
        method: "GET",
        auth: true
    });
}

async function getCompanyReviews(params = {}) {
    try {
        const { query = '', reviewsLimit = 10, limit = 1 } = params;

        return outscraperClient.googleMapsReviews(
            query,
            reviewsLimit
        )
    } catch (e) {
        console.error('Failed to get reviews:', e)
    }
}